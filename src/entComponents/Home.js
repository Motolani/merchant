/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, TouchableOpacity, Platform, Dimensions, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Awesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Ionic from 'react-native-vector-icons/Ionicons';
import Feather from "react-native-vector-icons/Feather"
import { SelectList } from 'react-native-dropdown-select-list';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../context/AuthContext';
import { IconButton, DefaultTheme, Searchbar, Card, Button, DataTable, PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import IconTwo from 'react-native-vector-icons/MaterialCommunityIcons';


const Home = ({ navigation }) => {
    const { transactionsData, user, entSignOut, transactions, transactionsDataStatus } = useContext(AuthContext);
    const [ loading, setLoading ] = useState(false);
    const [page, setPage] = useState(0);
    const [ transData, setTransData ] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const [numberOfItemsPerPageList] = useState([5]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );
    //       key: 1,
    //       time: '2023-11-23',
    //       amount: 'N305',
    //       status: 'success',
    //     },
    //     {
    //       key: 2,
    //       name: '2023-11-23',
    //       amount: 'N305',
    //       status: 'success',
    //     },
    //     {
    //       key: 3,
    //       name: '2023-11-23',
    //       amount: 'N305',
    //       status: 'success',
    //     },
    //     {
    //       key: 4,
    //       name: '2023-11-23',
    //       amount: 'N305',
    //       status: 'success',
    //     },
    //     {
    //         key: 5,
    //         name: '2023-11-23',
    //         amount: 'N305',
    //         status: 'success',
    //     },
    //     {
    //         key: 6,
    //         name: '2023-11-23',
    //         amount: 'N305',
    //         status: 'pending',
    //     },
    //     {
    //         key: 7,
    //         name: '2023-11-23',
    //         amount: 'N305',
    //         status: 'failed',
    //     },
    //     {
    //         key: 8,
    //         name: '2023-11-23',
    //         amount: 'N305',
    //         status: 'success',
    //     },
    // ]);
       const from = page * itemsPerPage;
       const to = Math.min((page + 1) * itemsPerPage, transactionsData.length);

       const getTrans = async() => {
        setLoading(true)
        console.log('in transactions')
        $result = await transactions()
        // console.log($result)
        setLoading(false)

        if($result.status == 200){
            setTransData($result)
        }else if($result.status == 300){
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


    return (
        <PaperProvider>
            <View style={styles.container}>
                <ScrollView> 
                    <View style={styles.casing}>
                        <View style={styles.cardCase}>
                            <Card>
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
                                        
                                    </View>
                                </Card.Content>
                                <Card.Actions>
                                {/* <Button>Cancel</Button> */}
                                    

                                </Card.Actions>
                            </Card>
                        </View>
                        { transactionsDataStatus ?
                                <View style={styles.datatable}>
                                    <DataTable>
                                        <View style={styles.searchBarCase}>
                                            <Searchbar
                                            mode="view"
                                            placeholder="Search"
                                            onChangeText={onChangeSearch}
                                            value={searchQuery}
                                            style={styles.searchBar}
                                            />
                                        </View>
                                        
                                    <DataTable.Header>
                                        {/* <DataTable.Title >Id</DataTable.Title> */}
                                        <DataTable.Title >Date</DataTable.Title>
                                        <DataTable.Title numeric>amount</DataTable.Title>
                                        <DataTable.Title numeric>status</DataTable.Title>
                                    </DataTable.Header>

                                    {transactionsData.slice(from, to).map((item) => (
                                        <TouchableOpacity onPress = {() => navigation.navigate('Transaction Details', {transReference: item.reference })}>
                                            <DataTable.Row key={item.id}>
                                                {/* <DataTable.Cell >{item.id}</DataTable.Cell> */}
                                                <DataTable.Cell >{item.created_at}</DataTable.Cell>
                                                <DataTable.Cell numeric>N{item.amount}</DataTable.Cell>
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
                                        
                                    ))}

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
    helloText:{
        color:'#000000'
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