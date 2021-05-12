import { DefaultTheme } from '@react-navigation/native'
import Colors from '../config/Colors'

const myTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: Colors.primary,
        background:'white'
    }
}

export default myTheme