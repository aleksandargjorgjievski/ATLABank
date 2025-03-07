import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { Svg, Path } from "react-native-svg";

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
                <Svg width={30} height={30} viewBox="0 0 30 30" fill="none">
                    <Path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.26858 14.9948C6.26858 14.4574 6.46333 13.9199 6.852 13.5102L19.089 0.615216C19.8674 -0.205072 21.1295 -0.205072 21.9076 0.615216C22.6857 1.43517 22.6857 2.76486 21.9076 3.58522L11.0796 14.9948L21.9073 26.4045C22.6854 27.2248 22.6854 28.5544 21.9073 29.3743C21.1291 30.1949 19.8671 30.1949 19.0886 29.3743L6.85163 16.4795C6.46288 16.0695 6.26858 15.5321 6.26858 14.9948Z"
                        fill="white"
                    />
                </Svg>
            </TouchableOpacity>
            <Text style={styles.headerText}>Назад</Text>
        </View>
    );
};

interface PaymentFormProps {
    activeTab: TabType;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ activeTab }) => {
    // Conditionally render different fields based on activeTab
    const renderFields = () => {
        if (activeTab === "halkbank") {
            return (
                <>
                    <View style={styles.inputGroup}>
                        <TextInput placeholder="Име" style={styles.input} placeholderTextColor="#CACACA" />
                    </View>
                    <View style={styles.inputGroup}>
                        <TextInput placeholder="Плаќач Сметка" style={styles.input} placeholderTextColor="#CACACA" />
                    </View>
                    <View style={styles.inputGroup}>
                        <TextInput placeholder="Примач Сметка" style={styles.input} placeholderTextColor="#CACACA" />
                    </View>
                    <View style={styles.inputGroup}>
                        <TextInput
                            placeholder="Износ"
                            style={styles.input}
                            placeholderTextColor="#CACACA"
                            keyboardType="numeric"
                        />
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
                        <TextInput placeholder="Банка" style={styles.input} placeholderTextColor="#CACACA" />
                    </View>
                    <View style={styles.inputGroup}>
                        <TextInput placeholder="Примач Сметка" style={styles.input} placeholderTextColor="#CACACA" />
                    </View>
                    <View style={styles.inputGroup}>
                        <TextInput
                            placeholder="Износ"
                            style={styles.input}
                            placeholderTextColor="#CACACA"
                            keyboardType="numeric"
                        />
                    </View>
                </>
            );
        } else if (activeTab === "faculty") {
            return (
                <>
                    <View style={styles.inputGroup}>
                        <TextInput placeholder="Универзитет" style={styles.input} placeholderTextColor="#CACACA" />
                    </View>
                    <View style={styles.inputGroup}>
                        <TextInput placeholder="Факултет" style={styles.input} placeholderTextColor="#CACACA" />
                    </View>
                    <View style={styles.inputGroup}>
                        <TextInput placeholder="Примач Сметка" style={styles.input} placeholderTextColor="#CACACA" />
                    </View>
                    <View style={styles.inputGroup}>
                        <TextInput placeholder="Сметка" style={styles.input} placeholderTextColor="#CACACA" />
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
                <View style={styles.inputGroup}>
                    <TextInput placeholder="Коментар" style={styles.input} placeholderTextColor="#CACACA" multiline />
                </View>
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
                                        <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
                                            <Path
                                                d="M28 9.33209V4.66659C28 3.37742 26.9558 2.33325 25.6667 2.33325H2.33333C1.04417 2.33325 0 3.37742 0 4.66659V9.33209H28Z"
                                                fill="white"
                                            />
                                            <Path
                                                d="M0 12.8333V23.3333C0 24.6224 1.04417 25.6666 2.33333 25.6666H25.6667C26.9558 25.6666 28 24.6224 28 23.3333V12.8333H0ZM12.8333 19.8333H4.66667V17.4999H12.8333V19.8333ZM23.3333 19.8333H18.6667V17.4999H23.3333V19.8333Z"
                                                fill="white"
                                            />
                                        </Svg>
                                    }
                                    text="Плаќања кон HalkBank"
                                />
                                <PaymentCard
                                    active={activeTab === "otherBanks"}
                                    onPress={() => setActiveTab("otherBanks")}
                                    icon={
                                        <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
                                            <Path
                                                d="M14 15.1667C17.8605 15.1667 21 12.0272 21 8.16667V7C21 3.1395 17.8605 0 14 0C10.1395 0 7 3.1395 7 7V8.16667C7 12.0272 10.1395 15.1667 14 15.1667Z"
                                                fill="white"
                                            />
                                            <Path
                                                d="M22.5423 18.6445C17.0543 17.1244 10.9468 17.1244 5.45763 18.6445C2.93179 19.3445 1.16663 21.658 1.16663 24.2725V28H26.8333V24.2725C26.8333 21.658 25.0681 19.3445 22.5423 18.6445Z"
                                                fill="white"
                                            />
                                        </Svg>
                                    }
                                    text="Плаќања кон други банки"
                                />
                                <PaymentCard
                                    active={activeTab === "faculty"}
                                    onPress={() => setActiveTab("faculty")}
                                    icon={
                                        <Svg width={28} height={28} viewBox="0 0 37 37" fill="none">
                                            <Path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M16.4883 10.3934C16.3892 10.4019 16.2889 10.4062 16.1876 10.4062C14.2719 10.4062 12.7189 8.85324 12.7189 6.9375C12.7189 5.02176 14.2719 3.46875 16.1876 3.46875C18.1034 3.46875 19.6564 5.02176 19.6564 6.9375C19.6564 7.03878 19.6521 7.13905 19.6435 7.23813C20.1896 7.04349 20.7778 6.9375 21.3908 6.9375C24.2644 6.9375 26.5939 9.26702 26.5939 12.1406C26.5939 15.0142 24.2644 17.3438 21.3908 17.3438C18.5172 17.3438 16.1876 15.0142 16.1876 12.1406C16.1876 11.5277 16.2936 10.9395 16.4883 10.3934ZM17.3439 6.9375C17.3439 7.57608 16.8262 8.09375 16.1876 8.09375C15.5491 8.09375 15.0314 7.57608 15.0314 6.9375C15.0314 6.29892 15.5491 5.78125 16.1876 5.78125C16.8262 5.78125 17.3439 6.29892 17.3439 6.9375ZM21.3908 15.0312C22.9872 15.0312 24.2814 13.7371 24.2814 12.1406C24.2814 10.5442 22.9872 9.25 21.3908 9.25C19.7943 9.25 18.5001 10.5442 18.5001 12.1406C18.5001 13.7371 19.7943 15.0312 21.3908 15.0312Z"
                                                fill="white"
                                            />
                                        </Svg>
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
        marginTop: 10,
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
        marginTop: 40,
    },
    formHeader: {
        marginBottom: 20,
    },
    formContent: {
        gap: 20,
    },
    inputGroup: {
        marginBottom: 20,
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
        marginTop: 20,
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
});

export default PaymentScreen;