// Pdf_Viewer.js
import React, { useState } from 'react';
import {Button, View} from 'react-native';



import { pick } from '@react-native-documents/picker';
import { viewDocument } from '@react-native-documents/viewer';



const Pdf_Viewer = () => {

    const [lastUri, setLastUri] = useState<string | null>(null);


    const handleError = (err: unknown) => {
        console.log('error', err);
    };
    return (
        <View>
            <Button
                title="open file"
                onPress={async () => {
                    try {
                        const [result] = await pick({
                            mode: 'open',
                        });
                        console.log(result);
                        setLastUri(result.uri);
                    } catch (err) {
                        // see error handling
                    }
                }}
            />

            <Button
                title="view the last imported file"
                onPress={() => {
                    if (!lastUri) {
                        console.log('Файл ще не вибрано');
                        return;
                    }
                    const uriToOpen = lastUri;
                    viewDocument({ uri: uriToOpen, mimeType: 'application/pdf' }).catch(handleError);
                }}
            />
        </View>
    );
};

export default Pdf_Viewer;

