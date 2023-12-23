import { useState, useEffect} from 'react';
import{ Modal, StyleSheet, TextInput, Platform, KeyboardAvoidingView, SafeAreaView, Alert, View, Text, ActivityIndicator} from 'react-native'
import TextButton from './TextButton';
import IconButton from './IconButton';
import Firebase from './Firebase';
import CategorySelector from './CategorySelector';

export default function NewCard({visible, onCancel, onSave, editingCard, cards, setCards }) {
    const [inputText1, setInputText1] = useState("");
    const [inputText2, setInputText2] = useState("");
    const [inputText3, setInputText3] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [availableCategories, setAvailableCategories] = useState([]);
    const [inputArchived, setInputArchived] = useState(false); // to be implemented
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if (editingCard) {
            setInputText1(editingCard.front_text);
            setInputText2(editingCard.back_text);
            setInputText3(editingCard.text_3);
            setSelectedCategories(editingCard.category);
            setAvailableCategories(getUniqueCategories(cards, editingCard.category).sort());
        }
    }, [editingCard]);

    function getUniqueCategories(cards, selectedCategories) {
        let allCategories = [];
        cards.forEach(card => {
            allCategories = [...allCategories, ...card.category];
        });
        const uniqueCategories = [...new Set(allCategories)];
        return uniqueCategories.filter(category => !selectedCategories.includes(category));
    }
    
    function addCategory(category) {
        if (category && !selectedCategories.includes(category) && !availableCategories.includes(category)) {
            setSelectedCategories([...selectedCategories, category]);
        }
    }

    function inputNewCategory() {

        Alert.prompt(
            'New Category',
            'Enter new category name',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: (category) => addCategory(category.trim().toLowerCase()),
                },
            ],
            'plain-text',
            '',
            'default'
        );
        
    }

    function cancelEditing() {
        onCancel();
        setInputText1("");
        setInputText2("");
        setInputText3("");
        setSelectedCategories([]);
        setAvailableCategories([]);
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
        setLoading(true);
        onSave(trimmedText1, trimmedText2, trimmedText3, selectedCategories, inputArchived);
        setLoading(false);
        setInputText1("");
        setInputText2("");
        setInputText3("");
        setSelectedCategories([]);
        setAvailableCategories([]);
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
                {loading ? (
                    <ActivityIndicator size="large" color="#4a4a8f" />
                    ) : (
                        <>

                <IconButton onPress={cancelEditing} style={styles.pressableIconBack} iconName='cancel'/>
                <Text style={styles.inputLabel}>Front-Side Text:</Text>
                <TextInput 
                    style={[styles.inputText, styles.inputText1]} 
                    placeholder='Input the question here...'
                    multiline={true}
                    returnKeyType='next'
                    onChangeText={setInputText1}
                    value={inputText1}
                    maxLength={256} // Limit maximum length to 256 characters
                />
                <Text style={styles.inputLabel}>Back-Side Text:</Text>
                <TextInput 
                    style={styles.inputText}
                    placeholder='Input the answer here...'
                    returnKeyType= 'done'
                    onChangeText={setInputText2}
                    onSubmitEditing={() => {saveCard()}}
                    value={inputText2}
                />
                <Text style={styles.inputLabel}>Categories:</Text>
                <View style={{width:'80%'}}>
                <CategorySelector 
                    buttonText='New ...'
                    buttonAction={inputNewCategory} 
                    selectedCategories={selectedCategories} 
                    availableCategories={availableCategories}
                    setSelectedCategories={setSelectedCategories}
                    setAvailableCategories={setAvailableCategories}
                />
                </View>
                {editingCard ? <TextButton text='Delete' onPress={() => {deleteCard()}} pale={true}/> : null}
                <TextButton 
                    text='Save' 
                    onPress={() => {saveCard()}}
                /> 
                </>
                )}
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
    inputLabel: {
        marginTop: 10,
        fontSize: 16,
        fontStyle: 'italic',
        color: '#333',
        marginBottom: 2,
        fontWeight: '400',
        alignSelf: 'flex-start',
        marginLeft: '10%',
    },
})