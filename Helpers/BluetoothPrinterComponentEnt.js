import Storage from "./Storage";
import { Alert, Image, Platform } from "react-native";
import {
  BluetoothManager,
  BluetoothEscposPrinter,
} from "react-native-bluetooth-escpos-printer";
import React, { useState, useContext} from 'react'
import dateFormat from "dateformat";
import ImgToBase64 from "react-native-image-base64";
import Helper from "./Helper";
import shagoLogoBase64_ from "./shagoLogoBase64_";
import PinspayLogoBase64 from "./PinspayLogoBase64";
import { AuthContext } from "../src/context/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

const convertImageToBase64 = async (image) => {
  const { user, name } = useContext(AuthContext);
  const [ agentName, setAgentName ] = useState('');
  const [ updatedState, setUpdatedState ] = useState(false);

  const setStuff = () => {
    Storage.storeStringData("agentName", name),
    setAgentName(name)
  }

  useEffect(() => {
    setStuff()
}, [updatedState]);

  let res = null;
  await ImgToBase64.getBase64String(image)
    .then((base64String) => {
      res = base64String;
    })
    .catch((err) => {
      res = null;
      console.log(err);
    });

  return res;
};

const Print = async (printObjectsArray, image = null) => {
  try {
    
    let [paperSizePromise, printerNamePromise] = await Promise.all([
      Storage.getStringData("paperSize").then((result) => result),
      Storage.getObjectData("printerName").then((result) => result),
    ]).then((results) => results);

    let paperSize = paperSizePromise.data ?? 32;
    let printerName = printerNamePromise.data;

    if (!Helper.getPropValue(printerName, "address")) {
      Alert.alert(
        "Error",
        "It seems no printer is selected. Please pair your device with a bluetooth printer. Then select the paired bluetooth printer on the app under settings tab."
      );
      return;
    }

    paperSize = parseInt(paperSize);

    let address = printerName.address;

    await BluetoothManager.connect(address) // the device address scanned.
      .then(
        (s) => {
            printingEnt(printObjectsArray, image);
          
        },
        (e) => {
          Alert.alert("Bluetooth Printer", e.toString());
        }
      );
  } catch (error) {
    Alert.alert("Error", error.toString());
  }
};



