    import React, {useEffect, useState} from 'react'
    import auth from '@react-native-firebase/auth';
    import firestore from '@react-native-firebase/firestore';
    import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
    import Logo from '../components/LoginComponents/Logo.tsx';
    import WelcomeText from '../components/LoginComponents/WelcomeText.tsx';
    import LockIllustration from '../components/LoginComponents/LockIllustration.tsx';
    import LoginButton from '../components/LoginComponents/LoginButton.tsx';
    import OrangeFooter from '../components/LoginComponents/OrangeFooter.tsx';
    import HomeTab from './HomeTab.tsx';
    import {useNavigation} from "@react-navigation/native";
    import {HomeScreenProps} from "../../types.tsx";

    const LoginScreen = () => {
        const [email, setEmail] = useState('grozdober.palevski@yahoo.com');
        const [password, setPassword] = useState('thisismypassword123');
        const [loggedIn, setLoggedIn] = useState(false);
        const [balance, setBalance] = useState<number | null>(null);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState('');
        const navigation = useNavigation<HomeScreenProps>();

        const handleLogin = async () => {
            setLoading(true);
            setError('');
            try {
                const userCredential = await auth().signInWithEmailAndPassword(email, password);
                console.log('User logged in:', userCredential.user.uid);

                setLoggedIn(true);
            } catch (err) {
                console.error('Login error:', err);
                setError('Login failed. Please check your credentials.');
            }
            setLoading(false);
        };

        useEffect(() => {
            const fetchUserData = async () => {
                const userId = auth().currentUser?.uid;
                if (userId) {
                    try {
                        const docSnapshot = await firestore()
                            .collection('Users')
                            .doc(userId)
                            .get();
                        if (docSnapshot.exists) {
                            const userData = docSnapshot.data();
                            console.log('User Account:', userData);
                            if (userData && userData.Balance !== undefined) {
                                setBalance(userData.Balance);
                            } else {
                                setError('User data does not contain a balance.');
                            }
                        } else {
                            setError('User document not found.');
                        }
                    } catch (err) {
                        console.error('Error fetching user data:', err);
                        setError('Error fetching account data.');
                    }
                }
            };

            if (loggedIn) {
                fetchUserData();

            }
        }, [loggedIn]);

        const handleLogout = async () => {
            await auth().signOut();
            setLoggedIn(false);
            setBalance(null);
        };
        if (loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }

        if (!loggedIn) {
            return (
                <SafeAreaView style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <View style={styles.content}>
                            <Logo />
                            <WelcomeText />
                            <LockIllustration />
                            <View style={styles.inputContainer}>
                                <TextInput style={styles.input}

                                    placeholder="grozdober.palevski@yahoo.com"
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    onChangeText={setEmail}
                                    value={email}
                                />
                                <TextInput style={styles.input}

                                    placeholder="thisismypassword123"
                                    onChangeText={setPassword}
                                    value={password}
                                />
                                {error ? <Text style={styles.error}>{error}</Text> : null}
                            </View>
                            <LoginButton onPress={handleLogin} />
                        </View>
                    </ScrollView>
                    <OrangeFooter />
                </SafeAreaView>
            );
        }

        return balance !== null ? (
            navigation.navigate('Home', {
                userId: auth().currentUser?.uid || '',
                balance: balance,
            })
        ) : (
            <View style={styles.container}>
                <Text>Loading account balance...</Text>
            </View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#ffffff',
        },
        title: {
            fontSize: 24,
            marginBottom: 20,
            textAlign: 'center'
        },
        input: {
            height: 40,
            borderColor: '#ccc',
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10,
            borderRadius: 4,
            color: '#000',
        },
        error: {
            color: 'red',
            marginBottom: 15,
            textAlign: 'center'
        },
        scrollContent: {
            flexGrow: 1,
        },
        content: {
            alignItems: "center",
            width: "100%",
            maxWidth: 412,
            paddingBottom: 123,
        },
        inputContainer: {
            width: "100%",
            maxWidth: 327,
            marginTop: 25,
            paddingHorizontal: 20,
            gap: 15,
        },
    });

    export default LoginScreen;