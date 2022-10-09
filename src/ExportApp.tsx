import React from 'react';
import { Text } from 'react-native-paper';
import BAap from './App'
import { Provider } from './providers/Provider';

const ExportApp = () => {
    return (
    <Provider>
        <BAap />
    </Provider>    
    )
}

export default ExportApp