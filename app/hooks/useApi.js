import { useState} from 'react'



export default useApi = (apiFunc) => {
    const [data, setData] = useState()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const request = async () => {
        setLoading(true)
        const res = await apiFunc()
        setLoading(false)
        if (!res.ok) return setError(true)
        setError(false)
        const data = res.data
        setData(data)
        
    }

    return {data,error,loading,request}
}