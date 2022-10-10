import React, { useContext, useEffect, useState } from 'react'
import {
    ApplicationContext,
    ApplicationContextType,
} from '../../contexts/application/ApplicationContext'
import { useGetAssets } from '../../hooks/useGetAssets'
import { useS3Client } from '../../hooks/useS3Client';
import { DataGrid } from '../DataGrid';
import { Platform, StyleSheet, View } from 'react-native';
import { Text, ActivityIndicator, Surface } from 'react-native-paper';
import { Button } from '../Button';
import { Asset } from '../../services/types';
import { GetAssetArgs } from '../../services/s3/types';

export const ListAssets = () => {
    const [search, setSearch] = useState("");
    const [rerun, setRerun] = useState("");
    const [appState] = useContext<ApplicationContextType>(ApplicationContext)
    const s3client = useS3Client(appState);
    const [dataQuery, setDataQuery] = useState<GetAssetArgs>({
        Bucket: appState.s3credentials.bucket,
        //Delimiter: search.length > 0 && "/",
        Prefix: ``,
        //Prefix: "",
        Delimiter: "/"
    })
    useEffect(() => {
        setDataQuery({ ...dataQuery, Bucket: appState.s3credentials.bucket })
    }, [appState, s3client])

    const { data, isLoading, isError } = useGetAssets(s3client, dataQuery, rerun);

    const setPrefix = (prefix: string) => {
        setDataQuery({ ...dataQuery, Prefix: prefix })

    }
    const onPress = (asset: Asset) => {
        if (asset.isFolder) {
            setPrefix(asset.prefix)
        }
    }

    const goBack = () => {
        const prefix = dataQuery.Prefix;
        if (prefix !== "") {
            const newPrefix = prefix.substring(0, prefix.substring(0, prefix.length - 1).lastIndexOf("/") + 1);
            setPrefix(newPrefix)
        }
    }

    return <>
        <Text>Prefix : {dataQuery.Prefix}</Text>
        <Button onPress={() => { setRerun(`${(Math.random())}`) }} mode='outlined'>Reload</Button>
        {dataQuery.Prefix?.length > 0 && <Button onPress={() => { goBack() }} mode='outlined'>Go back</Button>}
        {isLoading && <ActivityIndicator animating={true} />}
        {isError && <Text variant="headlineSmall">Error </Text>}
        {data && isLoading === false && <DataGrid assets={data} onPress={onPress} />}
    </>
}
