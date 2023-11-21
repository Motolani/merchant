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
import IconTwo from 'react-native-vector-icons/MaterialCommunityIcons';
import Payment from './Payment';
import Transaction from './Transaction';
import Settings from './Settings';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import {PaperProvider} from 'react-native-paper';




const Dashboard = ({ navigation }) => {

    const Tab = createBottomTabNavigator(); 

    		return (
        <PaperProvider>
         <Tab.Navigator
                screenOptions={({ route }) => ({
                    // headerShown: false,
                    // tabBarStyle: {
                    //     height: 50,
                    //     alignItems: 'center',
                    // },
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
                    headerShown: false,
                    tabBarLabelStyle:{
                        paddingBottom: 5,
                        // paddingTop: 2,
                        fontSize: 12,
                        fontWeight: '600'
                    },
                    tabBarIcon: ({focused, color, size}) => (
                        <Icon name="home" size={32} color="#209eda" />
                      )
            }}
            name="Home" component={Home} />
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
                    tabBarIcon: ({focused, color, size}) => (
                        <Icon name="receipt-sharp" size={32} color="#209eda" />
                      )
            }}
            name="Transactions" component={Transaction} />
            <Tab.Screen 
                options={{
                    tabBarActiveTintColor: 'rgb(96, 165, 250)', 
                    tabBarInactiveTintColor:'rgb(75, 85, 99)',
                    tabBarLabelStyle:{
                        paddingBottom: 5,
                        // fontSize: 12,
                        fontWeight: '600',
                    },
                    tabBarIcon: ({focused, color, size}) => (
                        <IconTwo name="account-cash" size={32} color="#209eda" />
                      )
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
                    tabBarIcon: ({focused, color, size}) => (
                        <Icon name="cog-sharp" size={32} color="#209eda" />
                      )
                }}      
            name="Settings" component={Settings} />

          </Tab.Navigator>
        </PaperProvider>
		)
	
}


export default Dashboard