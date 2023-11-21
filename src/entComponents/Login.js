/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Dimensions, Platform, TextInput, Image, Button, Alert, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useContext } from 'react'
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Awesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import { AuthContext } from '../context/AuthContext';
import {PaperProvider} from 'react-native-paper';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


const Login = ({ navigation }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const { entSignIn, error } = useContext(AuthContext);

    const onSubmit = async () => {
        if(!username || !password){
            return alert("Fill in all fields")
        }
        console.log('username - ' + username, 'password - ' + password);
        setLoading(true)
        await entSignIn(username, password);
        console.log(username, password);
        if(error){
            return [
                alert(error),
                setLoading(false)
            ]    
        }
        setLoading(false)
    }


    const updateSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    }


    return (
        <PaperProvider>
            <SafeAreaView style={styles.mainContainer}>
                <StatusBar backgroundColor='#f2f2f2' barStyle="dark-content" animated={true} />
                <ScrollView contentContainerStyle={{paddingBottom: 40}} style={{marginTop: 20}} showsVerticalScrollIndicator={false}>
                    <>
                <View style={styles.topContainer}>
                    <View style={styles.logoCont}>
                        <Animatable.Image
                            animation="bounceIn"
                            duraton="1500"
                            source={require('../images/pins-logo.png')}
                            style={styles.logo}
                            resizeMode="stretch"
                        />
                    </View>
                </View>
                    
                    <Animatable.View 
                        animation="fadeInUpBig"
                        style={styles.bottomContainer}
                    >
                        <Text style={styles.text_header}>Welcome!</Text>
                        {/* <Text style={styles.text_footer}>Username:</Text> */}
                        <View>
                            <View style={styles.action}>
                                <Awesome name="user-o" size={20} color="black" />
                                <TextInput 
                                    placeholder="Enter Username"
                                    style={styles.textInput}
                                    value={username}
                                    autoCapitalize="none"
                                    onChangeText={setUsername}
                                    placeholderTextColor={'grey'}
                                    editable={!loading}
                                />
                                <Animatable.View
                                    animation="bounceIn"
                                >
                                    <Feather 
                                        name="check-circle"
                                        color="green"
                                        size={20}
                                    />
                                </Animatable.View>
                            </View>

                            {/* <Text style={[styles.text_footer, {
                                marginTop: 35
                            }]}>Password: </Text> */}
                            <View style={styles.action}>
                                <Feather name="lock" size={20} color="black" />
                                <TextInput 
                                    placeholder="Enter Password"
                                    secureTextEntry={secureTextEntry ? true : false}
                                    style={styles.textInput}
                                    value={password}
                                    autoCapitalize="none"
                                    onChangeText={setPassword}
                                    placeholderTextColor={'grey'}
                                    editable={!loading}
                                />
                                <TouchableOpacity onPress={updateSecureTextEntry}>
                                    {secureTextEntry ? 
                                    <Feather name="eye-off" color="green" size={20} />
                                    :
                                    <Feather name="eye" color="green" size={20} />
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                            style={styles.entMerchant}
                        >
                            <Text style={styles.entMerchantText}>Switch to Merchant Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={onSubmit}
                            style={styles.signInbutton}
                        >
                                {
                                    loading ? (
                                        <ActivityIndicator color="white" />
                                    ) : (
                                        <Text style={styles.signIn}>Sign In</Text>
                                    )
                                }
                            {/* </LinearGradient> */}
                        </TouchableOpacity>

                    </Animatable.View>
                    </>
                    </ScrollView>
            </SafeAreaView> 
        </PaperProvider>

    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const height_logo = screenHeight * 0.6;
const width_logo = screenWidth * 0.6;



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f2f2f2', 
        paddingHorizontal: 12
    },
    topContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    logoCont: {
        alignItems: 'center',
        marginTop: 80
    },
    logo: {
        width: 230,  //height_logo,
        height: 102  //height_logo
    },
    bottomContainer: {
        flex: 2,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    text_header: {
        fontSize: 30,
        fontWeight: '500',
        marginBottom: 30,
        color: 'black',
    },
    text_footer: {
        fontSize: 18,
        color: 'black',
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        alignItems: 'center',
        color: 'black',
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        marginTop: 22,
        marginBottom: 22,
        borderBottomWidth: 1,
        borderBottomColor: '#bfbfbf',
        paddingBottom: 5
    },
    button: {
        marginTop: 30,
        backgroundColor: '#5adb96',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
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
    entMerchantText:{
        color: 'rgb(96, 165, 250)',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 18,
        alignItems: 'center',
    },
    entMerchant: {
        marginTop:30,
        marginButton:15
    }
});


export default Login