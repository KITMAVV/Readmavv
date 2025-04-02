// Pdf_Viewer.js
import React, { useState } from 'react';
import {Button, View, StyleSheet, Dimensions} from 'react-native';

import Pdf from 'react-native-pdf';

import {keepLocalCopy, pick} from '@react-native-documents/picker';

const Pdf_Viewer = () => {

    const [lastUri, setLastUri] = useState<string | null>(null);

    const handleError = (err: unknown) => {
        console.log('error', err);
    };
    return (
        <View style={{ flex: 1 }}>
            <Button
                title="open file"
                onPress={async () => {
                    try {
                        const [result] = await pick({
                            mode: 'open',
                            type: ['application/pdf'],
                        });
                        const [localCopy] = await keepLocalCopy({
                            files: [
                                {
                                    uri: result.uri,
                                    fileName: result.name ?? 'fallbackName',
                                },
                            ],
                            destination: 'documentDirectory',
                        });
                        if (localCopy.status === 'success') {
                            setLastUri(localCopy.localUri); //
                            console.log('Local file:', localCopy.localUri);
                        } else {
                            console.log('Error while cop:', localCopy.copyError);
                        }

                    } catch (err) {
                        handleError(err);
                    }
                }}
            />

            {lastUri ? (
                <Pdf
                    source={{ uri: lastUri }}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf}
                />
            ) : (
                <View style={{ marginTop: 16 }}>
                    <Button
                        title="No PDF selected"
                        onPress={() => console.log('Choose pdf')}
                    />
                </View>
            )}
        </View>
    );
};

export default Pdf_Viewer;

const styles = StyleSheet.create({
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});
