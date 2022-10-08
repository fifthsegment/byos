import React, { useContext, useState } from 'react'
import {
    ApplicationContext,
    ApplicationContextType,
} from '../../contexts/application/ApplicationContext'
import { useGetAssets } from '../../hooks/useGetAssets'
import { useS3Client } from '../../hooks/useS3Client';
import { DataGrid } from '../DataGrid';

export const ListAssets = () => {
    const [search, setSearch] = useState("");
    const [appState] = useContext<ApplicationContextType>(ApplicationContext)
    const s3client = useS3Client(appState);
    const { data, isLoading, isError } = useGetAssets(s3client, {
        Bucket: appState.s3credentials.bucket,
        //Delimiter: search.length > 0 && "/",
        Prefix: `${search}`,
        //Prefix: "",
        Delimiter: ""
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
        {isError === false && <DataGrid assets={data} />}
    </div>
}
