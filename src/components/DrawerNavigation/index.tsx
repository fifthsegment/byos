import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Configuration } from '../../pages/Configuration/index'
import Dashboard from '../../pages/dashboard';
import Header from '../Header';

const Drawer = createDrawerNavigator();
export const DrawerNavigation = () => {

  return (
    <NavigationContainer>
      <Drawer.Navigator useLegacyImplementation={true} initialRouteName="ApiConfiguration"
      screenOptions={{
        header:   ({ navigation, route, options }) => <Header navigation={navigation} route={route} options={options} />,
      }}>
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Configuration" component={Configuration} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}