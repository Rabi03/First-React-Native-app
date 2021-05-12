import React,{useContext} from 'react'
import { StyleSheet, View, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import AppText from '../component/AppText'
import colors from "../config/Colors"
import ListItem from '../component/ListItem'
import ContactSellerForm from '../component/ContactSellerForm'
import {AuthContext,ListContext} from '../auth/Context'
export default function ListingDetailsScreen({ route }) {
    const listing = route.params
    const {
        user,
        setUser
    } = useContext(AuthContext)

    const {dataList,setDataList}=useContext(ListContext)

    return (
        <KeyboardAvoidingView
        // behavior="position"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 200}
        >
        <ScrollView>
        <View>
            <Image style={styles.image} source={{uri:listing.image}} />
            <View style={styles.detailsContainer}>
                <AppText style={styles.title}>{listing.title}</AppText>
                <AppText style={styles.price}>${listing.price}</AppText>
            </View>
            <View style={styles.userContainer}>
            <ListItem
                image={user.photoURL}
                title={user.displayName}
                subtitle={`${dataList?dataList.length:0} Listings`}
                />
                </View>
                    <ContactSellerForm
                        listing={listing}
                        buyerName={user.displayName}
                        buyerEmail={user.email} 
                        buyerImage={user.photoURL}
                    />
                </View>
                </ScrollView>
            </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    detailsContainer: {
        padding:20
    },
    image: {
        width: "100%",
        height:300
    },
    price: {
        color: colors.secondary,
        fontSize: 20,
        fontWeight: "bold",
        marginVertical:10
    },
    title: {
        fontSize: 24,
        fontWeight:"500"
    },
    userContainer: {
        marginVertical:30
    }
})
