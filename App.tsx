import React from 'react';
// import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/screens/home_screen.tsx';
// import BooksExplorer from './src/screens/explore_books.tsx';
import MyCollection from './src/screens/my_collection.tsx';
import Pdf_Viewer from './src/screens/pdf_Viewer.tsx';


const Tab = createBottomTabNavigator();

export default function App() {
    return (

        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="add" component={MyCollection} />
                <Tab.Screen name="Pdf_Viewer" component={Pdf_Viewer} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

// const styles = StyleSheet.create({
//
// });
