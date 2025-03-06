import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import TransactionsChart from '../components/DashboardComponents/TransactionsChart';
import LineChartComponent from '../components/DashboardComponents/LineChart';
import VisualCards from '../components/DashboardComponents/VisualCards';
import {useNavigation} from '@react-navigation/native';
import {NavigationBar} from "../components/HomeTabComponents/NavigationBar.tsx";
import {DashboardScreenProps} from "../../types.tsx";

const Dashboard: React.FC<DashboardScreenProps> = ({ route, navigation }) => {
    const { userId } = route.params || { userId: 'F2xkoquV0RO1FFFj3kb3LiOP1Yh1'};

    const [showCharts, setShowCharts] = useState(false);
    const [selectedChart, setSelectedChart] = useState<'pie' | 'line' | 'visual'>('pie');
    const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
    const [selectedVisualCardType, setSelectedVisualCardType] = useState<'maxTransaction' | 'maxCategory' | 'savingPercentage'>('maxTransaction');

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
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
                    <Button title="Logout" />
                </View>

            </View>
            <NavigationBar navigation={navigation} />
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
