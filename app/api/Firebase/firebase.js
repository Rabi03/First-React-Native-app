import * as firebase from 'firebase';
import 'firebase/auth';

import firebaseConfig from './firebaseConfig';

// Initialize Firebase App

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export const loginWithEmail =async (email, password) => 
   await auth.signInWithEmailAndPassword(email, password)
  


export const registerWithEmail =async (email, password) =>
  await auth.createUserWithEmailAndPassword(email, password)

export const logout =async () =>await auth.signOut();

export const passwordReset = email => auth.sendPasswordResetEmail(email);

export const getNewMessages = (id) => {
  const rootRef = firebase.database().ref('/users');
  var query = rootRef.child("messages").orderByChild("listingId").equalTo(id);
  const result = query.once("value")
  return result
}

export const getUserdata =async (id) => {
  var values = [];
    var recentPostsRef =await firebase.database().ref('/users/posts/'+id);
    recentPostsRef.once('value').then((snapshot) => {
    snapshot.forEach((child) => {
      values.push(child.val());
    });
    });
  console.log(values)
  return values

}

export const StorePost = () => {
  if (firebase.auth().currentUser !== null) 
        return firebase.auth().currentUser.uid
}
