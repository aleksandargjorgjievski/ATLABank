import React from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import Logo from '../components/Logo';
import WelcomeText from '../components/WelcomeText';
import LockIllustration from '../components/LockIllustration';
import InputField from '../components/InputField';
import LoginButton from '../components/LoginButton';
import OrangeFooter from '../components/OrangeFooter';

const LoginScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Logo />
          <WelcomeText />
          <LockIllustration />
          <View style={styles.inputContainer}>
            <InputField placeholder="Корисничко име" secureTextEntry={false} />
            <InputField placeholder="Лозинка" secureTextEntry={true} />
          </View>
          <LoginButton />
        </View>
      </ScrollView>
      <OrangeFooter />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 412,
    paddingBottom: 123, // Space for footer
  },
  inputContainer: {
    width: '100%',
    maxWidth: 327,
    marginTop: 25,
    paddingHorizontal: 20,
    gap: 15,
  },
});

export default LoginScreen;
