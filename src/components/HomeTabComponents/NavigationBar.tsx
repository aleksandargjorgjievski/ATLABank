import * as React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenProps, RootStackParamList} from "../../../types.tsx";


export const NavigationBar: React.FC<HomeScreenProps>  = () => {
    const navigation = useNavigation<HomeScreenProps>();
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}
                          onPress={() => {navigation.navigate('Home', {
                                userId: 'F2xkoquV0RO1FFFj3kb3LiOP1Yh1',
                                balance: 3051,
                              });
        }}>
          <Image
              source={require('../../assets/home.png')}
              style={styles.icon}
          />
          <Text style={styles.label}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
                          onPress={() => navigation.navigate('Dashboard',
                              {
                                  userId: 'F2xkoquV0RO1FFFj3kb3LiOP1Yh1',
                                  balance: 3051,
                              })}>
          <Image
              source={require('../../assets/categorization.png')}
              style={styles.icon}
          />
          <Text style={styles.label}>Categorization</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate('Challenges')}
        >
          <Image
              source={require('../../assets/challenges.png')}
              style={styles.icon}
          />
          <Text style={styles.label}>Challenges</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate("Payments")}
        >
          <Image
              source={require('../../assets/plus.png')}
              style={styles.icon}
          />
          <Text style={styles.label}>Profile</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,

      backgroundColor: '#FFF',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: 10,
  },
  button: {
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 2,
  },
  label: {
    fontSize: 10,
    color: '#000',
  },
});
