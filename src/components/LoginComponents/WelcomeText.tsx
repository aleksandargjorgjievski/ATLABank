import React from 'react';
import {Text, StyleSheet} from 'react-native';

const WelcomeText: React.FC = () => {
  return <Text style={styles.text}>Добредојдовте</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: '#2B61CC',
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 62,
  },
});

export default WelcomeText;
