import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import HomeScreen from './screens/HomeScreen';
import AuthLoading from './screens/AuthLoading';

import CourseIndex from './screens/controllers/courses/CourseIndex';
import CourseShow from './screens/controllers/courses/CourseShow';
import PostIndex from './screens/controllers/posts/PostIndex';
import PostShow from './screens/controllers/posts/PostShow';
import MyCourses from './screens/controllers/my_courses/MyCourses';
import MyCourseItem from './screens/controllers/my_course_item/MyCourseItem';
import Profile from './screens/controllers/Profile';
import Icon from 'react-native-vector-icons/Ionicons';

const AuthNavigator = createStackNavigator({
    Main: MainScreen,
    SignUp: SignUpScreen,
    Login: LoginScreen,
}, {
    initialRouteName: 'Main'
})

const DashboardTabScreen = createBottomTabNavigator(
    {   
        Articulos: {
            screen: PostIndex,
            navigationOptions:{
                tabBarIcon: ({ focused, tintColor }) => {
                    return <Icon name='home-outline' size={25} color="#541533" />;
                },
                title: 'Artículos',
                tabBarOptions: { activeTintColor:'#541533' }
            }
        },

        "Para tí": {
            screen: MyCourseItem,
            navigationOptions:{
                tabBarIcon: ({ focused, tintColor }) => {
                    return <Icon name='folder-open-outline' size={25} color="#541533" />;
                },
                tabBarOptions: { activeTintColor:'#541533' }
            }
        },

        Cursos: {
            screen: CourseIndex,
            navigationOptions:{
                tabBarIcon: ({ focused, tintColor }) => {
                    return <Icon name='book-outline' size={25} color="#541533" />;
                },
                tabBarOptions: { activeTintColor:'#541533' }
            }
        },

        Baúl: {
            screen: MyCourses,
            navigationOptions:{
                tabBarIcon: ({ focused, tintColor }) => {
                    return <Icon name='briefcase-outline' size={25} color="#541533" />;
                },
                tabBarOptions: { activeTintColor:'#541533' }
            }
        }
    }
);

const AppNavigator = new createStackNavigator({
    DashboardTabScreen: {
        screen: DashboardTabScreen,
        navigationOptions: ({ navigation }) => ({
            headerShown: false
        }),
    },

    Profile: Profile,
    PostShow: PostShow,
    CourseShow: CourseShow
});

export default createAppContainer(
    createSwitchNavigator({
        Auth: AuthNavigator,
        App: AppNavigator,
        AuthLoading: AuthLoading
    }, {
        initialRouteName: 'AuthLoading'
    })
)