import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';
import Quote from './components/Quote';

const data = [
  {id: 1, text: "text1.1", text_2: "text1.2", category: "category1"},
  {id: 2, text: "text2.1", text_2: "text2.2", category: "category2"},
  {id: 3, text: "text3.1", text_2: "text3.2", category: "category3"},
];  

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
        <Text>1 Open up App.js to start working on your app!</Text>
      </View>
      <View style={styles.mainContainer}>
        <Quote text={quote.text} text_2={quote.text_2} />        
        <Pressable 
          onPress={() => setIndex((index +1) % data.length)}
          style={}
        >
          <Text>Next Quote</Text>
        </Pressable>
        <Pressable onPress={() => setIndex(prevIndex)}>
          <Text>Previous Quote</Text>
        </Pressable>
        </View>
      <View style={styles.footerContainer}>
        <Text>3 Open up App.js to start working on your app!</Text>
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
    width: '100%'
  },
  headerContainer: {
    flex: 1 / 9,
  },
  mainContainer: {
    flex: 7 / 9,
    backgroundColor: 'darkgray',
    justifyContent: 'center',
    width: '100%'

  },
  footerContainer: {
    flex: 1 / 9,
  },

});