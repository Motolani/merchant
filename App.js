/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'

import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Login from './src/components/Login'
import EntLogin from './src/entComponents/Login';
import EntDashboard from './src/entComponents/Dashboard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Ent from 'react-native-vector-icons/Entypo'
import Dashboard from './src/components/Dashboard';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionic from 'react-native-vector-icons/Ionicons';
import Profile from './src/components/Profile';
import TransactionHistory from './src/components/TransactionHistory';
import Payment from './src/components/Payment';
import WalletHistory from './src/components/WalletHistory';
import { AuthContext } from './src/context/AuthContext';
import TransactionHistoryDetails from './src/components/TransactionHistoryDetails';
import TransDetails from './src/entComponents/TransactionDetails'
import changePWD from './src/entComponents/PasswordChange';



const App = ({ navigation}) => {

    const { userToken, userEntToken, merchantType }  = useContext(AuthContext);
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator(); 
    
    // useEffect(() => {
    //     console.log('hello');
    //     console.log('userToken');
    //     console.log(userToken);
    //     console.log('byeee');
    // }, []);

    const BottomTabScreen = () => {
		return (
			<Tab.Navigator
				screenOptions={({ route }) => ({
					headerShown: false,
					tabBarStyle: {
						height: 70
					},

					tabBarIcon: ({ focused, size, color }) => {
						let iconName;
						if (route.name === 'Dashboard') {
							iconName = focused ? "home" : "home-outline";
							size = focused ? size + 8 : size + 2;
						} else if (route.name === 'History') {
							iconName = focused ? 'ios-timer' : 'ios-timer-outline';
							size = focused ? size + 8 : size + 2;
						}else if (route.name === 'Profile') {
							iconName = focused ? 'ios-person' : 'ios-person-circle';
							size = focused ? size + 8 : size + 2;
						}

						return <Ionic name={iconName} size={size} color={color} />
					}

				})}>

				<Tab.Screen name='Dashboard' component={Dashboard} />
                <Tab.Screen name='History' component={WalletHistory} />
                <Tab.Screen options={{ headerShown: false, headerStyle: { backgroundColor: '#b3d9ff', }}} name='Profile' component={Profile} />

			</Tab.Navigator>
		)
	}

    return (
        <NavigationContainer>
            <StatusBar animated={true} backgroundColor="rgb(96, 165, 250)"/>
            <Stack.Navigator 
                screenOptions={{
                    headerShown: false,
                }}>
                {/* <Stack.Screen name="EntLogin" component={EntLogin} /> */}
                
                {/* {
                    userToken ?
                    <Stack.Screen name="Dashboard" component={Dashboard} />
                    :
                    <Stack.Screen name="Login" component={Login} />
                } */}
                {
                    userEntToken ?
                    <Stack.Screen name="Back" component={EntDashboard} />
                    :
                    <Stack.Screen name="EntLogin" component={EntLogin} />
                }
                {/* <Stack.Screen name="Back" component={EntDashboard} /> */}
                <Stack.Screen options={{ headerShown: true, headerStyle: { backgroundColor: '#f2f2f2' }}} name="Change Password" component={changePWD} />
                <Stack.Screen options={{ headerShown: true, headerStyle: { backgroundColor: '#f2f2f2' }}} name="Transaction Details" component={TransDetails} />

                <Stack.Screen options={{ headerShown: true, headerStyle: { backgroundColor: '#f2f2f2' }}} name="Payment" component={Payment} />
                {/* <Stack.Screen options={{ headerShown: false }} name="TransactionDetails" component={TransactionHistoryDetails} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}



const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#004d99'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop: 5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
});

export default App;
