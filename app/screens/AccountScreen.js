import React, {
    useContext
} from 'react'
import {
    StyleSheet,
    View,
    FlatList,
    ScrollView
} from 'react-native'
import Screen from '../component/Screen'
import ListItem from '../component/ListItem'
import Colors from '../config/Colors'
import Icon from '../component/Icon'
import ListItemSeparator from '../component/ListItemSeparator'
import {AuthContext} from '../auth/Context'
import {
    logout
} from '../api/Firebase/firebase'
import authStorage from '../auth/Storage'

const menuItems = [
    {
        title: "My Listings",
        icon: {
            name: "format-list-bulleted",
            backgroundColor: Colors.primary
        },
        targetScreen: "MyList"
    },
    {
        title: "My Messages",
        icon: {
            name: "email",
            backgroundColor: Colors.secondary
        },
        targetScreen: "Messages"
    }
]

export default function AccountScreen({
    navigation
}) {

    const {
        user,
        setUser
    } = useContext(AuthContext)

    const handleLogOut = () => {
        logout()
        setUser(null)
        authStorage.removeToken()
    }

    return (
        <Screen style={styles.screen} >
        <View style = {styles.container} >
        <ListItem
            title={user.displayName}
            subtitle = {user.email}
            image = {user.photoURL}
        />
         </View>
         <View style = {styles.container} >
        
        <FlatList data = {menuItems}
        keyExtractor = {menuItem => menuItem.title}
        ItemSeparatorComponent = {ListItemSeparator}
        renderItem = {({item}) =>
            <ListItem
            title = {item.title}
            IconComponent = {
                <Icon
                name = {item.icon.name}
                backgroundColor = {item.icon.backgroundColor}
                />
            }
            onPress = {
                () => navigation.navigate(item.targetScreen)
            }
            />
        }
        /> 
        </View> 
        <ListItem title = "Log Out"
        IconComponent = {
            <Icon
            name = "logout"
            backgroundColor = "#ffe66d" />
        }
        onPress = {handleLogOut}
        />
            </Screen> 
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10
    },
    screen: {
        backgroundColor: Colors.light
    }
})