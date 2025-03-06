import * as React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';

interface AccountHeaderProps {
  accountNumber: string;
}

export const AccountHeader: React.FC<AccountHeaderProps> = ({
                                                              accountNumber,
                                                            }) => {
  return (
      <View style={styles.container}>
        {/* Wrap the image and text in a row container */}
        <View style={styles.profileContainer}>
          <Image
              source={require('../../assets/profile.png')}
              style={styles.logo}
          />
          <Text style={styles.input}>Гроздобер Павлевски</Text>
        </View>

        <View style={styles.accountInfo}>
          <View style={styles.accountDetails}>
            <View style={styles.accountRow}>
              <Text style={styles.label}></Text>
              <Text style={styles.accountNumber}>{accountNumber}</Text>
            </View>
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 35,
    backgroundColor: '#FE9223',
    fontFamily: 'Poppins',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    aspectRatio: 1,
    width: 48,
  },
  accountInfo: {
    borderRadius: 50,
    zIndex: 10,
    marginTop: 25,
    marginBottom: -56,
    width: '100%',
    paddingHorizontal: 13,
    paddingTop: 57,
  },
  accountDetails: {
    borderRadius: 15,
    zIndex: 10,
    marginBottom: -47,
    width: '100%',
    padding: 19,
  },
  accountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  label: {
    fontSize: 16,
    color: '#343434',
    fontWeight: '600',
  },
  accountNumber: {
    fontSize: 16,
    color: '#343434',
    fontWeight: '600',
    textAlign: 'right',
  },
  input: {
    marginLeft: 10,
    color: '#FFF',
    width:120,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
