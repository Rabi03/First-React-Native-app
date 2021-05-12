
import React, { useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";

import { AppLoading } from 'expo'
import {navigatorRef} from './app/navigator/rootNavigation'

import navigationTheme from "./app/navigator/navigationTheme";
import AppNavigator from "./app/navigator/AppNavigator";
import AuthNavigator from './app/navigator/AuthNavigator';
import OfflineNotice from './app/component/OfflineNotice';
import {AuthContext,ListContext} from './app/auth/Context';
import authStorage from './app/auth/Storage';

export default function App() {
  const [user, setUser] = useState()
  const [dataList, setDataList] = useState([])
  const [messageList,setMessageList]=useState([])
  const [isReady,setIsReady]=useState(false)

  const restoreData = async () => {
    const data = await authStorage.getToken()
    if (!data) return
    setUser(JSON.parse(data))
  }
  
  if (!isReady)
    return (
      <AppLoading startAsync={restoreData} onFinish={()=>setIsReady(true)} />
    )
  
  
  

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <ListContext.Provider value={{dataList,messageList,setMessageList,setDataList}}>
      <OfflineNotice />
      <NavigationContainer ref={navigatorRef} theme={navigationTheme}>
        {user?<AppNavigator />: <AuthNavigator />}
        </NavigationContainer>
        </ListContext.Provider>
    </AuthContext.Provider>
  )
}
