import axios from 'axios'
import client from './client'
import {StorePost} from './Firebase/firebase'


const AddInList = async (Data, onUploadProgress,id) => {

    const response = await axios.patch(`https://firstapp-44a97.firebaseio.com/products/${id}.json`, Data, 
        {
            onUploadProgress:ProgressEvent=> onUploadProgress((ProgressEvent.loaded)/ProgressEvent.total)
        }
    )
    return response.data
}

const addListings = (listing, onUploadProgress) => {
    
    const Data = {}
    var len = listing.count
    Data['uid']=StorePost()
    Data['id']=listing.token
    Data["title"]= listing.title
    Data['price']= listing.price
    Data['categoryID']= listing.category.value
    Data['discription']= listing.discription

    listing.images.forEach((image, index) => {
        Data['images']= {
            name: 'image' + index,
            uri:image
        }
    })
    if (listing.location) Data['location'] = JSON.stringify(listing.location)
    
    
    const newData = AddInList(Data,onUploadProgress,len)
    return newData
    
}

const getListings=()=> client.get("/products.json")




export default {
    addListings,
    getListings
}