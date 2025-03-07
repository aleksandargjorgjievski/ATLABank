import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';

const LockIllustration: React.FC = () => {
  return (
    <View style={styles.container}>
          <Image source={require('../../assets/lock.png')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 41,
    width: 213,
    height: 165,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LockIllustration;
