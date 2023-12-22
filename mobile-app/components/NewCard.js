import { useState, useEffect} from 'react';
import{ Modal, StyleSheet, TextInput, Platform, KeyboardAvoidingView, SafeAreaView, Alert, View, ScrollView, Text} from 'react-native'
import TextButton from './TextButton';
import IconButton from './IconButton';
import Firebase from './Firebase';

export default function NewCard({visible, onCancel, onSave, editingCard, cards, setCards }) {
    const [inputText1, setInputText1] = useState("");
    const [inputText2, setInputText2] = useState("");
    const [inputText3, setInputText3] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [availableCategories, setAvailableCategories] = useState([]);
    const [inputArchived, setInputArchived] = useState(false); // to be implemented

    
    useEffect(() => {
        if (editingCard) {
            setInputText1(editingCard.front_text);
            setInputText2(editingCard.back_text);
            setInputText3(editingCard.text_3);
            setSelectedCategories(editingCard.category);
        }
    }, [editingCard]);

    function toggleCategory(category) {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
            if (!availableCategories.includes(category)) {
                setAvailableCategories([...availableCategories, category]);
            }
        } else {
            setSelectedCategories([...selectedCategories, category]);
            setAvailableCategories(availableCategories.filter(c => c !== category));
        }
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
                    onPress: (category) => addCategory(category),
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
        onSave(trimmedText1, trimmedText2, trimmedText3, selectedCategories, inputArchived);
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
                    <IconButton onPress={cancelEditing} style={styles.pressableIconBack} iconName='cancel'/>
                    <Text style={styles.inputLabel}>Front-Side Text:</Text>
                    <TextInput 
                        style={[styles.inputText, styles.inputText1]} 
                        placeholder='front_text'
                        multiline={true}
                        returnKeyType='next'
                        onChangeText={setInputText1}
                        value={inputText1}
                        maxLength={256} // Limit maximum length to 256 characters
                    />
                    <Text style={styles.inputLabel}>Back-Side Text:</Text>
                    <TextInput 
                        style={styles.inputText}
                        placeholder='text2'
                        returnKeyType= 'done'
                        onChangeText={setInputText2}
                        onSubmitEditing={() => {saveCard()}}
                        value={inputText2}
                    />
                    <Text style={styles.inputLabel}>Categories:</Text>
                    <View style={styles.categoriesContainer}>
                        <ScrollView style={styles.categoriesScrollable} horizontal={true}>
                            <TextButton 
                            text="New ..." 
                            onPress={() => inputNewCategory()} 
                            pale={true}
                            style={styles.categoryNew}
                        />
                        {selectedCategories.map((category, index) => (
                            <TextButton 
                                key={index} 
                                text={category} 
                                onPress={() => toggleCategory(category)} 
                                pale={false}
                                style={styles.categorySelected}
                            />
                        ))}
                        {availableCategories.map((category, index) => (
                            <TextButton 
                                key={index} 
                                text={category} 
                                onPress={() => toggleCategory(category)} 
                                pale={true}
                                style={styles.categoryUnselected}
                            />
                        ))}
                        </ScrollView>

                    </View>
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
    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '80%',

    },
    categoryNew: {
        borderWidth:0,
        padding: 5,
        margin: 2,
        width: 'auto',
        height: 40,
    },
    categoryUnselected: {
        padding: 5,
        margin: 2,
        width: 'auto',
        height: 40,
    },
    categorySelected: {
        padding: 5,
        margin: 2,
        width: 'auto',
        height: 40,
    },
    categoriesScrollable: {
        height: 100,
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