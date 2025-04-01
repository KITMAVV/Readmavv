import React from 'react';
// import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/screens/home_screen.tsx';
import BooksExplorer from './src/screens/explore_books.tsx';
// import MyCollection from './src/screens/my_collection.tsx';
import Viewer from "./src/screens/pdf_Viewer.tsx";
// import {StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="BooksExplorer" component={BooksExplorer} />
                <Tab.Screen name="Viewer" component={Viewer} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

// const styles = StyleSheet.create({
//
// });
