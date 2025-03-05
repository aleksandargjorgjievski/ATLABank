import React from 'react';
import {View, StyleSheet} from 'react-native';

const OrangeFooter: React.FC = () => {
  return <View style={styles.footer} />;
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 123,
    backgroundColor: '#FE9223',
  },
});

export default OrangeFooter;
