import React from 'react';
import { View, ScrollView, StyleSheet} from 'react-native';
import TextButton from './TextButton';

export default CategorySelector = ({ buttonText = null, buttonAction = null, selectedCategories, availableCategories, setSelectedCategories, setAvailableCategories }) => {

    function toggleCategory(category) {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
            if (!availableCategories.includes(category)) {
                setAvailableCategories([...availableCategories, category].sort());
            }
        } else {
            setSelectedCategories([...selectedCategories, category].sort());
            setAvailableCategories(availableCategories.filter(c => c !== category).sort());
        }
    }

    return (
        <View style={styles.categoriesContainer}>
            <ScrollView style={styles.categoriesScrollable} horizontal={true}>
                {buttonAction && buttonText ?(
                        <TextButton 
                        text={buttonText}
                        onPress={() => buttonAction()} 
                        pale={true}
                        style={styles.categoryNew}
                        textStyle={{textDecorationLine: 'underline'}}
                    />
                ) : null}

                {selectedCategories.map((category, index) => (
                    <TextButton 
                        key={index} 
                        text={category} 
                        onPress={() => toggleCategory(category)} 
                        pale={false}
                        style={styles.categorySelected}
                    />
                ))}
                {availableCategories.map((category, index) => (
                    <TextButton 
                        key={index} 
                        text={category} 
                        onPress={() => toggleCategory(category)} 
                        pale={true}
                        style={styles.categoryUnselected}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
    },
    categoryNew: {
        borderWidth:0,
        padding: 5,
        margin: 2,
        width: 'auto',
        height: 40,
    },
    categoryUnselected: {
        borderWidth:1,
        padding: 5,
        margin: 2,
        width: 'auto',
        height: 40,
    },
    categorySelected: {
        borderWidth:1,
        padding: 5,
        margin: 2,
        width: 'auto',
        height: 40,
    },
    categoriesScrollable: {
        height: 100,
    }
})


What is the best method to develop a multi-plattform mobile app?112345