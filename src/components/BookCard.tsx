import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';

type BookItem = {
    id: string;
    volumeInfo: {
        title: string;
        description?: string;
        imageLinks?: {
            thumbnail?: string;
        };
        authors?: string[];
        publisher?: string;
        publishedDate?: string;
        pageCount?: number;
    };
};

type BookCardProps = {
    book: BookItem;
    onPress?: () => void;
};

export default function BookCard({ book, onPress }: BookCardProps) {
    const { title, description, imageLinks } = book.volumeInfo;

    const truncatedDescription =
        description && description.length > 65 ? description.slice(0, 65) + '...' : description;

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
            {imageLinks?.thumbnail && (
                <Image
                    source={{ uri: imageLinks.thumbnail }}
                    style={styles.image}
                    resizeMode="cover"
                />
            )}
            <Text style={styles.title}>{title}</Text>
            {truncatedDescription && (
                <Text style={styles.description}>{truncatedDescription}</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        width: 170,
        marginVertical: 8,
        marginHorizontal: 10,
        alignItems: 'center',
        shadowColor: 'rgba(0,0,0,0.75)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 5,
    },
    image: {
        width: 130,
        height: 190,
        borderRadius: 10,
        marginBottom: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: '#2C3E50',
        textAlign: 'left',
        marginBottom: 8,
    },
    description: {
        fontSize: 12,
        color: '#7F8C8D',
        textAlign: 'left',
    },
});
