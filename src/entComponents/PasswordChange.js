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
import { IconButton, MD3Colors, Divider, Text, TextInput, Switch, Button, HelperText, PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import IconTwo from 'react-native-vector-icons/MaterialCommunityIcons';



const PasswordChange = ({ navigation }) => {
    const { userEntToken, entSignOut, changePassword } = useContext(AuthContext);
    const [ loading, setLoading ] = useState(false);
    const [ oldPassword, setOldPassword ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [visible, setVisible] = useState(false);
    const [visibleError, setVisibleError] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => {
        setVisible(false);
        setConfirmPassword('')
        setOldPassword('')
        setNewPassword('')
    }
    const showErrorModal = () => setVisibleError(true);
    const hideErrorModal = () => {
        setVisibleError(false);
        setConfirmPassword('')
        setOldPassword('')
        setNewPassword('')
    }
    

    const submit = async() => {
        if(oldPassword == ''){
            return [
                alert("Input Old Password") 
            ]
        }else if(newPassword == ''){
            return [
                alert("Input New Password") 
            ]
        }else if(confirmPassword == ''){
            return [
                alert("Input Password Confirmation") 
            ]
        }

        if(newPassword != confirmPassword){
            setLoading(false)
            return [
                alert("Password confirmation does not match new password") 
            ]
        }


        setLoading(true)
        console.log('in submit')
        console.log(newPassword)
        console.log(confirmPassword)
        $result = await changePassword(oldPassword, newPassword, confirmPassword)
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
                        label="Old Password"
                        value={oldPassword}
                        underlineColor={'#209eda'}
                        activeUnderlineColor={'#475980'}
                        activeOutlineColor={'#5cdb93'}
                        outlineColor={'#ffffff'}
                        backgroundColor={'#ffffff'}
                        style={styles.inputSender}
                        onChangeText={oldPassword => setOldPassword(oldPassword)}
                        />
                    </View>

                    <View>
                        <TextInput
                            label="New Password"
                            value={newPassword}
                            underlineColor={'#209eda'}
                            activeUnderlineColor={'#475980'}
                            activeOutlineColor={'#5cdb93'}
                            outlineColor={'#ffffff'}
                            backgroundColor={'#ffffff'}
                            style={styles.inputAmount}
                            onChangeText={newPassword => setNewPassword(newPassword)}
                            />
                    </View>

                    <View>
                        <TextInput
                            label="Confirm New Password"
                            value={confirmPassword}
                            underlineColor={'#209eda'}
                            activeUnderlineColor={'#475980'}
                            activeOutlineColor={'#5cdb93'}
                            outlineColor={'#ffffff'}
                            backgroundColor={'#ffffff'}
                            style={styles.inputPin}
                            onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                            />
                    </View>

                    
                    <TouchableOpacity style={styles.submitSection} onPress={() => submit()}>
                        
                    { loading ?
                            <Button icon="phone-in-talk" mode="contained" buttonColor={'#209eda'}>
                                <ActivityIndicator color="white" />
                            </Button>:
                            <Button icon="key-chain" mode="contained" buttonColor={'#209eda'}>
                                Change Password
                            </Button>
}
                    </TouchableOpacity>
                    <Modal isVisible={visible} >
                        <View style={styles.modal}>
                        <IconTwo name="key-chain" size={60} color="#4BB543" style={styles.modalIcon}/>
                        <Text variant="titleMedium">Success! </Text>
                        <Text variant="labelLarge" style={styles.modalErrorMessage}>Password Successfully Changed.</Text>

                            <View style={styles.modalButtons}>
                                 
                                <View style={styles.modalButtonsTwo}>
                                    <TouchableOpacity onPress={hideModal}>
                                        <Button icon="progress-close" mode="contained" buttonColor={'#209eda'}>
                                            Okay
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

export default PasswordChange

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
		flex: 1, 
		backgroundColor: 'white',
        
    },
    modal:{
        flex: 1,
        alignContent:'center',
        alignItems:'center',
        // verticalAlign:'center',
        // margin: 20,
        padding: 15,
        marginVertical: 290,
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
        // marginBottom: 5
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
    inputSender:{
        width:'90%',
        alignSelf: 'center',
        marginTop: 40
    },

    inputAmount:{
        width:'90%',
        alignSelf: 'center',
        marginTop: 40
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