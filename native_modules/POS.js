import { NativeModules } from "react-native";
import Config from "../Helpers/Config";
if (Config.isShagoPOs) {
  module.exports = NativeModules.ShagoPOS;
} else {
  module.exports = NativeModules.POS;
}
