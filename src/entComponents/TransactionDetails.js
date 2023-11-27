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
import { IconButton, MD3Colors, Divider, Text, PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import IconTwo from 'react-native-vector-icons/MaterialCommunityIcons';



const Settings = ( props ) => {
    const { transactiondetails, transactionsDetailsData } = useContext(AuthContext);
    const [ details, setDetails ] = useState([]);
    const [reference, setReference] = useState(props.route.params.transReference);
    // const [ transDetails, setTransDetails ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    // console.log(reference)

    const getTransDetails = async() => {
        setLoading(true)
        console.log('in transactions ')
        result = await transactiondetails(reference)
        setLoading(false)
        setDetails(transactionsDetailsData)
        console.log('hereeee')
    }

    useEffect(() => {
        getTransDetails();
    }, []);
    return (
        <PaperProvider>
            { transactionsDetailsData.reference  ?
            
            <View style={styles.container}>
                <ScrollView> 
                    <View style={styles.detailBorder}>
                        <View style={styles.RowOne}>
                            <Text style={styles.itemText}>Reference:</Text>
                            <Text style={styles.arrowIcon}>{transactionsDetailsData.reference}</Text>
                        </View>
                        <Divider />
                        <View style={styles.RowOne}>
                            <Text style={styles.itemText}>Sender Account:</Text>
                            <Text style={styles.arrowIcon}>{transactionsDetailsData.senderPhone}</Text>
                        </View>
                        <Divider />
                        <View style={styles.RowOne}>
                            <Text style={styles.itemText}>Receiver Account:</Text>
                            <Text style={styles.arrowIcon}>{transactionsDetailsData.receiverPhone}</Text>
                        </View>
                        <Divider />
                        <View style={styles.RowOne}>
                            <Text style={styles.itemText} >Amount:</Text>
                            <Text style={styles.arrowIcon}>N{transactionsDetailsData.amount}</Text>
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
                            <Text style={styles.arrowIcon}>{transactionsDetailsData.created_at}</Text>
                        </View>
                        <Divider />
                    </View>
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