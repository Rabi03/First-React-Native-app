import React from 'react'
import { StyleSheet,View } from 'react-native'
import {MaterialCommunityIcons } from "@expo/vector-icons";
export default function Icon({
    name,
    size=50,
    backgroundColor,
    iconColor
}) {
    return (
        <View style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor,
            justifyContent: 'center',
            alignItems:'center'
        }}>
            <MaterialCommunityIcons 
                name={name}
                size={size * 0.5}
                color={iconColor}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
