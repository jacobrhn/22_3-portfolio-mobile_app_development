import { useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Card from './components/Card';
import NewCard from './components/NewCard';
import TextButton from './components/TextButton';
import IconButton from './components/IconButton';


const data = [
  {text: "text1.1", text_2: "text1.2", text_3: "text1.3", category: "category1"},
  {text: "Glück ist wie Pupsen, wenn man es erzwingt wirds Scheiße...", text_2: "Napoleon Bonaparte", text_3:"text2.3", category: "category2"},
  {text: "text3.1", text_2: "text3.2",text_3: "text3.3", category: "category3"},
];  

export default function App() {

  const [cards, setCards] = useState(data);
  const [index, setIndex] = useState(0);
  const [showInputDialog, setShowInputDialog] = useState(false);

  useEffect(() => {loadCards()}, []); // load cards from db ONLY on startup

  const card = cards[index]; 
  let prevIndex = index - 1;
  if (prevIndex < 0) {
    prevIndex = cards.length - 1;
  }

  addCardtoData = (text, text_2, text_3, category) => {
    setShowInputDialog(false);
    const updatedCards = [
      ...cards, 
      {text, text_2, text_3, category}
    ];
    setCards(updatedCards); // store in state
    setIndex(updatedCards.length - 1); // set index to added card
    saveCards(updatedCards); // store in db
  }

  function deleteCardFromData() {
    let updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
    setIndex(0);
    saveCards(updatedCards);
  }
  
  function saveCards(updatedCards) {
    //console.log(new Date().toISOString(), '\nsaveCards() \n', updatedCards);
    AsyncStorage.setItem('CARDS', JSON.stringify(updatedCards));
  }

  async function loadCards() {
    let quotesFromDb = await AsyncStorage.getItem('CARDS'); 
    if (quotesFromDb) {
      //console.log(new Date().toISOString(), '\nloadCards() \n', quotesFromDb);
      setCards(JSON.parse(quotesFromDb));
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.topNavigationContainer}>
        <Text style={styles.text}>card App</Text>
        <IconButton onPress={() => setShowInputDialog(true)} style={styles.pressableIconNewCard} />
        <IconButton onPress={() => deleteCardFromData()} style={styles.pressableIconDeleteCard} iconName='delete'/>
      </View>

      <View style={styles.cardDisplayContainer}>
        <NewCard visible={showInputDialog} onCancel={() => setShowInputDialog(false)} onSave={addCardtoData} />
        <Card text={card.text} text_2={card.text_2} />
      </View>
      
      <View style={styles.cardNavigationContainer}>    
      <IconButton iconName={'skip-previous'} onPress={() => setIndex(prevIndex)} style={[styles.pressableIconPreviousCard]} />
      <TextButton text={'Answer'} onPress={() => alert('Enter Answer')} />
      <IconButton iconName={'skip-next'} onPress={() => setIndex((index +1) % cards.length)} style={[styles.pressableIconNextCard]} />
      </View>
    <StatusBar style="auto" />
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'lightgray',
  },
  topNavigationContainer: {
    width: '100%',
    length: '100%',
    height: '10%',
  },
  cardDisplayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '80%',
  },
  cardNavigationContainer: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
  },
  pressableIconNewCard: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
  pressableIconPreviousCard: {
    position: 'absolute',
    left:13,
    top: 20,
  },
  pressableIconNextCard: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
  pressableIconDeleteCard: { 
    position: 'absolute',
    left: 10,
    top: 20,
  },
});