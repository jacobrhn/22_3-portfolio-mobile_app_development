import { setShowInputDialog, setCards, setIndex, saveCards} from '../app/(drawer)/learn/index.js';

addCardtoData = (front_text, back_text, text_3, category) => {
    setShowInputDialog(false);
    const updatedCards = [
      ...cards, 
      {front_text, back_text, text_3, category}
    ];
    setCards(updatedCards); // store in state
    setIndex(updatedCards.length - 1); // set index to added card
    saveCards(updatedCards); // store in db
    console.log('addCardtoData 0', updatedCards);
  }