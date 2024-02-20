import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, ImageBackground, Dimensions, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import IMG from '../images/backgroundSamp.png'
import im from '../../assets/images/bg_4.png';
import lm from '../../assets/images/bg_6.png';
import Font from 'react-native-vector-icons/'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dash from './Dash';
import WalletHistory from './WalletHistory';
import Ionic from 'react-native-vector-icons/Ionicons';

const Dashboard = ({ navigation }) => {

    const Tab = createBottomTabNavigator(); 

    /* const BottomTabScreen = () => { */
		return (
			<Tab.Navigator
				screenOptions={({ route }) => ({
					headerShown: false,
					tabBarStyle: {
						height: 80
					},

					tabBarIcon: ({ focused, size, color }) => {
						let iconName;
						if (route.name === 'Home') {
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

				<Tab.Screen name='Home' component={Dash} />
                <Tab.Screen name='History' component={WalletHistory} />
                {/* <Tab.Screen options={{ headerShown: false, headerStyle: { backgroundColor: '#b3d9ff', }}} name='Profile' component={Profile} /> */}

			</Tab.Navigator>
		)
	/* } */
/* 
    const dt = new Date();
    const n = dt.toDateString();
    const time = dt.toLocaleTimeString();

    const [showBalance, setShowBalance] = useState(false);

    const toggleBalance = () => {
        if (showBalance) {
            setShowBalance(false);
        } else {
            setShowBalance(true);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#b3d9ff' barStyle="dark-content" animated={true} />
            <View style={styles.header}>
                <Text style={styles.headerText}> Hello!, </Text>
                <Text style={styles.headerText}> John Doe </Text>
            </View>
            <View style={styles.imgBgCont}>
                <ImageBackground source={im} style={styles.imgBg} imageStyle={styles.imgBgSty}>
                    <View style={styles.imgTextCont}>
                        <Text style={styles.imgText}> Wallet Balance</Text>
                        <View style={styles.balCont}>
                            {showBalance ? 
                            <Text style={styles.bal}> ₦0.00 </Text>
                            : <Text style={styles.bal}> ₦ ***** </Text> }
                            <TouchableOpacity style={styles.toggleCont} onPress={() => toggleBalance()}>
                                {showBalance ? 
                                <Icon name="eye" size={24} color="#004d99" style={styles.toggle} />
                                :
                                <Icon name="eye-off" size={24} color="#004d99" style={styles.toggle} />
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dateCont}>
                            <Text style={styles.dateText}>{n}</Text>
                            <Text style={styles.dateText}>{time}</Text>
                        </View>
                        <Text></Text>
                    </View>
                </ImageBackground>
            </View>
            
            <View style={styles.menuCont}>
                <TouchableOpacity style={styles.optionOne} onPress={() => navigation.navigate('Payment')}>
                    <ImageBackground source={lm} style={styles.menuImg} imageStyle={styles.menuSty}>
                        <Icon name="ios-cash-outline" size={42} color="#004d99" style={styles.menuOne} />
                        <Text style={styles.menuText}>Payment</Text>
                    </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionTwo} onPress={() => navigation.navigate('History')}>
                    <ImageBackground source={lm} style={styles.menuImg} imageStyle={styles.menuSty}>
                        <Icon name="ios-timer-outline" size={42} color="#004d99" style={styles.menuOne} />
                        <Text style={styles.menuText}>History</Text>
                    </ImageBackground>
                </TouchableOpacity>
                <View></View>
            </View>
        </View>

    ) */
}

/* const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b3d9ff',
        height: "100%",
    },
    header: {
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingTop: 40,
        marginTop: 15
    },
    headerText: {
        color: '#004d99',
        fontWeight: 'bold',
        marginTop: 45,
        fontSize: 24,
        lineHeight: 28
    },
    imgBgCont: {
        marginTop: 15
    },
    imgBg: {
        alignItems: 'flex-start',
        padding: 15,
        marginTop: 12,
        marginHorizontal: 10
    },
    imgBgSty: {
        borderRadius: 22,
    },
    imgTextCont: {

    },
    imgText: {
        fontSize: 28,
        color: '#004d99',
        fontWeight: 'bold',
        marginTop: 28
    },
    balCont: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "flex-end",
        paddingHorizontal: 12,
        marginTop: 15
    },
    bal: {
        color: '#004d99',
        fontWeight: 'bold',
        marginTop: 25,
        fontSize: 24,
        marginRight: 20
    },
    toggleCont: {
        marginLeft: 190
    },
    dateCont: {
        justifyContent: "space-between",
        flexDirection: "row",
    },
    dateText: {
        fontSize: 12,
        color: '#004d99',
        marginTop: 25,
    },
    menuCont: {
        marginTop: 85,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    menuImg: {
        alignItems: 'flex-start',
        padding: 15,
        marginTop: 12,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuOptions: {
        flex: 1
    },
    menuSty: {
        borderRadius: 25
    },
    optionOne: {
        height: 80,
        width: '50%',
        borderRadius: 10,
        margingLeft: 150
    },
    menuText: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#004d99',
        ontSize: 42,
    },
    optionTwo: {
        height: 80,
        width: '50%',
        borderRadius: 10
    },

}) */



export default Dashboard