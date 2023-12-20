import { useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Card from '../../../components/Card';
import NewCard from '../../../components/NewCard';
import TextButton from '../../../components/TextButton';
import IconButton from '../../../components/IconButton';

export default function App() {

  const [index, setIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [showInputDialog, setShowInputDialog] = useState(false);
  const navigation = useNavigation();
  
  useEffect(() => {loadCards()}, []);

  let prevIndex = index - 1;
  if (prevIndex < 0) {
    prevIndex = cards.length - 1;
  }

  addCardtoData = (front_text, back_text, text_3, category) => {
    setShowInputDialog(false);
    const updatedCards = [
      ...cards, 
      {front_text, back_text, text_3, category}
    ];
    setCards(updatedCards); // store in state
    setIndex(updatedCards.length - 1); // set index to added card
    saveCards(updatedCards); // store in db
    console.log('addCardtoData', updatedCards);
  }

  function deleteCard() {
    Alert.alert('Delete Card','Do you realy want to delete "'+ cards[index].front_text + '"?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Delete', style: 'destructive', onPress: deleteCardFromData},
    ]);
  }

  function deleteCardFromData() {
    let updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setIndex(0);
    setCards(updatedCards);
    saveCards(updatedCards);
  }
  
  function saveCards(updatedCards) {
    AsyncStorage.setItem('CARDS', JSON.stringify(updatedCards));
  }

  async function loadCards() {
    let quotesFromDb = await AsyncStorage.getItem('CARDS'); 
    if (quotesFromDb) {
      setCards(JSON.parse(quotesFromDb));
    }
  }

  content = 
    <View style={styles.noCards}>
      <Text style={styles.noCardsText}>Add your first card by hitting the plus icon.</Text>

    </View>;
  if (cards.length > 0) {
    const card = cards[index]; // This line should be here
    content = <Card front_text={card.front_text} back_text={card.back_text} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.topNavigationContainer}>
        <Text style={styles.front_text}>manage</Text>
        <IconButton onPress={() => setShowInputDialog(true)} style={styles.pressableIconNewCard} />
        {cards.length > 0 ? <IconButton onPress={() => deleteCard()} style={styles.pressableIconDeleteCard} iconName='delete'/> : null}
        <IconButton onPress={() => navigation.openDrawer()} style={styles.pressableIconOpenDrawer} iconName='menu' />
      </View>
      <View style={styles.cardDisplayContainer}>
        <NewCard visible={showInputDialog} onCancel={() => setShowInputDialog(false)} onSave={addCardtoData} />
        {content}
      </View>
      
      <View style={styles.cardNavigationContainer}>    
      {cards.length > 1 ? <IconButton iconName={'skip-previous'} onPress={() => setIndex(prevIndex)} style={[styles.pressableIconPreviousCard]} /> : null}
      {cards.length > 0 ? <TextButton text={'Answer'} onPress={() => alert('Enter Answer')} /> : null}
      {cards.length > 1 ? <IconButton iconName={'skip-next'} onPress={() => setIndex((index +1) % cards.length)} style={[styles.pressableIconNextCard]}/> : null}
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
  pressableIconDeleteCard: { 
    position: 'absolute',
    right: 10,
    top: 50,
  },
  pressableIconOpenDrawer: { 
    position: 'absolute',
    left: 10,
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
  noCards: {
    margin: 50,
    color: 'gray',

  },
  noCardsText: {
    fontSize: 30,
    fontWeight: '300',
    textAlign: 'center',
    color: 'gray',
  },
});