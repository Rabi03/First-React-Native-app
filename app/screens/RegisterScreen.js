import React, { useState,useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import * as Yup from "yup";

import { loginWithEmail,registerWithEmail } from '../api/Firebase/firebase';

import Screen from "../component/Screen";
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
  ErrorMessage
} from "../component/forms";
import {AuthContext} from "../auth/Context";
import authStorage from '../auth/Storage'
import useApi from "../hooks/useApi";
import ActivityIndicator from "../component/ActivityIndicator";
import AppText from "../component/AppText";
import FormImagePicker from "../component/forms/FormImagePicker";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  images:Yup.array().min(1,"Please select at least one image")
});

function RegisterScreen() {
  const authContext=useContext(AuthContext)
  const [registerfailed, setRegisterfailed] = useState(false)
  const [registerError, setRegisterError] = useState('')
  const [loading,setLoding]=useState(false)

  const handleSubmit = ({ name, email, password,images }) => {
    setLoding(true)
      registerWithEmail(email, password).then((res) => {
        res.user.updateProfile({
          displayName: name,
          photoURL:images[0]
        })
        loginWithEmail(email, password).then((res) => {
          authContext.setUser(res.user)

          authStorage.storeToken(res.user)
          setLoding(false)
      })
        setRegisterfailed(false)
        setRegisterError('')
        
      })
        .catch(error => {
          setRegisterError(error.message)
          setRegisterfailed(true)
          setLoding(true)
        })
        
  }

  return (
    <>
      <ScrollView>
    <Screen style={styles.container}>
      <ActivityIndicator visible={loading} />
      <Form
        initialValues={{ name: "", email: "", password: "",images:[] }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
          <ErrorMessage error={registerError} visible={registerfailed} />
          <AppText>Please Select A Profile Picture.</AppText>
          <FormImagePicker name="images" />
        <FormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Register" />
      </Form>
        </Screen>
      </ScrollView>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
