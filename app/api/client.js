import { create } from 'apisauce'

import cache from '../utility/Cache'

const apiClient=create({
    baseURL:"https://firstapp-44a97.firebaseio.com"
})

const get = apiClient.get
const serverUrl="https://firstapp-44a97.firebaseio.com/products.json"
apiClient.get =async (url,params,axiosConfig) => {
    const response = await get(url, params, axiosConfig)
    if (response.ok) {
        cache.store(serverUrl, response.data)
        return response
    }

    const data = await cache.get(serverUrl)
    return data?{ok:true,data}:response
}

export default apiClient