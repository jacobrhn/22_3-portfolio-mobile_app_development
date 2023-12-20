import { Text , StyleSheet, View} from "react-native";

export default function Card ({ front_text, back_text} ) {
  return (
    <View style={styles.container}>
      <Text style={styles.front_text}>{front_text}</Text>
    </View>
    
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        margin: 20,
        paddingHorizontal: 10,
        justifyContent: 'center',
        width: '90%',
        height: '50%'
    },
    front_text: {
        fontSize: 38,
        fontStyle: 'italic',
        marginBottom: 10,
        textAlign: 'center',
    },
    back_text: {
        fontSize: 24,
        textAlign: "right"
    }
});