/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, Platform, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import  Feather  from 'react-native-vector-icons/Feather';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height; 

const WalletHistory = () => {  
    const [search, setSearch] = useState('');
    const [walletHistoryTransactions, setWalletHistoryTransactions] = useState([]);
    const [loading, setLoading] = useState(false)
    const { msisdn, userToken, signOut } = useContext(AuthContext); 


    const WalletHistoryTrans = async () => {

        const header = { 
            'logintoken': userToken,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        }
        
        var datata = new FormData()
        datata.append('mobilePhone', msisdn)

        try {
            setLoading(true)
            const {data} = await axios.post("https://test.pinspay.com/api/ministatement/merchant", datata, { headers: header})
            // console.log(data.data.length);
            


            if(data.status == 200){
                setWalletHistoryTransactions(data.data)
                console.log("data.data.length ", data.data.length)
                setLoading(false)
            }
        } catch (error) {
            console.log('wallethistory', error)
            setLoading(false)
            return alert("Something went wrong")
        }
    }

    useEffect(() => {
        console.log(userToken);
        console.log('hello world');
        console.log(msisdn);
        var senderPin = CryptoJS.AES.encrypt("1111", 'secret key kpngz@!1234').toString();
        console.log('encrypted pin ', senderPin)
        var decrypt = CryptoJS.AES.decrypt(senderPin,'secret key kpngz@!1234').toString(CryptoJS.enc.Utf8);
        console.log('decrypted pin ', decrypt)
        WalletHistoryTrans();
        console.log(windowWidth)
        console.log(windowHeight)
        console.log(screenWidth)
        console.log(screenHeight)
    }, []);



    if(walletHistoryTransactions.length < 1){
        return(
            <SafeAreaView className="h-full">
                {
                    !loading ? (
                        <View className="justify-center items-center h-full">
                            <Text>No transactions was found</Text>
                        </View>
                    ): (
                        <View className="justify-center items-center h-full">
                            <ActivityIndicator size="large" color="rgb(96, 165, 250)" />
                        </View>
                    )
                }

            </SafeAreaView>
        )
    }else {

    return (
        <SafeAreaView className="w-full bg-gray-100">
            <View className="mt-2">
            <View className="px-4 mt-1 mb-3">
                <Text className="text-lg font-semibold text-slate-700">Transaction History</Text>
            </View>
                <FlatList
                    showsVerticalScrollIndicator={false} 
                    contentContainerStyle={{paddingBottom: 85}}
                    data={walletHistoryTransactions}
                    renderItem={({item}) => (                        
                        <View className="px-3">
                            {
                                Platform.OS === 'android' ? (
                                    <TouchableOpacity key={item.id}   className="flex flex-row h-20 px-2 py-2 items-center border-b border-gray-200 mb-1 bg-white rounded-md">
                                {item?.DebitCredit == "C" ? (
                                    <View className="bg-green-200 h-7 w-7 items-center rounded-md justify-center">
                                        <Feather name="arrow-down-right" color="rgb(34, 197, 94)" size={18} />
                                    </View>
                                    ): (
                                        <View className="bg-red-200 h-7 w-7 items-center rounded-md justify-center">
                                            <Feather name="arrow-up-right" color="rgb(239, 68, 68)" size={18} />
                                        </View>
                                    ) }
                                <View className="ml-3 justify-center flex-1 space-y-1">
                                    <Text style={{fontSize: 13}} className="font-semibold  text-gray-400">{item?.TranDate}</Text>
                                    <View>
                                        <Text style={{fontSize: 13, lineHeight: 17}} className="text-slate-600 font-semibold">{item?.Description}</Text>
                                    </View>
                                </View>
                                <View className="">
                                {item?.DebitCredit == "C" ? (
                                    <Text className="text-green-500  font-bold">+₦{item?.Amount}</Text>
                                ):(
                                    <Text className="text-red-500  font-bold">-₦{item?.Amount}</Text>
                                )}
                                    <Text className="text-slate-700  font-bold">Bal: {item?.Balance}</Text>
                                </View>
                                </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity key={item.id}  className="flex flex-row h-20 px-2 py-2 items-center border-b border-gray-200 mb-1 bg-white rounded-md">
                                {item?.DebitCredit == "C" ? (
                                    <View className="bg-green-200 h-8 w-8 items-center rounded-md justify-center">
                                        <Feather name="arrow-down-right" color="rgb(34, 197, 94)" size={18} />
                                    </View>
                                    ): (
                                        <View className="bg-red-200 h-8 w-8 items-center rounded-md justify-center">
                                            <Feather name="arrow-up-right" color="rgb(239, 68, 68)" size={18} />
                                        </View>
                                    ) }
                                <View className="ml-3 justify-center flex-1 space-y-1">
                                    <Text className="font-semibold text-gray-400">{item?.TranDate}</Text>
                                    <View>
                                        <Text className="text-slate-600 font-semibold">{item?.Description}</Text>
                                    </View>
                                </View>
                                <View className="">
                                {item?.DebitCredit == "C" ? (
                                    <Text className="text-green-500 text-base font-bold">+₦{item?.Amount}</Text>
                                ):(
                                    <Text className="text-red-500 text-base font-bold">-₦{item?.Amount}</Text>
                                )}
                                    <Text className="text-slate-700 text-base font-bold">Bal: {item?.Balance}</Text>
                                </View>
                                </TouchableOpacity>
                                )
                            }

                        </View>
                    )}
                    keyExtractor={(item, index) => item.id}
                    
                />

            </View>
        </SafeAreaView>
    )
}
}

