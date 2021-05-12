import React, { useEffect, useState} from 'react'
import { StyleSheet, FlatList,ToastAndroid} from 'react-native'
import Screen from '../component/Screen'
import Card from '../component/Card'
import Colors from '../config/Colors'
import routes from '../navigator/routes'
import ActivityIndicator from '../component/ActivityIndicator'
import AppButton from '../component/AppButton'
import useApi from '../hooks/useApi'
import AppText from '../component/AppText'
import listingsApi from '../api/listings'


export default function ListingsScreen({ navigation }) {
    var { data: listings, error, loading, request: Loadlistings } = useApi(listingsApi.getListings)
    const [refrshing,setRefreshing]=useState(false)
    useEffect(() => {
        Loadlistings()
    }, [])

    const onRefresh = () => {
        setRefreshing(true)
        if (listings.length) {
          try {
              Loadlistings()
              setRefreshing(false)
          } catch (error) {
              alert(error);
              setRefreshing(false)
          }
        }
        else{
          ToastAndroid.show('No more new data available', ToastAndroid.SHORT);
        }
      }
   
    
    return (
        <>
        <ActivityIndicator visible={loading} />
        <Screen style={styles.screen}>
            {error && <>
                <AppText>Couldn't  retrieve the listings.</AppText>
                <AppButton title="Retry" onPress={Loadlistings} />
                </>}
            <FlatList 
                data={listings}
                keyExtractor={(item, index) => index}  
                refreshing={refrshing}
                onRefresh={onRefresh}
                onEndReached={onRefresh}
                onEndReachedThreshold={0.1}
                  renderItem={({ item }) =>
                    <Card
                        title={item.title}
                        subtitle={item.price}
                        imageUrl={item.images?item.images.uri: item.image}
                        onPress={()=> navigation.navigate(routes.LISTING_DETAILS,item)}
                    />
                } 
                    
                    />
            </Screen>
            </>
    )
}

const styles = StyleSheet.create({
    screen: {
        paddingBottom:0,
        padding: 17,
        backgroundColor: Colors.light
    }
})
