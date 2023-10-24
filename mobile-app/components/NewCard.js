import { useState } from 'react'
import{ Modal,
        StyleSheet,
        TextInput,
        Platform,
        KeyboardAvoidingView,
        SafeAreaView
    } from 'react-native'
import TextButton from './TextButton';
import IconButton from './IconButton';

export default function NewCard({visible, onCancel, onSave}) {
    const [inputText1, setInputText1] = useState(null);
    const [inputText2, setInputText2] = useState(null);
    const inputText3 = 'text3'; // to be implemented
    const inputCategory = 'category1'; // to be implemented
    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onCancel}>
            <SafeAreaView flex={1} width={'100%'}>
                <KeyboardAvoidingView 
                    style={styles.inputContainer}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <IconButton onPress={onCancel} style={styles.pressableIconBack} iconName='cancel'/>
                    <TextInput 
                        style={[styles.inputText, styles.inputText1]} 
                        placeholder='text1'
                        multiline={true}
                        returnKeyType='next'
                        onChangeText={setInputText1}
                    />
                    <TextInput 
                        style={styles.inputText}
                        placeholder='text2'
                        returnKeyType= 'done'
                        onChangeText={setInputText2}
                        onSubmitEditing={() => {onSave(inputText1, inputText2, inputText3, inputCategory)}}
                    />
                    {/**
                     *  // TODO: add text3 and category 
                     */}
                    <TextButton text='Cancel' onPress={() => {onCancel()}} pale={true}/>
                    <TextButton 
                        text='Save' 
                        onPress={() => {onSave(inputText1, inputText2, inputText3, inputCategory)}}
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