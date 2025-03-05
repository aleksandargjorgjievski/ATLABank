import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const LoginButton: React.FC = () => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => {}}>
      <Text style={styles.buttonText}>Најави се</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 327,
    height: 44,
    borderRadius: 15,
    backgroundColor: '#3629B7',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 54,
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
  },
});

export default LoginButton;
