import React, { useContext, useEffect, useState } from 'react'
import {
    ApplicationContext,
    ApplicationContextType,
} from '../../contexts/application/ApplicationContext'
import { useGetAssets } from '../../hooks/useGetAssets'
import { useS3Client } from '../../hooks/useS3Client';
import { DataGrid } from '../DataGrid';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Text, ActivityIndicator, Surface, Card } from 'react-native-paper';
import { Button } from '../Button';
import { Asset } from '../../services/types';
import { GetAssetArgs } from '../../services/s3/types';
import { Portal } from '@gorhom/portal';

const styles = StyleSheet.create({
    path: {
        margin: 10
    }
})

export const ListAssets = () => {
    const [search, setSearch] = useState("");
    const [rerun, setRerun] = useState("");
    const [appState] = useContext<ApplicationContextType>(ApplicationContext)
    const [s3client, s3Initialized] = useS3Client(appState);
    const [dataQuery, setDataQuery] = useState<GetAssetArgs>({
        Bucket: appState.s3credentials.bucket,
        Prefix: ``,
        Delimiter: "/"
    })
    useEffect(() => {
        setDataQuery({ ...dataQuery, Bucket: appState.s3credentials.bucket })
    }, [appState, s3client])

    const { data, isLoading, isError } = useGetAssets(s3client, s3Initialized, dataQuery, rerun);

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
        <Portal hostName="Reloader">
            <Button onPress={() => { setRerun(`${(Math.random())}`) }} mode='outlined'>Reload</Button>
        </Portal>
        <Portal hostName="Back">
            {dataQuery.Prefix?.length > 0 && <Button onPress={() => { goBack() }} mode='outlined'>Go back</Button>}
        </Portal>
        <Text variant="bodyLarge" style={styles.path}>
            {`Bucket Root /${dataQuery.Prefix}`}
        </Text>
        {isLoading && <ActivityIndicator animating={true} />}
        {isError && <Text variant="headlineSmall">Error </Text>}
        <ScrollView>
            {data && isLoading === false && <DataGrid assets={data} onPress={onPress} />}
        </ScrollView>
    </>
}
