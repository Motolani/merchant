/* eslint-disable prettier/prettier */
import { StyleSheet, View, TouchableOpacity, Platform, Dimensions, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { IconButton, Text, Portal, TextInput, Switch, Button, HelperText, PaperProvider} from 'react-native-paper';
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
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [validateMsisdn, setValidateMsisdn] = useState('');
    const [senderName, setSenderName] = useState('');

    const [amount, setAmount] =useState('');
    const [pin, setPin] =useState('');
    const [phone, setPhone] =useState('');

    const validatePhone = async() => {

        setValidateMsisdn('validating')
        //call validate api
        //put in here when you get end point
        // const authUser = { sender }
        setLoading(true)

        //set the validated name state to the name to display
        let sendPhone = {mobilePhone: phone}
        console.log('sendPhone')
        console.log(sendPhone)
        try {
            const header = { 
                'logintoken': userToken,
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            }
            const {data} = await axios.post("https://test.pinspay.com/api/merchant-user/validatephone", sendPhone, { headers: header})
            console.log(data);
            if(data.status == 200){
                let response = data;
                console.log(response);
                console.log("response.status ", response.status)
                setSenderName(response.data.firstName +' '+response.data.lastName);
                setValidateMsisdn('validated')


            }else if(data.status == 500){
                return [
                    alert("Something went wrong"),
                    setValidateMsisdn(''),
                    setPhone(''),
                ]
            }else if(data.status == 302){
                signOut()
                let response = data;
                console.log(response);
                console.log("response.status ", response.status)
                return [
                    alert(response.data.firstName +' '+response.data.lastName+' Please complete Your registration to continue'), 
                    setValidateMsisdn(''),
                    setPhone('')
                ]
            }else if(data.status == 300){
                
                // validateMsisdn('')
                return [
                    alert(data.message),
                    setValidateMsisdn(''),
                    setPhone('')
                ]
            }else{
                return [
                    alert(data.message),
                    setValidateMsisdn(''),
                    setPhone('')
                ]
            }
        } catch (error) {
            console.log('validating error', error)
            alert("Something went wrong")
            setValidateMsisdn('')
            setPhone('')
        }
        setLoading(false)
        //validate api is done


    }

    useEffect(() => {
        if(phone.length >= 11){
             validatePhone()
        }else{
         setSenderName('')
        }
    }, [phone])

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

    const updateSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.bottomContainer}>

                    <View>
                        <TextInput
                        label="Amount"
                        value={amount}
                        underlineColor={'#209eda'}
                        activeUnderlineColor={'#475980'}
                        activeOutlineColor={'#5cdb93'}
                        outlineColor={'#ffffff'}
                        backgroundColor={'#ffffff'}
                        keyboardType='numeric'
                        style={styles.inputAmount}
                        onChangeText={amount => setAmount(amount)}
                        theme={{
                            colors: {
                              primary: "rgb(120, 69, 172)",
                              onPrimary: "rgb(255, 255, 255)",
                              primaryContainer: "rgb(240, 219, 255)",
                              onPrimaryContainer: "rgb(44, 0, 81)",
                              secondary: "rgb(102, 90, 111)",
                              onSecondary: "rgb(255, 255, 255)",
                              background: "rgb(255, 251, 255)",
                              onBackground: "rgb(29, 27, 30)",
                              surface: "rgb(255, 251, 255)",
                              onSurface: "rgb(29, 27, 30)",
                              surfaceVariant: "rgb(233, 223, 235)",
                              onSurfaceVariant: "rgb(74, 69, 78)",
                              outline: "rgb(124, 117, 126)",
                              outlineVariant: "rgb(204, 196, 206)",
                              shadow: "rgb(0, 0, 0)",
                              scrim: "rgb(0, 0, 0)",
                              elevation: {
                                level0: "transparent",
                                level1: "rgb(248, 242, 251)",
                                level2: "rgb(244, 236, 248)",
                                level3: "rgb(240, 231, 246)",
                                level4: "rgb(239, 229, 245)",
                                level5: "rgb(236, 226, 243)"
                              },
                              surfaceDisabled: "rgba(29, 27, 30, 0.12)",
                              onSurfaceDisabled: "rgba(29, 27, 30, 0.38)",
                              backdrop: "rgba(51, 47, 55, 0.4)"
                            }
                        }}
                        />
                    </View>

                    <View style={styles.action}>
                        <TextInput
                        label="Sender's Phone"
                        value={phone}
                        underlineColor={'#209eda'}
                        activeUnderlineColor={'#475980'}
                        activeOutlineColor={'#5cdb93'}
                        outlineColor={'#ffffff'}
                        backgroundColor={'#ffffff'}
                        keyboardType='numeric'
                        style={styles.inputSender}
                        onChangeText={phone => setPhone(phone)}
                        theme={{
                            colors: {
                              primary: "rgb(120, 69, 172)",
                              onPrimary: "rgb(255, 255, 255)",
                              primaryContainer: "rgb(240, 219, 255)",
                              onPrimaryContainer: "rgb(44, 0, 81)",
                              secondary: "rgb(102, 90, 111)",
                              onSecondary: "rgb(255, 255, 255)",
                              background: "rgb(255, 251, 255)",
                              onBackground: "rgb(29, 27, 30)",
                              surface: "rgb(255, 251, 255)",
                              onSurface: "rgb(29, 27, 30)",
                              surfaceVariant: "rgb(233, 223, 235)",
                              onSurfaceVariant: "rgb(74, 69, 78)",
                              outline: "rgb(124, 117, 126)",
                              outlineVariant: "rgb(204, 196, 206)",
                              shadow: "rgb(0, 0, 0)",
                              scrim: "rgb(0, 0, 0)",
                              elevation: {
                                level0: "transparent",
                                level1: "rgb(248, 242, 251)",
                                level2: "rgb(244, 236, 248)",
                                level3: "rgb(240, 231, 246)",
                                level4: "rgb(239, 229, 245)",
                                level5: "rgb(236, 226, 243)"
                              },
                              surfaceDisabled: "rgba(29, 27, 30, 0.12)",
                              onSurfaceDisabled: "rgba(29, 27, 30, 0.38)",
                              backdrop: "rgba(51, 47, 55, 0.4)"
                            }
                        }}
                        />
                        {
                            validateMsisdn == '' ? 
                            <></>
                            : validateMsisdn == 'validating' ?
                            <HelperText type="info" visible={true}>
                                <View style={styles.loadingIndicator}>
                                    <ActivityIndicator color="#209eda" />
                                </View>
                            </HelperText>
                            :
                            <HelperText type="info" visible={true} style={styles.senderText}>
                                {senderName}
                            </HelperText>
                        }
                    </View>

                    <View style={styles.action}>
                        <TextInput
                        label="Sender's Pin"
                        value={pin}
                        secureTextEntry={secureTextEntry ? true : false}
                        underlineColor={'#209eda'}
                        activeUnderlineColor={'#475980'}
                        activeOutlineColor={'#5cdb93'}
                        outlineColor={'#ffffff'}
                        backgroundColor={'#ffffff'}
                        keyboardType='numeric'
                        style={styles.inputPin}
                        onChangeText={pin => setPin(pin)}
                        theme={{
                            colors: {
                              primary: "rgb(120, 69, 172)",
                              onPrimary: "rgb(255, 255, 255)",
                              primaryContainer: "rgb(240, 219, 255)",
                              onPrimaryContainer: "rgb(44, 0, 81)",
                              secondary: "rgb(102, 90, 111)",
                              onSecondary: "rgb(255, 255, 255)",
                              background: "rgb(255, 251, 255)",
                              onBackground: "rgb(29, 27, 30)",
                              surface: "rgb(255, 251, 255)",
                              onSurface: "rgb(29, 27, 30)",
                              surfaceVariant: "rgb(233, 223, 235)",
                              onSurfaceVariant: "rgb(74, 69, 78)",
                              outline: "rgb(124, 117, 126)",
                              outlineVariant: "rgb(204, 196, 206)",
                              shadow: "rgb(0, 0, 0)",
                              scrim: "rgb(0, 0, 0)",
                              elevation: {
                                level0: "transparent",
                                level1: "rgb(248, 242, 251)",
                                level2: "rgb(244, 236, 248)",
                                level3: "rgb(240, 231, 246)",
                                level4: "rgb(239, 229, 245)",
                                level5: "rgb(236, 226, 243)"
                              },
                              surfaceDisabled: "rgba(29, 27, 30, 0.12)",
                              onSurfaceDisabled: "rgba(29, 27, 30, 0.38)",
                              backdrop: "rgba(51, 47, 55, 0.4)"
                            }
                        }}
                        />
                    </View>
                    

                    {/* <TouchableOpacity
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
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.submitSection} onPress={() => onProceed()}>
                        { loading ?
                            <Button icon="phone-in-talk" mode="contained" buttonColor={'#209eda'}>
                                <ActivityIndicator color="white" />
                            </Button>:
                            <Button icon="phone-in-talk" mode="contained" buttonColor={'#209eda'}>
                                Initiate Pay
                            </Button> 
                        }
                        
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
    inputSender:{
        width:'90%',
        alignSelf: 'center',
        marginTop: 80
    },
    modal:{
        flex: 1,
        alignContent:'center',
        alignItems:'center',
        // verticalAlign:'center',
        // margin: 20,
        padding: 15,
        marginVertical: Platform.OS === 'ios' ? 260 : 240,
        // marginVertical: 260,
        borderRadius: 5,
        borderColor: '#4772E1',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#ffffff'
    },
    modalIcon:{
        marginBottom: 20
    },
    modalButtonsOne:{
        marginRight:10
    },
    modalButtonsOkay:{
        marginTop: 30
    },
    modalErrorMessage:{
        marginBottom: 20
    },
    theView:{
        flex:1,
        alignContent: 'center',
        textAlign: 'center',
    },
    inputAmount:{
        width:'90%',
        alignSelf: 'center',
        marginTop: 60
    },
    modalButtons:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        // width:'91.5%',
        // left:15,
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 25
    },
    inputPin:{
        width:'90%',
        alignSelf: 'center',
        marginTop: 80,
        marginBottom: 20
    },
    submitSection:{
        width:'60%',
        alignSelf: 'center',
        marginTop: 60
    },
    contain:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width:'91.5%',
        left:15,
        display: 'flex',
        alignItems: 'center',
    },
    senderText:{
        color:'#000000',
        textColor: '#000000'
    },
    pinToggle:{
        marginTop:40,
        display: 'flex',
        alignItems: 'center',
        width:'91.5%',
    },
    pinToggleSwitch:{
        marginLeft: 'auto',
    },
    toggleHelper:{
        marginLeft: 'auto',
    },

})