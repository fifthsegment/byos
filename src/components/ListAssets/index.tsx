import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Text, IconButton, Card, FAB } from 'react-native-paper'
import { Portal } from '@gorhom/portal'
import {
  ApplicationContext,
  ApplicationContextType
} from '../../contexts/application/ApplicationContext'
import { useGetAssets } from '../../hooks/useGetAssets'
import { useS3Client } from '../../hooks/useS3Client'
import { DataGrid } from '../DataGrid'

import { Asset } from '../../services/types'
import { GetAssetArgs } from '../../services/s3/types'
import { Block } from '../../services/rn-responsive-design'
import AppModal from '../Modal'
import { TextLink } from '../TextLink'

export const ListAssets: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<Asset | undefined>(
    undefined
  )
  const [isExtended, setIsExtended] = React.useState(false)
  const [rerun, setRerun] = useState('')
  const [appState] = useContext<ApplicationContextType>(ApplicationContext)
  const [s3client, s3Initialized] = useS3Client(appState)
  const [dataQuery, setDataQuery] = useState<GetAssetArgs>({
    Bucket: appState.s3credentials.bucket,
    Prefix: '',
    Delimiter: '/'
  })
  useEffect(() => {
    setDataQuery({ ...dataQuery, Bucket: appState.s3credentials.bucket })
  }, [appState, s3client])

  const { data, isLoading, isError } = useGetAssets(
    s3client,
    s3Initialized,
    dataQuery,
    rerun
  )

  const setPrefix = (prefix: string): void => {
    setDataQuery({ ...dataQuery, Prefix: prefix })
  }
  const onPress = (asset: Asset): void => {
    if (asset.isFolder) {
      setPrefix(asset.prefix)
    } else {
      setSelectedAsset(asset)
    }
  }

  const goBack: () => void = () => {
    const prefix = dataQuery.Prefix
    if (prefix !== '') {
      const newPrefix = prefix.substring(
        0,
        prefix.substring(0, prefix.length - 1).lastIndexOf('/') + 1
      )
      setPrefix(newPrefix)
    }
  }

  const goToPrefixByIndex = (index: number): void => {
    const dirPathArray = dataQuery.Prefix?.split('/')
    const newPrefix = `${dirPathArray.slice(0, index).join('/')}/`
    setPrefix(newPrefix === '/' ? '' : newPrefix)
  }

  const dirPathArray = ['bucket', ...dataQuery.Prefix?.split('/')]
  const dirPath = dirPathArray.map((item, index) => {
    const isLastFragment = index === dirPathArray?.length - 1
    return (
      <TextLink
        key={`dirPath${index}`}
        isUnderlined={!isLastFragment}
        onPress={() => {
          goToPrefixByIndex(index)
        }}
      >
        /
        {!isLastFragment && (
          <Ionicons name="folder-open-outline" color="#ffbd43" size={22} />
        )}
        {item}
      </TextLink>
    )
  })

  /* eslint-disable */
  return (
    <>
      {s3Initialized ? (
        <>
          <Portal hostName="Reloader">
            <IconButton
              animated
              icon="reload"
              onPress={() => {
                setRerun(`${Math.random()}`)
              }}
            />
          </Portal>
          <Portal hostName="Back">
            {dataQuery.Prefix?.length > 0 && (
              <IconButton
                icon="arrow-left"
                onPress={() => {
                  goBack()
                }}
              />
            )}
          </Portal>
          <View style={styles.root}>
            <View style={styles.section1}>
              {isError && <Text variant="headlineSmall">Error </Text>}
              <Text variant="bodyMedium" style={styles.path}>
                {dirPath}
              </Text>
              <AppModal
                isVisible={isExtended}
                onClose={() => {
                  setIsExtended(false)
                }}
              >
                <Text>Upload files here</Text>
              </AppModal>

              <DataGrid assets={data} onPress={onPress} isLoading={isLoading} />

              <FAB
                icon="plus"
                onPress={() => setIsExtended(!isExtended)}
                visible
                style={[styles.fabStyle]}
              />
            </View>
            {selectedAsset && (
              <Block hidden={['xs', 'md']}>
                <View style={styles.section2}>
                  <Text variant="bodyLarge" style={styles.path}>
                    Preview pane
                    {selectedAsset?.fileName}
                  </Text>
                </View>
              </Block>
            )}
          </View>
        </>
      ) : (
        <Card style={styles.errorMessage}>
          <Text>
            S3 Client has not been initialized, please update your API
            Configuration first.
          </Text>
        </Card>
      )}
    </>
    /* eslint-enable */
  )
}

const styles = StyleSheet.create({
  path: {
    margin: 10
  },
  fabStyle: {
    bottom: 45,
    right: 25,
    position: 'absolute'
  },
  errorMessage: {
    margin: 12,
    padding: 10
  },
  root: {
    flexDirection: 'row',
    display: 'flex',
    flex: 1,
    flexGrow: 1
  },
  section1: {
    flex: 3,
    borderColor: 'gray',
    borderRightWidth: 2,
    flexDirection: 'column'
  },
  section2: {
    minWidth: '30vw',
    flex: 1,
    backgroundColor: 'skyblue',
    flexGrow: 1
  }
})
