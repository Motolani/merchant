/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, TouchableOpacity, Platform, Dimensions, ScrollView, Alert, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Awesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import Ionic from 'react-native-vector-icons/Ionicons';
import Feather from "react-native-vector-icons/Feather"
import { SelectList } from 'react-native-dropdown-select-list';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../context/AuthContext';
import { IconButton, Switch, MD3Colors, Divider, PaperProvider, TextInput, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import IconTwo from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from "../../Helpers/Storage";
import Helper from "../../Helpers/Helper";
import SelectBox from "react-native-picker-select";
import {
    BluetoothManager,
    BluetoothEscposPrinter,
    BluetoothTscPrinter,
} from 'react-native-bluetooth-escpos-printer';
import BluetoothStateManager from "react-native-bluetooth-state-manager"; 



const Settings = ({ navigation }) => {
    const { msisdn, userToken, signOut } = useContext(AuthContext);
    const [ loading, setLoading ] = useState(false);
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [autoLogin, setAutoLogin] = useState(false);
    // const [biometryType, setBiometryType] = useState(undefined);
    
    const [printerName, setPrinterName] = useState(null);
    const [paperSize, setPaperSize] = useState("32");
    const [devices, setDevices] = useState([]);
    const [pairedDs, setPairedDs] = useState([]);
    const [pairedDstatus, setPairedDstatus] = useState(false);
    const [bluetoothOpened, setBluetoothOpened] = useState(false);
    const [bluetoothState, setBluetoothState] = useState("");
    const [scanCount, setScanCount] = useState(0);
    const [list, setList] = useState([]);
    const [currentPrinter, setCurrentPrinter] = useState(null);  

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const [biometricLogin, setBiometricLogin] = useState(false);
 
    let _listeners = [];
    const toggleSwitch = () => {

        if(biometricLogin == false){

            const storeData = async () => {
                try {
                    await AsyncStorage.setItem("TouchLoginEnt", JSON.stringify(true)).then(
                        () => AsyncStorage.getItem("TouchLoginEnt")
                            .then((result)=>console.log(result))
                    )
                } catch (error) {
                    // Error saving data
                    console.log(error)
                }
            };
            storeData()
            setBiometricLogin(true)

        }else{

            const unstoreData = async () => {
                try {
                    await AsyncStorage.setItem("TouchLoginEnt", JSON.stringify(false)).then(
                        () => AsyncStorage.getItem("TouchLoginEnt")
                            .then((result)=>console.log(result))
                    )
                } catch (error) {
                    // Error saving data
                    console.log(error)
                }
            };
            unstoreData()
            setBiometricLogin(false)

        }
    }

    const finger = async() => {
        await AsyncStorage.getItem("TouchLoginEnt").then(
            (result)=> {
                if(result == 'true'){
                    setBiometricLogin(true)
                }else{
                    setBiometricLogin(false)
                }
            })
        console.log(biometricLogin)
    }

    const dothis = async() => {
        await AsyncStorage.setItem("AgentName", JSON.stringify(name)).then(
            () => AsyncStorage.getItem("AgentName")
                .then((result)=>console.log(result))
        )
    }
    useEffect(() => {
        finger()
        initBluetooth()
        bluetoothDeviceList()
        dothis()
    }, []);

    useEffect(() => {
        stuff()
    }, [pairedDs]);

    const getPairedBluetooth = async () => {
        let [printerNamePromise, paperSizePromise] = await Promise.all([
          Storage.getObjectData("printerName").then((res) => res),
          Storage.getStringData("paperSize").then((res) => res),
        ]).then((results) => results);
    
        let printerName = Helper.getPropValue(printerNamePromise, "data.address")
          ? printerNamePromise.data
          : null;
        let paperSize = paperSizePromise.data ?? "32";
    
        setPrinterName(printerName)
        setPaperSize(paperSize)
        setCurrentPrinter(printerName)
    };

    const bluetoothDeviceList = () => {
        let list = [];
        pairedDs.forEach((element) => {
          console.log('element');
          console.log(element);
          if (element.name) {
            list.push({
              label: `${element.name} (${element.address})`,
              value: element,
            });
          }
        });
        console.log('list')
        console.log(list)
        setList(list)
        return list;
    };

    const populateDevices = async () => {
        console.log('in populate Devices')
        try {
          Platform.select({
            ios: getPairedDeviceIOS(),
            android: getPairedDevicesAndroid(),
          });
        } catch (error) {
            setLoading(false)
        }
    };

    const getPairedDeviceIOS = () => {
        _scan();
        if (scanCount == 0) {
            _scan();
        }
        setScanCount(scanCount);
        // this.setState((state) => ({ scanCount: state.scanCount }));
    };

    const getPairedDevicesAndroid = async () => {
        console.log('getting paired')
        await BluetoothManager.enableBluetooth().then(
            (r) => {
                var paired = [];
    
                if (r && r.length > 0) {
                    for (var i = 0; i < r.length; i++) {
                        try {
                            console.log(r[i]);
                            paired.push(JSON.parse(r[i]));
                            // paired.push(r[i]);
                        } catch (e) {
                            console.log(e);
                            //ignore
                        }
                    }
                }
                setPairedDs(paired)
                setPairedDstatus(true)
                console.log('paired')
                console.log(paired)
                setLoading(false)
            },
            (err) => {
                setLoading(false)
            }
        );
        console.log('pairedDs')
        console.log(pairedDs)

    };

    const bluetoothStatus = async () => {
        BluetoothStateManager.getState().then((bluetoothState) => {
            setBluetoothState(bluetoothState)
            console.log('bluetooth state')
            console.log(bluetoothState)

            if (bluetoothState == "PoweredOn") {
                console.log('in here')
                setBluetoothOpened(true)

            } else {
                console.log('out here')
                setBluetoothOpened(false)
            }

            // return wordIs
            console.log('bluetoothOpened')
            console.log(bluetoothOpened)
        });
    

        // let result = await promise;
    };

    const getDevices = async () => {
        try {
            
            setLoading(true)
            console.log('above')

            // const {data} = await bluetoothStatus();

            BluetoothStateManager.getState().then((bluetoothState) => {
                setBluetoothState(bluetoothState)
                console.log('bluetooth state')
                console.log(bluetoothState)
    
                if (bluetoothState == "PoweredOn") {
                    console.log('in here')
                    setBluetoothOpened(true)
    
                } else {
                    console.log('out here')
                    setBluetoothOpened(false)
                }
    
                // return wordIs 
                console.log('bluetoothOpened & stat')
                console.log(bluetoothOpened)
                console.log(bluetoothState)


                if (bluetoothState == 'PoweredOn') {
                    console.log('yes')
    
                    populateDevices();
                    setLoading(false)
                } else {
                    console.log('no')
    
                    setLoading(false)
                Alert.alert("Bluetooth", "Bluetooth " + bluetoothState);
                }
            });
            

            if (bluetoothState == 'PoweredOn') {
                console.log('yes')

                populateDevices();
                setLoading(false)
            } else {
                console.log('no')

                setLoading(false)
            Alert.alert("Bluetooth", "Bluetooth " + bluetoothState);
            }
            
        } catch (error) {
            setLoading(false)
        }
    };

    const initBluetooth = async () => {
        try {
            if (Platform.OS === "ios") {
                let bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
                _listeners.push(
                    bluetoothManagerEmitter.addListener(
                        BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
                        (rsp) => {
                            _deviceAlreadyPaired(rsp);
                        }
                    )
                );
                _listeners.push(
                    bluetoothManagerEmitter.addListener(
                        BluetoothManager.EVENT_DEVICE_FOUND,
                        (rsp) => {
                            _deviceFoundEvent(rsp);
                        }
                    )
                );
            } else if (Platform.OS === "android") {
                _listeners.push(
                    DeviceEventEmitter.addListener(
                        BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT,
                        () => {
                            ToastAndroid.show(
                                "Device Does Not Support Bluetooth !",
                                ToastAndroid.LONG
                            );
                        }
                    )
                );
            }
            await Promise.all([getPairedBluetooth(), getDevices()]);
        } catch (error) {

        }
    };
    
    const _deviceAlreadyPaired = (rsp) => {
        if (Platform.OS == "ios") {
            var ds = null;
            if (typeof rsp.devices == "object") {
                ds = rsp.devices;
            } else {
                try {
                ds = JSON.parse(rsp.devices);
                } catch (e) {}
            }
            if (ds && ds.length) {
                let pared = pairedDs;
                pared = pared.concat(ds || []);
                setPairedDs(pared)
            }
        }
    };

    const _deviceFoundEvent = (rsp) => {
        if (Platform.OS == "ios") {
          //alert(JSON.stringify(rsp))
            var r = null;
            try {
                if (typeof rsp.device == "object") {
                r = rsp.device;
                } else {
                r = JSON.parse(rsp.device);
                }
            } catch (e) {
                //alert(e.message);
                //ignore
            }
            //alert('f')
            if (r) {
                let found = pairedDs || [];
        
                let duplicated = found.findIndex(function(x) {
                    return x.address == r.address;
                });
                //CHECK DEPLICATED HERE...
                if (duplicated == -1) {
                    found.push(r);
                    setPairedDs(found)
                }
            }
        }
    };

    const _scan = async () => {
        if (Platform.OS == "ios") {
            setLoading(true)
            await BluetoothManager.scanDevices().then(
                (s) => {
                    var ss = s;
                    var found = ss.found;
                    try {
                        found = JSON.parse(found); //@FIX_it: the parse action too weired..
                    } catch (e) {
                        //ignore
                    }
                    var fds = pairedDs;
                    if (found && found.length) {
                        fds = found;
                    }

                    setPairedDs(fds)
                    setLoading(false)
                },
                (er) => {
                    setLoading(false)
                    console.log(JSON.stringify(er));
                }
            );
        }
    };

    const selectPrinter = async(name) => {
        let printName = name
        setPrinterName(printName)
        // setPaperSize(paperSize)
        setCurrentPrinter(printName)
       
        
        let list = [];
        pairedDs.forEach((element) => {
          console.log('element');
          console.log(element);
          if (element.name) {
            list.push({
              label: `${element.name} (${element.address})`,
              value: element,
            });
          }
        });
        setList(list)
        console.log('list')
        console.log(list)
        console.log(printerName)
        console.log('printerName')
        console.log(printerName)

    }   

    const stuff = () => {
        let list = []
        pairedDs.forEach((element) => {
            console.log('element');
            console.log(element);
            if (element.name) {
                list.push({
                    label: `${element.name} (${element.address})`,
                    value: element,
                });
            }
        });
        setList(list)
        console.log('list')
        console.log(list)
        console.log('printerName')
        console.log(printerName)
    }

    const saveClicked = async () => {
        if (parseInt(paperSize) < 32) {
            Alert.alert("Settings", "Paper size cannot be less than 32");
            return;
        }
    
        if (!Helper.getPropValue(printerName, "address")) {
            Alert.alert("Settings", "Please select a printer device");
            return;
        }
        await Promise.all([
            Storage.storeObjectData("printerName", printerName),
            Storage.storeStringData("paperSize", paperSize),
        ]).then((results) => results);
    
        setCurrentPrinter(printerName);
        Alert.alert("Settings", "Settings saved successfully");
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <ScrollView> 
                    <TouchableOpacity onPress={() => navigation.navigate('Change Password')} style={styles.changePin}>

                        <View style={styles.contain}>
                                <View style={styles.theBorder}>
                                    <IconTwo name="key-chain"  size={32} color="#10486c" style={styles.withPin}/>
                                </View>
                                <Text style={styles.itemText}>Change Password</Text>
                                <Icon name="chevron-forward"  size={20} color="#000000" style={styles.arrowIcon}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onToggleSwitch} style={styles.changePin}>
                        <View style={styles.containTwo}>
                            <View style={styles.theBorder}>
                                <IconTwo name="fingerprint"  size={32} color="#10486c" style={styles.withPin}/>
                            </View>
                            <Text style={styles.itemText}>Toggle Finger Pin</Text>
                            <Switch  color={'#209eda'} style={styles.arrowIcon} onValueChange={toggleSwitch} value={biometricLogin}/>
                        </View>
                    </TouchableOpacity>

                    <View style={[styles.bluetoothBox]}>
                        <Text style={[styles.heading, { textAlign: "center" }]}>
                            Bluetooth Printer
                        </Text>
                        {Helper.getPropValue(currentPrinter, "address") && (
                            <>
                            <Text
                                style={[
                                {
                                    fontSize: 12,
                                    marginTop: 5,
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    color: "#707070",
                                },
                                ]}
                            >
                                Current Printer:{" "}
                                {currentPrinter.name +
                                " (" +
                                currentPrinter.address +
                                ")"}
                            </Text>
                            </>
                        )}
                        <TouchableOpacity
                            disabled={loading}
                            onPress={() => getDevices()}
                            style={{
                            flexDirection: "row",
                            alignItems: "flex-end",
                            justifyContent: "flex-end",
                            paddingTop: 20,
                            }}
                        >
                            <Text>
                            {Platform.select({
                                android: "Paired Devices",
                                ios: "Scan Devices",
                            })}{" "}
                            </Text>
                            {loading ? (
                            <ActivityIndicator color="#17375e" />
                            ) : (
                            <Icon name="sync-alt" size={15} color="#17375e" solid />
                            )}
                        </TouchableOpacity>
                        {
                            pairedDs != [] ?
                            <FlatList 
                                data={pairedDs}
                                renderItem={({item}) => (
                                    <TouchableOpacity onPress={() => selectPrinter(item.name)}>
                                        <View style={styles.theTransCase}>
                                            <View style={styles.historiesContainer}>
                                                <View style={styles.general}>
                                                    
                                                    <Text style={styles.printerColor}>{item.name}</Text>
                                                    <Divider />
                                                </View>

                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item) => item.address}
                            /> : <></>

                        }

                        <View style={styles.inputWrapper}>
                            <SelectBox
                            inputLabel="Select a printer"
                            value={printerName}
                            onValueChange={printerName =>
                                setPrinterName(printerName)
                            }
                            placeholder={{ label: "Select a printer", value: null }}
                            items={list}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => {
                                return <Icon name={'print'} size={22} color={'#17375e'} />;
                            }}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <TextInput
                            placeholder="Enter Paper Size"
                            keyboardType="numeric"
                            inputValue={paperSize}
                            inputLabel="Paper Size"
                            onChangeText={paperSize => setPaperSize(paperSize)}
                            />
                        </View>

                        <View style={styles.buttonWrapper}>
                            <Button
                            text="Save Bluetooth Printer Settings"
                            onPress={() => saveClicked()}
                            />
                        </View>
                        <TouchableOpacity style={styles.submitSection} onPress={() => saveClicked()}>
                            <Button icon="content-save-cog" mode="contained" buttonColor={'#209eda'}>
                            Save Bluetooth Printer Settings
                            </Button> 
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonWrapper}>
                        <Button
                            bordered
                            text="Go To Home"
                            onPress={() => navigation.navigate("Home")}
                        />
                    </View>



                </ScrollView>
                
            </View>
        </PaperProvider>

    )
}

