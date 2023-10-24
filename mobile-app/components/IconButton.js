import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, Pressable, View, StyleSheet } from "react-native";

/**
 * @description Supports MaterialIcons, also see https://icons.expo.fyi/Index
 */
export default function IconButton({
    onPress, style, iconName = 'note-add',iconSize = 30, iconColor = '#4a4a8f',
    left = false
}) {
    return (
        <Pressable style={style} onPress={onPress}>
            <MaterialIcons name={iconName} size={iconSize} color={iconColor} />
        </Pressable>
    )
}