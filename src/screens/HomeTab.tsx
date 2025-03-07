import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {AccountHeader} from '../components/HomeTabComponents/AccountHeader.tsx';
import {AccountBalance} from '../components/HomeTabComponents/AccountBalance.tsx'
import {TransactionsList, TransactionList} from '../components/HomeTabComponents/TransactionsList.tsx';
import {NavigationBar} from '../components/HomeTabComponents/NavigationBar.tsx';
import Card from '../components/HomeTabComponents/Card.tsx';
import {HomeScreenProps} from "../../types.tsx";

const HomeTab: React.FC<HomeScreenProps> = ({route, navigation}) => {
    const { userId, balance } = route.params || { userId: 'F2xkoquV0RO1FFFj3kb3LiOP1Yh1', balance: 0 };
    console.log("HomeTab" + userId);

  return (
    <View style={styles.container}>
        <AccountHeader />
        <AccountBalance />
        <Card  balance={balance}/>
      <TransactionsList />
        <TransactionList userId={userId}/>
      <NavigationBar  />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 480,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#FFF',
    },
});

export default HomeTab;
