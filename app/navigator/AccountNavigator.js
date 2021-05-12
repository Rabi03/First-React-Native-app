import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import AccountScreen from '../screens/AccountScreen'
import MessagesScreen from '../screens/MessagesScreen'
import MyListingsScreen from '../screens/MyListingsScreen'

const stack=createStackNavigator()

export default function AccountNavigator() {
    return (
        <stack.Navigator>
            <stack.Screen 
                name="Account"
                component={AccountScreen}
            />
            <stack.Screen 
                name="Messages"
                component={MessagesScreen}
            />
            <stack.Screen
                name="MyList"
                component={MyListingsScreen}
            />
       </stack.Navigator>
    )
}
