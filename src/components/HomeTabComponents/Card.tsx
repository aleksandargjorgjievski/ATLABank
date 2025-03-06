import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CardProps {
    balance: number;
}

const Card: React.FC<CardProps> = ({balance}) => {
    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.mkdLabel}>МКД</Text>
                <Text style={styles.accountNumber}>270-XXXXXXXXXX-XX</Text>
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.balanceLabel}>Тековна состојба</Text>
                <Text style={styles.balanceAmount}>MKD {balance}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 386,
        height: 103,
        marginTop: -120,
        borderRadius: 15,
        paddingTop: 15,
        paddingRight: 19,
        paddingBottom: 15,
        paddingLeft: 19,
        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,

    },
    mkdLabel: {
        color: "#343434",
        fontFamily: "Poppins",
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 24,
    },
    accountNumber: {
        color: "#343434",
        fontFamily: "Poppins",
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 24,
        marginLeft: 21,
        paddingLeft: 96,
    },
    cardContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    balanceLabel: {
        color: "#434343",
        fontFamily: "Poppins",
        fontSize: 20,
        fontWeight: "400",
        lineHeight: 20,
        width: 100,
    },
    balanceAmount: {
        color: "#3629B7",
        fontFamily: "Poppins",
        fontSize: 32,
        fontWeight: "700",
        lineHeight: 32,
        paddingRight:32,
    },
});

export default Card;