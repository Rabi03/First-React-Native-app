import React from 'react'
import { StyleSheet, View } from 'react-native'
import Colors from '../config/Colors'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
export default function ListItemDeleteAction({onPress}) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <MaterialCommunityIcons 
                name="trash-can"
                color='white'
                size={35}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.denger,
        width: 70,
        height:"100%",
        justifyContent: "center",
        alignItems:"center"
    }
})
