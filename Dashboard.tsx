import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import TransactionsChart from './TransactionsChart';
import LineChartComponent from './LineChart';
import VisualCards from './VisualCards';

interface DashboardProps {
    balance: number;
    userId: string;
    onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ balance, userId, onLogout }) => {
    const [showCharts, setShowCharts] = useState(false);
    const [selectedChart, setSelectedChart] = useState<'pie' | 'line' | 'visual'>('pie');
    const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
    const [selectedVisualCardType, setSelectedVisualCardType] = useState<'maxTransaction' | 'maxCategory' | 'savingPercentage'>('maxTransaction');

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.balanceText}>Balance: {balance} ден.</Text>
                <Button
                    title={showCharts ? "Hide Charts" : "Show Charts"}
                    onPress={() => setShowCharts(!showCharts)}
                />
                {showCharts && (
                    <View style={styles.chartsSection}>
                        {/* Chart type selector */}
                        <View style={styles.buttonContainer}>
                            <Button title="Pie Chart" onPress={() => setSelectedChart('pie')} />
                            <Button title="Line Chart" onPress={() => setSelectedChart('line')} />
                            <Button title="Visual Cards" onPress = {() => setSelectedChart('visual')} />
                        </View>
                        {selectedChart === 'pie' && <TransactionsChart userId={userId} />}

                        {selectedChart === 'line' &&
                            <View>
                                {/* Period selector for line chart */}
                                <View style={styles.buttonContainer}>
                                    <Button title="Daily" onPress={() => setSelectedPeriod('daily')} />
                                    <Button title="Weekly" onPress={() => setSelectedPeriod('weekly')} />
                                    <Button title="Monthly" onPress={() => setSelectedPeriod('monthly')} />
                                </View>
                                <LineChartComponent userId={userId} period={selectedPeriod} />
                            </View>
                        }

                        {selectedChart === 'visual' &&
                            <View>
                                <View style={styles.buttonContainer}>
                                    <Button title="Transaction" onPress={() => setSelectedVisualCardType('maxTransaction')} />
                                    <Button title="Category" onPress={() => setSelectedVisualCardType('maxCategory')} />
                                    <Button title="Saving" onPress={() => setSelectedVisualCardType('savingPercentage')} />
                                </View>
                                <VisualCards userId={userId} visualCardType={selectedVisualCardType} />
                            </View>
                        }

                    </View>
                )}
                <View style={styles.logoutContainer}>
                    <Button title="Logout" onPress={onLogout} />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    container: {
        alignItems: 'center',
    },
    balanceText: {
        fontSize: 24,
        marginBottom: 20,
    },
    chartsSection: {
        width: '100%',
        marginTop: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    logoutContainer: {
        marginTop: 20,
        width: '100%',
    },
});

export default Dashboard;
