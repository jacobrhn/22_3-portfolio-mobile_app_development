import { Text , StyleSheet, View} from "react-native";

export default function Card ({ text, text_2} ) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.text_2}>&mdash; {text_2}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        width: '100%'
    },
    text: {
        fontSize: 38,
        fontStyle: 'italic',
        marginBottom: 10,
        textAlign: 'center',
    },
    text_2: {
        fontSize: 24,
        textAlign: "right"
    }
});