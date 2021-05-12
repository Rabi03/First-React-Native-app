import React from 'react';
import { ImageBackground,StyleSheet, View, Image, Text } from 'react-native';
import AppButton from '../component/AppButton';

function WelcomeScreen({navigation}) {
    return (
        <ImageBackground
            blurRadius={3}
            style={styles.background}
            source={require("../assets/background.jpg")} >
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../assets/logo-red.png")} />
                <Text style={styles.tagline}>Sell what you don't need</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <AppButton title="Login" onPress={()=> navigation.navigate("Login")} />
                <AppButton title="Register" onPress={()=>navigation.navigate("Register")} color="secondary" />
            </View>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems:"center"
    },
    buttonsContainer: {
        padding: 20,
        width:"100%"
    },
    
    logo: {
        width: 100,
        height: 100,
    },
    logoContainer: {
        alignItems:"center",
        position: "absolute",
        top:70
    },
    tagline: {
        fontSize: 25,
        fontWeight: "600",
        paddingVertical:20
    }
    
})

export default WelcomeScreen;