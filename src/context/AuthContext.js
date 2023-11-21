/* eslint-disable prettier/prettier */
import React, { createContext, useState } from 'react';
import axios from 'axios';


const AuthContext = createContext();


const AuthProvider = ({children}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userEntToken, setUserEntToken] = useState(null);
    const [user, setUser] = useState([]);
    const [msisdn, setMsisdn] = useState('');
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
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

        try {
            console.log('in here');
            const {data} = await axios.post("https://test.pinspay.com/api/merchant/login", authUser)
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
        setUserEntToken(null);
        setMerchantType(0);
        setMsisdn('');
        setUserName('');
        setUser([]);
        console.log('Signing out ent')
    }

    const initiatePayment = async(sender, amount, pin) => {
        setIsLoading(true)

        try {
            console.log('payment');
            if(pin == null){
                console.log('up here')
                const header = { 
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'token': userEntToken,
                }
                const body = { amount, sender }
                const {data} = await axios.post("https://test.pinspay.com/api/merchant/paymentwop", body, { headers: header})
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

                }else if(data.status == 300){
                    let response = data;
                    entSignOut()
                    setMessage(response.message);
                    return response

                    // return [
                    //     alert(data.message) 
                    // ]

                }
            }else{
                const header = { 
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'token': userEntToken,
                }
                const body = { amount, sender, pin }
                const {data} = await axios.post("https://test.pinspay.com/api/merchant/paymentwp", body, { headers: header})
                console.log(data);
                if(data.status == 200){
                    let response = data;
                    console.log(response);
                    console.log("response.status ", response.status)
                    setMessage(response.message);
                    return response
                }else if(data.status == 500){
                    setMessage(response.message);
                    return response

                    // return [
                    //     alert("Something wen wrong") 
                    // ]
                }else if(data.status == 300){
                    setMessage(response.message);
                    return response

                    // return [
                    //     alert(data.message) 
                    // ]
                }
            }
            
        } catch (error) {
            console.log('login error', error)
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

                }else if(data.status == 300){
                    let response = data;
                    entSignOut()
                    setMessage(response.message);
                    return response
                    // return [
                    //     alert(data.message) 
                    // ]

                }
            
        } catch (error) {
            console.log('login error', error)
            alert("Something went wrong")
        }
        // console.log('token: ' + userToken);
        setIsLoading(false)
    }


    return (
        <AuthContext.Provider value={{ signIn, signOut, entSignIn, entSignOut, initiatePayment, changePassword, merchantType, userToken, userEntToken, user, msisdn, name, error }}>
            {children}
        </AuthContext.Provider>
    );
}



export { AuthContext, AuthProvider };


