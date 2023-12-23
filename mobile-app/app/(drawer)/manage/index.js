import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Alert, TouchableOpacity , ScrollView} from 'react-native';
import { useNavigation, useFocusEffect} from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

import Card from '../../../components/Card';
import NewCard from '../../../components/NewCard';
import IconButton from '../../../components/IconButton';
import ManageCardsListItem from '../../../components/ManageCard';
import Firebase from '../../../components/Firebase';
import InputLabel from '../../../components/InputLabel';

export default function App() {

  const [cards, setCards] = useState([]);
  const [showInputDialog, setShowInputDialog] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const navigation = useNavigation();
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilterCategories, setSelectedFilterCategories] = useState([]);
  const [availableFilterCategories, setAvailableFilterCategories] = useState([]);

  useEffect(() => {
    setAvailableFilterCategories(getUniqueCategories(cards));
  }, [cards]);

  useFocusEffect(
    React.useCallback(() => {
      setEditingCard(null);
      Firebase.init();
      loadCards();
    }, [])
  );

  addCardtoData = (front_text, back_text, text_3, category, archived) => {
      let updatedCards = [...cards];
      if (editingCard) {
        const index = cards.indexOf(editingCard);
        const id = editingCard.id;
        updatedCards[index] = {id, front_text, back_text, text_3, category, archived };
        Firebase.updateCard(id, front_text, back_text, text_3, category, archived);
      } else {
        updatedCards.push({ front_text, back_text, text_3, category, archived});
        saveCards(front_text, back_text, text_3, category, archived, updatedCards);
      };
      setEditingCard(null)
      setShowInputDialog(false);
      setCards(updatedCards);
  }

  async function saveCards(front_text, back_text, text_3, category, archived, updatedCards) {
    setEditingCard(null);
    const id = await Firebase.saveCard(front_text, back_text, text_3, category, archived, updatedCards);
    updatedCards[updatedCards.length - 1].id = id;
  }

  async function loadCards() {
    const cards = await Firebase.getCards();
    setCards(cards);
  }

  function onCardClick(card) { 
    setEditingCard(card);
    setShowInputDialog(true);
  }

  function clearFilters() {
    setSelectedFilterCategories([]);
    setAvailableFilterCategories(getUniqueCategories(cards));
  }



  function getUniqueCategories(cards) {
    let allCategories = [];
    cards.forEach(card => {
        allCategories = [...allCategories, ...card.category];
    });
    const uniqueCategories = [...new Set(allCategories)];
    return uniqueCategories;
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
        <IconButton onPress={() => {setEditingCard(null); setShowInputDialog(true)}} style={styles.pressableIconNewCard} />
        <IconButton onPress={() => navigation.openDrawer()} style={styles.pressableIconOpenDrawer} iconName='menu' />
      </View>
      <View>
      <NewCard 
        visible={showInputDialog} 
        onCancel={() => {setEditingCard(null), setShowInputDialog(false)}} 
        onSave={addCardtoData} 
        editingCard={editingCard}
        cards={cards}
        setCards={setCards} 
        saveCards={saveCards} 
        // TODO adjust for Firebase
        // database={database}
      />
      </View>
      <View style={styles.displayAllCardsContainer}>
        {cards.length > 0 ? (
          <>
          <View style={styles.filterExpandable}>
            <TouchableOpacity onPress={() => setShowFilter(!showFilter)}>
              <InputLabel label='Expand Filter' styles={{marginLeft: "2%"}}/>
            </TouchableOpacity>
            {showFilter && (
              <>
                <View style={styles.filterContainer}>
                <View>
                  <CategorySelector 
                  buttonText='Clear'
                  buttonAction={clearFilters} 
                  selectedCategories={selectedFilterCategories} 
                  availableCategories={availableFilterCategories}
                  setSelectedCategories={setSelectedFilterCategories}
                  setAvailableCategories={setAvailableFilterCategories}
                />
                </View>
                </View>
              </>
          )}
          </View>

          <FlatList
            data={selectedFilterCategories.length > 0 ? cards.filter(card => card.category.some(c => selectedFilterCategories.includes(c))) : cards}
            style={{ width: '95%'}}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
            <ManageCardsListItem card={item} onPress={onCardClick} />
            )}
          />
          
          </>
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
    alignItems: 'center',
  },
  filterExpandable:{
    width: '95%',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  filterContainer: {
    width: '100%',
},
flatList: {
    marginBottom: 10,
},
});