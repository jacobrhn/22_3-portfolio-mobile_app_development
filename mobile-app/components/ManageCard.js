import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

export default function ManageCardListItem({card, onPress }) {
  return (
    <View style={{borderWidth: '1px', borderColor: 'black', marginBottom:5}}>
      <TouchableOpacity
        onPress={() => onPress(card)}
      >
        <Text>{card.front_text}</Text>
        <Text>{card.back_text}</Text>
      </TouchableOpacity>
        
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