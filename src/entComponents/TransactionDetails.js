/* eslint-disable prettier/prettier */
import { StyleSheet, View, TouchableOpacity, Platform, Dimensions, TextInput, ScrollView, Alert, ActivityIndicator, TextComponent } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Awesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Ionic from 'react-native-vector-icons/Ionicons';
import Feather from "react-native-vector-icons/Feather"
import { SelectList } from 'react-native-dropdown-select-list';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../context/AuthContext';
import { IconButton, MD3Colors, Divider, Text, PaperProvider, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import IconTwo from 'react-native-vector-icons/MaterialCommunityIcons';
import Print from "../../Helpers/BluetoothPrinterComponentEnt";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Settings = ( props ) => {
    const { transactiondetails, transactionsDetailsData } = useContext(AuthContext);
    const [ details, setDetails ] = useState([]);
    const [reference, setReference] = useState(props.route.params.transReference);
    // const [ transDetails, setTransDetails ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [printReceiptProcessing, setPrintReceiptProcessing] = useState(false);
    const [printReceiptWithImageProcessing, setPrintReceiptWithImageProcessing] = useState(false);

    const [printObjectsArray,setPrintObjectsArray,] = useState([]);
    const [image,setImage,] = useState(null);
    const [printWithImageAlways,setPrintWithImageAlways,] = useState(null);
    // console.log(reference)

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

    const getTransDetails = async() => {
        setLoading(true)
        console.log('in transactions ')
        result = await transactiondetails(reference)
        setLoading(false)
        setDetails(transactionsDetailsData)
        console.log('hereeee')
        console.log(transactionsDetailsData)
    }

    const dothis = async() => {
        await AsyncStorage.setItem("PrintType", JSON.stringify('Ent')).then(
            () => AsyncStorage.getItem("PrintType")
                .then((result)=>console.log(result))
        ) 

        await AsyncStorage.setItem("EntPrintDate", JSON.stringify(details.created_at)).then(
            () => AsyncStorage.getItem("EntPrintDate")
                .then((result)=>console.log(result))
        )

        await AsyncStorage.setItem("EntPrintAmount", JSON.stringify(details.amount)).then(
            () => AsyncStorage.getItem("EntPrintAmount")
                .then((result)=>console.log(result))
        )

        await AsyncStorage.setItem("EntReference", JSON.stringify(details.reference)).then(
            () => AsyncStorage.getItem("EntReference")
                .then((result)=>console.log(result))
        )

        await AsyncStorage.setItem("EntSenderPhone", JSON.stringify(details.senderPhone)).then(
            () => AsyncStorage.getItem("EntSenderPhone")
                .then((result)=>console.log(result))
        )

        await AsyncStorage.setItem("EntReceiverPhone", JSON.stringify(details.receiverPhone)).then(
            () => AsyncStorage.getItem("EntReceiverPhone")
                .then((result)=>console.log(result))
        )

        await AsyncStorage.setItem("EntDescription", JSON.stringify(details.description)).then(
            () => AsyncStorage.getItem("EntDescription")
                .then((result)=>console.log(result))
        )

        await AsyncStorage.setItem("EntSalesRepUsername", JSON.stringify(details.sales_rep_username)).then(
            () => AsyncStorage.getItem("EntSalesRepUsername")
                .then((result)=>console.log(result))
        )

        await AsyncStorage.setItem("EntStatus", JSON.stringify(details.status)).then(
            () => AsyncStorage.getItem("EntStatus")
                .then((result)=>console.log(result))
        )
    }

    useEffect(() => {
        getTransDetails();
    }, []);

    useEffect(() => {
        dothis();
    }, [details != []]);


    return (
        <PaperProvider>
            { transactionsDetailsData.reference  ?
            
            <View style={styles.container}>
                <ScrollView> 
                    <View style={styles.detailBorder}>
                        <View style={styles.RowOne}>
                            <Text style={styles.itemText}>Reference:</Text>
                            <View style={styles.arrowIcon}><Text style={styles.textColoring}>{transactionsDetailsData.reference}</Text></View>
                        </View>
                        <Divider />
                        <View style={styles.RowOne}>
                            <Text style={styles.itemText}>Sender Account:</Text>
                            <View style={styles.arrowIcon}><Text style={styles.textColoring}>{transactionsDetailsData.senderPhone}</Text></View>
                        </View>
                        <Divider />
                        <View style={styles.RowOne}>
                            <Text style={styles.itemText}>Receiver Account:</Text>
                            <View style={styles.arrowIcon} ><Text style={styles.textColoring}>{transactionsDetailsData.receiverPhone}</Text></View>
                        </View>
                        <Divider />
                        <View style={styles.RowOne}>
                            <Text style={styles.itemText} >Amount:</Text>
                            <View style={styles.arrowIcon}><Text style={styles.textColoring}>N{transactionsDetailsData.amount}</Text></View>
                        </View>
                        <Divider />
                        <View style={styles.RowOne}>
                            <Text style={styles.itemText}>Status:</Text>
                            <Text style={styles.arrowIcon}>
                                {transactionsDetailsData.status == 1 ?
                                    <Text style={styles.success}>Successful</Text>
                                    :transactionsDetailsData.status == 2 ?
                                    <Text style={styles.failed}>Failed</Text>
                                    :<Text style={styles.pending}>Pending</Text>
                                }
                            </Text>
                        </View>
                        <Divider />
                        <View style={styles.RowOne}>
                            <Text style={styles.itemText} >Timestamp:</Text>
                            <View style={styles.arrowIcon}><Text style={styles.textColoring}>{transactionsDetailsData.created_at}</Text></View>
                        </View>
                        <Divider />
                    </View>

                    <TouchableOpacity style={styles.submitSection} onPress={() => printBluetooth()}>
                        <Button icon="printer-wireless" mode="contained" disabled={printReceiptProcessing}  buttonColor={'#209eda'}>
                            Print receipt
                        </Button> 
                    </TouchableOpacity>
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

export default Settings

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
		flex: 1, 
		backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 15,
    },
    pending:{
        color: '#000000'
    },
    textColoring:{
        color:'#000000',
        textColor: '#000000'
    },
    detailBorder:{
        // backgroundColor: '#f3f4fb',
        // borderRadius: 45,
        marginTop: 5,
        // borderColor: '#10486c',
        // borderWidth: 1,
        width: '95%',
        // verticalAlign: 'center',
        // paddingVertical: 5,
        justifyContent: 'center',
        
        // marginLeft: 50
    },
    submitSection:{
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
    arrowIcon:{
        magrinTop: 12,
        marginLeft: 'auto',
        color: '#000000',
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
    containTwo:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width:'91.5%',
        left:15,
        display: 'flex',
        alignItems: 'center',
        marginTop: 15
    },


})