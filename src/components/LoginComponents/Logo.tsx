import React from 'react';
import {Image, StyleSheet} from 'react-native';

const Logo: React.FC = () => {
  return (
    <Image
      source={
        require('../../assets/halkbank.png')
      }
      style={styles.logo}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 268,
    height: 52,
    marginTop: 39,
  },
});

export default Logo;
