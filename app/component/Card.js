import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback
} from 'react-native'
import AppText from './AppText'
import colors from '../config/Colors'

export default function Card({title,subtitle,imageUrl,onPress}) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.card} >
            <Image style={styles.image} source={{uri:imageUrl}} />
            <View style={styles.detailsContainer}>
                <AppText style={styles.title}> {title}</AppText>
                    <AppText style={styles.subTitle}> ${subtitle} </AppText>  
            </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: 'white',
        marginBottom: 20,
        overflow:"hidden"
    },
    detailsContainer: {
        padding:20
    },
    image: {
        width: "100%",
        height: 200
    },
    subTitle: {
        color:colors.secondary
    },
    title: {
        marginBottom:7
    }
})