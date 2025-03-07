import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

interface Transaction {
    amount: number;
    category: string;
    date: Date;
    type: 'income' | 'expense';
}

interface VisualCardsProps {
    userId: string;
    period: 'daily' | 'weekly' | 'monthly';
    balance: number;
}

function aggregateTransactionsByType(balance,transactions: Transaction[],visualCardType: 'maxTransaction' | 'maxCategory' | 'savingPercentage'): string {
    if (!transactions.length) return 'No data';
// Филтрирање туја
    if (visualCardType === 'maxTransaction') {
        const expenses = transactions.filter(tx => tx.type === 'expense');
        if (!expenses.length) return 'No expenses';
        const sortedTransactions = expenses.sort((a, b) => b.amount - a.amount);
        const max = sortedTransactions[0].amount;
        return "MKD " + max.toString();
    }
    else if (visualCardType === 'maxCategory') {
        const expenses = transactions.filter(tx => tx.type === 'expense');
        if (!expenses.length) return 'No expenses';

        const totals: { [key: string]: number } = {};
        expenses.forEach(tx => {
            totals[tx.category] = (totals[tx.category] || 0) + tx.amount;
        });

        let max = 0;
        let maxCategory = '';
        Object.entries(totals).forEach(([category, amount]) => {
            if (amount > max) {
                maxCategory = category;
            }
        });

        return maxCategory;
    }
    else if (visualCardType === 'savingPercentage') {
        const expenses = transactions.filter(tx => tx.type === 'expense').map(tx => tx.amount).reduce((acc, curr) => acc + curr, 0);
        const startingBalance = balance + expenses;
        const savingPercentage = (balance / startingBalance) * 100;

        return savingPercentage.toFixed(1) + '%';
    }

    return '';
}

const VisualCards: React.FC<VisualCardsProps> = ({ balance, userId, period }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    const getDateRange = useCallback(() => {
        const now = new Date();
        switch (period) {
            case 'daily':
                return { startDate: startOfDay(now), endDate: endOfDay(now) };
            case 'weekly':
                return { startDate: startOfWeek(now), endDate: endOfWeek(now) };
            case 'monthly':
                return { startDate: startOfMonth(now), endDate: endOfMonth(now) };
            default:
                return { startDate: startOfDay(now), endDate: endOfDay(now) };
        }
    }, [period]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const { startDate, endDate } = getDateRange();
            setLoading(true);

            try {
                const snapshot = await firestore()
                    .collection('Users')
                    .doc(userId)
                    .collection('Transactions')
                    .where('date', '>=', startDate)
                    .where('date', '<=', endDate)
                    .get();

                const fetchedTransactions: Transaction[] = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    fetchedTransactions.push({
                        amount: parseFloat(data.amount),
                        category: data.category || 'Other',
                        date: data.date.toDate(),
                        type: data.type || 'expense',
                    });
                });

                setTransactions(fetchedTransactions);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [balance, userId, period, getDateRange]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View>
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>Највисока трансакција</Text>
                        <Text style={styles.cardDescription}>
                            {aggregateTransactionsByType(balance, transactions, 'maxTransaction')}
                        </Text>
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>Натрошена категорија</Text>
                        <Text style={styles.cardDescription}>
                            {aggregateTransactionsByType(balance, transactions, 'maxCategory')}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.lastCard}>
                <View style={styles.card}>
                    <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>Месечна заштеда</Text>
                        <Text style={styles.cardDescription}>
                            {aggregateTransactionsByType(balance, transactions, 'savingPercentage')}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
        alignItems: 'center',
        paddingVertical: 10,
        maxWidth: 500,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        margin: 5,
        width: "45%",
        height: 120,
        overflow: 'hidden',
    },
    lastCard: {
        alignItems: 'center',
    },
    cardContent: {
        padding: 10,
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 15,
        color: "#aeaeae",
    },
    cardDescription: {
        fontSize: 18,
        color: '#444',
        marginTop: 10,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});

export default VisualCards;