import * as secureStorage from 'expo-secure-store'

const key = 'authToken'

const storeToken = async (authToken) => {
    try {
        await secureStorage.setItemAsync(key,JSON.stringify(authToken))
    } catch (error) {
        console.log(error)
    }
}

const getToken = async () => {
    try {
        return await secureStorage.getItemAsync(key)
    } catch (error) {
        console.log(error)
    }
}

const removeToken = async () => {
    try {
       await secureStorage.deleteItemAsync(key)
    } catch (error) {
        console.log(error)
    }
}

export default {
    getToken,storeToken,removeToken
}