import React from 'react'
import { StyleSheet, Text,TouchableOpacity} from 'react-native'
import colors from '../config/Colors';
export default function AppButton({title,onPress,color="primary"}) {
    return (
        <TouchableOpacity style={[styles.container,{backgroundColor:colors[color]}]} onPress={onPress} >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        borderRadius:25,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: 15,
        marginVertical:10
    },
    text: {
        color: 'white',
        fontSize: 18,
        textTransform: "capitalize",
        fontWeight:"bold"
        
    }
})
