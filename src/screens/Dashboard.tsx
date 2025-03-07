import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native';
import TransactionsChart from '../components/DashboardComponents/TransactionsChart';
import LineChartComponent from '../components/DashboardComponents/LineChart';
import VisualCards from '../components/DashboardComponents/VisualCards';
import {useNavigation} from '@react-navigation/native';
import {NavigationBar} from "../components/HomeTabComponents/NavigationBar.tsx";
import {DashboardScreenProps} from "../../types.tsx";
import {AccountHeader} from "../components/HomeTabComponents/AccountHeader.tsx";

const AccountSelector = () => (
    <View style={styles.selectorContainer}>
        <View style={styles.selector}>
            <Text style={styles.selectorText}>Одбери платежна сметка</Text>
        </View>
    </View>
);

const PeriodSelector = () => (
    <View style={styles.periodSelectorContainer}>
        <Text style={styles.periodText}>Одбери период</Text>
        <Image
            source={{
                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/bb0bd965c49231a3d5b9b630676142fb91236343c20b1f50d26b6c62d8bf55f6?placeholderIfAbsent=true&apiKey=7cb5d00e6c744af2b0f9a54edf41510d",
            }}
            style={styles.periodIcon}
        />
    </View>
);

const ExpensesPieChart = () => (
    <View style={styles.pieChartContainer}>
        <Text style={styles.chartTitle}>Одливи</Text>
        <View style={styles.spacer} />
        <View style={styles.chartContainer}>
            <Image
                source={{
                    uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/5cea9118052bc79ccbbc83a79391d222f938ec36736566dfab38193edf54a72b?placeholderIfAbsent=true&apiKey=7cb5d00e6c744af2b0f9a54edf41510d",
                }}
                style={styles.pieChart}
            />
        </View>
        <View style={styles.legendContainer}>
            {[
                { color: "#6200EE", label: "Alpha" },
                { color: "#26A69A", label: "Beta" },
                { color: "#EE6002", label: "Gamma" },
                { color: "#FFC107", label: "Delta" },
            ].map((item, index) => (
                <View key={index} style={styles.legendItem}>
                    <View
                        style={[styles.legendIndicator, { backgroundColor: item.color }]}
                    />
                    <Text style={styles.legendText}>{item.label}</Text>
                </View>
            ))}
        </View>
    </View>
);

const MonthlyTransactionChart = () => (
    <View style={styles.monthlyChartContainer}>
        <View style={styles.chartHeader}>
            <Text style={styles.monthlyChartTitle}>Месечен промет</Text>
            <Text style={styles.monthlyChartSubtitle}>Во МКД</Text>
        </View>
        <View style={styles.chartContent}>
            <View style={styles.yAxisContainer}>
                <View style={styles.yAxisLabels}>
                    <Text style={styles.axisLabel}>100</Text>
                    <Text style={styles.axisLabel}>80</Text>
                    <Text style={styles.axisLabel}>60</Text>
                </View>
                <View style={styles.gridLines}>
                    {[0, 1, 2].map((index) => (
                        <View key={index} style={styles.gridLine} />
                    ))}
                </View>
            </View>
            <Image
                source={{
                    uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/d490be1ee638cd56abc6eed9430a05df0545e430648912424584642224752eb7?placeholderIfAbsent=true&apiKey=7cb5d00e6c744af2b0f9a54edf41510d",
                }}
                style={styles.lineChart}
            />
        </View>
    </View>
);

const Dashboard: React.FC<DashboardScreenProps> = () => {
    return (
        <View style={styles.container}>
            <AccountHeader />
            <ScrollView>
                <View style={styles.content}>
                    <AccountSelector />
                    <View style={styles.chartsContainer}>
                        <PeriodSelector />
                        <ExpensesPieChart />
                        <MonthlyTransactionChart />
                    </View>
                    <Image
                        source={{
                            uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ced510df5664ea4542dc7916bd2e3b0e6908077b767a62551e7bf401a20b836c?placeholderIfAbsent=true&apiKey=7cb5d00e6c744af2b0f9a54edf41510d',
                        }}
                        style={styles.bottomImage}
                    />
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
        paddingHorizontal: 32,
    },
    periodSelectorContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#CBCBCB",
        padding: 15,
        maxWidth: 295,
    },
    periodText: {
        fontSize: 14,
        color: "#CACACA",
        fontWeight: "500",
        fontFamily: "Poppins",
    },
    periodIcon: {
        width: 20,
        height: 20,
    },
    pieChartContainer: {
        marginTop: 32,
        borderRadius: 4,
        backgroundColor: "#FFF",
        overflow: "hidden",
    },
    chartTitle: {
        fontSize: 18,
        color: "#000",
        fontFamily: "Roboto",
        padding: 24,
    },
    spacer: {
        height: 8,
    },
    chartContainer: {
        alignItems: "center",
        padding: 24,
    },
    pieChart: {
        width: 144,
        height: 144,
    },
    legendContainer: {
        flexDirection: "row",
        justifyContent: "center",
        padding: 24,
        gap: 24,
    },
    legendItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    legendIndicator: {
        width: 9,
        height: 9,
        borderRadius: 100,
    },
    legendText: {
        fontSize: 12,
        color: "#000",
        fontFamily: "Roboto",
        letterSpacing: 0.15,
    },
    monthlyChartContainer: {
        marginTop: 86,
        borderRadius: 4,
        backgroundColor: "#FFF",
        overflow: "hidden",
    },
    chartHeader: {
        padding: 24,
    },
    monthlyChartTitle: {
        fontSize: 18,
        color: "#000",
        fontFamily: "Roboto",
    },
    monthlyChartSubtitle: {
        fontSize: 14,
        color: "#000",
        fontFamily: "Roboto",
        marginTop: 4,
        letterSpacing: 0.25,
    },
    chartContent: {
        minHeight: 226,
        padding: 24,
        paddingTop: 8,
    },
    yAxisContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    yAxisLabels: {
        justifyContent: "space-between",
        height: 150,
    },
    axisLabel: {
        fontSize: 12,
        color: "#000",
        fontFamily: "Roboto",
        letterSpacing: 0.15,
    },
    gridLines: {
        flex: 1,
        height: 150,
        justifyContent: "space-between",
    },
    gridLine: {
        height: 1,
        backgroundColor: "rgba(0, 0, 0, 0.12)",
        width: "100%",
    },
    lineChart: {
        width: "100%",
        height: 100,
        marginTop: -101,
        resizeMode: "contain",
    },
    bottomImage: {
        width: "100%",
        height: 80,
        marginTop: -86,
        resizeMode: "contain",
    },
});

export default Dashboard;
