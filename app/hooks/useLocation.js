
import * as Location from 'expo-location'
import {useEffect, useState } from 'react'

export default useLocation = () => {

    const [location,setLocation]=useState()

    const getLocation = async () => {
        const {granted} = await Location.requestPermissionsAsync()
        if (!granted) return
        const {coords:{latitude,longitude}}=await Location.getLastKnownPositionAsync()
        setLocation({latitude,longitude})
    }

    useEffect(() => {
        getLocation()
    }, [])
    
    return location
    
}