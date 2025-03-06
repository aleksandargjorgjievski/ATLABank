import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface AccountBalanceProps {
  balance: number;
}

export const AccountBalance: React.FC<AccountBalanceProps> = ({balance}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}></Text>
      <Text style={styles.balance}></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: 20,
    gap: 40,
    backgroundColor: '#FFF',
  },
  label: {
    color: 'rgba(67, 67, 67, 1)',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 20,
  },
  balance: {
    color: '#3629B7',
    textAlign: 'right',
    fontSize: 32,
    fontWeight: '600',
    marginTop: 13,
    width: 190,
  },
});
