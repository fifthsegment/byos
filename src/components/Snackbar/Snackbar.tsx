import { Snackbar as PaperSnack } from 'react-native-paper';

export const Snackbar = (...args) => {
    // @ts-ignore
    return <PaperSnack
        {...args[0]}
    />
}