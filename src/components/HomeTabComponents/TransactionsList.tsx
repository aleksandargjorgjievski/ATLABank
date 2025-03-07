import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, Text,ActivityIndicator} from 'react-native';
import firestore from '@react-native-firebase/firestore';

interface Transaction {
    transactionId: string;
    amount: number;
    location: string;
    date: any;
}

export const TransactionsList: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={
          require('../../assets/grozdober_creditcard.png')
        }
        style={styles.image}
        resizeMode="contain"
      />

    </View>
  );
};
export const TransactionList: React.FC<{ userId: string }> = ({userId}) => {
    const [loading, setLoading] = useState(true);
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);


    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const snapshot = await firestore()
                    .collection('Users')
                    .doc(userId)
                    .collection('Transactions')
                    .orderBy('date', 'desc')
                    .limit(10)
                    .get();

                const transactions: Transaction[] = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    console.log('Transaction doc data:', data);
                    transactions.push({
                        transactionId: doc.id,
                        amount: parseFloat(data.amount),
                        location: data.location ,
                        date: data.date,
                    });
                });
                if (transactions.length === 0) {
                    throw new Error('No transactions found');
                }

                setFilteredTransactions(transactions);
            } catch (error) {
                const errorObj = error instanceof Error ? error : new Error(String(error));
                console.error('Error fetching transactions:', errorObj.stack);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [userId]);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Последни трансакции</Text>
            {filteredTransactions.map(transaction => (
                <View key={transaction.transactionId} style={styles.transactionRow}>
                    <View style={styles.leftColumn}>
                    <Text style={styles.transactionText}>{transaction.location}</Text>
                    </View>
                    <View style={styles.centerColumn}>
                    <Text style={styles.transactionDate}>
                        {transaction.date &&
                            new Date(transaction.date.seconds * 1000).toLocaleDateString()}
                    </Text>
                    </View>
                    <View style={styles.rightColumn}>
                    <Text style={styles.transactionAmount}> - MKD {transaction.amount}.00</Text>
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: -10,
        width: '100%',
        paddingHorizontal: 11,
        backgroundColor: '#FFF',
        fontFamily: 'Poppins',
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: "space-evenly",
    },
    header: {
        fontSize: 20,
        color: 'rgba(0, 0, 0, 1)',
        fontWeight: '500',
        lineHeight: 24,
        marginBottom: 10,
    },
    image: {
    aspectRatio: 1.18,
    width: '100%',
      paddingTop: 0,
      marginBottom: 0,
  },
    transactionRow: {
        flexDirection: 'row',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    leftColumn: {
        flex: 1,
        alignItems: 'flex-start',
    },
    centerColumn: {
        flex: 1,
        alignItems: 'center',
    },
    rightColumn: {
        flex: 1,
        alignItems: 'flex-end',
    },
    transactionText: {
        fontSize: 13,
        color: '#000',
    },
    transactionDate: {
        fontSize: 13,
        color: '#000',
    },
    transactionAmount: {
        fontSize: 13,
        color: '#F00',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
