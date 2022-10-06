import { ApplicationState } from './ApplicationContext'

const initialData: ApplicationState = {
    s3credentials: {
        apiKey: undefined,
        apiSecret: undefined,
        region: undefined,
        endpoint: undefined,
    },
    s3client: undefined,
    otherStuff: '',
}

export default initialData
