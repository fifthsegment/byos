import React, { useContext, useState } from 'react'
import {
    ApplicationContext,
    ApplicationContextType,
} from '../../contexts/application/ApplicationContext'
import { useGetAssets } from '../../hooks/useGetAssets'
import { useS3Client } from '../../hooks/useS3Client';
import { DataGrid } from '../DataGrid';
import { Platform, View } from 'react-native';
import { Text } from 'react-native-paper';

export const ListAssets = () => {
    console.log("Platform = ", Platform);
    const [search, setSearch] = useState("");
    const [appState] = useContext<ApplicationContextType>(ApplicationContext)
    const s3client = useS3Client(appState);
    const { data, isLoading, isError } = useGetAssets(s3client, {
        Bucket: appState.s3credentials.bucket,
        //Delimiter: search.length > 0 && "/",
        Prefix: `${search}`,
        //Prefix: "",
        Delimiter: "/"
    });

    console.log("Assets data loaded = ", data.length)
    return <>
        {isLoading && <Text variant="headlineSmall">Loading</Text>}
        {isError && <Text variant="headlineSmall">Error </Text>}

        <DataGrid assets={data} />
    </>
}
