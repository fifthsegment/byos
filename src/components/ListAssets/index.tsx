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

    return <>
        <Button onPress={() => { setRerun(`${(Math.random())}`) }} >Reload</Button>
        {dataQuery.Prefix?.length > 0 && <Button onPress={() => { setPrefix("") }}>Go To root</Button>}
        {isLoading && <Text variant="headlineSmall">Loading</Text>}
        {isError && <Text variant="headlineSmall">Error </Text>}
        {data && isLoading === false && <DataGrid assets={data} onPress={onPress} />}
    </>
}
