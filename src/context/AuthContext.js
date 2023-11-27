/* eslint-disable prettier/prettier */
import React, { createContext, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AuthContext = createContext();


const AuthProvider = ({children}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userEntToken, setUserEntToken] = useState(null);
    const [user, setUser] = useState([]);
    const [msisdn, setMsisdn] = useState('');
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [result, setResult] = useState({});
    const [transactionsData, setTransactionsData] = useState([]);
    const [transactionsDataStatus, setTransactionsDataStatus] = useState(0);
    const [transactionsDetailsData, setTransactionsDetailsData] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [merchantType, setMerchantType] = useState(0);


    const signIn = async (username, password) => {
        const authUser = { username, password }
        setIsLoading(true)

        try {
            const {data} = await axios.post("https://test.pinspay.com/api/merchant-login", authUser)
            console.log(data);
            if(data.status == 200){
                let response = data;
                console.log(response);
                console.log("response.status ", response.status)
                console.log('usertoken');
                setUserToken(response.data._token);
                console.log(response.data._token);
                console.log("JewelSama is cookingggg.......");
                setUser(response.data.rec);
                setMsisdn(response.data.rec.msisdn);
                console.log(response.data.rec);
                setName(response.data.mercht);


                const storeData = async () => {
                    try {
                        const pwd = JSON.stringify(password)
                      await AsyncStorage.setItem(
                        'merchantPassword',
                        pwd,
                      );
          
                      const userN = JSON.stringify(username)
                      await AsyncStorage.setItem(
                        'merchantEmail',
                        userN,
                      );
          
                      console.log('passwordValue set: '+password)
                    } catch (error) {
                      // Error saving data
                      console.log('passwordValue not set ')
                    }
                };
                storeData();

            }else if(data.status == 500){
                return [
                    // setError(data.message),
                alert("Something wen wrong") ]
            }else if(data.status == 300){
                return [
                    // setError(data.message),
                alert(data.message) ]
            }
        } catch (error) {
            console.log('login error', error)
            alert("Something went wrong")
        }
        console.log('token: ' + userToken);
        setIsLoading(false)
    }

    const entSignIn = async (username, password) => {
        const authUser = { username, password }
        setIsLoading(true)
        console.log('dataa');

        try {
            console.log('in here');
            const {data} = await axios.post("https://test.pinspay.com/api/merchant/login", authUser)
            console.log('data');
            console.log(data);
            if(data.status == 200){
                let response = data;
                console.log(response);
                console.log("response.status ", response.status)
                console.log('usertoken');
                setUserEntToken(response.data.token);
                setMerchantType(1);
                console.log(response.data.token);
                console.log("JewelSama is cookingggg.......");
                setUser(response.data.rec);
                setMsisdn(response.data.mobilePhone);
                console.log(response.data.firstName+" "+response.data.lastName);
                setName(response.data.firstName+" "+response.data.lastName);
                setUserName(response.data.username);

            }else if(data.status == 500){
                return [
                    // setError(data.message),
                alert("Something wen wrong") ]
            }else if(data.status == 300){
                return [
                    // setError(data.message),
                alert(data.message) ]
            }
        } catch (error) {
            console.log('login error', error)
            alert("Something went wrong")
        }
        console.log('token: ' + userToken);
        setIsLoading(false)
    }

    const signOut = () => {
        setUserToken(null);
        setUser([]);
        console.log('Signing out ')
    }
    const entSignOut = () => {
        setUserEntToken('');
        setMerchantType(0);
        setMsisdn('');
        setUserName('');
        setUser([]);
        console.log('Signing out ent')
    }

    const initiatePayment = async(sender, amount, pin=null) => {
        setIsLoading(true)

        try {
            console.log('payment');
            if(pin == null){

                console.log('up here without Pin')
                const header = { 
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'token': userEntToken,
                }
                const body = { amount, sender }
                const {data} = await axios.post("https://test.pinspay.com/api/merchant/paymentwop", body, { headers: header})
                console.log(data);

                return new Promise(function(myResolve, myReject) {
                    if(data.status == "200"){
                        console.log("response.status ", data.status)
                        setMessage(data.message);
                        myResolve(data);
                    }else if(data.status == "500"){
                        setMessage(data.message);
                        myResolve(data);
                    }else if(data.status == "302"){
                        entSignOut()
                        setMessage(data.message);
                        myResolve(data);

                    }else if(data.status == "300"){
                        setMessage(data.message);
                        myResolve(data);
                    }else{
                        setMessage(data.message);
                        myReject(data)
                    }
                })
            }else{
                console.log('up here with Pin')
                const header = { 
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'token': userEntToken,
                }
                const body = { amount, sender, pin }
                const {data} = await axios.post("https://test.pinspay.com/api/merchant/paymentwp", body, { headers: header})
                console.log(data);

                return new Promise(function(myResolve, myReject) {
                    if(data.status == 200){
                        console.log(data);
                        console.log("response.status ", data.status)
                        setMessage(data.message);
                        myResolve(data);
                    }else if(data.status == "500"){
                        setMessage(data.message);
                        myResolve(data);

                        // return [
                        //     alert("Something wen wrong") 
                        // ]
                    }else if(data.status == "302"){
                        setMessage(data.message);
                        entSignOut()
                        myResolve(data);

                        // return [
                        //     alert(data.message) 
                        // ]else{}
                    }else if(data.status == "300"){
                        setMessage(data.message);
                        myResolve(data);

                        // return [
                        //     alert(data.message) 
                        // ]

                    }else{
                        setMessage(data.message);
                        myReject(data);
                    }
                })
            }
            
        } catch (error) {
            console.log('payment error', error)
            alert("Something went wrong")
        }
        // console.log('token: ' + userToken);
        setIsLoading(false)
    }

    const changePassword = async(oldPassword, newPassword, confirmPassword) => {
        setIsLoading(true)

        try {
                console.log('change password');
                console.log('up here')
                const header = { 
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'token': userEntToken,
                }
                const body = { oldPassword, newPassword, confirmPassword }
                const {data} = await axios.post("https://test.pinspay.com/api/merchant/changepassword", body, { headers: header})
                console.log(data);
                if(data.status == 200){
                    let response = data;
                    console.log(response);
                    console.log("response.status ", response.status)
                    setMessage(response.message);
                    return response
                }else if(data.status == 500){
                    let response = data;
                    setMessage(response.message);
                    return response
                    // return [
                    //     alert("Something wen wrong") 
                    // ]

                }else if(data.status == 302){
                    let response = data;
                    entSignOut()
                    setMessage(response.message);
                    return response
                    // return [
                    //     alert(data.message) 
                    // ]

                }else{
                    let response = data;
                    setMessage(response.message);
                    return response
                }
            
        } catch (error) {
            console.log('change password error', error)
            alert("Something went wrong")
        }
        // console.log('token: ' + userToken);
        setIsLoading(false)
    }

    const transactions = async() => {
        setIsLoading(true)

        try {
                console.log('check status');
                const header = { 
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'token': userEntToken,
                }
                const now = new Date();
                const date = new Date();
                const newDate = date.setDate(date.getDate() - 30);
                const body = { 
                    from: date,
                    to: now
                 }
                console.log(body)
                const {data} = await axios.post("https://test.pinspay.com/api/merchant/transactions", body, { headers: header})
                console.log(data);
                if(data.status == 200){
                    let response = data;
                    console.log("response.status ", response.status)
                    setTransactionsData(response.data);
                    setTransactionsDataStatus(1)
                    return response
                }else if(data.status == 500){
                    let response = data;
                    return response
                }else if(data.status == 302){
                    let response = data;
                    entSignOut()
                    return response
                }else{
                    let response = data;
                    setMessage(response.message);
                    return response
                }
            
        } catch (error) {
            console.log('trans error', error)
            alert("Something went wrong")
        }

        setIsLoading(false)
    }

    const transactiondetails = async(reference) => {
        setIsLoading(true)
        setTransactionsDetailsData([])

        try {
                console.log('trans Details');
                const header = { 
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'token': userEntToken,
                }
                const body = { 
                    reference
                 }
                console.log(body)
                const {data} = await axios.post("https://test.pinspay.com/api/merchant/transactiondetails", body, { headers: header})
                console.log(data);
                if(data.status == 200){
                    let response = data;
                    console.log("response.status ", response.status)
                    setTransactionsDetailsData(response.data);
                    // return response
                }else if(data.status == 500){
                    let response = data;
                    // return response
                }else if(data.status == 302){
                    let response = data;
                    entSignOut()
                    return response
                }else{
                    let response = data;
                    setMessage(response.message);
                    return response
                }
            
        } catch (error) {
            console.log('trans error', error)
            alert("Something went wrong")
        }

        setIsLoading(false)
    }

    const statusCheck = async(reference) => {
        setIsLoading(true)

        try {
                console.log('check status');
                const header = { 
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'token': userEntToken,
                }
                const body = { reference }
                const {data} = await axios.post("https://test.pinspay.com/api/merchant/paymentstatus", body, { headers: header})
                console.log(data);
                if(data.status == 200){
                    let response = data;
                    console.log(response);
                    console.log("response.status ", response.status)
                    setMessage(response.message);
                    return response
                }else if(data.status == 500){
                    let response = data;
                    setMessage(response.message);
                    return response
                }else if(data.status == 302){
                    let response = data;
                    setMessage(response.message);
                    entSignOut()
                    return response
                }else{
                    let response = data;
                    setMessage(response.message);
                    return response
                }
            
        } catch (error) {
            console.log('status check error', error)
            alert("Something went wrong")
        }

        setIsLoading(false)
    }

    
    return (
        <AuthContext.Provider value={{ signIn, signOut, entSignIn, entSignOut, initiatePayment, changePassword, statusCheck, transactions, transactiondetails, message, transactionsDataStatus, transactionsDetailsData, transactionsData, merchantType, userToken, userEntToken, user, msisdn, name, error }}>
            {children}
        </AuthContext.Provider>
    );
}



export { AuthContext, AuthProvider };


