import React from 'react'
import  LottieView from 'lottie-react-native'
import { StyleSheet, View } from 'react-native'

export default function ActivityIndicator({ visible = false }) {
    if(!visible) return null
    return (
        <View style={styles.overlay}>
            <LottieView 
            autoPlay
            loop
            source={require('../assets/animations/loading.json')}
          />
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        position:'absolute',
        backgroundColor: 'white',
        width: '103%',
        height: '100%',
        opacity: 0.8,
        zIndex:1
        
    }
})

