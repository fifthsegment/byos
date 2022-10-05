import { ApplicationState } from './ApplicationContext'

const initialData: ApplicationState = {
    s3credentials: {
        apiKey: undefined,
        apiSecret: undefined,
    },
    otherStuff: '',
}

export default initialData
