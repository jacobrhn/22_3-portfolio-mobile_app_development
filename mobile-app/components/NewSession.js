

  /**
   * @workspace in components/NewSession the following should be implemented: 
   * This Modal Starts a complex session of learning cards. 
   * The method will be called in useFocusEffect from learn/index.js or when a user manually start a ne session.
   * it will first load the cards from db. when it knows, that at least 2 cards are avialable. it will ask the user for the categories he wants to learn.
   * the categories available for selection are the categories of the cards that are loaded from db.
   * when we know how many cards are available for the selected categories, we will ask the user how many cards he wants to learn while the maximum is the number of cards available for the selected categories.
   * it should be implemented in a 
   */

import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import{ Modal, StyleSheet, TextInput, Platform, KeyboardAvoidingView, SafeAreaView, Alert, View, ScrollView, Text} from 'react-native'
import TextButton from './TextButton';
import IconButton from './IconButton';
import Firebase from './Firebase';

export default function NewSession({visible, setVisibility, onCancel, onStart}) {
    const [numberOfCards, setNumberOfCards] = useState("");
    const [selectedCards, setSelectedCards] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [avialableCards, setAvailableCards] = useState([]);
    const [availableCategories, setAvailableCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let filteredCards = avialableCards.filter(card => 
            card.category.some(category => selectedCategories.includes(category))
        );
        console.log("filteredCards: ", filteredCards);
        setSelectedCards(filteredCards);

    }, [selectedCategories]);

    useEffect(() => {
        if (selectedCategories.length > 0) {
            setNumberOfCards(selectedCards.length.toString());
        } else {
            setNumberOfCards(avialableCards.length.toString());
        }
    }, [selectedCategories, selectedCards, avialableCards]);

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            Firebase.getCards().then(cards => {
                setAvailableCards(cards);
                setNumberOfCards(cards.length.toString());
                setAvailableCategories(uniqueCategories(cards));
                setLoading(false);
            }
            );
        }, [])
    );

    function cancelSessionPrompt() {
        onCancel();
        setNumberOfCards("");
        setSelectedCategories([]);
        setAvailableCategories([]);
        setAvailableCards([]);
        setLoading(true);
    }

    function onStartPress() {
        if (numberOfCards === "" && selectedCategories.length === 0) {
            Alert.alert(
                "Error",
                "Please enter a number of cards or at least one category you want to learn",
                [
                    {
                        text: "OK",
                        onPress: () => console.log("OK Pressed"),
                    },
                ],
                { cancelable: false }
            );
            return;
        }
        
        const randomizedCards = randomCards();
        onStart(randomizedCards);
        setVisibility(false);
        setNumberOfCards("");
        setSelectedCategories([]);
        setAvailableCategories([]);
        setAvailableCards([]);
    }

    function uniqueCategories(cards) {
        let categories = [];
        cards.forEach(card => {
            categories.push(...card.category);
        });
        return [...new Set(categories)];
    }

    function toggleCategory(category) {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
            if (!availableCategories.includes(category)) {
                setAvailableCategories([...availableCategories, category].sort());
            }
        } else {
            setSelectedCategories([...selectedCategories, category]);
            setAvailableCategories(availableCategories.filter(c => c !== category).sort());
        }

    }

    function randomCards() {     
        let filteredCards = selectedCards.filter(card => selectedCategories.includes(card.category)); 
        setAvailableCards(filteredCards);
        let randomCards = [];
        for (let i = 0; i < numberOfCards; i++) {
        let randomIndex = Math.floor(Math.random() * selectedCards.length);
        randomCards.push(selectedCards[randomIndex]);
        selectedCards.splice(randomIndex, 1);
        }
        return randomCards;

      }
    
    return (
        <Modal visible={visible} animationType="slide" onRequestClose={cancelSessionPrompt}>
            <SafeAreaView flex={1} width={'100%'}>
                <KeyboardAvoidingView 
                    style={styles.inputContainer}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    {loading ? (
                        <ActivityIndicator size="large" color="#4a4a8f" />
                    ) : (
                        <>
                            <Text>{selectedCards.map(card => card.front_text).join(" ")}</Text>
                            <IconButton onPress={cancelSessionPrompt} style={styles.pressableIconBack} iconName='cancel'/>
                            {avialableCards.length === 0 ? (
                                <Text style={styles.inputLabel}>No cards available</Text>
                            ) : (
                                <>
                                <Text style={styles.inputLabel}>Categories:</Text>
                                <View style={styles.categoriesContainer}>
                                    <ScrollView style={styles.categoriesScrollable} horizontal={true}>
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
                                <Text style={styles.inputLabel}>number of cards:</Text>
                                <TextInput 
                                style={styles.inputText}
                                keyboardType='numeric'
                                onChangeText={setNumberOfCards}
                                value={numberOfCards}
                                maxLength={3}
                                />
                                <TextButton 
                                    text="Start" 
                                    onPress={() => {onStartPress()}} 
                                    pale={false}
                                />
                                </>
                            )}
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
    numberOfCards: {
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