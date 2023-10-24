import{ Modal,
        Pressable,
        StyleSheet,
        Text,
        TextInput,
        View,
    } from 'react-native'

export default function NewCard({visible, onCancel}) {
    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onCancel}>
            <View style={styles.inputContainer}>
                <TextInput style={styles.inputText} placeholder='text1'/>
                <TextInput style={styles.inputText} placeholder='text2'/>
                <Pressable onPress={() => {onCancel()}}>
                    <Text style={{fontSize:20}}>Cancel</Text>
                </Pressable>
            </View>
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
        borderBlockColor: '#4a4a8f',
        borderRadius: 5,
        width: '80%',
        fontSize: 20,
        marginBottom: 10,
        padding: 10,
      },
})