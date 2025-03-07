import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import { AccountHeader } from "../components/HomeTabComponents/AccountHeader.tsx";
import { NavigationBar } from "../components/HomeTabComponents/NavigationBar.tsx";

const Rewards = () => {
    return (
        <View style={rewardStyles.container}>
            <ScrollView contentContainerStyle={rewardStyles.scrollContent}>
                <Image
                    source={require("../assets/rewards.png")}
                    style={rewardStyles.illustration}
                    accessibilityLabel="Illustration"
                />

                <View style={rewardStyles.rewardItem}>
                    <View style={rewardStyles.rewardContent}>
                        <View style={rewardStyles.rewardLeft}>
                            <Image
                                source={require("../assets/rewardRed.png")}
                                style={rewardStyles.rewardIcon}
                            />
                            <Text style={rewardStyles.rewardTextLabel}>
                                Бонус поени (+100)
                            </Text>
                        </View>
                        <View style={rewardStyles.rewardAmount}>
                            <Text style={rewardStyles.rewardAmountText}>
                                80 HalkCoins
                            </Text>
                            <Image
                                source={require("../assets/checkmark.png")}
                                style={rewardStyles.checkIcon}
                                accessibilityLabel="Check"
                            />
                        </View>
                    </View>
                </View>
                <View style={rewardStyles.divider} />

                <View style={rewardStyles.rewardItem}>
                    <View style={rewardStyles.rewardContent}>
                        <View style={rewardStyles.rewardLeft}>
                            <Image
                                source={require("../assets/rewardOrange.png")}
                                style={rewardStyles.rewardIcon}
                            />
                            <Text style={rewardStyles.rewardTextLabel}>
                                Ваучер 1
                            </Text>
                        </View>
                        <View style={rewardStyles.rewardAmount}>
                            <Text style={rewardStyles.rewardAmountText}>
                                150 HalkCoins
                            </Text>
                            <Image
                                source={require("../assets/checkmark.png")}
                                style={rewardStyles.checkIcon}
                                accessibilityLabel="Check"
                            />
                        </View>
                    </View>
                </View>
                <View style={rewardStyles.divider} />

                <View style={rewardStyles.rewardItem}>
                    <View style={rewardStyles.rewardContent}>
                        <View style={rewardStyles.rewardLeft}>
                            <Image
                                source={require("../assets/rewardPink.png")}
                                style={rewardStyles.rewardIcon}
                            />
                            <Text style={rewardStyles.rewardTextLabel}>
                                Ваучер 2
                            </Text>
                        </View>
                        <View style={rewardStyles.rewardAmount}>
                            <Text style={rewardStyles.rewardAmountText}>
                                150 HalkCoins
                            </Text>
                            <Image
                                source={require("../assets/checkmark.png")}
                                style={rewardStyles.checkIcon}
                                accessibilityLabel="Check"
                            />
                        </View>
                    </View>
                </View>
                <View style={rewardStyles.divider} />

                <View style={rewardStyles.rewardItem}>
                    <View style={rewardStyles.rewardContent}>
                        <View style={rewardStyles.rewardLeft}>
                            <Image
                                source={require("../assets/rewardGreen.png")}
                                style={rewardStyles.rewardIcon}
                            />
                            <Text style={rewardStyles.rewardTextLabel}>
                                Финансиско советување
                            </Text>
                        </View>
                        <View style={rewardStyles.rewardAmount}>
                            <Text style={rewardStyles.rewardAmountText}>
                                10000 HalkCoins
                            </Text>
                            <Image
                                source={require("../assets/checkmark.png")}
                                style={rewardStyles.checkIcon}
                                accessibilityLabel="Check"
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const rewardStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    scrollContent: {
        paddingBottom: 80,
    },
    illustration: {
        width: 244,
        height: 200,
        resizeMode: "contain",
        marginTop: 32,
        marginBottom: 32,
        alignSelf: "center",
    },
    rewardItem: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: "#FFFFFF",
    },
    rewardContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    rewardLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    rewardIcon: {
        width: 36,
        height: 36,
        marginRight: 10,
        resizeMode: "contain",
    },
    rewardTextLabel: {
        fontSize: 12,
        color: "#343434",
        fontWeight: "500",
        fontFamily: "Poppins",
        width:100
    },
    rewardAmount: {
        flexDirection: "row",
        flex: 1,
        alignItems: 'flex-start',
    },
    rewardAmountText: {
        color: "#1e1671",
        fontWeight: "600",
        fontSize: 14,
        fontFamily: "Poppins",
        marginRight: 8,
    },
    checkIcon: {
        width: 28,
        height: 28,
        resizeMode: "contain",
        alignItems:'flex-end'
    },
    divider: {
        height: 1,
        backgroundColor: "#ececec",
        marginHorizontal: 20,
    },
});

