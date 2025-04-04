import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

type PdfItem = {
    id: string;
    name: string;
    uri: string;
    description?: string;
};

type PdfCardProps = {
    pdf: PdfItem;
    onPress: () => void;
};

export default function PdfCard({ pdf, onPress }: PdfCardProps) {
    const truncatedDescription = pdf.description && pdf.description.length > 60
        ? pdf.description.slice(0, 60) + '...'
        : pdf.description;

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View>
                <Text style={styles.title}>{pdf.name}</Text>
                {truncatedDescription ? (
                    <Text style={styles.desc}>{truncatedDescription}</Text>
                ) : null}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    desc: {
        marginTop: 4,
        fontSize: 14,
        color: '#555',
    },
});
