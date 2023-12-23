import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Card from '../../../components/Card';
import TextButton from '../../../components/TextButton';
import IconButton from '../../../components/IconButton';
import NewSession from '../../../components/NewSession';

export default function App() {

  const [index, setIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [sessionPromptVisible, setSessionPromptVisible] = useState(false);
  const [cardsAnsweredCorrect, setCardsAnsweredCorrect] = useState([]);
  const [cardsAnsweredIncorrect, setCardsAnsweredIncorrect] = useState([]);
  const navigation = useNavigation();

  let prevIndex = index ? index - 1 : 0;
  if (prevIndex <= 0) {
    prevIndex = cards.length - 1;
  }

  function answerDialog() {
    Alert.alert(
      'Guessed Correct?',
      message='correct solution: \n' + cards[index].back_text,
      [
        { text: 'correct', onPress: () => correctAnswer() },
        { text: 'incorrect', onPress: () => incorrectAnswer() },
      ],
      { cancelable: false });
  }

  function correctAnswer() {
    console.log('correct answer');
    const newCards = cards.filter((card, i) => i !== index);
    const answeredCard = cards[index];
    setCards(newCards);
    setCardsAnsweredCorrect(prevCards => [...prevCards, answeredCard]);
    setIndex(0);
    }
  
  function incorrectAnswer() {
    console.log('incorrect answer');
    const newCards = cards.filter((card, i) => i !== index);
    const answeredCard = cards[index];
    setCards(newCards);
    setCardsAnsweredIncorrect(prevCards => [...prevCards, answeredCard]);
    setIndex(0);
  }

  function startSession(newCards) {
    setCards(newCards);
    setCardsAnsweredCorrect([]);
    setCardsAnsweredIncorrect([]);
}

  let content = 
    <View style={styles.noCards}>
      <View style={styles.latestScoreContainer}>
        <Text style={styles.scoreHeading} >Latest Score: </Text>
        <Text style={styles.scoreText}>Answered correct: {cardsAnsweredCorrect.length}</Text>
        <Text style={styles.scoreText}>Answered incorrect: {cardsAnsweredIncorrect.length}</Text>
      </View>
      <TextButton text={'Start a Session'} onPress={() => setSessionPromptVisible(true)} style={styles.startSessionButton}/>
    </View>;

  if (cards.length > 0) {
    const card = cards[index];
    content = <Card front_text={card.front_text} back_text={card.back_text} />;
  }

  return (
    <>
    <SafeAreaView style={styles.container}>
      <NewSession 
        visible={sessionPromptVisible} 
        setVisibility={setSessionPromptVisible}
        onCancel={() => setSessionPromptVisible(false)} 
        onStart={startSession} 
      />
      <View style={styles.topNavigationContainer}>
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
    
    </SafeAreaView>
    <StatusBar style='auto'/>
    </>
    
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
    alignItems: 'center',
  },
  noCardsText: {
    fontSize: 30,
    fontWeight: '300',
    textAlign: 'center',
    color: 'gray',
  },
  latestScoreContainer: {
    marginBottom: 100,
  },
  scoreHeading: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: '#4a4a8f',
  },
  scoreText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '300',
    color: '#4a4a8f',
  },
  startSessionButton: {
    marginTop: 20,
  },
});