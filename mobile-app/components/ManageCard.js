import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

export default function ManageCardListItem({card, onPress }) {
  return (
    <View style={styles.listItem}>
      <TouchableOpacity
        onPress={() => onPress(card)}
      >
        <Text style={styles.front_text}>{card.front_text.length > 80 ? card.front_text.substring(0, 80) + ' ...' : card.front_text}</Text>
        <Text style={styles.back_text}>{card.back_text.length > 18 ? card.back_text.substring(0, 18) + ' ...' : card.back_text}</Text>
      </TouchableOpacity>
        
      </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  front_text: {
    fontSize: 18,
    textAlign: 'center',
  },
  back_text: {
    fontStyle: 'italic',
    color: 'gray',
    textAlign: 'center',
  }
});