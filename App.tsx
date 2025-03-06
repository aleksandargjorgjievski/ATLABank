import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator, ScrollView, SafeAreaView, TextInput
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTab from "./src/screens/HomeTab.tsx";
import LoginScreen from './src/screens/LoginScreen.tsx';
import Dashboard from './src/screens/Dashboard.tsx';
import { enableScreens } from 'react-native-screens';
import {NavigationBar} from './src/components/HomeTabComponents/NavigationBar.tsx';
import { RootStackParamList } from "./types.tsx";
import ChallengeReward from "./src/screens/ChallengeReward.tsx";


enableScreens();


const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
    return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Home"
                        component={HomeTab}
                        options={{ headerShown: false }}
                        initialParams={{ userId: 'F2xkoquV0RO1FFFj3kb3LiOP1Yh1'}}
                    />
                    <Stack.Screen
                        name="Dashboard"
                        component={Dashboard}
                        options={{ headerShown: false }}
                        initialParams={{ userId: 'F2xkoquV0RO1FFFj3kb3LiOP1Yh1'}}
                    />
                    <Stack.Screen
                        name="Challenges"
                        component={ChallengeReward}
                        options={{ headerShown: false }}
                        initialParams={{ userId: 'F2xkoquV0RO1FFFj3kb3LiOP1Yh1'}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
    );
};

export default App;
