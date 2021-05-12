import React from 'react'
import { StyleSheet, View,Modal } from 'react-native'
import AppText from '../component/AppText'
import * as Progress from 'react-native-progress'
import LottieView from 'lottie-react-native'
import Colors from '../config/Colors'

export default function UploadScreen({onDone,progress=0,visible=false}) {
    return (
        <Modal visible={visible}>
            <View style={styles.container}>
                {progress < 1 ? (
                    <Progress.Bar
                        color={Colors.primary}
                        progress={progress}
                        width={250} />
                ) : (
                        <LottieView 
                            autoPlay
                            loop={false}
                            onAnimationFinish={onDone}
                            source={require('../assets/animations/done.json')}
                            style={styles.animation}
                        />
                )
                }
               
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex:1
    },
    animation: {
        width:250
    }
})
