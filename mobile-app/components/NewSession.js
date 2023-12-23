
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import{ Modal, StyleSheet, TextInput, Platform, KeyboardAvoidingView, SafeAreaView, View} from 'react-native'

import TextButton from './TextButton';
import IconButton from './IconButton';
import Firebase from './Firebase';
import CategorySelector from './CategorySelector';
import InputLabel from './InputLabel';

// TODO: now, in initiol loading ther is no activity indicator

export default function NewSession({visible, setVisibility, onCancel, onStart}) {
    const [numberOfCards, setNumberOfCards] = useState("");
    const [selectedCards, setSelectedCards] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [availableCards, setAvailableCards] = useState([]);
    const [availableCategories, setAvailableCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (visible) {
            setLoading(true); 
            Firebase.getCards().then(cards => {
                setAvailableCards(cards);
                setNumberOfCards(cards.length.toString());
                setAvailableCategories(uniqueCategories(cards));
                setLoading(false);
                if (cards.length === 0) {
                    noCardsAvailable();
                    cancelSessionPrompt();
                }
            })
            .catch(error => {
                console.log(error);
                onCancel();
            });
        }
    }, [visible]);  

    useEffect(() => {
        let filteredCards = availableCards.filter(card => 
            card.category.some(category => selectedCategories.includes(category))
        );
        setSelectedCards(filteredCards);
    }, [selectedCategories]);

    useEffect(() => {
        if (selectedCategories.length > 0) {
            setNumberOfCards(selectedCards.length.toString());
        } else {
            setNumberOfCards(availableCards.length.toString());
            setSelectedCards(availableCards)
        }
    }, [selectedCategories, selectedCards, availableCards]);

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true); 
            Firebase.getCards().then(cards => {
                setAvailableCards(cards);
                setNumberOfCards(cards.length.toString());
                setAvailableCategories(uniqueCategories);
                setLoading(false);
            }
            )
            .catch(error => {
                onCancel();
                alert(error);
            })
        }, [])
    );

    function noCardsAvailable() {
        alert('No cards available\nPlease add cards to your collection in the "Manage" tab');
    }

    function tooManyCards() {
        alert('Too many cards\nPlease select a smaller number of cards');
    }

    function cancelSessionPrompt() {
        setNumberOfCards("");
        setSelectedCategories([]);
        setAvailableCategories([]);
        setAvailableCards([]);
        onCancel();
    }

    function onStartPress() {
        if (numberOfCards > selectedCards.length) {
            tooManyCards();
            setNumberOfCards(selectedCards.length.toString());
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
        return [...new Set(categories)];}

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
        let selectedCards_copy = [...selectedCards];
        let randomCards = [];
        for (let i = 0; i < numberOfCards; i++) {
            let randomIndex = Math.floor(Math.random() * selectedCards_copy.length);
            randomCards.push(selectedCards_copy[randomIndex]);
            selectedCards_copy = selectedCards_copy.filter((_, index) => index !== randomIndex);
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
                    {loading && availableCards.length === 0 ? (
                        <ActivityIndicator size="large" color="#4a4a8f" />
                    ) : (
                        <>
                            <IconButton onPress={cancelSessionPrompt} style={styles.pressableIconBack} iconName='cancel'/>
                            {loading ? (
                                <InputLabel label="No cards available" />
                            ) : (
                                <>
                                <InputLabel label="Categories:" />
                                <View style={styles.categoriesContainer}>
                                    <CategorySelector
                                        selectedCategories={selectedCategories} 
                                        availableCategories={availableCategories}
                                        setSelectedCategories={setSelectedCategories}
                                        setAvailableCategories={setAvailableCategories}
                                    />
                                </View>
                                <InputLabel label="Number of cards:" />
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
        width: '80%',

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