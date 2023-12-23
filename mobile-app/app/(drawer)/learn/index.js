import React, { useState, useEffect, } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import { useNavigation, useFocusEffect} from '@react-navigation/native';
import Firebase from '../../../components/Firebase';

import Card from '../../../components/Card';
import TextButton from '../../../components/TextButton';
import IconButton from '../../../components/IconButton';
import NewSession from '../../../components/NewSession';

export default function App() {

  const [index, setIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [sessionPromptVisible, setSessionPromptVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setCards([]);
    setSessionPromptVisible(true);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setCards([]);
      setSessionPromptVisible(true);
    }, [])
  );

  let prevIndex = index ? index - 1 : 0;
  if (prevIndex <= 0) {
    prevIndex = cards.length - 1;
  }

  function answerDialog() {
    Alert.alert(
      'Guessed Correct?',
      message='correct solution: \n' + cards[index].back_text,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ],
      { cancelable: false });
  }

  content = 
    <View style={styles.noCards}>
      <Text style={{color: '#4a4a8f', fontWeight: '600', fontSize: 34}} onPress={() => setSessionPromptVisible(true)}>Start a Session</Text>
    </View>;
  if (cards.length > 0) {
    const card = cards[index]; // This line should be here
    content = <Card front_text={card.front_text} back_text={card.back_text} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <NewSession 
        visible={sessionPromptVisible} 
        setVisibility={setSessionPromptVisible}
        onCancel={() => setSessionPromptVisible(false)} 
        onStart={setCards} 
      />
      <View style={styles.topNavigationContainer}>
        <Text style={styles.front_text}>learn</Text>
        <IconButton onPress={() => navigation.openDrawer()} style={styles.pressableIconOpenDrawer} iconName='menu' />
      </View>
      <View style={styles.cardDisplayContainer}>
        {content}
      </View>
      
      <View style={styles.cardNavigationContainer}>    
      {cards.length > 1 ? <IconButton iconName={'skip-previous'} onPress={() => setIndex(prevIndex)} style={[styles.pressableIconPreviousCard]} /> : null}
      {cards.length > 0 ? <TextButton text={'Answer'} onPress={() => answerDialog()} /> : null}
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