import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import Colors from '../config/Colors'
import defaultStyle from '../config/Style'

export default function AppTextInput({icon,width="100%",...otherProps}) {
    return (
        <View style={[styles.container,{width}]}>
            {icon && <MaterialCommunityIcons name={icon} size={25} color={Colors.medium} style={styles.icon} />}
            <TextInput
                placeholderTextColor={Colors.medium}
                style={[defaultStyle.text, { width}]} {...otherProps} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light,
        borderRadius: 25,
        flexDirection: "row",
        width:"100%",
        padding: 15,
        marginVertical:10
    },
    icon: {
      marginRight:10   
    },
})
