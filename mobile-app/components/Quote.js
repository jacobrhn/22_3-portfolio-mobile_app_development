import { Text } from "react-native";

export default function Quote({ quote }) {
  return (
    <>
      <Text>{quote.text}</Text>
      <Text>{quote.text_2}</Text>
    </>
  );
}