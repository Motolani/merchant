import POS from "../native_modules/POS";
import { Alert, Image } from "react-native";
import PrintStringFormat from "./PrintStringFormat";
import PosLogo from "./PosLogo";
import dateFormat from "dateformat";

const convertImageToBase64 = async (image) => {
  let res = "";
  let uri = Image.resolveAssetSource(image).uri;

  await ImgToBase64.getBase64String(uri)
    .then((base64String) => {
      res = base64String;
    })
    .catch((err) => {
      res = null;
      console.log(err);
    });

  return res;
};

const getItems = (items) => {
  let spacing=  " ";
  let itemArray = [];
  let agentItem = {
    isMultiline: false,
    header: { text: "Agent", align: "left" },
    body: { text: spacing+global.username, align: "right" },
  };
  let dateItem = {
    isMultiline: false,
    header: { text: "Date", align: "left" },
    body: {
      text: spacing+dateFormat(new Date(), "dd/mm/yyyy hh:MM:ss tt"),
      align: "right",
    },
  };
  itemArray.push(agentItem);
  if (!items.find((el) => el.label.toString().toLocaleLowerCase() == "date")) {
    itemArray.push(dateItem);
  }
  items.forEach((item) => {
    if (item.value != null && item.label.toLowerCase() != "agent") {
      var label = item.label;
      var value = String(item.value).replace("\u20A6", "N");
      itemArray.push({
        isMultiline: false,
        header: { text: label, align: "left" },
        body: { text: spacing+value, align: "right" },
      });
    }
  });
  return itemArray;
};

const Print = async (printObjectsArray, image = null) => {
  try {
    let array = getItems(printObjectsArray);
    let logo = null;

    if (image) {
      logo = await PosLogo(image).then((res) => res);
    }
    let string = PrintStringFormat(array, logo);

    console.log(string);
    POS.print(string, (responseCode, data) => {
      if ("00" == responseCode) {
        Alert.alert("Message", "Successful");
      } else if ("02" == responseCode) {
        Alert.alert("Error", "Transaction Failed");
      } else if ("03" == responseCode) {
        Alert.alert("Error", "Transaction Cancelled");
      } else if ("04" == responseCode) {
        Alert.alert("Error", "Invalid Format");
      } else if ("05" == responseCode) {
        Alert.alert("Error", "Wrong Parameter");
      } else if ("06" == responseCode) {
        Alert.alert("Error", "Transaction Timeout");
      } else if ("09" == responseCode) {
        Alert.alert("Error", "Activity Cancelled");
      } else {
        Alert.alert("Error", "Intent failed to pass result");
      }
    });
  } catch (error) {
    Alert.alert("Error", "An error occurred");
  }
};

export default Print;
