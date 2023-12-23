import { View , Button, StyleSheet} from "react-native";
import TextButton from "./TextButton";

export default function CategoryFilter({ categories, onCategorySelect, style}) {
    return (
        <View style={styles.categoriesContainer}>
            {categories.map((category, index) => (
                <>
                    <TextButton key={index} title={category} onPress={() => onCategorySelect(category)} style={{}}/>
                </>
            ))}
            <Button title="All" onPress={() => onCategorySelect('All')} pale={true}/>
        </View>
    );
}

const styles = StyleSheet.create({
    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '80%',
    },
});
