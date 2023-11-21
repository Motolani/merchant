/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, TouchableOpacity, Platform, Dimensions, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native'
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
    const [ loading, setLoading ] = useState(false);

    const [amount, setAmount] =useState('');
    const [pin, setPin] =useState('');
    const [phone, setPhone] =useState('');

    const onProceed = async() => {
        if(!amount || !pin || !phone){
            return alert("Fill in all fields");
        }
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
            setLoading(true)
            const {data} = await axios.post("https://test.pinspay.com/api/merchantPayment", datata, { headers: header})
            console.log(data);
        
            if(data.status == 200){
                setLoading(false)
                console.log(data);
                Alert.alert(data.message);
            }else{
                return [setLoading(false),
                Alert.alert(data.message)]
            }
        } catch (error) {
            return [
                console.log('payment error', error),
                alert("Something went wrong")    
            ]
        }

    }


    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.bottomContainer}>

                    <Text style={styles.Label}>Amount:</Text>
                    <View style={styles.action}>
                        <TextInput 
                            placeholder="Input  Amount"
                            style={styles.textInput}
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType='numeric'
                            placeholderTextColor={'grey'}
                        />
                    </View>

                    <Text style={styles.Label}>Sender's Number:</Text>
                    <View style={styles.action}>
                        <TextInput 
                            placeholder="Input Sender's Phone"
                            style={styles.textInput}
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType='numeric'
                            placeholderTextColor={'grey'}
                        />
                    </View>

                    <Text style={styles.Label}>Sender's Pin:</Text>
                    <View style={styles.action}>
                        <TextInput 
                            placeholder="Input Sender's Pin"
                            style={styles.textInput}
                            value={pin}
                            keyboardType='numeric'
                            onChangeText={setPin}
                            maxLength={4}
                            secureTextEntry
                            placeholderTextColor={'grey'}
                        />
                    </View>
                    

                    <TouchableOpacity
                        onPress={onProceed}
                        style={styles.signInbutton}
                    >
                            {
                                loading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <Text style={styles.signIn}>Proceed</Text>
                                )
                            }
                        {/* </LinearGradient> */}
                    </TouchableOpacity>
                    </View>
                {/* </View> */}
            </ScrollView>
            
        </View>
    )
}

export default Payment

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
		flex: 1, 
		backgroundColor: 'white',
        
    },
    Label:{
        fontWeight: 'bold',
        marginBottom:3,
        alignItems: 'flex-start',
        color: 'rgb(71, 85, 105)',
        fontSize: 17
    },
    paymentPlan:{
        paddingTop: 15,
        paddingHorizontal: 25,
    },
    button: {
        alignItems: 'center',
        marginTop: 80
    },
    signInbutton: {
        marginTop: 30,
        backgroundColor: 'rgb(96, 165, 250)',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
    },
    signIn: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 18,
        color: 'white',
        alignItems: 'center',
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    action: {
        flexDirection: 'row',
        marginTop: 5,
        // borderBottomColor: 'green',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        alignItems: 'center',
        marginTop: 8,
        marginVertical: 5,
        width: 350,
        borderWidth: 1,
        borderColor: 'rgb(209, 213, 219)',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 25,
        marginBottom: 15 ,
        fontSize:16
    },
    bottomContainer: {
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },

})