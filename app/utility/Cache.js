
import {AsyncStorage} from "react-native"



import dayjs from 'dayjs'

const prefix = 'cache'

const store = async (Key, value) => {
    try {
        const item = {
            value,
            timestamp:Date.now()
        }
        await AsyncStorage.setItem(prefix+Key,JSON.stringify(item))
    } catch (error) {
        alert(error)
    }
}

const isExpired = (item) => {
    const now = dayjs()
    const storedTime = dayjs(item.timestamp)
    return now.diff(storedTime, 'minute') > 5
    
}

const get = async (Key) => {
    try {
        const value = await AsyncStorage.getItem(prefix + Key)
        const item=JSON.parse(value)
        if (!item) return null
        
       
        if (isExpired(item)) {
            await AsyncStorage.removeItem(prefix + Key)
            return null
        }

        return item.value
        
    } catch (error) {
        alert(error)
    }
}

export default {
    store,
    get
}