import { useMemo, useState } from "react"
import { ApplicationState } from "../contexts/application/ApplicationContext";
import { getApplicationStateLS } from "../services/localstorage";

export const useGetApplicationStateFromLs = (initialData: ApplicationState | undefined) => {
    const [d, setD] = useState<ApplicationState | undefined>(initialData);
    const [isLoaded, setIsLoaded] = useState(false);
    useMemo(() => {
        getApplicationStateLS(
            JSON.stringify(initialData)
        ).then(data => {
            setD(data);
            setIsLoaded(true);
        })
    }, [initialData])


    return { data: d, isLoaded };
}