import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import TransactionsChart from './TransactionsChart';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';


interface DashboardProps {
    balance: number;
    userId: string;
    onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ balance, userId, onLogout }) => {

    const [showCharts, setShowCharts] = useState(false);

    const [selectedChart, setSelectedChart] = useState<'pie' | 'line'>('pie');
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.balanceText}>Balance: {balance} ден.</Text>

                {/* Button to toggle the charts section */}
                <Button
                    title={showCharts ? "Hide Charts" : "Show Charts"}
                    onPress={() => setShowCharts(!showCharts)}
                />

                {/* Conditionally render the charts section */}
                {showCharts && (
                    <View style={styles.chartsSection}>
                        {/* Buttons to select chart type */}
                        <View style={styles.buttonContainer}>
                            <Button title="Pie Chart" onPress={() => setSelectedChart('pie')} />
                            <Button title="Line Chart" onPress={() => setSelectedChart('line')} />
                        </View>

                        {/* Conditional rendering based on the selected chart */}
                        {selectedChart === 'pie' ? (
                            <TransactionsChart userId={userId} />
                        ) : (
                            <View style={styles.chartPlaceholder}>
                                <Text>Line Chart coming soon...</Text>
                                {/* <LineChartComponent userId={userId} /> */}
                            </View>
                        )}
                    </View>
                )}

                <View style={styles.logoutContainer}>
                    <Button title="Logout" onPress={onLogout} />
                </View>
            </View>
        </ScrollView>
    );
};
// const Stack = createNativeStackNavigator();

// const NavigationStack: React.FC = () => {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator>
//                 <Stack.Screen name={"TransactionChart"}
//                               component={TransactionsChart}
//                               options={{title: "Welcome"}}
//                               />
//             </Stack.Navigator>
//         </NavigationContainer>
//     )
// }

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    container: {
        alignItems: 'center'
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
    chartPlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 220,
        width: '100%',
    },
    logoutContainer: {
        marginTop: 20,
        width: '100%',
    },
});

export default Dashboard;