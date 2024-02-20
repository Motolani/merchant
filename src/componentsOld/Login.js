import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Dimensions, Platform, TextInput, Image, Button, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Awesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import { AuthContext } from '../context/AuthContext';




const Login = ({navigation}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [validUser, setValidUser] = useState(true);
    const [validPassword, setValidPassword] = useState(true);

    const { signIn } = useContext(AuthContext); 

    const onSubmit = async() => {
        console.log('username' + username, 'password' + password);
        if(username && password == ""){
            Alert.alert("Input Fields cannot be empty");
        }
        await signIn(username, password);
        console.log(username, password);
    }


    const updateSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    }


	return (
		<View style={styles.container}>
			<StatusBar backgroundColor='#b3d9ff' barStyle="dark-content" animated={true} />
			<View style={styles.header}>
				<Text style={styles.text_header}>Welcome!</Text>
			</View>
			<Animatable.View 
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: "#0073e6"
                }]}
        	>
				<Text style={[styles.text_footer, {
					color: "white"
				}]}>Username:</Text>
				<View style={styles.action}>
					<Awesome name='user-o' size={20} color="#fff" />
                    <TextInput 
                        placeholder=" Your Username "
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: "white",
                        }]}
                        value={username}
                        autoCapitalize="none"
                        onChangeText={setUsername}
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

                <Text style={[styles.text_footer, {
                    color: "white",
                    marginTop: 35
                }]}>Password</Text>
                <View style={styles.action}>
                    <Feather name="lock" color="#fff" size={20} />
                    <TextInput 
                        placeholder="Your Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={secureTextEntry ? true : false}
                        style={[styles.textInput, {
                            color: "white",
                        }]}
                        value={password}
                        autoCapitalize="none"
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {secureTextEntry ? 
                        <Feather name="eye-off" color="white" size={20} />
                        :
                        <Feather name="eye" color="white" size={20} />
                        }
                    </TouchableOpacity>
                </View>

                <TouchableOpacity>
                    <Text style={{color: '#b3d9ff', marginTop:15}}>Forgot password?</Text>
                </TouchableOpacity>

                <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn} onPress={onSubmit}>
                        <LinearGradient colors={['#b3d9ff', '#0073e6']} style={styles.signIn}>
                            <Text style={[styles.textSign, {color:'#fff' }]}>Sign In</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
			</Animatable.View>
		</View>




        
        /* <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ paddingHorizontal: 25 }}>
                <View style={{ alignItems: 'center' }}>
                    <Animatable.Image
                        animation="bounceIn"
                        duraton="1500"
                        source={require('../images/loggoo.png')}
                        style={styles.logo}
                        resizeMode="stretch"
                    />
                </View>

                <Text
                    style={{
                        fontFamily: 'Roboto-Medium',
                        fontSize: 28,
                        fontWeight: '500',
                        color: '#333',
                        marginBottom: 30,
                    }}>
                    Login
                </Text>

                <TextInput
                    placeholder=" Your Username "
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: "white",
                    }]}
                    value={username}
                    autoCapitalize="none"
                    onChangeText={setUsername}
                />

                <TextInput
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: "white",
                    }]}
                    value={password}
                    autoCapitalize="none"
                    onChangeText={setPassword}
                />


                <TouchableOpacity
                    onPress={() => { }}
                    style={{
                        backgroundColor: '#AD40AF',
                        padding: 20,
                        borderRadius: 10,
                        marginBottom: 30,
                    }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontWeight: '700',
                            fontSize: 16,
                            color: '#fff',
                        }}>
                    </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView> */


	)
}


const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
		flex: 1, 
		backgroundColor: '#b3d9ff'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#0073e6',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#ffffff',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, 
        color: ['#b3d9ff', '#0073e6'] 
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },

});


export default Login