import Firebase from "./Firebase"
import {Alert } from 'react-native';

export default async function loadRandomCards(setCards, numberOfCards) {
  const cardsFromDb = await Firebase.getCards();

  if (cardsFromDb.length > 0) {
    let randomCards = [];
    for (let i = 0; i < numberOfCards; i++) {
      let randomIndex = Math.floor(Math.random() * cardsFromDb.length);
      randomCards.push(cardsFromDb[randomIndex]);
      cardsFromDb.splice(randomIndex, 1); // Remove selected card from the cards array
    }
    setCards(randomCards);
  } else {
    Alert.alert(
      "No cards found",
      "Please add some cards to your database",
      [{ text: "OK" }],
      { cancelable: false }
    );
  }
}

