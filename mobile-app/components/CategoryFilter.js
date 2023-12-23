import { View , Button} from "react-native";

export default function CategoryFilter({ categories, onCategorySelect }) {
    return (
        <View>
            {categories.map((category, index) => (
                <Button key={index} title={category} onPress={() => onCategorySelect(category)} />
            ))}
            <Button title="No Category" onPress={() => onCategorySelect('No Category')} />
        </View>
    );
}