const ChallengeRewardScreen = () => {
    const [activeTab, setActiveTab] = useState("myGoals");

    return (
        <SafeAreaView style={mainStyles.container}>
            <AccountHeader />
            <ScrollView
                contentContainerStyle={mainStyles.scrollContainer}
                style={mainStyles.scrollView}
            >
                <View style={[mainStyles.app, { paddingTop: 20 }]}>
                    <View style={mainStyles.coinsCard}>
                        <View style={mainStyles.coinsContainer}>
                            <View style={mainStyles.coinsLabel}>
                                <Text style={mainStyles.coinsLabelText}>HalkCoins</Text>
                            </View>
                            <View style={mainStyles.coinsValue}>
                                <Text style={mainStyles.coinsValueText}>350</Text>
                            </View>
                        </View>
                    </View>
                    <View style={mainStyles.dailyLoginCard}>
                        <View style={mainStyles.taskContainer}>
                            <Image
                                source={
                                    require("../assets/checkmark.png")
                                }
                                style={mainStyles.checkIcon}
                                accessibilityLabel="Check circle"
                            />
                            <View style={mainStyles.taskText}>
                                <Text style={mainStyles.taskTextContent}>
                                    Логирај се дневно и провери го својот буџет.
                                </Text>
                            </View>
                            <View style={mainStyles.coinsReward}>
                                <Text style={mainStyles.coinsRewardText}>
                                    10 HalkCoins
                                </Text>
                            </View>
                        </View>
                        <View style={mainStyles.piggyBankRow}>
                            {[1, 2, 3, 4, 5].map((_, index) => (
                                <Image
                                    key={`piggy-orange-${index}`}
                                    source={require("../assets/piggyBankOrange.png")}
                                    style={mainStyles.piggyBankIcon}
                                    accessibilityLabel="Piggy Bank"
                                />
                            ))}
                            {[1, 2].map((_, index) => (
                                <Image
                                    key={`piggy-gray-${index}`}
                                    source={require("../assets/piggyBank.png")}
                                    style={mainStyles.piggyBankIcon}
                                    accessibilityLabel="Piggy Bank Gray"
                                />
                            ))}
                        </View>
                    </View>
                    <View style={mainStyles.savingsCard}>
                        <View style={mainStyles.taskContainer}>
                            <Image
                                source={require("../assets/checkmark.png")}
                                style={mainStyles.checkIcon}
                                accessibilityLabel="Check circle"
                            />
                            <View style={mainStyles.coinsReward}>
                                <Text style={mainStyles.coinsRewardText}>20 HalkCoins</Text>
                            </View>
                        </View>
                        <View style={mainStyles.progressBar}>
                            <View style={mainStyles.progressFill} />
                            <View style={mainStyles.progressEmpty} />
                        </View>
                    </View>
                    <View style={mainStyles.goalButtonsContainer}>
                        <TouchableOpacity
                            style={[
                                mainStyles.goalButton,
                                activeTab === "myGoals" && mainStyles.goalButtonActive,
                            ]}
                            onPress={() => setActiveTab("myGoals")}
                        >
                            <Text
                                style={[
                                    mainStyles.goalButtonText,
                                    activeTab === "myGoals" && mainStyles.goalButtonTextActive,
                                ]}
                            >
                                Мои цели
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                mainStyles.goalButton,
                                activeTab === "rewards" && mainStyles.goalButtonActive,
                            ]}
                            onPress={() => setActiveTab("rewards")}
                        >
                            <Text
                                style={[
                                    mainStyles.goalButtonText,
                                    activeTab === "rewards" && mainStyles.goalButtonTextActive,
                                ]}
                            >
                                Награди
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                mainStyles.goalButton,
                                activeTab === "quizzes" && mainStyles.goalButtonActive,
                            ]}
                            onPress={() => setActiveTab("quizzes")}
                        >
                            <Text
                                style={[
                                    mainStyles.goalButtonText,
                                    activeTab === "quizzes" && mainStyles.goalButtonTextActive,
                                ]}
                            >
                                Квизови
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={mainStyles.tabContent}>
                        {activeTab === "myGoals" && (
                            <View>
                                <Image
                                    style={mainStyles.challengeIcon}
                                    source={require("../assets/profilePicture.png")}
                                    accessibilityLabel="Daily Challenge Icon"
                                />
                            </View>
                        )}
                        {activeTab === "rewards" && <Rewards />}
                        {activeTab === "quizzes" && (
                            <View>
                                <Text style={mainStyles.tabTitle}>Квизови</Text>
                                <Text style={mainStyles.placeholderText}>
                                    Овде ќе се прикажат квизовите.
                                </Text>
                            </View>
                        )}
                    </View>
                    <View style={mainStyles.financialGoal}>
                        <View style={mainStyles.goalLabel}>
                            <Text style={mainStyles.goalLabelText}>Финансиска цел</Text>
                        </View>
                        <TouchableOpacity style={mainStyles.goalButtonLarge}>
                            <Text style={mainStyles.goalButtonLargeText}>
                                Подобри финансиски навики
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={mainStyles.content}>
                        <View style={mainStyles.financialGoal}>
                            <View style={mainStyles.goalLabel}>
                                <Text style={mainStyles.goalLabelText}>Предизвици</Text>
                            </View>
                            <TouchableOpacity style={mainStyles.goalButtonLarge}>
                                <Text style={mainStyles.goalButtonLargeText}>
                                    Додај предизвик
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={mainStyles.savingsCard}>
                            <View
                                style={[mainStyles.savingsButton, mainStyles.blueBackground]}
                            >
                                <Text style={mainStyles.whiteText}>Направи мала заштеда.</Text>
                            </View>
                        </View>
                        <View style={mainStyles.targetCard}>
                            <View style={mainStyles.targetHeader}>
                                <Text style={mainStyles.halkCoinsText}>20 HalkCoins</Text>
                            </View>
                            <View style={mainStyles.targetDetails}>
                                <Text style={mainStyles.targetTitle}>
                                    Таргет за мал износ на заштеда.
                                </Text>
                                <View style={mainStyles.targetDescription}>
                                    <Text style={mainStyles.descriptionText}>
                                        Одберете износ кој сакате да го заштедите, а ние ќе
                                        внимаваме дали тој износ е останат на вашата сметка во
                                        временскиот период кој ќе го наведете.
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <NavigationBar />
        </SafeAreaView>
    );
};

const mainStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollView: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 100,
    },
    app: {
        width: "100%",
        paddingBottom: 40,
        alignItems: "center",
    },
    coinsCard: {
        marginTop: 20,
        width: 310,
        height: 50,
        borderRadius: 10,
        padding: 13,
        backgroundColor: "#1E1671",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    coinsContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    coinsLabel: {

    },
    coinsLabelText: {
        color: "#FFFCFC",
        fontFamily: "Roboto",
        fontSize: 14,
        fontWeight: "800",
    },
    coinsValue: {
        backgroundColor: "#DAEBFF",
        borderRadius: 50,
        paddingVertical: 4,
        paddingHorizontal: 16,
    },
    coinsValueText: {
        color: "#0C49FF",
        fontFamily: "Roboto",
        fontSize: 14,
        fontWeight: "900",
    },
    dailyLoginCard: {
        width: 339,
        height: 133,
        borderRadius: 4,
        marginTop: 30,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    taskContainer: {
        padding: 16,
        position: "relative",
    },
    checkIcon: {
        width: 42,
        height: 42,
        position: "absolute",
        right: 4,
        top: 6,
    },
    taskText: {
        width: 183,
    },
    taskTextContent: {
        color: "#A0A0A0",
        fontFamily: "Roboto",
        fontSize: 14,
        fontWeight: "400",
    },
    coinsReward: {
        position: "absolute",
        right: 51,
        top: 17,
    },
    coinsRewardText: {
        color: "#1E1671",
        fontFamily: "Roboto",
        fontSize: 14,
        fontWeight: "800",
    },
    piggyBankRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 20,
    },
    piggyBankIcon: {
        width: 38,
        height: 38,
    },
    savingsCard: {
        width: 339,
        borderRadius: 4,
        marginTop: 20,
        backgroundColor: "#fff",
        alignSelf: "center",
    },
    progressBar: {
        width: 309,
        height: 48,
        borderRadius: 1000,
        margin: 16,
        backgroundColor: "#3C3056",
        overflow: "hidden",
        position: "relative",
    },
    progressFill: {
        width: "70%",
        height: "100%",
        backgroundColor: "#1573FF",
    },
    progressEmpty: {
        width: "30%",
        height: "100%",
        backgroundColor: "#DAEBFF",
        position: "absolute",
        right: 0,
        top: 0,
    },
    goalButtonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 30,
        width: "100%",
        paddingHorizontal: 20,
    },
    goalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: "#CBCBCB",
        borderRadius: 15,
        backgroundColor: "#fff",
    },
    goalButtonActive: {
        borderColor: "#0E32AE",
    },
    goalButtonText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#666666",
    },
    goalButtonTextActive: {
        color: "#0E32AE",
        fontWeight: "500",
    },
    tabContent: {
        marginTop: 20,
        width: "100%",
        paddingHorizontal: 20,
    },
    tabTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
        paddingLeft: 60,
    },
    placeholderText: {
        fontSize: 14,
        color: "#999",
    },
    challengeIcon: {
        width: 250,
        height: 250,
        marginLeft:35,
        flex: 1,
        alignItems: "center",
    },
    financialGoal: {
        marginTop: 30,
        alignSelf: "center",
        width: 327,
    },
    goalLabel: {
        marginBottom: 11,
    },
    goalLabelText: {
        color: "#979797",
        fontSize: 12,
        fontWeight: "600",
    },
    goalButtonLarge: {
        width: 327,
        height: 44,
        borderWidth: 1,
        borderColor: "#CBCBCB",
        borderRadius: 15,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    goalButtonLargeText: {
        color: "#0E32AE",
        fontSize: 14,
        fontWeight: "500",
    },
    content: {
        marginTop: 11,
        paddingHorizontal: 40,
        flexDirection: "column",
    },
    blueBackground: {
        backgroundColor: "#0E32AE",
        width: 200,
    },
    whiteText: {
        fontFamily: "Poppins",
        fontSize: 12,
        color: "#FFFFFF",
        fontWeight: "500",
        lineHeight: 14,
    },
    savingsButton: {
        borderRadius: 50,
        flexDirection: "row",
        paddingVertical: 9,
        paddingHorizontal: 13,
        alignItems: "stretch",
        gap: 19,
    },
    targetCard: {
        borderRadius: 15,
        borderColor: "rgba(14, 50, 174, 1)",
        borderWidth: 1,
        flexDirection: "column",
        alignItems: "stretch",
        marginTop: -7,
        marginLeft: 10,
        paddingTop: 11,
        paddingBottom: 25,
    },
    targetHeader: {
        paddingHorizontal: 15,
    },
    halkCoinsText: {
        color: "rgba(30, 22, 113, 1)",
        fontSize: 14,
        fontFamily: "Roboto",
        fontWeight: "800",
        letterSpacing: 0.25,
    },
    targetDetails: {
        marginTop: 4,
        paddingHorizontal: 15,
        paddingRight: 64,
    },
    targetTitle: {
        fontFamily: "Poppins",
        fontSize: 12,
        color: "#000000",
        fontWeight: "600",
        lineHeight: 14,
    },
    targetDescription: {
        marginTop: 29,
        width: 243,
    },
    descriptionText: {
        fontFamily: "Poppins",
        fontSize: 12,
        color: "#000000",
        fontWeight: "500",
        lineHeight: 18,
    },
});

export default ChallengeRewardScreen;
