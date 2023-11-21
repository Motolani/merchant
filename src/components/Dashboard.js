/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, ImageBackground, Dimensions, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import IMG from '../images/backgroundSamp.png'
import im from '../../assets/images/bg_4.png';
import lm from '../../assets/images/bg_6.png';
import Font from 'react-native-vector-icons/'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dash from './Dash';
import WalletHistory from './WalletHistory';
import Ionic from 'react-native-vector-icons/Ionicons';
import Payment from './Payment';

const Dashboard = ({ navigation }) => {

    const Tab = createBottomTabNavigator(); 

    /* const BottomTabScreen = () => { */
		return (
			// <Tab.Navigator
			// 	screenOptions={({ route }) => ({
			// 		headerShown: false,
			// 		tabBarStyle: {
			// 			height: 90,
            //             backgroundColor: '#0098DB ',
			// 		},

			// 		tabBarIcon: ({ focused, size, color }) => {
			// 			let iconName;
			// 			if (route.name === 'Home') {
			// 				iconName = focused ? "home" : "home-outline";
			// 				size = focused ? size + 8 : size + 2;
            //                 color = 'white';
			// 			} else if (route.name === 'History') {
			// 				iconName = focused ? 'ios-timer' : 'ios-timer-outline';
			// 				size = focused ? size + 8 : size + 2;
            //                 color = 'white';
			// 			}

			// 			return <Ionic name={iconName} size={size} color={color} />
			// 		}

			// 	})}
                
            //     >

			// 	<Tab.Screen options={{ 
            //             tabBarStyle:{backgroundColor: '#155ae4', height: 80}, 
            //             tabBarActiveTintColor: 'white', 
            //             tabBarInactiveTintColor:'white',
            //             tabBarLabelStyle:{
            //                 paddingBottom: 7,
            //                 fontSize: 14
            //             }
            //         }}
            //         name='Home' component={Dash} 
            //     />
            //     <Tab.Screen options={{ 
            //             tabBarStyle:{backgroundColor: '#155ae4', height: 80}, 
            //             tabBarActiveTintColor: 'white', 
            //             tabBarInactiveTintColor:'white',
            //             tabBarLabelStyle:{
            //                 paddingBottom: 7,
            //                 fontSize: 14
            //             }
            //         }}
            //         name='History' component={WalletHistory} 
            //     />
            //     {/* <Tab.Screen options={{ headerShown: false, headerStyle: { backgroundColor: '#b3d9ff', }}} name='Profile' component={Profile} /> */}

			// </Tab.Navigator>


            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: {
                        height: 50,
                        alignItems: 'center',
                    },
                    // tabBarShowLabel: false,

                    tabBarIcon: ({ focused, size, color }) => {
                        let iconName;
                        if (route.name === 'Home') {
                            iconName = 'home';
                            size =  size + 2;
                            // color = 'white';
                        } else if (route.name === 'History') {
                            iconName = 'history';
                            size = size - 1;
                            // color = 'white';
                        }
                        else if (route.name === 'Payment') {
                            iconName = 'bank';
                            size = size - 1;
                            // color = 'white';
                        }

                        return <FontAwesome name={iconName} size={size} color={color} />
                    }

                })}
            >
            <Tab.Screen 
                options={{
                    tabBarActiveTintColor: 'rgb(96, 165, 250)', 
                    tabBarInactiveTintColor:'rgb(75, 85, 99)',
                    tabBarLabelStyle:{
                        paddingBottom: 5,
                        // paddingTop: 2,
                        fontSize: 12,
                        fontWeight: '600'
                    },
            }}
            name="Home" component={Dash} />
            <Tab.Screen 
                options={{
                    tabBarActiveTintColor: 'rgb(96, 165, 250)', 
                    tabBarInactiveTintColor:'rgb(75, 85, 99)',
                    tabBarLabelStyle:{
                        paddingBottom: 5,
                        // fontSize: 12,
                        fontWeight: '600',
                    },
                }}      
            name="Payment" component={Payment} />
            <Tab.Screen 
                options={{
                    tabBarActiveTintColor: 'rgb(96, 165, 250)', 
                    tabBarInactiveTintColor:'rgb(75, 85, 99)',
                    tabBarLabelStyle:{
                        paddingBottom: 5,
                        // fontSize: 12,
                        fontWeight: '600',
                    },
                }}      
            name="History" component={WalletHistory} />

          </Tab.Navigator>
		)
	
}


export default Dashboard