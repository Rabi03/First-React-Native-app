import client from './client'
import Axios from 'axios';

let axiosConfig = {
    headers: {
        "host": "exp.host",
        "accept": "application/json",
        "accept-encoding": 'gzip, deflate',
        "content-type": 'application/json'
    }
};
var token=null
  

const register = (pushToken) => {

    token = pushToken
    
}

const sendMessage = async (id,message) => {
    await Axios.post('https://exp.host/--/api/v2/push/send',
    {
        "to":  id,
        "sound": "default",
        "body": message
        },
    axiosConfig
    )
}

const getPushToken = () => {
    return token
}

export default {
    register,
    getPushToken,
    sendMessage
}