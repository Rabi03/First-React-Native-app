import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import ListingsScreen from '../screens/ListingsScreen'
import ListingDetailsScreen from '../screens/ListingDetailsScreen'

const stack=createStackNavigator()

export default function FeedNavigator() {
    return (
        <stack.Navigator mode="model" screenOptions={{headerShown:false}}>
            <stack.Screen 
                name="Listings"
                component={ListingsScreen}
            />
            <stack.Screen 
                name="ListingDetails"
                component={ListingDetailsScreen}
            />
       </stack.Navigator>
    )
}

