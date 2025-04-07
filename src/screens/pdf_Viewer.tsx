import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Pdf from 'react-native-pdf';

export default function Pdf_Viewer() {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const { pdfUri } = route.params ?? {};
    if (!pdfUri) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Hmm, empty here?</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backBtn}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backText}>↶</Text>
            </TouchableOpacity>
            <Pdf
                source={{ uri: pdfUri }}
                onLoadComplete={(numberOfPages: number) => {
                    console.log(`PDF loaded, total pages: ${numberOfPages}`);
                }}
                onPageChanged={(page: number, numberOfPages: number) => {
                    console.log(`Page: ${page} / ${numberOfPages}`);
                }}
                onError={(error) => {
                    console.log('Error loading PDF:', error);
                }}
                style={styles.pdf}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        fontStyle: 'italic',
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    backBtn: {
        position: 'absolute',
        zIndex: 999,
        bottom: 20,
        right: 20,
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: 'rgba(213,213,213,0.14)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});
