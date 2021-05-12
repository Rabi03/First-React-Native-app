import React from 'react'
import {useFormikContext} from 'formik'
import { StyleSheet, Text, View } from 'react-native'
import ErrorMessage from './ErrorMessage'
import AppTextInput from '../AppTextInput'

export default function AppFormField({ name,width, ...otherProps }) {
    const {setFieldTouched,setFieldValue,errors,touched,values}=useFormikContext()
    return (
        <>
            <AppTextInput 
                width={width}
                onBlur={()=>setFieldTouched(name)}
                onChangeText={text=> setFieldValue(name, text)}
                value={values[name]}
                {...otherProps}
            />
            {touched[name] && <ErrorMessage error={errors[name]}  />}
        </>
    )
}

const styles = StyleSheet.create({})
