import React, { useContext, useState } from 'react'
import {
    ApplicationContext,
    ApplicationContextType,
} from '../../contexts/application/ApplicationContext'
import { useGetAssets } from '../../hooks/useGetAssets'

export const ListAssets = () => {
    const [search, setSearch] = useState("");
    const [appState] = useContext<ApplicationContextType>(ApplicationContext)
    const { s3client } = appState
    const { data, isLoading, isError } = useGetAssets(s3client, {
        Bucket: "testinghumza",
        Delimiter: search.length > 0 && "/",
        Prefix: `${search}`
    });


    return <div>
        <input type="text" onChange={(e) => { setSearch(e.target.value) }} value={search} placeholder="Prefix search..." />
        <div>
            Example prefix based search : "non-empty-folder/"
        </div>
        <br />
        Results:
        {isError && "Error Fetching Data"}
        {isLoading && <>Loading</>}
        {isError === false && data?.map((asset) => {
            return <div key={asset.name}>
                {asset.name}
            </div>
        })}
    </div>
}
