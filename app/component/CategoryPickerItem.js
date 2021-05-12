import React from 'react'
import { StyleSheet,View, TouchableOpacity } from 'react-native'
import Icon from './Icon'
import AppText from './AppText'

export default function CategoryPickerItem({
    item,onPress
}) {
    return (
        <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Icon
          backgroundColor={item.backgroundColor}
          name={item.icon}
          size={80}
        />
      </TouchableOpacity>
      <AppText style={styles.label}>{item.label}</AppText>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 26,
        paddingVertical: 15,
        alignItems: "center",
        width:"33%"
    },
    lable: {
        marginTop: 5,
        textAlign:"center"
    }
})

