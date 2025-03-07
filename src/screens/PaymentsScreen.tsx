import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Image,
} from "react-native";
import { Svg, Path } from "react-native-svg";
import {Dropdown} from "react-native-element-dropdown";


type TabType = "halkbank" | "otherBanks" | "faculty";

const FormTab: React.FC<{ title: string; active?: boolean }> = ({ title, active }) => {
    return (
        <View style={[styles.tab, active && styles.activeTab]}>
            <Text style={styles.tabText}>{title}</Text>
        </View>
    );
};

interface PaymentCardProps {
    icon: React.ReactNode;
    text: string;
    active?: boolean;
    onPress: () => void;
}

const data = [
    { label: 'УГД', value: 'ugd' },
    { label: 'УКИМ', value: 'ukim' },
    { label: 'УКЛО', value: 'uko' },
    { label: 'American College', value: 'american' },
];

const PaymentCard: React.FC<PaymentCardProps> = ({ icon, text, active, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <View style={[styles.card, active && styles.activeCard]}>
            {icon}
            <Text style={styles.cardText}>{text}</Text>
        </View>
    </TouchableOpacity>
);

interface HeaderProps {
    onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBack }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Image
                  source={require("../assets/backArrow.png")}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>Назад</Text>
        </View>
    );
};

interface PaymentFormProps {
    activeTab: TabType;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ activeTab }) => {
    // Туј се рендерирав у зависност на коју картичку се кликне
    const [selectedValue, setSelectedValue] = useState(null);
    const renderFields = () => {
        if (activeTab === "halkbank") {
            return (
                <>
                    <View style={styles.inputGroup}>
                        <TextInput placeholder="Име" style={styles.input} placeholderTextColor="#CACACA" />
                    </View>
                    <View style={styles.inputGroup}>
                        <TextInput placeholder="Платежна Сметка" style={styles.input} placeholderTextColor="#CACACA" />
                    </View>
                    <View style={styles.inputGroup}>
                        <TextInput
                            placeholder="Износ"
                            style={styles.input}
                            placeholderTextColor="#CACACA"
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <TextInput placeholder="Коментар" style={styles.input} placeholderTextColor="#CACACA" multiline />
                    </View>
                </>
            );
        } else if (activeTab === "otherBanks") {
            return (
                <>
                    <View style={styles.inputGroup}>
                        <TextInput placeholder="Име" style={styles.input} placeholderTextColor="#CACACA" />
                    </View>
                    <View style={styles.inputGroup}>
                        <TextInput placeholder="Платежна сметка" style={styles.input} placeholderTextColor="#CACACA" />
                    </View>
                </>
            );
        } else if (activeTab === "faculty") {
            return (
                <>
                    <View style={styles.inputGroup}>
                        <Dropdown
                            style={styles.input}
                            data={data}
                            labelField="label"
                            valueField="value"
                            placeholder="Универзитет"
                            value={selectedValue}
                            onChange={item => {
                                setSelectedValue(item.value);
                            }}
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <TextInput placeholder="Факултет" style={styles.input} placeholderTextColor="#CACACA" />
                    </View>
                </>
            );
        }
    };

    return (
        <View style={styles.formContainer}>
            <View style={styles.formHeader}>
                <FormTab title="Налогодавач" active />
            </View>
            <View style={styles.formContent}>
                {renderFields()}
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Продолжи</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

interface PaymentScreenProps {
    navigation: any;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState<TabType>("halkbank");

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Header onBack={() => navigation.goBack()} />
                <View style={styles.content}>
                    <View style={styles.cardsContainer}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsScrollView}>
                            <View style={styles.cardsRow}>
                                <PaymentCard
                                    active={activeTab === "halkbank"}
                                    onPress={() => setActiveTab("halkbank")}
                                    icon={
                                        <Image
                                            source={require("../assets/creditCard.png")}
                                        />
                                    }
                                    text="Плаќања кон HalkBank"
                                />
                                <PaymentCard
                                    active={activeTab === "otherBanks"}
                                    onPress={() => setActiveTab("otherBanks")}
                                    icon={
                                        <Image
                                            source={require("../assets/user.png")}
                                        />
                                    }
                                    text="Плаќања кон други банки"
                                />
                                <PaymentCard
                                    active={activeTab === "faculty"}
                                    onPress={() => setActiveTab("faculty")}
                                    icon={
                                        <Image
                                            source={require("../assets/hat.png")}
                                        />
                                    }
                                    text="Плаќања за факултет"
                                />
                            </View>
                        </ScrollView>
                    </View>
                    <PaymentForm activeTab={activeTab} />
                    <View style={styles.bottomForm}>
                        <FormTab title="Примач" active={false} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1573FF",
    },
    scrollView: {
        flex: 1,
    },
    content: {
        flex: 1,
        backgroundColor: "#fff",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginTop: -57,
    },
    header: {
        padding: 20,
        height: 165,
        backgroundColor: "#1573FF",
    },
    backButton: {
        width: 30,
        height: 30,
    },
    headerText: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "700",
        marginLeft: 40,
        marginTop: -35,
    },
    cardsContainer: {
        paddingHorizontal: 20,
    },
    cardsScrollView: {
        flexGrow: 0,
    },
    cardsRow: {
        flexDirection: "row",
        gap: 20,
        paddingVertical: 20,
    },
    card: {
        borderRadius: 15,
        padding: 15,
        width: 120,
        height: 100,
        backgroundColor: "#E0E0E0",
        justifyContent: "space-between",
    },
    activeCard: {
        backgroundColor: "#3629B7",
    },
    cardText: {
        color: "#fff",
        fontSize: 12,
        lineHeight: 16,
        marginTop: "auto",
    },
    formContainer: {
        borderRadius: 15,
        padding: 20,
        margin: 20,
        marginTop: 25,
        alignItems: "center"
    },
    formHeader: {
        marginBottom: 20,
    },
    formContent: {
        gap: 10,
        alignItems: "center",
    },
    inputGroup: {
        marginBottom: 20,
        width: 300,
    },
    input: {
        width: "100%",
        padding: 12,
        borderWidth: 1,
        borderColor: "#CBCBCB",
        borderRadius: 15,
        fontSize: 14,
        color: "#000",
    },
    button: {
        width: "100%",
        padding: 12,
        borderRadius: 15,
        backgroundColor: "#FE9223",
        marginTop: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
    bottomForm: {
        padding: 20,
        marginTop: 40,
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        alignSelf: "flex-start",
    },
    activeTab: {
        backgroundColor: "#3629B7",
    },
    tabText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
    dropdown: {
        width: '100%',
        height: 20,
    },
});

export default PaymentScreen;