import React, { useState, useEffect } from 'react';
import {  Text, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

interface Transaction {
    amount: number;
    date: Date;
}

    interface LineChartComponentProps {
        userId: string;
        period: 'daily' | 'weekly' | 'monthly';
    }

// Генерирање на кључ за да може полсно да се одредуе кој период на време ни треба
function getGroupKey(date: Date, period: 'daily' | 'weekly' | 'monthly'): string {

    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Овдека га добивамо почетак на недељу
    startOfWeek.setHours(0, 0, 0, 0); // Местење на полноќ туја

    // Наваѓање на полетак и крај на недељу
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999); // Мести се крај на дн

    if (period === 'daily') {
        // Проверување за "daily"
        if (date < startOfWeek || date > endOfWeek) {
            return '';
        }
        // Остављамо формат M-D да биде
        return `${date.getMonth() + 1}-${date.getDate()}`;
    } else if (period === 'weekly') {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const weekNumber = Math.ceil((date.getDate() + firstDay.getDay()) / 7);
        return `${date.getMonth() + 1}-W${weekNumber}`;
    } else if (period === 'monthly') {
        // Туја мењамо формат на YYYY-M
        return `${date.getFullYear()}-${date.getMonth() + 1}`;
    }
    return '';
}

// Туја ги правимо транзакцие
function aggregateTransactionsByPeriod(transactions: Transaction[], period: 'daily' | 'weekly' | 'monthly') {
    const groups: { [key: string]: number } = {};

    transactions.forEach(tx => {
        const key = getGroupKey(tx.date, period);
        groups[key] = (groups[key] || 0) + tx.amount;
    });

    // Сортирање
    const sortedKeys = Object.keys(groups).sort((a, b) => {
        let dateA: Date, dateB: Date;

        try {
            if (period === 'daily') {
                // Проверување на формат
                const partsA = a.split('-').map(Number);
                const partsB = b.split('-').map(Number);
                dateA = new Date(partsA[0], partsA[1] - 1, partsA[1]);
                dateB = new Date(partsB[0], partsB[1] - 1, partsB[1]);
            } else if (period === 'monthly') {
                const partsA = a.split('-').map(Number);
                const partsB = b.split('-').map(Number);
                if (partsA.length !== 2 || partsB.length !== 2) {
                    throw new Error('Invalid date format for monthly period');
                }

                dateA = new Date(partsA[0], partsA[1] - 1, 1);
                dateB = new Date(partsB[0], partsB[1] - 1, 1);
            } else if (period === 'weekly') {
                // Недењан формат туја YYYY-Www
                const matchA = a.match(/^(\d{1})-W(\d{1})$/);
                const matchB = b.match(/^(\d{1})-W(\d{1})$/);

                if (!matchA || !matchB) {
                    throw new Error('Invalid week format');
                }

                const yearA = parseInt(matchA[1]);
                const weekA = parseInt(matchA[2]);
                const yearB = parseInt(matchB[1]);
                const weekB = parseInt(matchB[2]);

                // Дата на прв дн од недељу туја
                dateA = new Date(yearA, 0, 1 + (weekA - 1) * 7);
                dateB = new Date(yearB, 0, 1 + (weekB - 1) * 7);
            } else {
                throw new Error('Invalid period type');
            }

            return dateA.getTime() - dateB.getTime();
        } catch (error) {
            console.error('Sorting error:', error);
            // Бекап плен ако ништо не пројде
            return a.localeCompare(b);
        }
    });

    const labels = sortedKeys;
    const data = sortedKeys.map(key => groups[key]);
    return {
        labels,
        datasets: [
            {
                data,
            },
        ],
    };
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({ userId, period }) => {
    const [chartData, setChartData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

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
                    if (data && data.date) {
                        transactions.push({
                            amount: parseFloat(data.amount),
                            date: data.date.toDate(),
                        });
                    }
                });

                const aggregatedData = aggregateTransactionsByPeriod(transactions, period);
                setChartData(aggregatedData);
                console.log(period);
            } catch (error) {
                console.error('Error fetching transactions for line chart:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [userId, period]);

    if (loading) {
        return <Text>Loading chart...</Text>;
    }

    if (!chartData || chartData.labels.length === 0) {
        return <Text>No transactions found for this period.</Text>;
    }

    return (
        <LineChart
            data={chartData}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: { borderRadius: 16 },
                propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffa726',
                },
            }}
            bezier
            style={{
                marginVertical: 8,
                borderRadius: 16,
            }}
        />
    );
};

export default LineChartComponent;
