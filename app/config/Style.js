import Colors from "./Colors";
import { Platform } from "react-native";

export default {
    text:{
        color:Colors.dark,
        fontSize: 18,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    }
}