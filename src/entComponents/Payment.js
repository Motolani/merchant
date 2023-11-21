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



const Payment = ({ navigation }) => {
    const { initiatePayment } = useContext(AuthContext);
    const [ loading, setLoading ] = useState(false);
    const [ sender, setSender ] = useState('');
    const [ amount, setAmount ] = useState('');
    const [ pin, setPin ] = useState(null);
    const [ withPin, setWithPin ] = useState(false);
    const [visible, setVisible] = useState(false);
    const [visibleError, setVisibleError] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => {
        setVisible(false);
        setSender('')
        setAmount('')
        setPin('')
    }
    const showErrorModal = () => setVisibleError(true);
    const hideErrorModal = () => {
        setVisibleError(false);
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
        $result = await initiatePayment(sender, amount, pin)
        setLoading(false)

        if($result.status == 200){
            showModal()
        }else if($result.status == 300){
            entSignOut()
            return [
                alert("Token Expired") 
            ]
        }else{
            showErrorModal();
        }
        
    }

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
                        />
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
                            />
                    </View>

                    { withPin ?
                    <View>
                        <TextInput
                            label="Enter Pin"
                            value={pin}
                            underlineColor={'#209eda'}
                            activeUnderlineColor={'#475980'}
                            activeOutlineColor={'#5cdb93'}
                            outlineColor={'#ffffff'}
                            backgroundColor={'#ffffff'}
                            style={styles.inputPin}
                            onChangeText={pin => setPin(pin)}
                            />
                    </View> : <></>
                    }
                    <View style={styles.pinToggle}>
                        <HelperText type="info" visible={true} style={styles.toggleHelper}>
                            Toggle for pin
                        </HelperText>
                        <Switch value={withPin} onValueChange={onToggleSwitch} style={styles.pinToggleSwitch} color={'#209eda'}/>
                        
                    </View>
                    
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
                    <Modal isVisible={visible} >
                        <View style={styles.modal}>
                        <IconTwo name="phone-in-talk" size={60} color="#4BB543" style={styles.modalIcon}/>
                        <Text variant="labelLarge" style={styles.modalMessage}>Please wait while transaction is being approve via phone call from 012275020 to the senders phone</Text>

                            <View style={styles.modalButtons}>
                                <View style={styles.modalButtonsOne}>
                                    <TouchableOpacity>
                                        <Button icon="phone-check" mode="contained" buttonColor={'#209eda'} >
                                            Check
                                        </Button>
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
                        </View>
                    </Modal>

                    <Modal isVisible={visibleError} >
                        <View style={styles.modal}>
                        <IconTwo name="window-close" size={70} color="red" style={styles.modalIcon}/>
                        <Text variant="titleMedium">Failed! </Text>
                        <Text variant="labelLarge" style={styles.modalErrorMessage}>Something went wrong, please try again later.</Text>

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
    modal:{
        flex: 1,
        alignContent:'center',
        alignItems:'center',
        // verticalAlign:'center',
        // margin: 20,
        padding: 15,
        marginVertical: 260,
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
    modalButtonsTwo:{

    },
    modalErrorMessage:{
        marginBottom: 20
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
    toggleHelper:{
        marginLeft: 'auto',
    },

})