/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, Appearance, TouchableOpacity, StatusBar, ScrollView, Image, ImageBackground, Dimensions, ActivityIndicator, Platform} from 'react-native'
import React, { useState, useContext } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import IMG from '../images/backgroundSamp.png';
import im from '../../assets/images/backk.png';
import Font from 'react-native-vector-icons/FontAwesome';
import { IconButton, DefaultTheme, Searchbar, Card, Button, DataTable, PaperProvider} from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useEffect } from 'react';
import CryptoJS from 'crypto-js';
import  Feather  from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import IconTwo from 'react-native-vector-icons/MaterialCommunityIcons';
import filter  from 'lodash.filter';

const Dash = ({ navigation }) => {

    const DeviceHeight = Dimensions.get('window').height;
    const DeviceWidth = Dimensions.get('window').width;
    const [walletHistoryTransactions, setWalletHistoryTransactions] = useState([]);
    const [filteredWalletHistory, setFilteredWalletHistory] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const [ loading, setLoading ] = useState(false);
    const [ ready, setReady ] = useState(false);
    const { msisdn, userToken, refreshBalance     } = useContext(AuthContext); 
    const [page, setPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const [theme, setTheme] = useState(Appearance.getColorScheme())

    const [numberOfItemsPerPageList] = useState([5]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, walletHistoryTransactions.length);

    const Tab = createBottomTabNavigator(); 
    const { name, bal, signOut } = useContext(AuthContext); 


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

    const refreshBal = () => {
        setLoading(true)
        refreshBalance()
        setLoading(false)


    }
    const handleSearch = (query) => {
        if(query != ''){
            setSearchQuery(query);
        }else{
            setSearchQuery('');
            WalletHistoryTrans()
        }
        const filteredData = filter(walletHistoryTransactions, (trans) => {
            return contains(trans, query)
        })
        setFilteredData(filteredData);
    };

    const contains = ({TranDate, Amount, SourceAccount}, query) => {

        if(TranDate.includes(query) || Amount.includes(query) || SourceAccount.includes(query)){
            return true;
        }else{
            return false;
        }
    }

    

    const WalletHistoryTrans = async () => {
        console.log(userToken);
        console.log('hello world');
        console.log(msisdn);
        var senderPin = CryptoJS.AES.encrypt("1111", 'secret key kpngz@!1234').toString();
        console.log('encrypted pin ', senderPin)
        var decrypt = CryptoJS.AES.decrypt(senderPin,'secret key kpngz@!1234').toString(CryptoJS.enc.Utf8);
        console.log('decrypted pin ', decrypt)
        // WalletHistoryTrans();


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
                console.log(data.data);
                
    
    
                if(data.status == 200){
                    console.log(data.data)
                    console.log('data')
                    setWalletHistoryTransactions(data.data)
                    setReady(true)
                    setLoading(false)
                }
            } catch (error) {
                console.log('wallethistory', error)
                setLoading(false)
                return alert("Something went wrong")
            }
        }
        useEffect(() => {
            console.log('right above you kvng')
            console.log(Appearance.getColorScheme());
            },
        []);
    useEffect(() => {
        

        WalletHistoryTrans()

    }, [navigation, msisdn, userToken]);







    return (
        <PaperProvider>
            <View className="h-full bg-gray-100" style={styles.container} >
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 20}}>
                    <View style={styles.casing}>
                        <View style={styles.cardCase}>
                            <Card style={styles.theCard}>
                                <Card.Content>
                                    <View style={styles.contain}>
                                        <View style={styles.avatar}>
                                            <IconTwo name="account" size={80} color="#209eda" />
                                            <Text style={styles.helloText}>Hello { name }</Text>
                                        </View>
                                        <View style={styles.rowTwo}>
                                            <TouchableOpacity style={styles.logout} onPress={signOut}>
                                                <IconTwo name="exit-to-app" size={30} color="#209eda" />
                                            </TouchableOpacity>

                                            <TouchableOpacity style={styles.gradientButtoncase} onPress={() => navigation.navigate('Payment')}>
                                                <LinearGradient colors={['#209eda', '#46a0cb', '#ADD8E6']} style={styles.gradientButton}>
                                                    <Button mode="outlined" textColor="#ffffff">
                                                        Intiate Pay
                                                    </Button>
                                                </LinearGradient>
                                            </TouchableOpacity>                        
                                        </View>
                                        <View style={styles.rowThree}>
                                            {
                                                showBalance ? (
                                                    <View>
                                                        <Text  className="text-lg font-bold text-white">₦ { bal }</Text>
                                                    </View>
                                                ) : (
                                                    <View>
                                                        <Text  className="text-lg font-bold text-white">₦ *****</Text>
                                                    </View>
                                                )
                                            }
                                            <TouchableOpacity onPress={refreshBal} style={styles.refresh}>
                                                <Icon name="refresh" size={24} color="rgb(147, 197, 253)" />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={toggleBalance} style={styles.insideRowThree} >
                                                {
                                                    showBalance ? (
                                                        <Icon name="eye" size={24} color="rgb(147, 197, 253)" />
                                                    ) : (
                                                        <Icon name="eye-off" size={24} color="rgb(147, 197, 253)" />
                                                    )
                                                }
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                </Card.Content>
                                <Card.Actions>
                                {/* <Button>Cancel</Button> */}
                                    

                                </Card.Actions>
                            </Card>
                        </View>

                        {/* <View className="px-4 mb-1 mt-4">
                            <Text className="text-base font-bold text-slate-600 ml-1">Recent transactions</Text>
                        </View> */}
                        { ready == false ?
                            <View style={styles.loadingIndicator}>
                                <ActivityIndicator color="#209eda" />
                            </View>
                            :
                            <View style={styles.datatable}>
                                <DataTable>
                                    <View style={styles.searchBarCase}>
                                        <Searchbar
                                        mode="view"
                                        placeholder="Search"
                                        onChangeText={(query) => handleSearch(query)}
                                        value={searchQuery}
                                        style={styles.searchBar}
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
                                    </View>
                                    
                                <DataTable.Header>
                                    {/* <DataTable.Title >Id</DataTable.Title> */}
                                    <DataTable.Title ><Text style={styles.textish}>Date</Text></DataTable.Title>
                                    <DataTable.Title numeric ><Text style={styles.textish}>amount</Text></DataTable.Title>
                                    <DataTable.Title numeric><Text style={styles.textish}>Balance</Text></DataTable.Title>
                                    <DataTable.Title numeric><Text style={styles.textish}>Type</Text></DataTable.Title>
                                </DataTable.Header>

                                { searchQuery != '' ?
                                filteredData.slice(from,to).map((item) => (
                                    <TouchableOpacity onPress = {() => navigation.navigate("TransactionDetails", { transaction: item })}>
                                        <DataTable.Row key={item.id}>
                                            {/* <DataTable.Cell >{item.id}</DataTable.Cell> */}
                                            <DataTable.Cell >{item?.TranDate}</DataTable.Cell>
                                            <DataTable.Cell numeric>N{item?.Amount}</DataTable.Cell>
                                            <DataTable.Cell numeric>N{item?.Balance}</DataTable.Cell>
                                            <DataTable.Cell numeric>
                                                {item.DebitCredit == "C" ?
                                                    <Text style={styles.success}>Credit</Text>
                                                    :
                                                    <Text style={styles.failed}>Debit</Text>
                                                }
                                                </DataTable.Cell>
                                        </DataTable.Row>
                                    </TouchableOpacity>
                                    
                                ))
                                :
                                walletHistoryTransactions.slice(from,to).map((item) => (
                                    <TouchableOpacity onPress = {() => navigation.navigate("TransactionDetails", { transaction: item })}>
                                        <DataTable.Row key={item.id}>
                                            {/* <DataTable.Cell >{item.id}</DataTable.Cell> */}
                                            <DataTable.Cell >
                                                <Text style={styles.textish}>{item?.TranDate}</Text>
                                                </DataTable.Cell>
                                            <DataTable.Cell numeric>
                                                <Text style={styles.textish}>N{item?.Amount}</Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell numeric >
                                                <Text style={styles.textish}>N{item?.Balance}</Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell numeric>
                                                {item.DebitCredit == "C" ?
                                                    <Text style={styles.success}>Credit</Text>
                                                    :
                                                    <Text style={styles.failed}>Debit</Text>
                                                }
                                                </DataTable.Cell>
                                        </DataTable.Row>
                                    </TouchableOpacity>
                                    
                                ))
                                }
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
                        }
                    </View>
                </ScrollView>
            </View>
        </PaperProvider>

    )
}
const { height, width } = Dimensions.get("window");
const DeviceHeight = Dimensions.get('window').height; 
const DeviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
		flex: 1, 
		// backgroundColor: 'white',
        marginTop: Platform.OS === 'ios' ? 40: 0,
    },
    helloText:{
        color:'#000000'
    },
    cardCase:{
        marginTop: 35,
        width:'90%',
        height: DeviceHeight * 0.25
    },
    loadingIndicator:{
        marginTop: 30
    },
    theCard:{
		backgroundColor: '#E6E6FA',
    },
    success:{
        color: 'green',
    },
    failed:{
        color: 'red'
    },
    datatable:{
        marginTop: 30
    },
    gradientButton:{
        borderRadius: 50,
    },
    textish:{
        color: '#000000',
        textColor: '#000000'
    },
    gradientButtoncase:{
        // marginLeft: 'auto',
        alignContent: 'center',
        alignItems: 'center',
    },
    avatar:{
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    initiate:{
        marginLeft: 'auto',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    rowTwo:{
        marginLeft: 'auto',
    },
    rowThree:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width:'90%',
        left:8,
        display: 'flex',
        alignItems: 'center',
        marginTop: 30
    },
    insideRowThree:{
        marginLeft: 'auto',
    },
    logout:{
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 13
    },
    searchBarCase:{
        alignItems: 'center'
    },
    refresh:{
        marginLeft: 10
    },
    theBorder:{
        backgroundColor: '#0c3258',
        marginTop: 60,
        borderTopRightRadius: 90,
        borderTopLeftRadius: 90,
        borderWidth: 1.5,
        borderTopColor: '#0c3258',
        // height: Platform.OS === 'ios' ? hp('70%') : hp('70%'),
        height:'410%',
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
    searchBar:{
        backgroundColor: '#ffffff',
        width:'90%'

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
        width:'85%',
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
    casing:{
        alignItems: 'center',
        // paddingTop: 25,
    }

})

export default Dash