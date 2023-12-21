import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function loadCards( setCards ) {
  let quotesFromDb = await AsyncStorage.getItem('CARDS'); 
  if (quotesFromDb) {
    setCards(JSON.parse(quotesFromDb));
    console.log("loadCards()", JSON.parse(quotesFromDb));
  }
}

