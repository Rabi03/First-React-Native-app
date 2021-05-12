import React from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import constant from 'expo-constants'

export default function Screen(props) {
    return (
        <SafeAreaView style={[styles.screen,props.style]}>
            <View style={[props.style, styles.view]}>{props.children}</View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: constant.statusBarHeight+20,
        flex:1
    },
    view: {
        flex:1
    }
})
