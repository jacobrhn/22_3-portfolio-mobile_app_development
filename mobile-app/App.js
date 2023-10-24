import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import Card from './components/Card';
import NewCard from './components/NewCard';
import TextButton from './components/TextButton';

const data = [
  {text: "text1.1", text_2: "text1.2", text_3: "text1.3", category: "category1"},
  {text: "Glück ist wie Pupsen, wenn man es erzwingt wirds Scheiße...", text_2: "Napoleon Bonaparte", text_3:"text2.3", category: "category2"},
  {text: "text3.1", text_2: "text3.2",text_3: "text3.3", category: "category3"},
];  

function newCard() {
  console.log("New Card");
}

export default function App() {

  const [cards, setCards] = useState(data);
  const [index, setIndex] = useState(0);
  const [showInputDialog, setShowInputDialog] = useState(false);

  const card = cards[index]; 

  let prevIndex = index - 1;
  if (prevIndex < 0) {
    prevIndex = cards.length - 1;
  }

  addCardtoData = (text, text_2, text_3, category) => {
    setShowInputDialog(false);
    const newCards = [
      ...cards, 
      {text, text_2, text_3, category}
    ];
    setCards(newCards);
    setIndex(newCards.length - 1);
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.topNavigationContainer}>
      <Text style={styles.text}>card App</Text>
        <Pressable 
          onPress={() => setShowInputDialog(true)}
          style={styles.pressableIconNewCard}>
          <MaterialIcons name="note-add" size={30} color="#4a4a8f" />
        </Pressable>
      </View>

      <View style={styles.cardDisplayContainer}>
        <NewCard 
          visible={showInputDialog} 
          onCancel={() => setShowInputDialog(false)}
          onSave={addCardtoData}
        />
        <Card text={card.text} text_2={card.text_2} />
      </View>
      
      <View style={styles.cardNavigationContainer}>    
      <Pressable
        onPress={() => setIndex(prevIndex)}
        style={[styles.pressableIconPreviousCard]}
      >
      <MaterialCommunityIcons 
        name="step-backward" 
        size={30} 
        color="#4a4a8f" />
      </Pressable>
      <TextButton text={'Answer'} onPress={() => alert('Enter Answer')} />
      <Pressable
        onPress={() => setIndex((index +1) % cards.length)}
        style={[styles.pressableIconNextCard]}
      >
      <MaterialCommunityIcons name='step-forward' size={30} color='#4a4a8f' />
      </Pressable>
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
    backgroundColor: 'gray',
    height: '10%',
  },
  cardDisplayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: '80%',
  },
  cardNavigationContainer: {
    backgroundColor: 'gray',
    width: '100%',
    height: '10%',
    alignItems: 'center',
  },
  pressable: {
    backgroundColor: '#4a4a8f',
    borderWidth: 1,
    borderColor: '#4a4a8f',
    padding: 10,
    borderRadius: 9,
    margin: 5,
    alignItems: 'center',
    width: 200,
    top: 8,
  },
  pressableCardNavText: {
    fontSize: 20,
    color: 'white',
    // fontWeight: 'bold',
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
});