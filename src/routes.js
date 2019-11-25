import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import Checkin from './pages/Checkin';
import HelpOrders from './pages/HelpOrders';
import HelpOrdersCreate from './pages/HelpOrders/Create';
import HelpOrdersAnswer from './pages/HelpOrders/Answer';

import Header from './components/Header';
import colors from './styles/colors';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Checkin: {
              screen: createStackNavigator(
                {
                  Checkin,
                },
                {
                  defaultNavigationOptions: {
                    headerTitle: () => <Header />,
                  },
                  headerLayoutPreset: 'center',
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Chek-ins',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="edit-location" size={20} color={tintColor} />
                ),
              },
            },
            HelpOrders: {
              screen: createStackNavigator(
                {
                  HelpOrders,
                  HelpOrdersCreate,
                  HelpOrdersAnswer,
                },
                {
                  defaultNavigationOptions: {
                    headerTitle: () => <Header />,
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                  headerLayoutPreset: 'center',
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Pedir ajuda',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="live-help" size={24} color={tintColor} />
                ),
              },
            },
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: colors.primary,
              inactiveTintColor: colors.navLinks,
              style: {
                backgroundColor: colors.backGroundPrimary,
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
