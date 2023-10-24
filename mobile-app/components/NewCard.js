import{ Modal,
        Pressable,
        StyleSheet,
        Text,
        TextInput,
        Platform,
        KeyboardAvoidingView
    } from 'react-native'

export default function NewCard({visible, onCancel}) {
    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onCancel}>
            <KeyboardAvoidingView 
                style={styles.inputContainer}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <TextInput 
                    style={[styles.inputText, styles.inputText1]} 
                    placeholder='text1'
                    multiline={true}
                />
                <TextInput style={styles.inputText} placeholder='text2'/>
                <Pressable onPress={() => {onCancel()}}>
                    <Text style={{fontSize:20}}>Cancel</Text>
                </Pressable>
            </KeyboardAvoidingView>
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
        height: 100,
      },
})