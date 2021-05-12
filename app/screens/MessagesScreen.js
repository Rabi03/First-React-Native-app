import React, { useState, useEffect } from 'react'
import { StyleSheet,FlatList, View,Text, Alert, Image} from 'react-native'
import ListItem from '../component/ListItem'
import Screen from '../component/Screen'
import ListItemSeparator from '../component/ListItemSeparator'
import ListItemDeleteAction from '../component/ListItemDeleteAction'
import messageApi from '../api/messages'
import {getNewMessages,StorePost} from '../api/Firebase/firebase'
import Axios from 'axios'
import { Dialog } from 'react-native-simple-dialogs'
import AppText from '../component/AppText'


export default function MessagesScreen() {
    const [items,setItem]=useState({})
    var [messages, setMessages] = useState([]);
    var [refreshing, setRefreshing] = useState(false)
    const [dialogVisible,setDialogVisible]=useState(false)
    useEffect(() => {
        getMessages()
    },[])

    const getMessages = async () => {
        setRefreshing(true)
        const message = await messageApi.getMessage()
        setMessages(message.data)
        setRefreshing(false)
    }
    


    async function handleDelete(message) {
        const ID = StorePost()
       await  Axios.delete("https://firstapp-44a97.firebaseio.com/users/messages/" + ID + ".json",message)
    }


    return (
        <Screen>
            {!messages&&<AppText style={styles.text} >No Messages Yet</AppText>}
            <Dialog
                visible={dialogVisible}
                title="Message Box"
                onTouchOutside={() => setDialogVisible(false)} >
                <View>
                    
                    <AppText>Product: {items.productTitle}</AppText>
                    <AppText>Price: {items.productPrice}</AppText>
                    <Text>{items.buyerName} : {items.message}</Text>
                </View>
            </Dialog>
            <FlatList 
                data={messages}
                refreshing={refreshing}
                onRefresh={getMessages}
                onEndReached={getMessages}
                onEndReachedThreshold={0.1}
                keyExtractor={(item,index)=>index}
                renderItem={({ item }) =>
                <ListItem 
                    title={item&&item.buyerName}
                    subtitle={item&&item.message}
                        image={item.buyerImage}
                        onPress={() => {
                            setItem(item)
                            setDialogVisible(true)
                            
                        }}
                        renderRightActions={() => 
                            <ListItemDeleteAction 
                                onPress={() =>handleDelete(item)}
                            />}
                        
                    />
               
                
                }
                ItemSeparatorComponent={ListItemSeparator}
                />
        </Screen>
    )
}

const styles = StyleSheet.create({
    imgae: {
        width: 50,
        height:50
    },
    text: {
        textAlign:"center"
    }
})
