import { useState, useEffect} from 'react';
import{ Modal, StyleSheet, TextInput, Platform, KeyboardAvoidingView, SafeAreaView, Alert } from 'react-native'
import TextButton from './TextButton';
import IconButton from './IconButton';
import Firebase from './Firebase';

export default function NewCard({visible, onCancel, onSave, editingCard, cards, setCards }) {
    const [inputText1, setInputText1] = useState("");
    const [inputText2, setInputText2] = useState("");
    const [inputText3, setInputText3] = useState("");
    const [inputCategory, setInputCategory] = useState(""); // to be implemented
    const [inputArchived, setInputArchived] = useState(false); // to be implemented

    useEffect(() => {
        if (editingCard) {
            setInputText1(editingCard.front_text);
            setInputText2(editingCard.back_text);
        }
    }, [editingCard]);

    function cancelEditing() {
        onCancel();
        setInputText1("");
        setInputText2("");
    }

    function saveCard() {
        const trimmedText1 = inputText1.trim();
        const trimmedText2 = inputText2.trim();
        const trimmedText3 = inputText3.trim();
        if (trimmedText1.length === 0 || trimmedText2.length === 0) {
            alert('Please enter text1 and text2');
            return;
        };
        if (trimmedText1.length > 256) {
            alert('Front text cannot exceed 256 characters');
            return;
        }
        if (trimmedText2.length > 64) {
            alert('Front text cannot exceed 64 characters');
            return;
        }
        onSave(trimmedText1, trimmedText2, trimmedText3, inputCategory, inputArchived);
        setInputText1("");
        setInputText2("");
    }

    function deleteCard() {
        Alert.alert('Delete Card','Do you realy want to delete "'+ editingCard.id + '"?', [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Delete', style: 'destructive', onPress: deleteCardFromData},
        ]);
      }

    function deleteCardFromData() {
        let updatedCards = [...cards];
        updatedCards.splice(cards.indexOf(editingCard), 1);
        setCards(updatedCards);
        Firebase.deleteCard(editingCard.id);
        cancelEditing();
    }
    
    return (
        <Modal visible={visible} animationType="slide" onRequestClose={cancelEditing}>
            <SafeAreaView flex={1} width={'100%'}>
                <KeyboardAvoidingView 
                    style={styles.inputContainer}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <IconButton onPress={cancelEditing} style={styles.pressableIconBack} iconName='cancel'/>
                    <TextInput 
                        style={[styles.inputText, styles.inputText1]} 
                        placeholder='front_text'
                        multiline={true}
                        returnKeyType='next'
                        onChangeText={setInputText1}
                        value={inputText1}
                        maxLength={256} // Limit maximum length to 256 characters
                    />
                    <TextInput 
                        style={styles.inputText}
                        placeholder='text2'
                        returnKeyType= 'done'
                        onChangeText={setInputText2}
                        onSubmitEditing={() => {saveCard()}}
                        value={inputText2}
                    />
                    {/**
                     *  // TODO: add text3 and category 
                     */}
                    {editingCard ? <TextButton text='Delete' onPress={() => {deleteCard()}} pale={true}/> : null}
                    <TextButton 
                        text='Save' 
                        onPress={() => {saveCard()}}
                    />
                </KeyboardAvoidingView>
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputText: {
        borderWidth: 1,
        borderColor: '#4a4a8f',
        borderRadius: 5,
        width: '80%',
        fontSize: 20,
        marginBottom: 10,
        padding: 10,
        textAlignVertical: 'top',
      },
      inputText1: {
        marginTop: 50,
        height: 150,
      },
      inputText2: {
      },
      pressableIconBack: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
      },
})