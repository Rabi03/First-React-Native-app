import React, { useEffect } from 'react'
import { StyleSheet,View, Image, TouchableWithoutFeedback, Alert } from 'react-native'
import Colors from '../config/Colors'
import {MaterialCommunityIcons}  from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

export default function ImageInput({ imageUri,onChangeImage }) {
    
    async function requestPermission() {
        const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
        if (!permissionResult.granted) {
    
          alert('Permission to access camera roll is required!');
    
        }
     }
      
      useEffect(() => {
        requestPermission()
      }, [])
      

    function handlePress() {
        if (!imageUri) selectImage()
        else Alert.alert("Delete", "Are you sure you want to delete this image", [
            { text: "Yes", onPress: () => onChangeImage(null) },
            {text:"No"}
        ])
    }
    async function selectImage() {
        try {
            const request = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality:0.5
          })
          if(!request.cancelled) onChangeImage(request.uri)
        } catch (error) {
          console.log("Error reading Image",error)
        }
      }

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
           <View style={styles.container}>
                {!imageUri ?<MaterialCommunityIcons 
                    name="camera"
                    size={45}
                    color={Colors.medium}
                /> :
                    <Image source={{ uri: imageUri }} style={styles.image} />
                }
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        height: 100,
        overflow:"hidden"
    },
    image: {
        width: "100%",
        height: '100%'
        
    }
})
