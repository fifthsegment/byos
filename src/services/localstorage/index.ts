export const ApplicationStorageKey = 'byos/application'
export const DomainStorageKey = 'byos/domain'
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value: any) => {
    try {
        await AsyncStorage.setItem(ApplicationStorageKey, JSON.stringify(value))
    } catch (e) {
        // saving error
    }
}

const getData = async () => {
    try {
        const value = await AsyncStorage.getItem(ApplicationStorageKey)
        if (value !== null) {
            // value previously stored
            return value;
        }
    } catch (e) {
        // error reading value
    }
    return ""
}

const parseJson = (jsonString: string) => {
    try {
        return JSON.parse(jsonString)
    } catch (error) {
        return {}
    }
}

export const getApplicationStateLS = async (defaultValue: string = '{}') => {
    const value = await getData();
    if (value) {
        return parseJson(value)
    }
    return parseJson(defaultValue)
}

export const setApplicationStateLS = (value: any) => {
    storeData(value);
}
