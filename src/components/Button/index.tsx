import { Button as PaperButton } from 'react-native-paper';

export const Button = (...args) => {
    // @ts-ignore
    return <PaperButton
        {...args[0]}
    />
}