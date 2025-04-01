
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { pick } from '@react-native-documents/picker';

export default function MyCollection() {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ur books here</Text>
            <Button
                title="open file"
                onPress={async () => {
                    try {
                        const [result] = await pick({
                            mode: 'open',
                        })
                        console.log(result)
                    } catch (err) {
                        // see error handling
                    }
                }}
            />
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
