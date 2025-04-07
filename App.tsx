import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/home_screen.tsx';
import BooksExplorer from './src/screens/explore_books.tsx';
import MyCollection from './src/screens/my_collection.tsx';
import Pdf_Viewer from './src/screens/pdf_Viewer.tsx';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Explore" component={BooksExplorer} />
            <Tab.Screen name="Collection" component={MyCollection} />
        </Tab.Navigator>
    );
}


export default function App() {
    return (

        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="MainTabs"
                    component={MyTabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Pdf_Viewer"
                    component={Pdf_Viewer}
                    options={{
                        presentation: 'modal',
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

// const styles = StyleSheet.create({
//
// });
