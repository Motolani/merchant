/* eslint-disable prettier/prettier */
import { StyleSheet, View, TouchableOpacity, Platform, Dimensions, TextInput, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Awesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Ionic from 'react-native-vector-icons/Ionicons';
import Feather from "react-native-vector-icons/Feather"
import { SelectList } from 'react-native-dropdown-select-list';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../context/AuthContext';
import { useTheme, Avatar, Button, Card, Text, DataTable, IconButton, MD3Colors, PaperProvider } from 'react-native-paper';



const Transaction = ({ navigation }) => {
    const { entSignOut, transactions, transactionsData, transactiondetails, transactionsDataStatus } = useContext(AuthContext);
    const [ loading, setLoading ] = useState(false);
    const [ transData, setTransData ] = useState([]);
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [numberOfItemsPerPageList] = useState([10,15]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );
    // const [items] = useState([
    //     {
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
        console.log(transactionsDataStatus)

    }
    
    useEffect(() => {
        getTrans();
        setPage(0);
    }, [itemsPerPage]);

    return (
        <PaperProvider>
            { transactionsDataStatus ?
                <View  style={{ backgroundColor: theme.colors.background, flex: 1 }}>
                    <ScrollView>
                        <View style={styles.datatable}>
                            <DataTable>
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

export default Transaction

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
		flex: 1, 
		// backgroundColor: 'white',
        
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
    loadingIndicator:{
        marginTop: 30
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
        marginTop: 20
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