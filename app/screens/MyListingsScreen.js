import React, { useState, useEffect} from 'react'
import { StyleSheet, FlatList,Text, Alert} from 'react-native'
import Colors from '../config/Colors'
import Screen from '../component/Screen'
import Card from '../component/Card'
import { StorePost } from '../api/Firebase/firebase'
import client from "../api/client";

export default function MyListingsScreen() {

    const [message, setMessage] = useState()
    
    const getMessages = async () => {
        const ID = StorePost()
        const message = await client.get('/users/posts/' + ID + ".json")
       if(message) setMessage(message.data)
    }

    useEffect(() => {
        getMessages()
    },[])


    const handledelete = () => {
        Alert.alert("Delete", "Do you want to delete this item?", [
            {
                text: "Yes", onPress: () => {
                    getMessages()
            }}
        ])
    }

    return (
        
        <Screen style={styles.screen}>
        {!message&&
            <Text>You haven't post yet.</Text>
                }
                    <FlatList 
                        data={message}
                       keyExtractor={(item,index)=> index}
                        renderItem={({ item }) =>
                            <Card
                                title={item.title}
                                subtitle={item.price}
                                imageUrl={item.images ? item.images[0] : item.image}
                                onPress={handledelete}
                            />
                        } 
                    
                    />
       
            </Screen>
    )
}

const styles = StyleSheet.create({
    screen: {
        paddingBottom:0,
        padding: 17,
        backgroundColor: Colors.light
    }
})
