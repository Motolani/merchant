/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Image, ImageBackground, Dimensions, ActivityIndicator, Platform} from 'react-native'
import React, { useState, useContext } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import IMG from '../images/backgroundSamp.png';
import im from '../../assets/images/backk.png';
import Font from 'react-native-vector-icons/FontAwesome';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useEffect } from 'react';
import CryptoJS from 'crypto-js';
import  Feather  from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';





const Dash = ({ navigation }) => {
    const DeviceHeight = Dimensions.get('window').height;
    const DeviceWidth = Dimensions.get('window').width;
    const [walletHistoryTransactions, setWalletHistoryTransactions] = useState([]);

    const [ loading, setLoading ] = useState(false);
    const { msisdn, userToken  } = useContext(AuthContext); 


    const Tab = createBottomTabNavigator(); 
    const { name, bal, signOut } = useContext(AuthContext); 


    const dt = new Date();
    const n = dt.toDateString();
    const time = dt.toLocaleTimeString();

    const [showBalance, setShowBalance] = useState(false);

    const toggleBalance = () => {
        if (showBalance) {
            setShowBalance(false);
        } else {
            setShowBalance(true);
        }
    }





    useEffect(() => {
        const WalletHistoryTrans = async () => {
        console.log(userToken);
        console.log('hello world');
        console.log(msisdn);
        var senderPin = CryptoJS.AES.encrypt("1111", 'secret key kpngz@!1234').toString();
        console.log('encrypted pin ', senderPin)
        var decrypt = CryptoJS.AES.decrypt(senderPin,'secret key kpngz@!1234').toString(CryptoJS.enc.Utf8);
        console.log('decrypted pin ', decrypt)
        // WalletHistoryTrans();


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
                console.log(data.data);
                
    
    
                if(data.status == 200){
                    setWalletHistoryTransactions(data.data)
                    setLoading(false)
                }
            } catch (error) {
                console.log('wallethistory', error)
                setLoading(false)
                return alert("Something went wrong")
            }
        }

        WalletHistoryTrans()

    }, [navigation, msisdn, userToken]);







    return (
        <View className="h-full bg-gray-100">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 20}}>
            <View className="bg-blue-400 px-4" style={{height: DeviceHeight * 0.25}}>
                <View className="mt-16 flex flex-row items-center justify-between">
                    <Text className="text-gray-100 ml-5 font-semibold text-xl">Hello { name }</Text>
                    <TouchableOpacity className="p-2 bg-gray-100 w-16 mr-5 items-center justify-center rounded-md" onPress={signOut}><Text className="text-orange-400 font-bold">Logout</Text></TouchableOpacity>
                </View>
            </View>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['rgb(37, 99, 235)','rgb(30, 58, 138)']} className="-mt-20 bg-blue-600 self-center shadow-sm rounded-md" style={{height: DeviceHeight * 0.25, width: DeviceWidth - 40}}>
                <View
                    className="w-full h-full"
                    
                >
                    <View className="px-4 py-6">
                        <View><Text className="text-lg font-bold text-gray-100">Wallet Balance</Text></View>
                        <View className="flex flex-row justify-between items-center px-4 mt-6">
                        {
                            showBalance ? (
                                <View>
                                    <Text  className="text-lg font-bold text-white">₦{ bal }.00</Text>
                                </View>
                            ) : (
                                <View>
                                    <Text  className="text-lg font-bold text-white">₦ *****</Text>
                                </View>
                            )
                        }
                        <TouchableOpacity onPress={toggleBalance}>
                            {
                                showBalance ? (
                                    <Icon name="eye" size={24} color="rgb(147, 197, 253)" />
                                ) : (
                                    <Icon name="eye-off" size={24} color="rgb(147, 197, 253)" />
                                )
                            }
                        </TouchableOpacity>
                    </View>
                <View className="flex flex-row justify-between mt-10">
                    <Text className="text-xs font-bold text-blue-200">{n}</Text>
                    <Text className="text-xs font-bold text-blue-200">{time}</Text>
                </View>  
                </View>
                </View>
            </LinearGradient>
            <View className="px-4 mb-1 mt-4">
                <Text className="text-base font-bold text-slate-600 ml-1">Recent transactions</Text>
            </View>
            <View className="bg-white shadow-sm self-center mt-2 rounded-sm" style={{width: DeviceWidth - 30, minHeight: 95}}>
                {
                    loading ? (
                        <View className="items-center mt-2">
                            <ActivityIndicator color="rgb(74, 222, 128)"  />
                        </View>
                    ) : (
                        walletHistoryTransactions.slice(0,5).map((item, index) => (
                            <View key={index} className="px-3">
                            {
                                Platform.OS === 'android' ? (
                                    <TouchableOpacity onPress={() => navigation.navigate("TransactionDetails", { transaction: item })}   className="flex flex-row h-20 px-2 py-2 items-center border-b border-gray-200 mb-1 bg-white rounded-md">
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
                                    <TouchableOpacity onPress={() => navigation.navigate("TransactionDetails", { transaction: item })}  className="flex flex-row h-20 px-2 py-2 items-center border-b border-gray-200 mb-1 bg-white rounded-md">
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
                        ))
                    )
                }              
            </View>
        </ScrollView>
        </View>

    )
}


export default Dash