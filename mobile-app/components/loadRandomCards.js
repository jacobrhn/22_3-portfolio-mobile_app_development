import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function loadRandomCards( setCards, numberOfCards = 4 ) {
    let quotesFromDb = await AsyncStorage.getItem('CARDS'); 
    if (quotesFromDb) {
      let cards = JSON.parse(quotesFromDb);
      let randomCards = [];
      for (let i = 0; i < numberOfCards; i++) {
        let randomIndex = Math.floor(Math.random() * cards.length);
        randomCards.push(cards[randomIndex]);
      }
      setCards(randomCards);
      console.log(randomCards);
    }
  }