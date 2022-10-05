export const ApplicationStorageKey = 'byos/application'
export const DomainStorageKey = 'byos/domain'

export const getApplicationStateLS = (jsonString: string = '{}') => {
    const value = localStorage.getItem(ApplicationStorageKey)
    if (value) {
        return JSON.parse(value)
    }
    return JSON.parse(jsonString)
}

export const setApplicationStateLS = (value: any) => {
    return localStorage.setItem(ApplicationStorageKey, JSON.stringify(value))
}

export const getDomainStateLS = () => {
    const value = localStorage.getItem(DomainStorageKey) || '{}'
    return JSON.parse(value)
}

export const setDomainStateLS = (value: any) => {
    return localStorage.setItem(DomainStorageKey, JSON.stringify(value))
}
