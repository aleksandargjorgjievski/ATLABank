import React from 'react';
import {Image, StyleSheet} from 'react-native';

const Logo: React.FC = () => {
  return (
    <Image
      source={{
        uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3f9e40a7b706c219b01a1341504e79303d9ace9f',
      }}
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
