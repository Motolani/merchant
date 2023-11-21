import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Platform, Dimensions, TextInput, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Awesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Ionic from 'react-native-vector-icons/Ionicons';
import Feather from "react-native-vector-icons/Feather"
import { SelectList } from 'react-native-dropdown-select-list';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../context/AuthContext';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const Payment = ({ navigation }) => {
    const { msisdn, userToken, signOut } = useContext(AuthContext);

    const [amount, setAmount] =useState('');
    const [pin, setPin] =useState('');
    const [phone, setPhone] =useState('');

    const onProceed = async() => {
        const header = { 
            'logintoken': userToken,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        }

        let phoneNumber = phone;
        let convert = phoneNumber.substring(phoneNumber.length - 10);
        const sender = `234${convert}`
        console.log('na pin be this oo' + pin);

        var req = JSON.stringify({
            pin: pin,
        })
        console.log(req);
        var senderPin = CryptoJS.AES.encrypt(pin, 'secret key kpngz@!1234').toString();
        console.log(senderPin)

        var datata = new FormData()
        datata.append('reciever', msisdn);
        datata.append('sender', sender);
        datata.append('pin', senderPin);
        datata.append('amount', amount);

        try {
            const {data} = await axios.post("https://test.pinspay.com/api/merchantPayment", datata, { headers: header})
            console.log(data);
        
            if(data.status == 200){
                console.log(data);
                Alert.alert(data.message);
            }else{
                Alert.alert(data.message);
            }
        } catch (error) {
            console.log('payment error', error)
        }

    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#0073e6' barStyle="dark-content" animated={true} />
            <ScrollView>
                <View style={styles.enterAmount}>
                    <Text style={styles.Label}>Enter Amount</Text>
                    <TextInput 
                        boxStyles= {{ backgroundColor: ['#b3d9ff', '#0073e6'] }}
                        style={styles.customInput}
                        placeholder="Enter Amount"
                        keyboardType='numeric'
                        value={amount}
                        onChangeText={setAmount}
                    />
                </View>
                <View style={styles.enterPhone}>
                    <Text style={styles.Label}>Enter Recipient's Number</Text>
                    <TextInput 
                        boxStyles= {{ backgroundColor: ['#b3d9ff', '#0073e6'] }}
                        style={styles.customInput}
                        placeholder="Enter Recipient's Number"
                        keyboardType='numeric'
                        value={phone}
                        onChangeText={setPhone}
                    />
                </View>
                <View style={styles.enterPhone}>
                    <Text style={styles.Label}>Enter Recipient's Pin</Text>
                    <TextInput 
                        boxStyles= {{ backgroundColor: ['#b3d9ff', '#0073e6'] }}
                        style={styles.customInput}
                        placeholder="Enter Recipient's Pin"
                        keyboardType='numeric'
                        value={pin}
                        onChangeText={setPin}
                        maxLength={4}
                        secureTextEntry
                    />
                </View>
                

                <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} onPress={onProceed}>
                        <LinearGradient colors={['#b3d9ff', '#0073e6']} style={styles.signIn}>
                            <Text style={[styles.textSign, {color:'#fff' }]}>Proceed</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            
        </View>
    )
}

export default Payment

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
		flex: 1, 
		backgroundColor: '#b3d9ff'
    },
    enterAmount:{
        paddingTop: 40,
        paddingLeft: 25,
    },
    Label:{
        color: '#0073e6',
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom:6,
        alignItems: 'flex-start',
    },
    customInput:{
        backgroundColor: "#dbdedf",
        marginTop: 8,
        marginVertical: 5,
        width: 350,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 25,
        marginBottom: 15 ,
    },
    enterPhone:{
        paddingTop: 15,
        paddingLeft: 25,
    },
    paymentPlan:{
        paddingTop: 15,
        paddingHorizontal: 25,
    },
    selectNetwork:{
        backgroundColor: "#dbdedf",
        marginTop: 8,
        marginVertical: 5,
        width: 30,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 25,
        marginBottom: 25,
    },
    button: {
        alignItems: 'center',
        marginTop: 80
    },
    signIn: {
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        color: ['#b3d9ff', '#0073e6']
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }

})