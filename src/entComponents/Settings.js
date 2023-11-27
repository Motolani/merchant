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
import { IconButton, MD3Colors, Divider, PaperProvider, Switch} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import IconTwo from 'react-native-vector-icons/MaterialCommunityIcons';
import Storage from '../../Helpers/Storage';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Settings = ({ navigation }) => {
    const { msisdn, userToken, signOut } = useContext(AuthContext);
    const [ loading, setLoading ] = useState(false);
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [autoLogin, setAutoLogin] = useState(false);
    const [biometryType, setBiometryType] = useState(undefined);
    

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const [biometricLogin, setBiometricLogin] = useState(bioFix);
  
    var bioFix = false
    useEffect(() => {
        AsyncStorage.getItem("@loginBiometric").then((value) => {
        
        if(value !== null && value == 'true'){
            bioFix = true
            setBiometricLogin(true)
        }
        // alert(value); // you  will need use the alert in here because this is the point in the execution which you receive the value from getItem.
        // you could do your authentication and routing logic here but I suggest that you place them in another function and just pass the function as seen in the example below.
        });
    })
    const toggleSwitch = () => {
        setBiometricLogin(!biometricLogin)

        var rx = 'false'
        // console.log('state value: '+biometricLogin)
        if(!biometricLogin == true){
        rx = 'true'
        }

        const storeData = async () => {
        try {
            await AsyncStorage.setItem(
            '@loginBiometric',
            rx,
            );
            // console.log('loginbio is set to '+ rx)
        } catch (error) {
            // Error saving data
            // console.log(error)
        }
        };
        storeData()
    }


    
    const onchangeAutoLogin = (res) => {
        if (biometricLogin === true && res === true) {
          saveTouchIDLogin(false);
        }
    
        saveAutoLogin(res);
      };
    
    const saveTouchIDLogin = (res, biometryType = undefined) => {
        // this.setState((state) => ({
        //   biometricLogin: !state.biometricLogin,
        //   biometryType,
        // }));
        setBiometricLogin(!biometricLogin)
        Storage.storeObjectData('biometricLogin', res);
      };
    
    const saveAutoLogin = (res) => {
        setAutoLogin(!autoLogin),
        Storage.storeObjectData('autoLogin', res);
      };
    
    const loadAutoLogin = async () => {
        let [autoLoginPromise, biometricLoginPromise] = await Promise.all([
          Storage.getObjectData('autoLogin').then((res) => res),
          Storage.getObjectData('biometricLogin').then((res) => res),
        ]).then((results) => results);
    
        if (autoLoginPromise.data != null) {
            setAutoLogin(autoLoginPromise.data)
        }
    
        if (biometricLoginPromise.data != null) {
            setBiometricLogin(biometricLoginPromise.data);
        }
      };

      useEffect(() => {
        loadAutoLogin()
    }, []);
    return (
        <PaperProvider>
            <View style={styles.container}>
                <ScrollView> 
                    <TouchableOpacity onPress={() => navigation.navigate('Change Password')} style={styles.changePin}>

                        <View style={styles.contain}>
                                <View style={styles.theBorder}>
                                    <IconTwo name="key-chain"  size={32} color="#10486c" style={styles.withPin}/>
                                </View>
                                <Text style={styles.itemText}>Change Password</Text>
                                <Icon name="chevron-forward"  size={20} color="#000000" style={styles.arrowIcon}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onToggleSwitch} style={styles.changePin}>
                        <View style={styles.containTwo}>
                            <View style={styles.theBorder}>
                                <IconTwo name="fingerprint"  size={32} color="#10486c" style={styles.withPin}/>
                            </View>
                            <Text style={styles.itemText}>Toggle Finger Pin</Text>
                            <Switch  color={'#209eda'} style={styles.arrowIcon} onValueChange={toggleSwitch} value={biometricLogin}/>
                        </View>
                    </TouchableOpacity>

                </ScrollView>
                
            </View>
        </PaperProvider>

    )
}

export default Settings

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
		flex: 1, 
		backgroundColor: 'white',
        
    },
    theBorder:{
        backgroundColor: '#f3f4fb',
        borderRadius: 45,
        marginTop: 5,
        borderColor: '#10486c',
        borderWidth: 1,
        width: '11%',
        // verticalAlign: 'center',
        // paddingVertical: 5,
        justifyContent: 'center',
        // marginLeft: 50
      },
      changePin:{
        marginTop: 20
      },
      arrowIcon:{
        magrinTop: 12,
        marginLeft: 'auto',
      },
      itemText:{
        fontWeight: 'bold',
        marginTop:13,
        color: 'rgb(71, 85, 105)',
        fontSize: 17,
        marginLeft: 15
    },
    paymentPlan:{
        paddingTop: 15,
        paddingHorizontal: 25,
    },
    withPin: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        marginLeft:" 10%"
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
    contain:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width:'91.5%',
        left:15,
        display: 'flex',
        alignItems: 'center',
    },

    containTwo:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width:'91.5%',
        left:15,
        display: 'flex',
        alignItems: 'center',
        marginTop: 15
    },


})