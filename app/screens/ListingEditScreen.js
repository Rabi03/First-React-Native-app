import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import * as Yup from "yup";
import axios from 'axios'
import {StorePost} from '../api/Firebase/firebase'

import CategoryPickerItem from "../component/CategoryPickerItem";
import listingApi from '../api/listings'

import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../component/forms";
import Screen from "../component/Screen";
import FormImagePicker from "../component/forms/FormImagePicker";
import useLocation from "../hooks/useLocation";
import UploadScreen from "./UploadScreen";
import expoPushTokensApi from '../api/expoPushTokens'
import {AuthContext,ListContext} from '../auth/Context'
import Axios from "axios";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images:Yup.array().min(1,"Please select at least one image")
});

  const categories = [
    {
      backgroundColor: "#fc5c65",
      icon: "floor-lamp",
      label: "Furniture",
      value: 1,
    },
    {
      backgroundColor: "#fd9644",
      icon: "car",
      label: "Cars",
      value: 2,
    },
    {
      backgroundColor: "#fed330",
      icon: "camera",
      label: "Cameras",
      value: 3,
    },
    {
      backgroundColor: "#26de81",
      icon: "cards",
      label: "Games",
      value: 4,
    },
    {
      backgroundColor: "#2bcbba",
      icon: "shoe-heel",
      label: "Clothing",
      value: 5,
    },
    {
      backgroundColor: "#45aaf2",
      icon: "basketball",
      label: "Sports",
      value: 6,
    },
    {
      backgroundColor: "#4b7bec",
      icon: "headphones",
      label: "Movies & Music",
      value: 7,
    },
    {
      backgroundColor: "#a55eea",
      icon: "book-open-variant",
      label: "Books",
      value: 8,
    },
    {
      backgroundColor: "#778ca3",
      icon: "application",
      label: "Other",
      value: 9,
    },
];

function ListingEditScreen() {
  const {dataList, setDataList}=useContext(ListContext)
  const [UploadVisible, setUploadVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const location = useLocation()
  const [count, setCount] = useState();
  var token=expoPushTokensApi.getPushToken()
  const getLength = async () => {
    await axios.get('https://firstapp-44a97.firebaseio.com/products.json')
    .then(res => setCount(Object.keys(res.data).length))
  }
  
  useEffect(() => {
    getLength()
  }, [])

  
  const handleSubmit = async (listing, { resetForm }) => {
    dataList.push(listing)
    setDataList(dataList)
    const ID = StorePost()
    await Axios.put("https://firstapp-44a97.firebaseio.com/users/posts/"+ID+".json",dataList)
    setProgress(0)
    setUploadVisible(true)
    const result = await listingApi.addListings(
      { ...listing, location,count,token},
      progress =>setProgress(progress))
    
    if (!result) {
      setUploadVisible(false)
      return alert("Couldn't save the listings")
    }
    resetForm()
    setCount(precount=>precount+=1)
  }

  return (
    <ScrollView>
    <Screen style={styles.container}>
      <UploadScreen
        onDone={()=>setUploadVisible(false)}
        progress={progress}
        visible={UploadVisible} />
      <Form
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images:[]
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <FormField maxLength={255} name="title" placeholder="Title" />
        <FormField
          keyboardType="numeric"
          maxLength={10}
          name="price"
          placeholder="Price"
          width="50%"
        />
        <Picker
          items={categories}
          name="category"
          numberofColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%" 
          
          />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
          <SubmitButton title="Post" />
          
        </Form>
      </Screen>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ListingEditScreen;
