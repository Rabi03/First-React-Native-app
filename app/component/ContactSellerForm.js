import React,{useContext} from "react";
import { Alert, Keyboard } from "react-native";
import { Notifications } from "expo";
import * as Yup from "yup";
import {ListContext} from '../auth/Context'
import { AppForm, AppFormField, SubmitButton } from "./forms";
import messagesApi from "../api/messages";
import {StorePost} from '../api/Firebase/firebase'
import expoPushTokensApi from '../api/expoPushTokens'

function ContactSellerForm({ listing, buyerName, buyerEmail,buyerImage }) {
  const { messageList, setMessageList } = useContext(ListContext)

  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();
    const Messages = messagesApi.getOthersMessage(listing.uid)
    if(Messages) setMessageList(Messages)
    messageList.push({
      message:message,
      listingId: listing.id,
      productTitle: listing.title,
      productPrice:listing.price,
      buyerName:buyerName,
      buyerEmail:buyerEmail,
      buyerImage: buyerImage,
      buyerUid:StorePost()
    })

    const result = await messagesApi.send(listing.uid, messageList);
    expoPushTokensApi.sendMessage(listing.id, message)
    
    if(!result){
      console.log("Error", result);
      return Alert.alert("Error", "Could not send the message to the seller.");
    }

    resetForm();

    Notifications.presentLocalNotificationAsync({
      title: "Awesome!",
      body: "Your message was sent to the seller.",
    });
  }

  return (
    <AppForm
      initialValues={{ message: "" }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <AppFormField
        maxLength={255}
        multiline
        name="message"
        numberOfLines={3}
        placeholder="Message..."
      />
      <SubmitButton title="Contact Seller" />
    </AppForm>
  );
}

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label("Message"),
});

export default ContactSellerForm;
