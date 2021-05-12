import React, { useState, Fragment } from 'react'
import { StyleSheet, View, TextInput, TouchableWithoutFeedback, Modal, Button, FlatList } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import Colors from '../config/Colors'
import defaultStyle from '../config/Style'
import AppText from './AppText'
import Screen from './Screen'
import PickerItem from './PickerItem'

export default function AppPicker({ numberofColumns=1,icon,items,selectedItem,onSelectItem, placeholder,PickerItemComponent=PickerItem,width="100%"}) {
    const [Visible, setVisible] = useState(false)
    return (
        <Fragment>
        <TouchableWithoutFeedback onPress={() => setVisible(true)}>
            <View style={[styles.container,{width}]}>
                {icon && <MaterialCommunityIcons name={icon} size={25} color={Colors.medium} style={styles.icon} />}
                    {selectedItem ?
                        <AppText style={styles.text}>{selectedItem.label}</AppText> :
                        <AppText style={styles.placeholder}>{placeholder}</AppText>
                        }  
                
                <MaterialCommunityIcons
                    name="chevron-down"
                    size={25}
                    color={Colors.medium}
                />
            </View>
            </TouchableWithoutFeedback>
            <Modal visible={Visible} animationType="slide" >
                <Screen>
                    <Button title="Close" onPress={() => setVisible(false)}></Button>
                    <FlatList 
                        data={items}
                        numColumns={numberofColumns}
                        keyExtractor={item => item.value.toString()}
                        renderItem={({ item }) =>
                            <PickerItemComponent
                                item={item}    
                                onPress={() => {
                                    setVisible(false)
                                    onSelectItem(item)
                                }
                                }
                            />
                        }
                    />
                </Screen>
            </Modal>
            </Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light,
        borderRadius: 25,
        flexDirection: "row",
        width:"100%",
        padding: 15,
        marginVertical:10
    },
    icon: {
      marginRight:10   
    },
    placeholder: {
        color: Colors.medium,
        flex:1
    },
    text: {
        flex:1
    }
})
