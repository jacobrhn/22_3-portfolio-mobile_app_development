import { useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';

import Card from '../../../components/Card';
import NewCard from '../../../components/NewCard';
import IconButton from '../../../components/IconButton';
import ManageCardsListItem from '../../../components/ManageCard';

export default function App() {

  const [index, setIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [showInputDialog, setShowInputDialog] = useState(false);
  const [editingCard, setEditingCard] = useState(false);
  const navigation = useNavigation();
  
  useEffect(() => {loadCards()}, []);

  let prevIndex = index - 1;
  if (prevIndex < 0) {
    prevIndex = cards.length - 1;
  }
  addCardtoData = (front_text, back_text, text_3, category) => {
      setShowInputDialog(false);
      let updatedCards = [...cards];
      if (editingCard) {
        const index = cards.indexOf(editingCard);
        updatedCards[index] = { front_text, back_text, text_3, category };
        setEditingCard(null);
      } else {
        updatedCards.push({ front_text, back_text, text_3, category });
        setIndex(updatedCards.length - 1); // set index to added card
        setEditingCard(null);
      }
      setCards(updatedCards); // store in state
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

  function onCardClick(card) { 
    setShowInputDialog(true);
    setEditingCard(card);
  }

  content = 
    <View style={styles.noCards}>
      <Text style={styles.noCardsText}>Add your first card by hitting the plus icon.</Text>

    </View>;
  if (cards.length > 0) {
    content = cards.map((card, i) => (
      <Card 
        key={i} 
        front_text={card.front_text} 
        back_text={card.back_text} 
        onPressEdit={() => editCard(i)}
        onPressDelete={() => deleteCard(i)}
      />
    ));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topNavigationContainer}>
        <Text style={styles.front_text}>manage</Text>
        <IconButton onPress={() => setShowInputDialog(true)} style={styles.pressableIconNewCard} />
        {cards.length > 0 ? <IconButton onPress={() => deleteCard()} style={styles.pressableIconDeleteCard} iconName='delete'/> : null}
        <IconButton onPress={() => navigation.openDrawer()} style={styles.pressableIconOpenDrawer} iconName='menu' />
      </View>
      <View>
      <NewCard 
          visible={showInputDialog} 
          onCancel={() => {setShowInputDialog(false), setEditingCard(false)}} 
          onSave={addCardtoData} 
          editingCard={editingCard} />
      </View>
      <View style={styles.displayAllCardsContainer}>
        {cards.length > 0 ? (
          <FlatList
            data={cards}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
            <ManageCardsListItem card={item} onPress={onCardClick} />
            )}
          />
        ) : (
          <View style={styles.noCards}>
            <Text style={styles.noCardsText}>Add your first card by hitting the plus icon.</Text>
          </View>
        )}
      </View>
      <View style={styles.cardNavigationContainer}>
        {/* ... */}
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
  displayAllCardsContainer: {
    width: '100%',
    height: '80%',
  },
});