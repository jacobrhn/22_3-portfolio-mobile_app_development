import { useState, useEffect} from 'react';
import{ Modal,
        StyleSheet,
        TextInput,
        Platform,
        KeyboardAvoidingView,
        SafeAreaView
    } from 'react-native'
import TextButton from './TextButton';
import IconButton from './IconButton';

export default function NewCard({visible, onCancel, onSave, editingCard}) {
    const [front_text, setFrontText] = useState(editingCard ? editingCard.front_text : '');
    const [back_text, setBackText] = useState(editingCard ? editingCard.back_text : '');
    const [inputText1, setInputText1] = useState(null);
    const [inputText2, setInputText2] = useState(null);
    const inputText3 = 'text3'; // to be implemented
    const inputCategory = 'category1'; // to be implemented

    useEffect(() => {
        if (editingCard) {
            setInputText1(editingCard.front_text);
            setInputText2(editingCard.back_text);
          // ...
        } else {
            setInputText1('');
            setInputText2('');
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
        onSave(trimmedText1, trimmedText2, trimmedText3, inputCategory);
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
                    />
                    <TextInput 
                        style={styles.inputText}
                        placeholder='text2'
                        returnKeyType= 'done'
                        onChangeText={setInputText2}
                        onSubmitEditing={() => {saveCard()}}
                    />
                    {/**
                     *  // TODO: add text3 and category 
                     */}
                    <TextButton text='Cancel' onPress={() => {cancelEditing()}} pale={true}/>
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