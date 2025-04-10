
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


import { GOOGLE_BOOKS_API_KEY } from '@env';

export default function BooksExplorer() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Search here</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
    },
});