export default WalletHistory

const { height, width } = Dimensions.get("window");


const styles = StyleSheet.create({
    searchBar:{
        flexDirection: 'row',
        // flexWrap: 'wrap',
    },
    customInput:{
        backgroundColor: "#FFFFFF",
        marginTop: 8,
        marginVertical: 5,
        // width: "100%",
        // borderColor: '#0073e6',
        borderWidth: 1,
        borderRadius: 13,
        paddingVertical: 15,
        paddingHorizontal: 25,
        marginBottom: 25 ,
        
    },
    timestampDay:{
        color: 'black',
        fontWeight: '700',
        fontSize: 14,
        paddingLeft: 50
    },
    Label:{
        color: 'rgba(71, 114, 225, 1)',
        fontWeight: 'bold',
        marginLeft: 14,
        color: '#0073e6',
        
    },
    searchButtonContainer:{
        width: hp('6%'),
        height: hp('5%'),
        borderRadius: 10,
        marginTop: 10,
        borderColor: '#0073e6',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0073e6',
    },
    searchButtonView:{
        paddingLeft: 10,
        height: 12
    },
    theTransCase:{
        flex: 1,
        marginBottom: 2
    },
    historiesContainer:{
        width: 380,
        height: 120,
        backgroundColor: '#e0e0eb',
        borderRadius: 10,
        marginTop: 5,
        borderColor: 'green',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    historiesContainerC:{
        width: "100%",
        height: 120,
        backgroundColor: '#e0e0eb',
        borderRadius: 10,
        marginTop: 5,
        borderColor: 'green',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    historiesContainerD:{
        width: "100%",
        height: 120,
        backgroundColor: '#e0e0eb',
        borderRadius: 10,
        marginTop: 5,
        borderColor: 'red',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    typeIconContainer:{
        marginTop: 10,
        marginLeft: 3,
        marginRight: 18,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 6,
        alignContent: 'space-between'
    },
    general:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: -42,
    },
    generalTop:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop:3,
    },
    topRow:{
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginTop: 20
    },
    transTheType:{
        fontWeight: '600',
        fontSize: 18,
        marginRight: 30,
        color: 'black',
    },
    theAmountContainer:{
        paddingTop: 13
    },
    theAmount:{
        fontWeight: '600', 
        color: 'black',
        fontSize: 14,
        marginRight: 10,
    },
    downRow:{
        paddingLeft: 55
    },
    reciever:{
        fontWeight: '500',
        marginTop: 20, 
        fontSize: 18,
        marginLeft: 22,
        color: 'black',
    },
    desc: {
        marginTop: 15, 
        color: 'black',
        marginLeft: 5
    },
    mainHead: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 6,
        paddingTop: 0,
        margingLeft: 35,
        alignContent: 'space-around'
    },
})