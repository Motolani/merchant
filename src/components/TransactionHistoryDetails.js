/* eslint-disable prettier/prettier */
import { View, ScrollView, Platform, StyleSheet, TouchableOpacity, Dimensions, TextInput, Alert, ActivityIndicator, TextComponent} from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Entypo  from "react-native-vector-icons/Entypo"
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton, MD3Colors, Divider, Text, PaperProvider, Button, RadioButton} from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    //  Print,
    ExternalPrint,
} from "../Helpers/BluetoothPrinter";
import Print from "../../Helpers/BluetoothPrinterComponent";



const TransactionHistoryDetails = ({route, navigation}) => {
    
    const { transaction } = route.params;
    const TransactionType = transaction?.DebitCredit == "D" ? "Debit" : "Credit";
    const TransactionTypeSign = transaction?.DebitCredit == "D" ? "-" : "+";

    const { transactiondetails, transactionsDetailsData, name } = useContext(AuthContext);
    const [ details, setDetails ] = useState([]);
    const [loading, setLoading ] = useState(false);
    const [printReceiptProcessing, setPrintReceiptProcessing] = useState(false);
    const [printReceiptWithImageProcessing, setPrintReceiptWithImageProcessing] = useState(false);
    const [downloadPdfProcessing, setDownloadPdfProcessing] = useState(false);
    const [externalPrintReceiptProcessing,setExternalPrintReceiptProcessing,] = useState(false);

    const [showPrintReceipt,setShowPrintReceipt,] = useState(false);
    const [showExternalPrintReceipt,setShowExternalPrintReceipt,] = useState(false);
    const [showHomeReturn,setshowHomeReturn,] = useState(false);
    const [printObjectsArray,setPrintObjectsArray,] = useState([]);
    const [image,setImage,] = useState(null);
    const [printWithImageAlways,setPrintWithImageAlways,] = useState(null);
    
    const printBluetooth = async () => {
        setPrintReceiptProcessing(true);

        await Print(printObjectsArray).then((result) => result);
        setPrintReceiptProcessing(false);
    };

    const printBluetoothWithImage = async () => {
        setPrintReceiptWithImageProcessing(true);
        await Print(printObjectsArray, image).then((result) => result);
        setPrintReceiptWithImageProcessing(false);
    };

    const dothis = async() => {
        await AsyncStorage.setItem("PrintDate", JSON.stringify(transaction.TranDate)).then(
            () => AsyncStorage.getItem("PrintDate")
                .then((result)=>console.log(result))
        )

        await AsyncStorage.setItem("PrintAmount", JSON.stringify(transaction.Amount)).then(
            () => AsyncStorage.getItem("PrintAmount")
                .then((result)=>console.log(result))
        )

        await AsyncStorage.setItem("SourceAccount", JSON.stringify(transaction.SourceAccount)).then(
            () => AsyncStorage.getItem("SourceAccount")
                .then((result)=>console.log(result))
        )

        await AsyncStorage.setItem("Balance", JSON.stringify(transaction.Balance)).then(
            () => AsyncStorage.getItem("Balance")
                .then((result)=>console.log(result))
        )

        await AsyncStorage.setItem("Channel", JSON.stringify(transaction.Channel)).then(
            () => AsyncStorage.getItem("Channel")
                .then((result)=>console.log(result))
        )

        await AsyncStorage.setItem("TransactionId", JSON.stringify(transaction.TranID)).then(
            () => AsyncStorage.getItem("TransactionId")
                .then((result)=>console.log(result))
        )

        await AsyncStorage.setItem("RequestId", JSON.stringify(transaction.RequestID)).then(
            () => AsyncStorage.getItem("RequestId")
                .then((result)=>console.log(result))
        )

        await AsyncStorage.setItem("Description", JSON.stringify(transaction.Description)).then(
            () => AsyncStorage.getItem("Description")
                .then((result)=>console.log(result))
        )

        if(JSON.stringify(transaction.SourceBank)){
            await AsyncStorage.setItem("Bank", JSON.stringify(transaction.SourceBank)).then(
                () => AsyncStorage.getItem("Bank")
                    .then((result)=>console.log(result))
            )
        }else{
            await AsyncStorage.setItem("Bank", null).then(
                () => AsyncStorage.getItem("Bank")
                    .then((result)=>console.log(result))
            )
        }
        

        await AsyncStorage.setItem("DebitCredit", JSON.stringify(transaction.DebitCredit)).then(
            () => AsyncStorage.getItem("DebitCredit")
                .then((result)=>console.log(result))
        )
    }

    useEffect(() => {
        console.log(transaction);
        dothis()
    }, []);
  return (
    <PaperProvider>
            { transaction  ?
            
            <View style={styles.container}>
                <ScrollView> 

                    <TouchableOpacity style={styles.backIcon} className="h-10 w-10 rounded-full bg-gray-200 items-center justify-center" onPress={() => navigation.goBack()} >
                        <Entypo name='chevron-left' size={34} color="rgb(51, 65, 85)" />
                        <View style={styles.back}><Text style={styles.textColoring}> Back</Text></View>
                    </TouchableOpacity>
                    <ScrollView> 
                        <View style={styles.detailBorder}>
                            <View style={styles.RowOne}>
                                <Text style={styles.itemText}>Date:</Text>
                                <View style={styles.arrowIcon}><Text style={styles.textColoring}> {transaction.TranDate}</Text></View>
                            </View>
                            <Divider />
                            <View style={styles.RowOne}>
                                <Text style={styles.itemText}>Amount:</Text>
                                <View style={styles.arrowIcon}><Text style={styles.textColoring}> N{transaction.Amount}</Text></View>
                            </View>
                            <Divider />
                            <View style={styles.RowOne}>
                                <Text style={styles.itemText} >Source Account:</Text>
                                <View style={styles.arrowIcon}><Text style={styles.textColoring}> {transaction.SourceAccount} </Text></View>
                            </View>
                            <Divider />
                            <View style={styles.RowOne}>
                                <Text style={styles.itemText} >Balance:</Text>
                                <View style={styles.arrowIcon}><Text style={styles.textColoring}> N{transaction.Balance}</Text></View>
                            </View>
                            <Divider />
                            <View style={styles.RowOne}>
                                <Text style={styles.itemText} >Channel:</Text>
                                {transaction.Channel == "PMONEY" ?
                                        <View style={styles.arrowIcon}><Text style={styles.textColoring}> Pinspay</Text></View>
                                        :
                                        <View style={styles.arrowIcon}><Text style={styles.textColoring}> {transaction.Channel}</Text></View>
                                    }
                            </View>
                            <Divider />
                            <View style={styles.RowOne}>
                                <Text style={styles.itemText} >Trans ID:</Text>
                                <View style={styles.arrowIcon}><Text style={styles.textColoring}> {transaction.TranID}</Text></View>
                            </View>
                            <Divider />
                            <View style={styles.RowOne}>
                                <Text style={styles.itemText} >Request ID:</Text>
                                <View style={styles.arrowIcon}><Text style={styles.textColoring}> {transaction.RequestID}</Text></View>
                            </View>
                            <Divider />
                            <View style={styles.RowOne}>
                                <Text style={styles.itemText} >Description:</Text>
                                <View style={styles.arrowIcon}><Text style={styles.textColoring}> {transaction.Description}</Text></View>
                            </View>
                            <Divider />
                            { transaction.SourceBank ?
                                <View style={styles.RowOne}>
                                    <Text style={styles.itemText} >Bank:</Text>
                                    <View style={styles.arrowIcon}><Text style={styles.textColoring}> {transaction.SourceBank}</Text></View>
                                </View> :
                                null
                            }
                            

                            <Divider />
                            <View style={styles.RowN}>
                                <Text style={styles.itemText}>Type:</Text>
                                <Text style={styles.arrowIcon}>
                                    {transaction.DebitCredit == "C" ?
                                        <Text style={styles.success}>Credit</Text>
                                        :
                                        <Text style={styles.failed}>Debit</Text>
                                    }
                                </Text>
                            </View>
                            <Divider />
                        </View>

                    
                        <TouchableOpacity style={styles.submitSection} onPress={() => printBluetooth()}>
                            <Button icon="printer-wireless" mode="contained" disabled={printReceiptProcessing}  buttonColor={'#209eda'}>
                                Print receipt
                            </Button> 
                        </TouchableOpacity>

                    </ScrollView>    
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

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
		flex: 1, 
		backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 50,
    },
    textColoring:{
        color:'#000000',
        textColor: '#000000'
    },
    detailBorder:{
        marginTop: 5,
        width: '95%',
        justifyContent: 'center',
    },
    submitSection:{
        marginTop: 80,
        display: Platform.OS === 'ios' ? "none" : "flex",
    },
    RowOne:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width:'91.5%',
        left:15,
        display: 'flex',
        alignItems: 'center',
        marginBottom: 15
    },
    RowN:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width:'91.5%',
        left:15,
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20
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
    loadingIndicator:{
        marginTop: 30
    },
    success:{
        color: 'green'
    },
    failed:{
        color: 'red'
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
        width:'91.5%',
        left:15,
        display: 'flex',
        alignItems: 'center',
    },
    backIcon:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width:'91.5%',
        left:15,
        display: 'flex',
        alignItems: 'center',
        marginBottom: 15
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
    back:{
        fontSize: 18
    }


})

export default TransactionHistoryDetails