const printing = async (printObjectsArray, image = null) => {
  try {
    let base64Img = null;

    if (image) {
      base64Img = await convertImageToBase64(image).then((res) => res);
    }

    let dateField = printObjectsArray.find(
      (el) => el.label.toLocaleLowerCase() == "date"
    );

    if (Platform.OS == "ios") {
      if (base64Img) {
        await BluetoothEscposPrinter.printPic(base64Img, {
          width: 200,
          left: 80,
        }).catch(async (error) => {});
      }
    } else {
      if (base64Img) {
        await BluetoothEscposPrinter.printPic(base64Img, {
          width: 200,
          left: 80,
        });
      }
    }

    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER
    );

    await BluetoothEscposPrinter.printText("Transaction Summary\r\n", {});

    //-----------------------------------------------------------Dynamic fields --------------------------------------------------------------------------

    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.LEFT
    );

    let columnWidths = [16, 14];
    await BluetoothEscposPrinter.printText(
      "--------------------------------\r\n",
      {}
    );
    await BluetoothEscposPrinter.printColumn(
      columnWidths,
      [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
      ["ITEM", "DETAIL"],
      {}
    );
    await BluetoothEscposPrinter.printText(
      "--------------------------------\r\n",
      {}
    );
    console.log('here')

    AsyncStorage.getItem("AgentName")
    .then(async(result)=> {
      await BluetoothEscposPrinter.printText(
        `Agent: ${result}\r\n`,
        {}
      );
    })

    await BluetoothEscposPrinter.printText(
      "--------------------------------\r\n",
      {}
    );

    AsyncStorage.getItem("PrintDate")
    .then(async(result)=> {
      await BluetoothEscposPrinter.printText(
        `Trans Date: ${result}\r\n`,
        {}
      );
    })
    await BluetoothEscposPrinter.printText(
      "--------------------------------\r\n",
      {}
    );

    AsyncStorage.getItem("PrintAmount")
    .then(async(result)=> {
      await BluetoothEscposPrinter.printText(
        `Amount: ${result}\r\n`,
        {}
      );
    })

    await BluetoothEscposPrinter.printText(
      "--------------------------------\r\n",
      {}
    );

    AsyncStorage.getItem("SourceAccount")
    .then(async(result)=> {
      await BluetoothEscposPrinter.printText(
        `Account: ${result}\r\n`,
        {}
      );
    })

    await BluetoothEscposPrinter.printText(
      "--------------------------------\r\n",
      {}
    );

    AsyncStorage.getItem("Balance")
    .then(async(result)=> {
      await BluetoothEscposPrinter.printText(
        `Balance: ${result}\r\n`,
        {}
      );
    })

    await BluetoothEscposPrinter.printText(
      "--------------------------------\r\n",
      {}
    );

    AsyncStorage.getItem("Channel")
    .then(async(result)=> {
      let res = ''
      if(result == 'PMONEY'){
        res = 'Pinspay'
      }else{
        res = result
      }
      await BluetoothEscposPrinter.printText(
        `Channel: ${res}\r\n`,
        {}
      );
    })

    await BluetoothEscposPrinter.printText(
      "--------------------------------\r\n",
      {}
    );

    AsyncStorage.getItem("TransactionId")
    .then(async(result)=> {
      await BluetoothEscposPrinter.printText(
        `Transaction ID: ${result}\r\n`,
        {}
      );
    })

    await BluetoothEscposPrinter.printText(
      "--------------------------------\r\n",
      {}
    );

    AsyncStorage.getItem("RequestId")
    .then(async(result)=> {
      await BluetoothEscposPrinter.printText(
        `Request ID: ${result}\r\n`,
        {}
      );
    })

    await BluetoothEscposPrinter.printText(
      "--------------------------------\r\n",
      {}
    );

    AsyncStorage.getItem("Description")
    .then(async(result)=> {
      await BluetoothEscposPrinter.printText(
        `Description: ${result}\r\n`,
        {}
      );
    })

    await BluetoothEscposPrinter.printText(
      "--------------------------------\r\n",
      {}
    );

    AsyncStorage.getItem("BankCode")
    .then(async(result)=> {
      await BluetoothEscposPrinter.printText(
        `Bank Code: ${result}\r\n`,
        {}
      );
    })

    await BluetoothEscposPrinter.printText(
      "--------------------------------\r\n",
      {}
    );

    AsyncStorage.getItem("DebitCredit")
    .then(async(result)=> {
      let res = ''
      if(result == 'c'){
        res = 'Credit'
      }else{
        res = 'Debit'
      }

      await BluetoothEscposPrinter.printText(
        `DebitCredit: ${res}\r\n`,
        {}
      );
    })

    await BluetoothEscposPrinter.printText(
      "--------------------------------\r\n",
      {}
    );

    if (!dateField) {
      await BluetoothEscposPrinter.printText(
        `Print Date: ${dateFormat(new Date(), "dd/mm/yyyy hh:MM:ss tt")}\r\n`,
        {}
      );
      await BluetoothEscposPrinter.printText(
        "--------------------------------\r\n",
        {}
      );
    }
    // await BluetoothEscposPrinter.printText(
    //   "--------------------------------\r\n",
    //   {}
    // );
    for (let el of printObjectsArray) {
      if (el.value != null && el.label.toLowerCase() != "agent") {
        await BluetoothEscposPrinter.printText(
          `${el.label}: ${String(el.value).replace("\u20A6", "N")}\r\n`,
          {}
        );
      }
    }

    await BluetoothEscposPrinter.printText("\r\n", {});

    //-----------------------------------------------------------End Dynamic fields --------------------------------------------------------------------------

    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER
    );
    await BluetoothEscposPrinter.printText(
      "(Customer & Agent Receipt)\r\n",
      {}
    );

    await BluetoothEscposPrinter.printText("Thank you, visit again.\r\n", {});

    if (PinspayLogoBase64) {
      if (Platform.OS == "ios") {
        await BluetoothEscposPrinter.printPic(PinspayLogoBase64, {
          width: 200,
          left: 80,
        }).catch(async (error) => {});
      } else {
        await BluetoothEscposPrinter.printPic(PinspayLogoBase64, {
          width: 200,
          left: 80,
        });
      }
    } else {
      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER
      );
      await BluetoothEscposPrinter.printText("Pinspay Merchant Pay\r\n", {});
    }
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER
    );
    // await BluetoothEscposPrinter.printText("\r\nThe e-Market Space\r\n", {});

    await BluetoothEscposPrinter.printText("CUSTOMER CARE\r\n", {});
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.LEFT
    );
    await BluetoothEscposPrinter.printText(
      "+2348141158458, 012275020\r\n",
      {}
    );
    await BluetoothEscposPrinter.printText(
      "info@pinspay.com\r\n",
      {}
    );
    await BluetoothEscposPrinter.printText("\n\r\n\r", {});
  } catch (error) {
    Alert.alert("Error", error.toString());
  }
};

