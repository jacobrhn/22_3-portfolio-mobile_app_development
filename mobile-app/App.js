import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import Quote from './components/Quote';
import NewCard from './components/NewCard';

const data = [
  {id: 1, text: "text1.1", text_2: "text1.2", category: "category1"},
  {id: 2, text: "text2.1", text_2: "text2.2", category: "category2"},
  {id: 3, text: "text3.1", text_2: "text3.2", category: "category3"},
];  

function newCard() {
  console.log("New Card");
}

export default function App() {

  const [index, setIndex] = useState(0); // --> [0, function]
  const [showInputDialog, setShowInputDialog] = useState(false); // --> [0, function]
  // showInputDialog = false;
  console.log('showInputDialog:', showInputDialog)
  const quote = data[index]; 

  
  let prevIndex = index - 1;
  if (prevIndex < 0) {
    prevIndex = data.length - 1;
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.topNavigationContainer}>
      <Text style={styles.text}>Quote App</Text>
        <Pressable 
          onPress={() => setShowInputDialog(true)}
          style={styles.pressableIconNewCard}>
          <MaterialIcons name="note-add" size={30} color="#4a4a8f" />
        </Pressable>
      </View>

      <View style={styles.cardDisplayContainer}>
        <NewCard visible={showInputDialog} onCancel={() => setShowInputDialog(false)}/>
        <Quote text={quote.text} text_2={quote.text_2} />
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
      <Pressable 
        onPress={() => alert('Enter Answer')}
        style={[styles.pressable, {alignSelf: 'center'}]}
      >
        <Text style={styles.pressableCardNavText}>Answer</Text>
      </Pressable>
      <Pressable
        onPress={() => setIndex((index +1) % data.length)}
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