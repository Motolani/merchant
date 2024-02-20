/* eslint-disable prettier/prettier */
import { StyleSheet, View, TouchableOpacity, Platform, Dimensions, TextInput, ScrollView, Alert, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Awesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Ionic from 'react-native-vector-icons/Ionicons';
import Feather from "react-native-vector-icons/Feather"
import { SelectList } from 'react-native-dropdown-select-list';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../context/AuthContext';
import { IconButton, DefaultTheme, Searchbar, Card, Button, DataTable, Text, PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import IconTwo from 'react-native-vector-icons/MaterialCommunityIcons';
import filter  from 'lodash.filter';
import Clipboard from '@react-native-clipboard/clipboard';

const Home = ({ navigation }) => {
    const { transactionsData, user, mobileAccount, virtualAccount, entSignOut, refreshBalanceEnt, transactions, entBal, isLoading, transactionsDataStatus, setTransactionsData } = useContext(AuthContext);
    const [ loading, setLoading ] = useState(false);
    const [page, setPage] = useState(0);
    const [ transData, setTransData ] = useState([]);
    const [ transDataOriginal, setTransDataOriginal ] = useState([transactionsData]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const [numberOfItemsPerPageList] = useState([5]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );
    const [showBalance, setShowBalance] = useState(false);


    const displayClipBoard = (value) => {
        Clipboard.setString(value);
        if (Platform.OS === 'android') {
          ToastAndroid.show('Copied!', ToastAndroid.LONG);
        } else {
          Alert.alert('Clipboard', 'Copied!');
        }
    };
    
    const toggleBalance = () => {
        if (showBalance) {
            setShowBalance(false);
        } else {
            setShowBalance(true);
        }
    }
    
    const refreshBal = () => {
        setLoading(true)
        refreshBalanceEnt()
        setLoading(false)


    }
       const from = page * itemsPerPage;
       const to = Math.min((page + 1) * itemsPerPage, transactionsData.length);

       const handleSearch = (query) => {
        if(query != ''){
            setSearchQuery(query);
            console.log(query)
        }else{
            setSearchQuery('');
            transactions()
        }
        const filteredData = filter(transactionsData, (trans) => {
            
            return contains(trans, query)
        })
        // setTransactionsData(filteredData);
        setFilteredData(filteredData);
    };

    const contains = ({created_at, amount, senderPhone}, query) => {
        console.log()
        
        if(created_at.includes(query) || amount.includes(query) || senderPhone.includes(query) ){
            return true;
        }else{
            return false;
        }
    }
    
       const getTrans = async() => {
        setLoading(true)
        console.log('in transactions')
        result = await transactions()
        // console.log($result)
        setLoading(false)

        if(result.status == 200){
            setTransData(result)
        }else if(result.status == 300){
            entSignOut()
            return [
                alert("Token Expired") 
            ]
        }else{
        }
        console.log('hereeee')
        console.log(transData)

    }
     
       useEffect(() => {
        getTrans();
        setPage(0);
        console.log('Email')
        console.log(AsyncStorage.getItem('@merchantEmail'))
       }, [itemsPerPage]);

       useEffect(() => {

        setTransData(transactionsData)
       }, [transactionsData != []]);


    return (
        <PaperProvider>
            <View style={styles.container}>
                <ScrollView> 
                    <View style={styles.casing}>
                        <View style={styles.cardCase}>
                            <Card style={styles.theCard}>
                                <Card.Content>
                                    <View style={styles.contain}>
                                        <View style={styles.avatar}>
                                            <IconTwo name="account" size={80} color="#209eda" />
                                            <Text style={styles.helloText}>Hello {user.firstName}!</Text>
                                        </View>
                                        <View style={styles.rowTwo}>
                                            <TouchableOpacity style={styles.logout} onPress={entSignOut}>
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
                                                        <Text  className="text-lg font-bold" style={styles.textColoring}>₦ { entBal }</Text>
                                                    </View>
                                                ) 
                                                : 
                                                (
                                                    <View>
                                                        <Text  className="text-lg font-bold text-white" style={styles.textColoring}>₦ *****</Text>
                                                    </View>
                                                )
                                            }
                                            <TouchableOpacity onPress={refreshBal} style={styles.refresh}>
                                                <Icon name="refresh" size={24} color="rgb(147, 197, 253)" />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={toggleBalance} style={styles.insideRowThree} >
                                                {
                                                    showBalance ? 
                                                    (   
                                                        <Icon name="eye" size={24} color="rgb(147, 197, 253)" />    
                                                    ) : 
                                                    (
                                                        <Icon name="eye-off" size={24} color="rgb(147, 197, 253)" />
                                                    )
                                                }
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.account}>
                                            <Text variant="titleMedium" style={styles.accountText}> {virtualAccount} </Text>

                                            <TouchableOpacity onPress={() => displayClipBoard(virtualAccount.toString())}>
                                                <Icon name="copy" size={24} color="#46a0cb" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Card.Content>
                                <Card.Actions>
                                {/* <Button>Cancel</Button> */}
                                    

                                </Card.Actions>
                            </Card>
                        </View>
                        { transactionsData ?
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
                                        <DataTable.Title >
                                            <Text style={styles.textColoring}>Date </Text>
                                        </DataTable.Title>
                                        <DataTable.Title numeric>
                                            <Text style={styles.textColoring}>amount</Text>
                                        </DataTable.Title>
                                        <DataTable.Title numeric>
                                            <Text style={styles.textColoring}> status </Text>
                                        </DataTable.Title>
                                    </DataTable.Header>

                                    { searchQuery != '' ?
                                    filteredData.slice(from, to).map((item) => (
                                        <TouchableOpacity onPress = {() => navigation.navigate('Transaction Details', {transReference: item.reference })}>
                                            <DataTable.Row key={item.id}>
                                                {/* <DataTable.Cell >{item.id}</DataTable.Cell> */}
                                                <DataTable.Cell >
                                                    <Text style={styles.textColoring}> {item.created_at}</Text>
                                                </DataTable.Cell>
                                                <DataTable.Cell numeric>
                                                    <Text style={styles.textColoring}> N{item.amount}</Text>
                                                </DataTable.Cell>
                                                <DataTable.Cell numeric>
                                                    {item.status == 1 ?
                                                        <Text style={styles.success}>Successful</Text>
                                                        :item.status == 2 ?
                                                        <Text style={styles.failed}>Failed</Text>
                                                        :<Text style={styles.pending}>Pending</Text>
                                                    }
                                                    </DataTable.Cell>
                                            </DataTable.Row>
                                        </TouchableOpacity>
                                        
                                    ))
                                    :
                                    transactionsData.slice(from, to).map((item) => (
                                        <TouchableOpacity onPress = {() => navigation.navigate('Transaction Details', {transReference: item.reference })}>
                                            <DataTable.Row key={item.id}>
                                                {/* <DataTable.Cell >{item.id}</DataTable.Cell> */}
                                                <DataTable.Cell > <Text style={styles.textColoring}> {item.created_at} </Text></DataTable.Cell>
                                                <DataTable.Cell numeric> <Text style={styles.textColoring}> N{item.amount} </Text></DataTable.Cell>
                                                <DataTable.Cell numeric>
                                                    {item.status == 1 ?
                                                        <Text style={styles.success}>Successful</Text>
                                                        :item.status == 2 ?
                                                        <Text style={styles.failed}>Failed</Text>
                                                        :<Text style={styles.pending}>Pending</Text>
                                                    }
                                                    </DataTable.Cell>
                                            </DataTable.Row>
                                        </TouchableOpacity>
                                        
                                    ))         

                                    }
                                    <DataTable.Pagination
                                        page={page}
                                        numberOfPages={Math.ceil(transactionsData.length / itemsPerPage)}
                                        onPageChange={(page) => setPage(page)}
                                        label={`${from + 1}-${to} of ${transactionsData.length}`}
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
                            :
                                <View style={styles.loadingIndicator}>
                                    <ActivityIndicator color="#209eda" />
                                </View>
                        }
                    </View>
                </ScrollView>          
            </View>
        </PaperProvider>

    )
}

export default Home

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
		flex: 1, 
		backgroundColor: 'white',
        marginTop: Platform.OS === 'ios' ? 40 : 0,
    },
    theCard:{
		backgroundColor: '#E6E6FA',
    },
    helloText:{
        color:'#000000'
    },
    textColoring:{
        color:'#000000',
        textColor: '#000000'
    },
    accountText:{
        paddingLeft: '29%',
        color: '#000000'
    },
    cardCase:{
        marginTop: 5,
        width:'90%',
    },
    loadingIndicator:{
        marginTop: 30
    },
    success:{
        color: 'green'
    },
    pending:{
        color: '#000000'
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
    account:{
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        // flexWrap: 'wrap',
    },
    insideRowThree:{
        marginLeft: 'auto',
    },
    refresh:{
        marginLeft: 10
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

    logout:{
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 13
    },
    searchBarCase:{
        alignItems: 'center'
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
        paddingTop: 25
    }

})