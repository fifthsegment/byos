export const ApplicationStorageKey = 'byos/application'
export const DomainStorageKey = 'byos/domain'

if (!localStorage){
    //@ts-ignore
    localStorage = {}
}

export const getApplicationStateLS = (jsonString: string = '{}') => {

    if (!localStorage){
        //@ts-ignore
        localStorage = {}
    }

    const value = localStorage.getItem(ApplicationStorageKey)
    if (value) {
        return JSON.parse(value)
    }
    return JSON.parse(jsonString)
}

export const setApplicationStateLS = (value: any) => {
    if (!localStorage){
        //@ts-ignore
        localStorage = {}
    }

    return localStorage.setItem(ApplicationStorageKey, JSON.stringify(value))
}

export const getDomainStateLS = () => {
    if (!localStorage){
        //@ts-ignore
        localStorage = {}
    }

    const value = localStorage.getItem(DomainStorageKey) || '{}'
    return JSON.parse(value)
}

export const setDomainStateLS = (value: any) => {
    if (!localStorage){
        //@ts-ignore
        localStorage = {}
    }
    return localStorage.setItem(DomainStorageKey, JSON.stringify(value))
}
