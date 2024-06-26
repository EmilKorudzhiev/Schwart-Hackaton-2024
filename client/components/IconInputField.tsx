import { StyleProp, StyleSheet, TextInput, TextStyle } from "react-native";
import { View } from "./Themed";

interface IconInputFieldProps {
    value?: string,
    onChangeText?: (text: string) => void,
    placeholder?: string,
    style?: StyleProp<TextStyle>,
    leftSide?: React.JSX.Element,
    rightSide?: React.JSX.Element,
    secureTextEntry?: boolean
}


export default function IconInputField({value, onChangeText, placeholder, style, leftSide, rightSide, secureTextEntry}: IconInputFieldProps) {
    return (
        <View style={styles.container}>
            {leftSide}
            <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            style={style}
            secureTextEntry={secureTextEntry}
            />
            {rightSide}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row"
    }
});