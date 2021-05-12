import React from "react";
import { Text, StyleSheet} from "react-native";
import defaultStyle from '../config/Style'
function AppText({ children, style,...otherProps }) {
  return <Text style={[defaultStyle.text, style]} {...otherProps}>{children}</Text>;
}

const styles = StyleSheet.create({
});

export default AppText;
