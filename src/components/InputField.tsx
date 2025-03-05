import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

interface InputFieldProps {
  placeholder: string;
  secureTextEntry: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  secureTextEntry,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#CACACA"
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  input: {
    width: '100%',
    height: 44,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#CBCBCB',
    paddingHorizontal: 16,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#000',
  },
});

export default InputField;
