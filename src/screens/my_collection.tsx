
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MyCollection() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ur books here</Text>
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
