import BApp from "./App"
import { Provider } from "./providers/Provider";

const ExportApp = () => {
    return <Provider>
        Hello
        <BApp />
    </Provider>
}

export default ExportApp