import firebase from '@react-native-firebase/app';
import {
    getDatabase,
    ref,
    onValue,
    set,
    push,
    update,
    remove,
    onDisconnect,
} from '@react-native-firebase/database';


const database = getDatabase();
