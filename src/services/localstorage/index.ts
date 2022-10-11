import AsyncStorage from '@react-native-async-storage/async-storage'
export const ApplicationStorageKey = 'byos/application'
export const DomainStorageKey = 'byos/domain'

const storeData: (value: any) => Promise<void> = async (value: any) => {
  try {
    await AsyncStorage.setItem(ApplicationStorageKey, JSON.stringify(value))
  } catch (e) {
    // saving error
  }
}

const getData: () => Promise<string> = async () => {
  try {
    const value = await AsyncStorage.getItem(ApplicationStorageKey)
    if (value !== null) {
      // value previously stored
      return value
    }
  } catch (e) {
    // error reading value
  }
  return ''
}

const parseJson: (jsonString: string) => any = (jsonString: string) => {
  try {
    return JSON.parse(jsonString)
  } catch (error) {
    return {}
  }
}

export const getApplicationStateLS: (defaultValue: string) => Promise<any> = async (defaultValue: string = '{}') => {
  const value = await getData()
  if (value) {
    return parseJson(value)
  }
  return parseJson(defaultValue)
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
export const setApplicationStateLS: (value: Object) => void = async (value: any) => {
  await storeData(value)
  return null
}
