import {useEffect, useState} from 'react'
import expoPushTokensApi from '../api/expoPushTokens'

import { Notifications } from 'expo'




export default function useNotifications(notificationListener) {
    useEffect(() => {
        registerForPushNotification()
        if(notificationListener)
        Notifications.addListener(notificationListener)
    },[])
        
 
    const registerForPushNotification = async () => {
        try { 
            Notifications.createChannelAndroidAsync('chat-messages', {
                name: 'Chat messages',
                sound: true,
                _displayInForeground:true
              })
            const Token =await Notifications.getExpoPushTokenAsync()
            expoPushTokensApi.register(Token)
        } catch (error) {
            console.log(error)
        }
    }
}
