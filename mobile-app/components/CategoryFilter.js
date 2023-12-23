import { View , Button} from "react-native";
import TextButton from "./TextButton";

export default function CategoryFilter({ categories, onCategorySelect, style}) {
    return (
        <View>
            {categories.map((category, index) => (
                <>
                    <Button key={index} title={category} onPress={() => onCategorySelect(category)} />
                </>
            ))}
            <Button title="All" onPress={() => onCategorySelect('All')} pale={true}/>
        </View>
    );
}