import React from 'react';
import { Text, StyleSheet, Pressable, ButtonProps, StyleProp, TextStyle, ViewStyle } from "react-native";

interface ButtonProp extends ButtonProps {
  buttonStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}
export default function Button(props: ButtonProp) {
  const {onPress, title = 'Save', buttonStyle, textStyle} = props;
  return (
    <Pressable style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textTransform: 'capitalize',
  },
});
