import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import firestore from '@react-native-firebase/firestore';
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

const screenWidth = Dimensions.get('window').width;

interface Transaction {
    amount: number;
    category: string;
    date: Date;
}

interface ChartDataItem {
    name: string;
    amount: number;
    color: string;
    legendFontColor: string;
    legendFontSize: number;
}

interface TransactionsChartProps {
    userId: string;
    period: 'daily' | 'weekly' | 'monthly';
}

const TransactionsChart: React.FC<TransactionsChartProps> = ({ userId, period }) => {
    const [chartData, setChartData] = useState<ChartDataItem[]>([]);
    const [loading, setLoading] = useState(true);

    const getColor = useCallback((index: number): string => {
        const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
        return colors[index % colors.length];
    }, []);

    const aggregateTransactions = useCallback((transactions: Transaction[]): ChartDataItem[] => {
        const totals: { [key: string]: number } = {};
        transactions.forEach(tx => {
            totals[tx.category] = (totals[tx.category] || 0) + tx.amount;
        });
        return Object.entries(totals).map(([category, amount], index) => ({
            name: category,
            amount,
            color: getColor(index),
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        }));
    }, [getColor]);

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

                const transactions: Transaction[] = [];
                snapshot.forEach(doc => {
                    const data = doc.data();
                    transactions.push({
                        amount: parseFloat(data.amount),
                        category: data.category || 'Other',
                        date: data.date.toDate(),
                    });
                });

                const aggregated = aggregateTransactions(transactions);
                setChartData(aggregated);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [userId, period, aggregateTransactions, getDateRange]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.chartTitle}>Transactions by Category</Text>
            {chartData.length ? (
                <PieChart
                    data={chartData}
                    width={screenWidth - 40}
                    height={220}
                    chartConfig={{
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    accessor="amount"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                />
            ) : (
                <Text>No transactions found for the selected period.</Text>
            )}
        </View>
    );
};

    const styles = StyleSheet.create({
        container: {
            marginVertical: 20,
            alignItems: 'center',
        },
        center: {
            flex: 1,
            justifyContent: 'center'
        },
        chartTitle: {
            fontSize: 18,
            marginBottom: 10
        },
    });

    export default TransactionsChart;
