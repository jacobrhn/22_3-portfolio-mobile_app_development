import { Pressable, StyleSheet, Text } from "react-native";

export default function TextButton({text, onPress, style, textStyle, pale = false}) {
    if (pale) {
        return (
            <Pressable style={[styles.button, {backgroundColor: 'transparent', borderWidth: 2}, style]} onPress={onPress}>
                <Text style={[styles.text, {color: '#4a4a8f'}, textStyle]}>{text}</Text>
            </Pressable>
        )
    } else return (
        <Pressable style={[styles.button, style]} onPress={onPress}>
            <Text style={[styles.text, textStyle]}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4a4a8f',
        borderWidth: 2,
        borderColor: '#4a4a8f',
        padding: 10,
        borderRadius: 9,
        margin: 5,
        alignItems: 'center',
        width: 200,
        top: 8,
      },
      text: {
        fontSize: 20,
        color: 'white',        
      },
})