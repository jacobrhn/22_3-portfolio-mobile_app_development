import { Text, StyleSheet } from "react-native"

export default function InputLabel({label, inputText, setInputText, multiline, styles}) {
    return (
        <Text style={[Styles.inputLabel, styles]}>{label}</Text>
    )
}

const Styles = StyleSheet.create({
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