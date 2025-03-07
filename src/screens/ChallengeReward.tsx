import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {NavigationBar} from "../components/HomeTabComponents/NavigationBar.tsx";

/** Ovdeka se definirav parametri odnosno podatoci za ChallengeReward */
interface ChallengeReward {
    id: string;
    name: string;
    description: string;
    points: number;
    completed: boolean;
    redeemed: boolean;
    icon?: any; // If you want to display an icon or image
}

/** Ovdeka se pravi samiot ekran za challenges */
const ChallengeReward: React.FC = () => {
    const [challenges, setChallenges] = useState<ChallengeReward[]>([
        {
            id: 'login7days',
            name: '7-Day Login Streak',
            description: 'Log in 7 days in a row to earn 500 points!',
            points: 500,
            completed: false,
            redeemed: false,
        },
        {
            id: 'maintainBalance',
            name: 'Maintain 1000+ Balance',
            description: 'Keep your balance above 1000 for 7 days to earn 1000 points!',
            points: 1000,
            completed: false,
            redeemed: false,
        },
    ]);
    const [userPoints, setUserPoints] = useState<number>(0);

    /**
     * Ovdeka uvek kd kje se otvori samata strana challenges proverue u firebase dali su smeneti nekoi parametri za on da dobie povishke points.
     */
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = auth().currentUser?.uid;
                if (!userId) return;

                const userDoc = await firestore().collection('Users').doc(userId).get();
                const userData = userDoc.data();

                if (userData) {
                    // Ovdeka se zgolemuev poeni
                    setUserPoints(userData.points || 0);

                    // Ovoj treba da proverue dali odreden challenge e completed
                    const updatedChallenges = [...challenges].map((challenge) => {
                        // For example, if it's the 7-day login streak:
                        if (challenge.id === 'login7days' && userData.streak >= 7) {
                            challenge.completed = true;
                        }

                        // Ovoj ovdeka e za challenge shto e da se proveri dali Balance kje mu ostane nad odreden broj primer 1000, ako mu ostane dobiva poeni, samo treba da se napravi nekakav timed system za odredeno vreme
                        if (challenge.id === 'maintainBalance' && userData.Balance >= 1000) {
                            challenge.completed = true;
                        }

                        return challenge;
                    });
                    setChallenges(updatedChallenges);
                }
            } catch (err) {
                console.error('Error fetching user data:', err);
            }
        };

        fetchUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Ovoj e za kao redeem funkcija kude shto od kd kje ga zavrshi challenge klika redeem i bi trebalo da dobie poeni
     */
    const handleRedeem = async (challengeId: string, pointsToAdd: number) => {
        try {
            const userId = auth().currentUser?.uid;
            if (!userId) return;

            // Ovoj ovdeka gi fetch odnovo najnovi podatoci od databazu
            const userDocRef = firestore().collection('Users').doc(userId);
            const userDoc = await userDocRef.get();
            const userData = userDoc.data();

            if (!userData) return;


            const newPoints = (userData.points || 0) + pointsToAdd;

            // Ovoj gi dodava u databazu
            await userDocRef.update({ points: newPoints });

            // Ovoj e za display da se updejtira
            setUserPoints(newPoints);
            setChallenges((prev) =>
                prev.map((ch) => {
                    if (ch.id === challengeId) {
                        return { ...ch, redeemed: true };
                    }
                    return ch;
                })
            );
        } catch (err) {
            console.error('Error redeeming challenge:', err);
        }
    };

    return (
        <View style={styles.container}>
            {/* Example "header" or points display */}
            <View style={styles.pointsContainer}>
                <Text style={styles.pointsLabel}>HalkCoins</Text>
                <Text style={styles.pointsValue}>{userPoints}</Text>
            </View>

            {/* List of challenges */}
            {challenges.map((challenge) => (
                <View key={challenge.id} style={styles.challengeCard}>
                    <View style={styles.challengeInfo}>
                        {/* You could replace with an Image icon if you want */}
                        <Text style={styles.challengeTitle}>{challenge.name}</Text>
                        <Text style={styles.challengeDesc}>{challenge.description}</Text>
                    </View>

                    {/* ChallengeReward status / redemption */}
                    {challenge.redeemed ? (
                        // If redeemed, show a green check icon
                        <Image
                            source={require('../assets/checkmark.png')}
                            style={styles.checkmarkIcon}
                        />
                    ) : challenge.completed ? (
                        // If completed but not redeemed, show Redeem button
                        <TouchableOpacity
                            style={styles.redeemButton}
                            onPress={() => handleRedeem(challenge.id, challenge.points)}
                        >
                            <Text style={styles.redeemButtonText}>Redeem</Text>
                        </TouchableOpacity>
                    ) : (
                        // If not completed, show an "incomplete" state
                        <Image
                            source={require('../assets/checkmark.png')}
                            style={styles.incompleteIcon}
                        />
                    )}
                </View>
            ))}
            <NavigationBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    pointsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#FF8303',
        borderRadius: 8,
    },
    pointsLabel: {
        fontSize: 16,
        color: '#fff',
        marginRight: 8,
    },
    pointsValue: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    challengeCard: {
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    challengeInfo: {
        flex: 1,
        marginRight: 10,
    },
    challengeTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        color: '#333',
    },
    challengeDesc: {
        fontSize: 14,
        color: '#666',
    },
    redeemButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    redeemButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    checkmarkIcon: {
        width: 32,
        height: 32,
    },
    incompleteIcon: {
        width: 28,
        height: 28,
        tintColor: '#ccc',
    },
});

export default ChallengeReward;