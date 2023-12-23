import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc , doc , setDoc} from 'firebase/firestore';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import { getFirestore } from "firebase/firestore";
// import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {


    apiKey: "AIzaSyDg8gPBTE7WIagKyrW-WYUx-uw7c_ByZgo",
    authDomain: "rnapp-learnigcards.firebaseapp.com",
    databaseURL: 'https://rnapp-learnigcards.firebaseio.com',
    projectId: 'rnapp-learnigcards',
    storageBucket: 'rnapp-learnigcards.appspot.com',
    messagingSenderId: '438738784563',
    appId: '1:438738784563:web:86170e5c102a42f3a8ee46',
    measurementId: 'G-measurement-id',
};

export default class Firebase{
    static db;

    static init(){
        const app = initializeApp(firebaseConfig);
        this.db = getFirestore(app);
    }

    static async getCards(){
        let cards = [];
        const queryStapshot = await getDocs(collection(this.db, "cards"));
        queryStapshot.forEach((doc) => {
            cards.push({
                id: doc.id,
                front_text: doc.data().front_text,
                back_text: doc.data().back_text,
                text_3: doc.data().text_3,
                category: doc.data().category,
                archived: doc.data().archived,
            });
        });
        // console.log("Firebase.getCards(): \n", cards, "\n------------------")
        return cards;
    }

    static async saveCard(front_text, back_text, text_3, category, archived){
        const docRef = await addDoc(collection(this.db, "cards"), {
            front_text,
            back_text,
            text_3,
            category,
            archived,
        })
        return docRef.id;
    }
    static async deleteCard(id){
        await deleteDoc(doc(this.db, "cards", id));
    }

    static async updateCard(id, front_text, back_text, text_3, category, archived){
        await setDoc(doc(this.db, "cards", id), {
            front_text,
            back_text,
            text_3,
            category,
            archived,
        });
    }
}
