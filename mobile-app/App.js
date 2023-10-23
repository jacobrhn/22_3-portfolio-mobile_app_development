import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';

const data = [
  {id: 1, text: "text1.1", text_2: "text1.2", category: "category1"},
  {id: 2, text: "text2.1", text_2: "text2.2", category: "category2"},
  {id: 3, text: "text3.1", text_2: "text3.2", category: "category3"},
];  

export default function App() {

  
  // Use State importieren
  //  -->  useState() --> 2 Werte zurückgeben
  // inititaler Zustand festlegen
  // const useStateArray = useState(0);
  // console.log('useStateArray: ', useStateArray); // [0, function]
  // zustandsobjekt aus dem useStateArray extrahieren und speichern
  // const index = useStateArray[0];
  // index aus dem useStateArray als index verwenden
  // const quote = data[index]; // inititaler Zustand --> soll aber aktuellen Zustand darstellen
  // änderungsfunktion aus useStateArray extrahieren und speichern
  // const setIndex = useStateArray[1];
  // state mit der änderungsfunktion ändern --> in button 


  return (
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.headerContainer}>
        <Text>1 Open up App.js to start working on your app!</Text>
      </View>
      <View style={styles.mainContainer}>
        <Text>{quote.text}</Text>
        <Text>{quote.text_2}</Text>
        <Button title="Alert" onPress={() => setIndex((index +1) % data.length)} />
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