export default Settings

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
		flex: 1, 
		backgroundColor: 'white',
        
    },
    heading: {
        color: "#17375e",
        fontSize: 15,
        fontWeight: "bold",
    },
    printerColor:{
        color: '#000000'
    },
    inputWrapper: {
        paddingHorizontal: 15,
        marginTop: 10,
    },
    buttonWrapper: {
        paddingHorizontal: "10%",
        marginTop: 25,
    },
    theBorder:{
        backgroundColor: '#f3f4fb',
        borderRadius: 45,
        marginTop: 5,
        borderColor: '#10486c',
        borderWidth: 1,
        width: '11%',
        // verticalAlign: 'center',
        // paddingVertical: 5,
        justifyContent: 'center',
        // marginLeft: 50
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
    heading: {
        color: "#17375e",
        fontSize: 15,
        fontWeight: "bold",
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
    buttonWrapper: {
        paddingHorizontal: "10%",
        marginTop: 25,
    },
    inputWrapper: {
        paddingHorizontal: 15,
        marginTop: 10,
      },
    bluetoothBox: {
        marginTop: 10,
        borderRadius: 20,
        backgroundColor: "#ffffff",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 30,
        shadowOpacity: 1,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#dce7f4",
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginHorizontal: "3%",
        display: Platform.OS === 'ios' ? "none" : "flex",
    },

})