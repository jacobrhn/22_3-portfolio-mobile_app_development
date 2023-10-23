import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';

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
        <Text>{quote.text}</Text>
        <Text>{quote.text_2}</Text>        
        <Button title="Next Quote" onPress={() => setIndex((index +1) % data.length)} />
        <Button title="Previous Quote" onPress={() => setIndex(prevIndex)} />

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
    alignItems: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  headerContainer: {
    flex: 1 / 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 7 / 9,
    backgroundColor: 'darkgray',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  footerContainer: {
    flex: 1 / 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
});