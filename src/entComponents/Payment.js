/* eslint-disable prettier/prettier */
import { StyleSheet, View, TouchableOpacity, Platform, Dimensions, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Awesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Ionic from 'react-native-vector-icons/Ionicons';
import Feather from "react-native-vector-icons/Feather"
import { SelectList } from 'react-native-dropdown-select-list';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../context/AuthContext';
import { IconButton, Text,Portal, TextInput, Switch, Button, HelperText, PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import IconTwo from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';



const Payment = ({ navigation }) => {
    const { initiatePayment, statusCheck, message, entSignOut, userEntToken, transactions } = useContext(AuthContext);
    const [ loading, setLoading ] = useState(false);
    const [ loadingCheck, setLoadingCheck ] = useState(false);
    const [ sender, setSender ] = useState('');
    const [ amount, setAmount ] = useState('');
    const [ reference, setReference ] = useState('');
    const [ referenceDeluxe, setReferenceDeluxe ] = useState('');
    const [ checkingReference, setCheckingReference ] = useState('');
    const [ resultMess, setResultMess ] = useState('');
    const [ checkStat, setCheckStat ] = useState('');
    const [ done, setDone ] = useState(false);
    const [ pin, setPin ] = useState(null);
    const [ withPin, setWithPin ] = useState(false);
    const [visible, setVisible] = useState(false);
    const [senderName, setSenderName] = useState('');
    const [validateMsisdn, setValidateMsisdn] = useState('');
    const [visibleError, setVisibleError] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const showModal = () => setVisible(true);
    const hideModalDone = () => {
        setVisible(false);
        setReference('')
        setSender('')
        setAmount('')
        setPin('')
        setCheckStat('')
        setDone(false)
    }

    const hideModal = () => {
        setVisible(false);
        setReference('')
        setSender('')
        setAmount('')
        setPin('')
        setDone(false)

    }
    const showErrorModal = () => setVisibleError(true);
    const hideErrorModal = () => {
        setVisibleError(false);
        setReference('')
        setSender('')
        setAmount('')
        setPin('')
    }

    const onToggleSwitch = () => {
        setWithPin(!withPin)
        if(withPin == true){
            setPin(null)
        }
    };

    const submit = async() => {
        if(sender == ''){
            return [
                alert("Input Sender Number") 
            ]
        }else if(amount == ''){
            return [
                alert("Input Amount") 
            ]
        }   
        setLoading(true)
        console.log('in submit')
        console.log(sender)
        console.log(amount)
        console.log(pin)

        result = await initiatePayment(sender, amount, pin)
        console.log(result)
        setLoading(false)

        
        if(result.status == 200){
            setReference(result.reference)
            setReferenceDeluxe(result.reference)
            showModal()
        }else if(result.status == 302){
            entSignOut()
            return [
                alert("Token Expired") 
            ]
        }else if(result.status == 300){
            console.log('inside eeelse if')
            showErrorModal()
        }else if(result.status == 800){
            console.log('invalid password')
            return [
                alert(result.message) 
            ]
        }
        else{
            console.log('inside else')
            return [
                alert(message) 
            ]
        }
        
    }
    const checkStatus = async() => {
        setLoadingCheck(true)

            setCheckingReference(reference)

        if(reference != ''){
            console.log(reference)
            const result = await statusCheck(reference)

            setCheckStat(result.status)
            if(result.status == 200){
                setLoadingCheck(false)
                setDone(true)
                setReference('')
                transactions()
                
                return result
            }else if(result.status == 400){
                setLoadingCheck(false)
                return result
            }else if(result.status == 302){
                setLoadingCheck(false)
                setDone(true)
                setReference('')
                return result
            }else{
                setLoadingCheck(false)
                setDone(true)
                setReference('')
                return result
            }
        }
        
    }
    const doStuff = () => {
        console.log('reference Deluxe')
        console.log(referenceDeluxe)
        navigation.navigate('Transaction Details', {transReference: referenceDeluxe})
        hideModalDone()

    }
    const validatePhone = async() => {

        setValidateMsisdn('validating')
        //call validate api
        //put in here when you get end point
        // const authUser = { sender }
        setLoading(true)

        //set the validated name state to the name to display
        let sendPhone = {mobilePhone: sender}
        console.log('sendPhone')
        console.log(sendPhone)
        try {
            const header = { 
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'token': userEntToken,
            }
            const {data} = await axios.post("https://test.pinspay.com/api/merchant/validatephone", sendPhone, { headers: header})
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
                    setSender(''),
                ]
            }else if(data.status == "302"){
                // entSignOut()
                let response = data;
                console.log(response);
                console.log("response.status ", response.status)
                return [
                    alert(response.data.firstName +' '+response.data.lastName+' Please complete Your registration to continue'), 
                    setValidateMsisdn(''),
                    setSender('')
                ]
            }else if(data.status == 300){
                
                // validateMsisdn('')
                return [
                    alert(data.message),
                    setValidateMsisdn(''),
                    setSender('')
                ]
            }else{
                return [
                    alert(data.message),
                    setValidateMsisdn(''),
                    setSender('')
                ]
            }
        } catch (error) {
            console.log('validating error', error)
            alert("Something went wrong")
            setValidateMsisdn('')
            setSender('')
        }
        setLoading(false)

    }

    const updateSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    }

    useEffect(() => {
       if(sender.length >= 11){
            validatePhone()
       }else{
        setSenderName('')
       }
    }, [sender])

    return (
        <PaperProvider>
            <View style={styles.container}>

                <ScrollView>
                    <View>
                        <TextInput
                        label="Enter Sender Number"
                        value={sender}
                        underlineColor={'#209eda'}
                        activeUnderlineColor={'#475980'}
                        activeOutlineColor={'#5cdb93'}
                        outlineColor={'#ffffff'}
                        backgroundColor={'#ffffff'}
                        style={styles.inputSender}
                        onChangeText={sender => setSender(sender)}
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

                    <View>
                        <TextInput
                            label="Enter Amount"
                            value={amount}
                            underlineColor={'#209eda'}
                            activeUnderlineColor={'#475980'}
                            activeOutlineColor={'#5cdb93'}
                            outlineColor={'#ffffff'}
                            backgroundColor={'#ffffff'}
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

                    { withPin ?
                    <View>
                        <TextInput
                            label="Enter Pin"
                            value={pin}
                            secureTextEntry={secureTextEntry ? true : false}
                            underlineColor={'#209eda'}
                            activeUnderlineColor={'#475980'}
                            activeOutlineColor={'#5cdb93'}
                            outlineColor={'#ffffff'}
                            backgroundColor={'#ffffff'}
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
                    </View> : <></>
                    }
                    <View style={styles.pinToggle}>
                        <HelperText type="info" visible={true} style={styles.textColoring}>
                            Toggle for pin
                        </HelperText>
                        <Switch value={withPin} onValueChange={onToggleSwitch} style={styles.pinToggleSwitch} color={'#209eda'}/>
                        
                    </View>
                    {
                        senderName ?
                        <TouchableOpacity style={styles.submitSection} onPress={() => submit()}>
                            { loading ?
                                <Button icon="phone-in-talk" mode="contained" buttonColor={'#209eda'}>
                                    <ActivityIndicator color="white" />
                                </Button>:
                                <Button icon="phone-in-talk" mode="contained" buttonColor={'#209eda'}>
                                    Initiate Pay
                                </Button> 
                            }
                            
                        </TouchableOpacity> 
                        :
                        <TouchableOpacity style={styles.submitSection} >
                            <Button icon="phone-in-talk" mode="contained" disabled={true} buttonColor={'#209eda'} >
                                <Text  > Validate Sender </Text>
                            </Button>
                        </TouchableOpacity>

                    }
                    
                    <Modal isVisible={visible} >
                        <View style={styles.modal}>
                        <IconTwo name="phone-in-talk" size={60} color="#4BB543" style={styles.modalIcon}/>
                        {checkStat == '' ?
                            <Text variant="labelLarge" style={styles.textColoring}>Please wait while transaction is being approve via phone call from 012275020 to the senders phone</Text>
                        :checkStat == '400' ?
                        <View style={styles.theView}>
                            <Text variant="titleMedium" style={styles.textColoring}> Pending!</Text>
                            <Text variant="labelLarge" style={styles.textColoring}> Please Wait while Payment while Sender Approves transaction</Text>

                       </View>
                        : checkStat == '200' ?
                        <View>
                            <Text variant="titleMedium" style={styles.textColoring}> Successful!</Text>
                            <Text variant="labelLarge" style={styles.textColoring}> Payment Initiation Completed</Text>
                            <TouchableOpacity onPress = {doStuff} style={styles.doStuffStyle} >
                                <Button icon="phone-check" mode="contained" buttonColor={'#209eda'} >
                                    Print Reciept
                                </Button>
                            </TouchableOpacity>
                        </View>
                        :
                            <View>
                                <Text variant="titleMedium" style={styles.textColoring}> Failed!</Text>
                                <Text variant="labelLarge" style={styles.textColoring}> Payment Initiation Failed, Please try again later</Text>
                            </View>
                        }
                            { done ?
                                <View style={styles.modalButtonsOkay}>
                                    <TouchableOpacity onPress={hideModalDone}>
                                        <Button icon="progress-close" mode="contained" buttonColor={'#209eda'}>
                                            Okay
                                        </Button>
                                    </TouchableOpacity>    
                                </View> :
                                <View style={styles.modalButtons}>
                                    <View style={styles.modalButtonsOne}>
                                        <TouchableOpacity onPress={checkStatus}>
                                        { loadingCheck ?
                                            <Button icon="phone-check" mode="contained" buttonColor={'#209eda'} >
                                                <ActivityIndicator color="white" />
                                            </Button>:
                                            <Button icon="phone-check" mode="contained" buttonColor={'#209eda'} >
                                                Check
                                            </Button>
                                        }   
                                        </TouchableOpacity>

                                    </View>
                                    
                                    <View style={styles.modalButtonsTwo}>
                                        <TouchableOpacity onPress={hideModal}>
                                            <Button icon="progress-close" mode="contained" buttonColor={'#209eda'}>
                                                Back
                                            </Button>
                                        </TouchableOpacity>    
                                    </View>
                                    
                                </View> 
                            }
                        </View>
                    </Modal>

                    <Modal isVisible={visibleError} >
                        <View style={styles.modal}>
                        <IconTwo name="window-close" size={70} color="red" style={styles.modalIcon}/>
                        <Text variant="titleMedium" style={styles.textColoring}>Failed! </Text>
                        <Text variant="labelLarge" style={styles.modalErrorMessage}>{message}</Text>

                            <View style={styles.modalButtons}>
                                <View style={styles.modalButtonsTwo}>
                                    <TouchableOpacity onPress={hideErrorModal}>
                                        <Button icon="progress-close" mode="contained" buttonColor={'#209eda'}>
                                            Back
                                        </Button>
                                    </TouchableOpacity>    
                                </View>
                            </View>
                        </View>
                    </Modal>

                </ScrollView>        
            </View>
        </PaperProvider>
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
        marginTop: 40
    },
    doStuffStyle:{
        paddingTop: 25
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
    textColoring:{
        color:'#000000',
        textColor: '#000000'
    },
    modalButtonsOne:{
        marginRight:10
    },
    modalButtonsOkay:{
        marginTop: 30
    },
    modalErrorMessage:{
        marginBottom: 20,
        color:'#000000',
        textColor: '#000000'
    },
    theView:{
        flex:1,
        alignContent: 'center',
        textAlign: 'center',
    },
    inputAmount:{
        width:'90%',
        alignSelf: 'center',
        marginTop: 40
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
        marginTop: 40,
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
    pinToggle:{
        marginTop:40,
        display: 'flex',
        alignItems: 'center',
        width:'91.5%',
    },
    pinToggleSwitch:{
        marginLeft: 'auto',
    },
    senderText:{
        color: '#209eda',
    },

})