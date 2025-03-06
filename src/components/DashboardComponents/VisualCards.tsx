import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';

interface Transaction {
    amount: number;
    category: string;
}

interface VisualCardsProps {
    userId: string;
    visualCardType: 'maxTransaction' | 'maxCategory' | 'savingPercentage';
}

function aggregateTransactionsByType(transactions: Transaction[], visualCardType: 'maxTransaction' | 'maxCategory' | 'savingPercentage') : string {
    if (visualCardType === 'maxTransaction') {
        let sortedTransactions = transactions.sort((a, b) => b.amount - a.amount);
        let max = sortedTransactions[0].amount;
        return max.toString() + 'ден';
    }
    else if (visualCardType === 'maxCategory') {
        const totals: { [key: string]: number } = {};
        transactions.forEach(tx => {
            totals[tx.category] = (totals[tx.category] || 0) + tx.amount;
        });
        let max = 0;
        let maxCategory = '';
        Object.entries(totals).forEach(([category, amount]) => {
            if (amount > max) {
                max = amount;
                maxCategory = category;
            }
        });
        return maxCategory + ' - ' + max.toString() + 'ден';
    }
    else if (visualCardType === 'savingPercentage') {

    }
    return '';
}

const VisualCards: React.FC<VisualCardsProps> = ({userId, visualCardType} ) => {

    const [loading, setLoading] = useState(true);
    const [aggregateTypeInfo, setAggregateTypeInfo] = useState<any>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const snapshot = await firestore()
                    .collection('Users')
                    .doc(userId)
                    .collection('Transactions')
                    .get();

                const transactions: Transaction[] = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    transactions.push({
                        amount: parseFloat(data.amount),
                        category: data.category || 'Other',
                    });
                });

                // If no transactions are found, throw a proper Error object
                if (transactions.length === 0) {
                    throw new Error('No transactions found');
                }

                const aggregateData = aggregateTransactionsByType(transactions, visualCardType);
                console.log(visualCardType);
                setAggregateTypeInfo(aggregateData);

            } catch (error) {
                const errorObj = error instanceof Error ? error : new Error(String(error));
                console.error('Error fetching transactions:', errorObj.stack);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [userId, visualCardType]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }


    return (
        <View>
            <Text>{aggregateTypeInfo}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        alignItems: 'center',
    },
    center: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default VisualCards;
