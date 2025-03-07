import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native';
import TransactionsChart from '../components/DashboardComponents/TransactionsChart';
import LineChart from '../components/DashboardComponents/LineChart';
import LineChartComponent from '../components/DashboardComponents/LineChart';
import VisualCards from '../components/DashboardComponents/VisualCards';
import {useNavigation} from '@react-navigation/native';
import {NavigationBar} from "../components/HomeTabComponents/NavigationBar.tsx";
import {DashboardScreenProps} from "../../types.tsx";
import {AccountHeader} from "../components/HomeTabComponents/AccountHeader.tsx";
import PeriodSelector from "../components/DashboardComponents/PeriodSelector";


const AccountSelector = () => (
    <View style={styles.selectorContainer}>
        <View style={styles.selector}>
            <Text style={styles.selectorText}>Одбери платежна сметка</Text>
        </View>
    </View>
);

const Dashboard: React.FC<DashboardScreenProps> = ({route}) => {

    const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
    const userId = route.params.userId;
    const balance = route.params.balance;

    return (
        <View style={styles.container}>
            <AccountHeader />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.content}>
                    <AccountSelector />
                    <View style={styles.chartsContainer}>
                        <View style={{paddingLeft: 14}}>
                        <PeriodSelector
                            selectedPeriod={selectedPeriod}
                            onChange={setSelectedPeriod}
                        />
                    </View>
                        <TransactionsChart userId={userId} period={selectedPeriod}/>
                        <LineChart userId={userId} period={selectedPeriod}/>
                        <VisualCards userId={userId} period={selectedPeriod} balance={balance}/>
                    </View>
                </View>
            </ScrollView>
            <NavigationBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        maxWidth: 480,
        width: "100%",
        alignSelf: "center",
        overflow: "hidden",
    },
    selectorContainer: {
        paddingHorizontal: 32,
        paddingTop: 20,
        paddingBottom: 2,
        zIndex: 10,
        alignItems: "center",
    },
    selector: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#CBCBCB",
        width: 295,
        maxWidth: "100%",
        padding: 12,
    },
    selectorText: {
        fontSize: 14,
        color: "#CACACA",
        fontWeight: "500",
        fontFamily: "Poppins",
    },
    chartsContainer: {
        marginTop: 20,
        paddingHorizontal: 20,

    },
    spacer: {
        height: 8,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 100,
    },
});

export default Dashboard;
