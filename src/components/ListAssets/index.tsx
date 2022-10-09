import React, { useContext, useEffect, useState } from 'react'
import {
    ApplicationContext,
    ApplicationContextType,
} from '../../contexts/application/ApplicationContext'
import { useGetAssets } from '../../hooks/useGetAssets'
import { useS3Client } from '../../hooks/useS3Client';
import { DataGrid } from '../DataGrid';
import { Platform, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Button } from '../Button';

export const ListAssets = () => {
    const [search, setSearch] = useState("");
    const [rerun, setRerun] = useState("");
    const [appState] = useContext<ApplicationContextType>(ApplicationContext)
    const s3client = useS3Client(appState);
    const { data, isLoading, isError } = useGetAssets(s3client, {
        Bucket: appState.s3credentials.bucket,
        //Delimiter: search.length > 0 && "/",
        Prefix: `${search}`,
        //Prefix: "",
        Delimiter: "/"
    }, rerun);

    return <>
        <Button onPress={() => { setRerun(`${(Math.random())}`) }} >Reload</Button>
        {isLoading && <Text variant="headlineSmall">Loading</Text>}
        {isError && <Text variant="headlineSmall">Error </Text>}
        {data && isLoading === false && <DataGrid assets={data} />}
    </>
}
