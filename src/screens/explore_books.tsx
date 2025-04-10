import React, { useState } from 'react';
import {SafeAreaView, View, Text, StyleSheet, Button, FlatList, TextInput, Modal, ScrollView, Pressable,
} from 'react-native';
import { GOOGLE_BOOKS_API_KEY } from '@env';
import BookCard from '../components/BookCard';

type VolumeInfo = {
    title: string;
    description?: string;
    imageLinks?: { thumbnail?: string };
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    pageCount?: number;
};

type BookItem = {
    id: string;
    volumeInfo: VolumeInfo;
};

export default function BooksExplorer() {
    const [books, setBooks] = useState<BookItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);

    const fetchBooks = async (term: string) => {
        try {
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
                    term
                )}&langRestrict=en&maxResults=10&key=${GOOGLE_BOOKS_API_KEY}`
            );
            const data = await response.json();
            if (data && data.items) {
                setBooks(data.items);
            } else {
                setBooks([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleBookPress = (book: BookItem) => {
        setSelectedBook(book);
    };

    const closeModal = () => {
        setSelectedBook(null);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    placeholder="Enter book title or keyword"
                    style={styles.searchInput}
                />
                <Button
                    title="Search"
                    onPress={() => fetchBooks(searchTerm || 'default')}
                />
            </View>

            <FlatList
                data={books}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <BookCard
                        book={item}
                        onPress={() => {
                            handleBookPress(item);
                            console.log('Book card pressed:', item.id);
                        }}
                    />
                )}
                numColumns={2}
                ListEmptyComponent={() => (
                    <Text style={styles.emptyText}>
                        No results or no books loaded yet.
                    </Text>
                )}
                contentContainerStyle={styles.listContainer}
            />

            <Modal
                visible={selectedBook !== null}
                animationType="fade"
                transparent={true}
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <Pressable style={StyleSheet.absoluteFill} onPress={closeModal} />
                    <View style={styles.modalContent}>
                        {selectedBook && (
                            <ScrollView contentContainerStyle={styles.modalScroll}>
                                <Text style={styles.modalTitle}>
                                    {selectedBook.volumeInfo.title}
                                </Text>

                                {selectedBook.volumeInfo.authors && (
                                    <Text style={styles.modalInfo}>
                                        Authors: {selectedBook.volumeInfo.authors.join(', ')}
                                    </Text>
                                )}
                                {selectedBook.volumeInfo.publisher && (
                                    <Text style={styles.modalInfo}>
                                        Publisher: {selectedBook.volumeInfo.publisher}
                                    </Text>
                                )}
                                {selectedBook.volumeInfo.publishedDate && (
                                    <Text style={styles.modalInfo}>
                                        Published: {selectedBook.volumeInfo.publishedDate}
                                    </Text>
                                )}
                                {selectedBook.volumeInfo.pageCount && (
                                    <Text style={styles.modalInfo}>
                                        Pages: {selectedBook.volumeInfo.pageCount}
                                    </Text>
                                )}
                                {selectedBook.volumeInfo.description && (
                                    <Text style={styles.modalDescription}>
                                        {selectedBook.volumeInfo.description}
                                    </Text>
                                )}
                                <Text style={styles.touchOutsideHint}>
                                    Tap outside to close
                                </Text>
                            </ScrollView>
                        )}
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
        padding: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    searchInput: {
        flex: 1,
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 10,
        backgroundColor: '#fff',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#888',
    },
    listContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(234,234,234,0.4)',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        maxHeight: '88%',
        width: '100%',
    },
    modalScroll: {
        alignItems: 'stretch',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'left',
    },
    modalInfo: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'left',
    },
    touchOutsideHint: {
        marginTop: 20,
        fontSize: 12,
        color: '#888',
        textAlign: 'center',
    },
    modalDescription: {
        fontSize: 14,
        marginVertical: 10,
        textAlign: 'justify',
    },
});

//Yes, this thing was written by an AI. I'm just lazy today, sorry(
