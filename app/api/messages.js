import client from "./client";
import {StorePost} from '../api/Firebase/firebase'



const send = (uid,body) => {
  client.patch("/users/messages/"+uid+".json",body)

}

const getOthersMessage = async (id) => {
  const message = await client.get("/users/messages/"+id+".json")
  return message
}

const getMessage = async () => {
  const Id=StorePost()
  const message = await client.get("/users/messages/"+Id+".json")
  return message
  }
export default {
  send,
  getMessage,
  getOthersMessage
};
