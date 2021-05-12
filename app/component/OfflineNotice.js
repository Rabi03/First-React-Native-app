import React from 'react'
import { StyleSheet, View} from 'react-native'
import AppText from './AppText'
import Colors from '../config/Colors'
import {useNetInfo} from '@react-native-community/netinfo'
import Constants from 'expo-constants'

export default function OfflineNotice() {

    const netInfo=useNetInfo()
    
    if (netInfo.type !== 'unknown' && netInfo.isInternetReachable === false) {
        
        return (
            <View style={styles.container}>
                <AppText style={{ color:'white'}} >No Internate Connection</AppText>
            </View>
        )
    }
    return null
    
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: Colors.primary,
        width: '100%',
        height: 50,
        marginBottom:20,
        zIndex:-1,
        top:Constants.statusBarHeight,
    }
})
