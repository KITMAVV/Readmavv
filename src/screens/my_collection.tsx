import React, { useState } from 'react';
import {View, FlatList, StyleSheet, Text, Modal, TextInput, Alert, TouchableOpacity} from 'react-native';
import { pick, keepLocalCopy } from '@react-native-documents/picker';
import PdfCard from '../components/PdfCard.tsx';

type PdfItem = {
    id: string;
    name: string;
    uri: string;
    description?: string;
};

export default function MyCollection({ navigation }: any) {
    const [pdfs, setPdfs] = useState<PdfItem[]>([]);
    const [selectedUri, setSelectedUri] = useState<string | null>(null);
    const [originalFileName, setOriginalFileName] = useState<string>('');
    const [pdfName, setPdfName] = useState<string>('');
    const [pdfDescription, setPdfDescription] = useState<string>('');
    const [modalVisible, setModalVisible] = useState(false);
    const handleAddPdf = async () => {
        try {
            const [picked] = await pick({
                mode: 'open',
                type: ['application/pdf'],
            });
            const originalName = picked.name ?? 'Unnamed PDF';
            setOriginalFileName(originalName);


            const [localCopy] = await keepLocalCopy({
                files: [
                    {
                        uri: picked.uri,
                        fileName: originalName,
                    },
                ],
                destination: 'documentDirectory',
            });

            if (localCopy.status === 'success') {
                setSelectedUri(localCopy.localUri);
                setPdfName('');
                setPdfDescription('');
                setModalVisible(true);
            } else {
                console.error('Error PDF:', localCopy.copyError);
            }
        } catch (err) {
            console.error('Error chos PDF:', err);
        }
    };


    const handleSaveInfo = () => {
        const finalName = pdfName.trim() === '' ? originalFileName : pdfName.trim();
        const isDuplicate = pdfs.some(
            (item) => item.name.trim().toLowerCase() === finalName.toLowerCase()
        );

        if (isDuplicate) {
            Alert.alert(
                'Duplicate',
                `Name "${finalName}" already exist.`
            );
            return;
        }
        if (selectedUri) {
            const newPdf: PdfItem = {
                id: Date.now().toString(),
                name: finalName,
                uri: selectedUri,
                description: pdfDescription,
            };

            setPdfs((prev) => [...prev, newPdf]);
        }
        setModalVisible(false);
    };
    const handleOpenPdf = (pdf: PdfItem) => {
        navigation.navigate('Pdf_Viewer', {
            pdfUri: pdf.uri,
            pdfName: pdf.name,
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.addBtn]}
                onPress={() => handleAddPdf()}
            >
                <Text style={styles.btnText}>Add PDF</Text>
            </TouchableOpacity>
            <FlatList
                data={pdfs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <PdfCard
                        pdf={item}
                        onPress={() => handleOpenPdf(item)}
                    />
                )}
                numColumns={2}
            />
            <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Name and Description</Text>

                        <TextInput
                            style={styles.input}
                            placeholder={originalFileName}
                            value={pdfName}
                            onChangeText={setPdfName}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="this file is... (optional)"
                            value={pdfDescription}
                            onChangeText={setPdfDescription}
                        />

                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.btnText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={handleSaveInfo}
                            >
                                <Text style={styles.btnText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
    },
    modalTitle: {
        fontSize: 17,
        marginBottom: 12,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 6,
        padding: 8,
        marginVertical: 8,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 16,
    },
    modalButton: {
        backgroundColor: 'rgba(128,128,128,0.74)',
        borderRadius: 6,
        padding: 10,
        marginLeft: 8,
    },
    cancelButton: {
        backgroundColor: '#af7c7c',
    },
    addBtn:{
        backgroundColor: 'rgba(92,183,241,0.74)',
        borderRadius: 6,
        padding: 10,
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    btnText: {
        color: '#ffffff',
        fontSize: 15,
    },
});
