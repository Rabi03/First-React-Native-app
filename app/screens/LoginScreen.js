import React, { useState, useContext } from 'react'
import { StyleSheet, Image } from 'react-native'
import * as Yup from 'yup'
import Screen from '../component/Screen'
import { loginWithEmail} from '../api/Firebase/firebase';
import {ErrorMessage,AppForm,AppFormField,SubmitButton} from '../component/forms'
import {AuthContext} from '../auth/Context';
import authStorage from '../auth/Storage'

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password:Yup.string().required().min(6).label('Password')
})

export default function LoginScreen() {
    const authContext=useContext(AuthContext)
    const [loginfailed, setloginfailed] = useState(false)
    const [loginError,setLoginError]=useState('')

    const handleSubmit = ({ email, password }) => {
        
        try {
            loginWithEmail(email, password).then((res) => {
                authContext.setUser(res.user)

                authStorage.storeToken(res.user)
            })
           setloginfailed(false)
        } catch (error) {
            setloginfailed(true)
            setLoginError('Invalid email/password');
        }
        
    }

    return (
        <Screen style={styles.container}>
            <Image 
                style={styles.logo}
                source={require("../assets/logo-red.png")}
            />
            <AppForm
                initialValues={{ email: '', password: '' }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <ErrorMessage error={loginError} visible={loginfailed} />
                <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="email"
                    keyboardType="email-address"
                    name="email"
                    placeholder='Email'
                    textContentType="emailAddress"
                />
                <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="lock"
                    name="password"
                    placeholder='Password'
                    secureTextEntry
                    textContentType="password"
                />
                <SubmitButton title="Login" />
                
            </AppForm>
            
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        padding:10
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: "center",
        marginTop: 50,
        marginBottom:50
    }
})
