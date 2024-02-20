import { Platform } from "react-native";
import packageJson from "../package.json";
const APP_NAME = "Shago";
const IOS_VERSION = "2.2";
const ANDROID_VERSION = packageJson.version;
const IS_POS_APP = false;
const SHAGO_POS = false;
const TOKEN_LENGTH = 4;
const DSTV_ADDON_URL = "https://shagopayments.com/api/dstv/addon";

const BASE_URL = "https://shagopayments.com/api";
const APP_URL = "https://shagopayments.com/api/app";

// const BASE_URL ="http://34.68.51.255/shago/public/api";
// const APP_URL=  "http://34.68.51.255/shago/public/api/app";

// const BASE_URL = Platform.select({
//   android: "http://10.0.2.2:8000/api",
//   ios: "http://127.0.0.1:8000/api",
// });
// const APP_URL = Platform.select({
//   android: "http://10.0.2.2:8000/api/app",
//   ios: "http://127.0.0.1:8000/api/app",
// });

const Config = {
  base_url: BASE_URL,
  app_url: APP_URL,
  dstv_addon_url: DSTV_ADDON_URL,
  tokenLength: TOKEN_LENGTH,
  appName: APP_NAME,
  appVersion: Platform.select({
    android: ANDROID_VERSION,
    ios: IOS_VERSION,
  }),
  isPos: Platform.OS == "android" && IS_POS_APP,
  isShagoPOs: Platform.OS == "android" && SHAGO_POS,
};

export default Config;
