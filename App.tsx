import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Dashboard from './Dashboard.tsx'
const App = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [balance, setBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="grozdober.palevski@yahoo.com"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={setEmail}
                    value={email}
                />
                <TextInput
                    style={styles.input}
                    placeholder="thisismypassword123"
                    secureTextEntry
                    onChangeText={setPassword}
                    value={password}
                />
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <Button title="Login" onPress={handleLogin} />
            </View>
        );
    }

    return balance !== null ? (
        <Dashboard balance={balance} userId={auth().currentUser?.uid as string} onLogout={handleLogout} />
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
        paddingHorizontal: 20,
        backgroundColor: '#ffffff'
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 4,
        color: '#000',
    },
    error: {
        color: 'red',
        marginBottom: 15,
        textAlign: 'center'
    }
});

export default App;
