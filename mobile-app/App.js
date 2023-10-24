import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import Quote from './components/Quote';

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
  const quote = data[index]; 

  let prevIndex = index - 1;
  if (prevIndex < 0) {
    prevIndex = data.length - 1;
  }

  return (
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.headerContainer}>
        <View>
          <Pressable 
            onPress={() => newCard()}
            style={styles.pressableNewCard}>
            <MaterialIcons name="note-add" size={30} color="#4a4a8f" />
          </Pressable>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <Quote text={quote.text} text_2={quote.text_2} />
      </View>
    <View style={styles.footerContainer}>
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
        onPress={() => setIndex((index +1) % data.length)}
        style={[styles.pressable, {alignSelf: 'center'}]}
      >
        <Text style={styles.pressableCardNavText}>Next Card</Text>
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
  appContainer: {
    flex: 1,
    //alignItems: 'center',
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
    width: '100%',
    backgroundColor: 'lightgray'
  },
  headerContainer: {
    flex: 1 / 9,
  },
  mainContainer: {
    flex: 7 / 9,
    backgroundColor: '#ececec',
    justifyContent: 'center',
    width: '100%'

  },
  footerContainer: {
    flex: 1 / 9,
    
  },
  pressableCardNavContainer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
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
  },
  pressableCardNavText: {
    fontSize: 20,
    color: 'white',
    // fontWeight: 'bold',
  },
  pressableNewCard: {
    position: 'absolute',
    right: 30,
    top: 10,
  },
  pressableIconPreviousCard: {
    position: 'absolute',
    left: 30,
    top: 10,
  },
  pressableIconNextCard: {
    position: 'absolute',
    right: 30,
    top: 10,
  }
});