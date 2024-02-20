/* eslint-disable prettier/prettier */
import {  View, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Image, ImageBackground, Dimensions, ActivityIndicator, Platform} from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import  Feather  from 'react-native-vector-icons/Feather';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, Avatar, Button, Card, Text, DataTable, IconButton, MD3Colors, PaperProvider } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height; 

const WalletHistory = ({ navigation }) => {  
    const [search, setSearch] = useState('');
    const [walletHistoryTransactions, setWalletHistoryTransactions] = useState([]);
    const [loading, setLoading] = useState(false)
    const { msisdn, userToken, signOut } = useContext(AuthContext); 
    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([10,15]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );
    const theme = useTheme();

    const from = page * itemsPerPage;
const to = Math.min((page + 1) * itemsPerPage, walletHistoryTransactions.length);

    const WalletHistoryTrans = async () => {

        const header = { 
            'logintoken': userToken,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        }
        
        var datata = new FormData()
        datata.append('mobilePhone', msisdn)

        try {
            setLoading(true)
            const {data} = await axios.post("https://test.pinspay.com/api/ministatement/merchant", datata, { headers: header})
            // console.log(data.data.length);
            


            if(data.status == 200){
                setWalletHistoryTransactions(data.data)
                console.log("data.data.length ", data.data.length)
                setLoading(false)
            }
        } catch (error) {
            console.log('wallethistory', error)
            setLoading(false)
            return alert("Something went wrong")
        }
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



    if(walletHistoryTransactions.length < 1){
        return(
            // <SafeAreaView className="h-full" style={styles.contain}>
                <PaperProvider>
                    <View style={styles.general}>
                    {
                        !loading ? (
                            <View style={styles.general}>
                                <ScrollView className="justify-center items-center h-full">
                                    <View style={styles.datatable}>
                                        <DataTable style={styles.general}>
                                        <DataTable.Header>
                                            <DataTable.Title ><Text style={styles.textish}>Date</Text></DataTable.Title>
                                            <DataTable.Title numeric><Text style={styles.textish}>amount</Text></DataTable.Title>
                                            <DataTable.Title numeric><Text style={styles.textish}>status</Text></DataTable.Title>
                                        </DataTable.Header>

                                        {walletHistoryTransactions.slice(from, to).map((item) => (
                                            <TouchableOpacity onPress = {() => navigation.navigate("TransactionDetails", { transaction: item })}>
                                                <DataTable.Row key={item.id}>
                                                    <DataTable.Cell ><Text style={styles.textish}>{item?.TranDate}</Text></DataTable.Cell>
                                                    <DataTable.Cell numeric><Text style={styles.textish}>N{item?.Amount}</Text></DataTable.Cell>
                                                    <DataTable.Cell numeric><Text style={styles.textish}>N{item?.Balance}</Text></DataTable.Cell>
                                                    <DataTable.Cell numeric>
                                                        {item.status == "C" ?
                                                            <Text style={styles.success}>Credit</Text>
                                                            :
                                                            <Text style={styles.failed}>Debit</Text>
                                                        }
                                                    </DataTable.Cell>
                                                </DataTable.Row>
                                            </TouchableOpacity>
                                            
                                        ))}

                                        <DataTable.Pagination
                                            page={page}
                                            numberOfPages={Math.ceil(walletHistoryTransactions.length / itemsPerPage)}
                                            onPageChange={(page) => setPage(page)}
                                            label={`${from + 1}-${to} of ${walletHistoryTransactions.length}`}
                                            numberOfItemsPerPageList={numberOfItemsPerPageList}
                                            numberOfItemsPerPage={itemsPerPage}
                                            onItemsPerPageChange={onItemsPerPageChange}
                                            showFastPaginationControls
                                            selectPageDropdownLabel={'Rows per page'}
                                            paginationControlRippleColor={'#209eda'}
                                            theme={{
                                                colors: {
                                                primary: "rgb(120, 69, 172)",
                                                onPrimary: "rgb(255, 255, 255)",
                                                primaryContainer: "rgb(240, 219, 255)",
                                                onPrimaryContainer: "rgb(44, 0, 81)",
                                                secondary: "rgb(102, 90, 111)",
                                                onSecondary: "rgb(255, 255, 255)",
                                                background: "rgb(255, 251, 255)",
                                                onBackground: "rgb(29, 27, 30)",
                                                surface: "rgb(255, 251, 255)",
                                                onSurface: "rgb(29, 27, 30)",
                                                surfaceVariant: "rgb(233, 223, 235)",
                                                onSurfaceVariant: "rgb(74, 69, 78)",
                                                outline: "rgb(124, 117, 126)",
                                                outlineVariant: "rgb(204, 196, 206)",
                                                shadow: "rgb(0, 0, 0)",
                                                scrim: "rgb(0, 0, 0)",
                                                elevation: {
                                                    level0: "transparent",
                                                    level1: "rgb(248, 242, 251)",
                                                    level2: "rgb(244, 236, 248)",
                                                    level3: "rgb(240, 231, 246)",
                                                    level4: "rgb(239, 229, 245)",
                                                    level5: "rgb(236, 226, 243)"
                                                },
                                                surfaceDisabled: "rgba(29, 27, 30, 0.12)",
                                                onSurfaceDisabled: "rgba(29, 27, 30, 0.38)",
                                                backdrop: "rgba(51, 47, 55, 0.4)"
                                                }
                                            }}
                                        />
                                        </DataTable>
                                    </View>
                                </ScrollView>
                            </View>
                        ): (
                            <View className="justify-center items-center h-full">
                                <ActivityIndicator size="large" color="rgb(96, 165, 250)" />
                            </View>
                        )
                    }
                    </View>

                </PaperProvider>
            // </SafeAreaView>
        )
    }else {

    return (
        <PaperProvider>
            { walletHistoryTransactions ?
                <View >
                    <ScrollView>
                        <View style={styles.datatable}>
                            <DataTable>
                            <DataTable.Header>
                                {/* <DataTable.Title >Id</DataTable.Title> */}
                                <DataTable.Title > <Text style={styles.textColoring}>  Date </Text></DataTable.Title>
                                <DataTable.Title numeric> <Text style={styles.textColoring}> amount </Text></DataTable.Title>
                                <DataTable.Title numeric> <Text style={styles.textColoring}> status </Text></DataTable.Title>
                            </DataTable.Header>

                            {walletHistoryTransactions.slice(from, to).map((item) => (
                                <TouchableOpacity onPress = {() => navigation.navigate("TransactionDetails", { transaction: item })}>
                                    <DataTable.Row key={item.id}>
                                        <DataTable.Cell > <Text style={styles.textColoring}> {item?.TranDate} </Text></DataTable.Cell>
                                        <DataTable.Cell numeric> <Text style={styles.textColoring}> N{item?.Amount} </Text></DataTable.Cell>
                                        <DataTable.Cell numeric> <Text style={styles.textColoring}> N{item?.Balance} </Text></DataTable.Cell>
                                        <DataTable.Cell numeric>
                                            {item.status == "C" ?
                                                <Text style={styles.success}>Credit</Text>
                                                :
                                                <Text style={styles.failed}>Debit</Text>
                                            }
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                </TouchableOpacity>
                                
                            ))}

                            <DataTable.Pagination
                                page={page}
                                numberOfPages={Math.ceil(walletHistoryTransactions.length / itemsPerPage)}
                                onPageChange={(page) => setPage(page)}
                                label={`${from + 1}-${to} of ${walletHistoryTransactions.length}`}
                                numberOfItemsPerPageList={numberOfItemsPerPageList}
                                numberOfItemsPerPage={itemsPerPage}
                                onItemsPerPageChange={onItemsPerPageChange}
                                showFastPaginationControls
                                selectPageDropdownLabel={'Rows per page'}
                                paginationControlRippleColor={'#209eda'}
                                theme={{
                                    colors: {
                                      primary: "rgb(120, 69, 172)",
                                      onPrimary: "rgb(255, 255, 255)",
                                      primaryContainer: "rgb(240, 219, 255)",
                                      onPrimaryContainer: "rgb(44, 0, 81)",
                                      secondary: "rgb(102, 90, 111)",
                                      onSecondary: "rgb(255, 255, 255)",
                                      background: "rgb(255, 251, 255)",
                                      onBackground: "rgb(29, 27, 30)",
                                      surface: "rgb(255, 251, 255)",
                                      onSurface: "rgb(29, 27, 30)",
                                      surfaceVariant: "rgb(233, 223, 235)",
                                      onSurfaceVariant: "rgb(74, 69, 78)",
                                      outline: "rgb(124, 117, 126)",
                                      outlineVariant: "rgb(204, 196, 206)",
                                      shadow: "rgb(0, 0, 0)",
                                      scrim: "rgb(0, 0, 0)",
                                      elevation: {
                                        level0: "transparent",
                                        level1: "rgb(248, 242, 251)",
                                        level2: "rgb(244, 236, 248)",
                                        level3: "rgb(240, 231, 246)",
                                        level4: "rgb(239, 229, 245)",
                                        level5: "rgb(236, 226, 243)"
                                      },
                                      surfaceDisabled: "rgba(29, 27, 30, 0.12)",
                                      onSurfaceDisabled: "rgba(29, 27, 30, 0.38)",
                                      backdrop: "rgba(51, 47, 55, 0.4)"
                                    }
                                }}
                            />
                            </DataTable>
                        </View>
                        {/* <TouchableOpacity onPress={() => getTrans()}>
                            <Button>
                            test
                                
                            </Button>
                        </TouchableOpacity> */}
                    </ScrollView>
                    
                </View>
                :
            
                <View style={styles.loadingIndicator}>
                    <ActivityIndicator color="#209eda" />
                </View>
            }
        </PaperProvider>
    )
    }
}

export default WalletHistory

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
    contain: {
		flex: 1, 
		backgroundColor: '#ffffff',
        
    },
    general:{
        backgroundColor:'#ffffff',
    },
    time:{
    },
    Label:{
        fontWeight: 'bold',
        marginBottom:3,
        alignItems: 'flex-start',
        color: 'rgb(71, 85, 105)',
        fontSize: 17
    },
    textColoring:{
        color:'#000000',
        textColor: '#000000'
    },
    loadingIndicator:{
        marginTop: 30,
        backgroundColor:'#ffffff',
    },
    success:{
        color: 'green'
    },
    failed:{
        color: 'red'
    },
    paymentPlan:{
        paddingTop: 15,
        paddingHorizontal: 25,
    },
    button: {
        alignItems: 'center',
        marginTop: 80
    },
    datatable:{
        marginTop: 20,
        
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

})