const printingEnt = async (printObjectsArray, image = null) => {
  try {
    let base64Img = null;

    if (image) {
      base64Img = await convertImageToBase64(image).then((res) => res);
    }

    let dateField = printObjectsArray.find(
      (el) => el.label.toLocaleLowerCase() == "date"
    );

    if (Platform.OS == "ios") {
      if (base64Img) {
        await BluetoothEscposPrinter.printPic(base64Img, {
          width: 200,
          left: 80,
        }).catch(async (error) => {});
      }
    } else {
      if (base64Img) {
        await BluetoothEscposPrinter.printPic(base64Img, {
          width: 200,
          left: 80,
        });
      }
    }

    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER
    );

    await BluetoothEscposPrinter.printText("Transaction Summary\r\n", {});

    //-----------------------------------------------------------Dynamic fields --------------------------------------------------------------------------

    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.LEFT
    );

    let columnWidths = [16, 14];
    await BluetoothEscposPrinter.printText(
      "--------------------------------\r\n",
      {}
    );
    await BluetoothEscposPrinter.printColumn(
      columnWidths,
      [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
      ["ITEM", "DETAIL"],
      {}
    );
    await BluetoothEscposPrinter.printText(
      "--------------------------------\r\n",
      {}
    );
    console.log('here')

    await BluetoothEscposPrinter.printText(
        `Type: Enterprise\r\n`,
        {}
      );

    // await BluetoothEscposPrinter.printText(
    //   "--------------------------------\r\n",
    //   {}
    // );
    
    AsyncStorage.getItem("EntSalesRepUsername")
    .then(async(result)=> {
        result = result.replaceAll("\"", "")
      await BluetoothEscposPrinter.printText(
        `Agent: ${result}\r\n`,
        {}
      );
    })

    await BluetoothEscposPrinter.printText(
      "--------------------------------\r\n",
      {}
    );

    AsyncStorage.getItem("EntPrintDate")
    .then(async(result)=> {
        result = result.replaceAll("\"", "")
      await BluetoothEscposPrinter.printText(
        `Trans Date: ${result}\r\n`,
        {}
      );
    })
    await BluetoothEscposPrinter.printText(
      "--------------------------------\r\n",
      {}
    );

    AsyncStorage.getItem("EntPrintAmount")
    .then(async(result)=> {
        result = result.replaceAll("\"", "")
      await BluetoothEscposPrinter.printText(
        `Amount: ${result}\r\n`,
        {}
      );
    })

    await BluetoothEscposPrinter.printText(
      "--------------------------------\r\n",
      {}
    );

    AsyncStorage.getItem("EntSenderPhone")
    .then(async(result)=> {
        result = result.replaceAll("\"", "")
      await BluetoothEscposPrinter.printText(
        `SenderPhone: ${result}\r\n`,
        {}
      );
    })

    await BluetoothEscposPrinter.printText(
      "--------------------------------\r\n",
      {}
    );

    AsyncStorage.getItem("EntReceiverPhone")
    .then(async(result)=> {
        result = result.replaceAll("\"", "")
      await BluetoothEscposPrinter.printText(
        `ReceiverPhone: ${result}\r\n`,
        {}
      );
    })

    await BluetoothEscposPrinter.printText(
      "--------------------------------\r\n",
      {}
    );

    AsyncStorage.getItem("EntStatus")
    .then(async(result)=> {
      let res = ''
      if(result == '1'){
        res = 'Successful'
      }else if(result == '2'){
        res = 'Failed'
      }else{
        res='Pending'
      }
      
      await BluetoothEscposPrinter.printText(
        `Status: ${res}\r\n`,
        {}
      );
    })

    await BluetoothEscposPrinter.printText(
      "--------------------------------\r\n",
      {}
    );

    AsyncStorage.getItem("EntReference")
    .then(async(result)=> {
        result = result.replaceAll("\"", "")
      await BluetoothEscposPrinter.printText(
        `Reference: ${result}\r\n`,
        {}
      );
    })

    await BluetoothEscposPrinter.printText(
      "--------------------------------\r\n",
      {}
    );

    // AsyncStorage.getItem("EntDescription")
    // .then(async(result)=> {
    //   await BluetoothEscposPrinter.printText(
    //     `Description: ${result}\r\n`,
    //     {}
    //   );
    // })

    // await BluetoothEscposPrinter.printText(
    //   "--------------------------------\r\n",
    //   {}
    // );

    // if (!dateField) {
    //   await BluetoothEscposPrinter.printText(
    //     `Print Date: ${dateFormat(new Date(), "dd/mm/yyyy hh:MM:ss tt")}\r\n`,
    //     {}
    //   );
    //   await BluetoothEscposPrinter.printText(
    //     "--------------------------------\r\n",
    //     {}
    //   );
    // }
    await BluetoothEscposPrinter.printText(
      "--------------------------------\r\n",
      {}
    );
    for (let el of printObjectsArray) {
      if (el.value != null && el.label.toLowerCase() != "agent") {
        await BluetoothEscposPrinter.printText(
          `${el.label}: ${String(el.value).replace("\u20A6", "N")}\r\n`,
          {}
        );
      }
    }

    await BluetoothEscposPrinter.printText("\r\n", {});

    //-----------------------------------------------------------End Dynamic fields --------------------------------------------------------------------------

    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER
    );
    await BluetoothEscposPrinter.printText(
      "(Customer & Agent Receipt)\r\n",
      {}
    );

    await BluetoothEscposPrinter.printText("Thank you, visit again.\r\n", {});

    if (PinspayLogoBase64) {
      if (Platform.OS == "ios") {
        await BluetoothEscposPrinter.printPic(PinspayLogoBase64, {
          width: 200,
          left: 80,
        }).catch(async (error) => {});
      } else {
        await BluetoothEscposPrinter.printPic(PinspayLogoBase64, {
          width: 200,
          left: 80,
        });
      }
    } else {
      await BluetoothEscposPrinter.printerAlign(
        BluetoothEscposPrinter.ALIGN.CENTER
      );
      await BluetoothEscposPrinter.printText("Pinspay Merchant Pay\r\n", {});
    }
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER
    );
    // await BluetoothEscposPrinter.printText("\r\nThe e-Market Space\r\n", {});

    await BluetoothEscposPrinter.printText("CUSTOMER CARE\r\n", {});
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.LEFT
    );
    await BluetoothEscposPrinter.printText(
      "+2348141158458, 012275020\r\n",
      {}
    );
    await BluetoothEscposPrinter.printText(
      "info@pinspay.com\r\n",
      {}
    );
    await BluetoothEscposPrinter.printText("\n\r\n\r", {});
  } catch (error) {
    Alert.alert("Error", error.toString());
  }
};

export default Print;
