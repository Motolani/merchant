import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions, ScrollView, FlatList } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
//var CryptoJS = require("crypto-js");

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height; 

const WalletHistory = () => {  
    const [search, setSearch] = useState('');
    const [walletHistoryTransactions, setWalletHistoryTransactions] = useState([]);

    const { msisdn, userToken, signOut } = useContext(AuthContext); 


    const WalletHistoryTrans = async () => {
        
        const header = { 
            'logintoken': userToken,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        }
        
        var datata = new FormData()
        datata.append('mobilePhone', msisdn)

        try {
            const {data} = await axios.post("https://test.pinspay.com/api/ministatement/merchant", datata, { headers: header})
            console.log(data);
        
            if(data.status == 200){
                setWalletHistoryTransactions(data.data)
            }
        } catch (error) {
            console.log('wallethistory', error)
        }
        // setIsLoading(false)
    }

    useEffect(() => {
        console.log(userToken);
        console.log('hello world');
        console.log(msisdn);
        var senderPin = CryptoJS.AES.encrypt("1111", 'secret key kpngz@!1234').toString();
        console.log('encrypted pin ', senderPin)
        var decrypt = CryptoJS.AES.decrypt(senderPin,'secret key kpngz@!1234').toString(CryptoJS.enc.Utf8);
        console.log('decrypted pin ', decrypt)
        WalletHistoryTrans();
        console.log(windowWidth)
        console.log(windowHeight)
        console.log(screenWidth)
        console.log(screenHeight)
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.overlay}>

                <FlatList 
                    data={walletHistoryTransactions}
                    ListHeaderComponent={() => {
                        return(
                            <View style={styles.searchBar}>
                                <TextInput 
                                    boxStyles= {{ backgroundColor: '#f8fcff' }}
                                    value={search}
                                    onChangeText= {setSearch}
                                    placeholder='Search'
                                    style={styles.customInput}
                                />
                                <View style={styles.searchButtonView}>
                                    <TouchableOpacity style={styles.searchButtonContainer}>
                                        <Icon name="search" size={28} color='#b3d9ff' style={styles.searchButton}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )

                    }}
                    renderItem={({item}) => (
                        <View style={styles.theTransCase}>
                            { item.DebitCredit.includes("C") ?
                                <View style={styles.theTransCase}>
                                    <View style={styles.historiesContainerC}>
                                        <View style={styles.typeIconContainer}>
                                            <Icon name='wallet' size={35} color="green" />
                                        </View>
                                        <View style={styles.mainHead}>
                                            <Text style={styles.theAmount}> ₦{item.Amount} </Text>
                                            <Text style={styles.timestampDay}>{item.TranDate}</Text>
                                        </View>
                                        <View style={styles.general}>
                                            <View style={styles.topRow}>
                                                <View>
                                                    <Text style={styles.desc}> {item.Description} </Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.reciever}> Bal: ₦{item.Balance} </Text>
                                                </View> 
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            :
                                <View style={styles.theTransCase}>
                                    
                                    <View style={styles.historiesContainerD}>
                                        <View style={styles.typeIconContainer}>
                                            <Icon name='wallet' size={35} color="red" />
                                        </View>
                                        <View style={styles.mainHead}>
                                            <Text style={styles.theAmount}> - ₦{item.Amount} </Text>
                                            <Text style={styles.timestampDay}>{item.TranDate}</Text>
                                        </View>
                                        <View style={styles.general}>
                                            <View style={styles.topRow}>
                                                <View>
                                                    <Text style={styles.desc}> {item.Description} </Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.reciever}> Bal: ₦{item.Balance} </Text>
                                                </View> 
                                            </View>
                                        </View>
                                    </View> 
                                </View>
                            }
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />

            </View>
        </View>
    )
}

export default WalletHistory

const { height, width } = Dimensions.get("window");


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#b3d9ff',
        paddingBottom:10
    },
    overlay:{
        alignItems: 'center',
        marginTop: 70,
    },
    searchBar:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    customInput:{
        backgroundColor: "#FFFFFF",
        marginTop: 8,
        marginVertical: 5,
        width: 330,
        borderColor: '#0073e6',
        borderWidth: 1,
        borderRadius: 13,
        paddingVertical: 15,
        paddingLeft: 25,
        marginBottom: 25 ,
        
    },
    timestampDay:{
        color: '#0073e6',
        fontWeight: '700',
        fontSize: 14,
        paddingLeft: 70
    },
    Label:{
        color: 'rgba(71, 114, 225, 1)',
        fontWeight: 'bold',
        marginLeft: 14,
        color: '#0073e6',
        
    },
    searchButtonContainer:{
        width: hp('6%'),
        height: hp('5%'),
        borderRadius: 10,
        marginTop: 10,
        borderColor: '#0073e6',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0073e6',
    },
    searchButtonView:{
        paddingLeft: 10
    },
    theTransCase:{
        marginBottom: 0
    },
    historiesContainer:{
        width: 380,
        height: 120,
        backgroundColor: '#e0e0eb',
        borderRadius: 10,
        marginTop: 5,
        borderColor: 'green',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    historiesContainerC:{
        width: 380,
        height: 120,
        backgroundColor: '#e0e0eb',
        borderRadius: 10,
        marginTop: 5,
        borderColor: 'green',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    historiesContainerD:{
        width: 380,
        height: 120,
        backgroundColor: '#e0e0eb',
        borderRadius: 10,
        marginTop: 5,
        borderColor: 'red',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    typeIconContainer:{
        marginTop: 20,
        marginLeft: 5,
        marginRight: 30
    },
    general:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: -42,
    },
    topRow:{
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginTop: 10
    },
    transTheType:{
        color:"#0073e6",
        fontWeight: '600',
        fontSize: 18,
        marginRight: 30,
    },
    theAmountContainer:{
        paddingTop: 13
    },
    theAmount:{
        color: '#0073e6',
        fontWeight: '600', 
    },
    downRow:{
        paddingLeft: 55
    },
    reciever:{
        fontWeight: '500',
        color:"#0073e6", 
        marginTop: 20, 
        fontSize: 18,
        marginLeft: 32
    },
    theStatusContainer:{
        marginTop: 10,
        width: 90,
        height: 22,
        backgroundColor: '#5cdb93',
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#5cdb93',
        justifyContent: 'center'

    },
    theStatus:{
        fontWeight: '600',
        color: '#0073e6'
    },
    desc: {
        marginTop: 15,
        color:"#0073e6", 
    },
    mainHead: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingTop: 0,
        margingLeft: 52,
    },
})