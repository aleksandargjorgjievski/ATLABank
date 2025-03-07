import React from "react";
import {StyleSheet, View} from "react-native";
import {Dropdown} from "react-native-element-dropdown";

interface PeriodSelectorProps {
    selectedPeriod: 'daily' | 'weekly' | 'monthly';
    onChange: (value: 'daily' | 'weekly' | 'monthly') => void;
}


const PeriodSelector: React.FC<PeriodSelectorProps> = ({ selectedPeriod, onChange }) => {
    const data = [
        { label: 'Daily', value: 'daily' },
        { label: 'Weekly', value: 'weekly' },
        { label: 'Monthly', value: 'monthly' },
    ];

    return (
        <View style={styles.periodSelectorContainer}>
            <Dropdown
                style={styles.dropdown}
                data={data}
                labelField="label"
                valueField="value"
                placeholder="Одбери период"
                value={selectedPeriod}
                onChange={(item) => onChange(item.value)}
            />
        </View>
    );
};

const styles= StyleSheet.create({
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
        fontWeight: "500",
        fontFamily: "Poppins",
    },
    dropdown: {
        width: '100%',
        height: 20,
    },
})

export default PeriodSelector;