import React from 'react'
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import AppText from './AppText'
import colors from '../config/Colors'
import Colors from '../config/Colors'
import Swipeable from 'react-native-gesture-handler/Swipeable'
export default function ListItem({title,subtitle,image,IconComponent,onPress,renderRightActions}) {
    return (
        <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight underlayColor={Colors.light} onPress={onPress}>
            <View style={styles.container}>
                {IconComponent}
                {image && <Image style={styles.image} source={{uri:image}} />}
                <View style={styles.detailsContainer}>
                    <AppText style={styles.title} numberOfLines={1} >{title}</AppText>
                    {subtitle && <AppText style={styles.subTitle} numberOfLines={1}>{subtitle}</AppText>}
                </View>
                    <MaterialCommunityIcons 
                        name="chevron-right"
                        size={25}
                        color={Colors.medium}
                />
            </View>
            </TouchableHighlight>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        flexDirection: 'row',
        padding: 15,
        backgroundColor:'white'
    },
    detailsContainer: {
        flex:1,
        marginLeft: 10,
        justifyContent:"center"
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    subTitle: {
        color:colors.medium
    },
    title: {
        fontWeight:"600"
    }
})
