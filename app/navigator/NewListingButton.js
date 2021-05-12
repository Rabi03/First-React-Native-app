import React from 'react'
import { StyleSheet, View } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'

import Colors from '../config/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function NewListingButton({onPress}) {
    return (
        <TouchableOpacity  onPress={onPress}>
        <View style={styles.container}>
            <MaterialCommunityIcons 
                name='plus-circle'
                color='white'
                size={40}
            />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        backgroundColor: Colors.primary,
        borderColor: 'white',
        borderWidth:18,
        borderRadius: 40,
        bottom:15,
        width: 80,
        justifyContent:'center',
        height: 80,
    }
})
