import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Text, IconButton, Card, FAB, ToggleButton } from 'react-native-paper'
import { Portal } from '@gorhom/portal'
import {
  ApplicationContext,
  ApplicationContextType
} from '../../contexts/application/ApplicationContext'
import { useGetAssets } from '../../hooks/useGetAssets'
import { useS3Client } from '../../hooks/useS3Client'
import { DataTable } from '../DataTable'

import { Asset } from '../../services/types'
import { GetAssetArgs } from '../../services/s3/types'
import AppModal from '../Modal'
import { TextLink } from '../TextLink'
import { Preview } from '../Preview'
import { DataGrid } from '../DataGrid'

import { UploadFile } from '../UploadFile'
import { CreateFolder } from '../CreateFolder/CreateFolder'

export const ListAssets: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<Asset | undefined>(
    undefined
  )
  const [isExtended, setIsExtended] = React.useState(false)
  const [uploadModalVisible, setUploadModalVisible] = React.useState(false)
  const [createFolderModalVisible, setCreateFolderModalVisible] =
    React.useState(false)

  const [rerun, setRerun] = useState('')
  const [appState] = useContext<ApplicationContextType>(ApplicationContext)
  const [s3client, s3Initialized] = useS3Client(appState)
  const [isTableView, setIsTableView] = React.useState(true)

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
    rerun,
    appState.mutatedAt
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

  const doReload = (): void => {
    setRerun(`${Math.random()}`)
  }

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
                doReload()
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
              <View style={styles.actionBarContainer}>
                <Text variant="bodyMedium" style={styles.path}>
                  {dirPath}
                </Text>
                <View style={styles.buttonGroup}>
                  <ToggleButton
                    icon="dots-grid"
                    value="grid"
                    status={isTableView === false ? 'checked' : 'unchecked'}
                    onPress={() => setIsTableView(false)}
                  />
                  <ToggleButton
                    icon="table"
                    value="table"
                    status={isTableView === true ? 'checked' : 'unchecked'}
                    onPress={() => setIsTableView(true)}
                  />
                </View>
              </View>

              <AppModal
                isVisible={uploadModalVisible}
                onClose={() => {
                  setUploadModalVisible(false)
                }}
              >
                <UploadFile
                  appState={appState}
                  s3client={s3client}
                  prefix={dataQuery.Prefix}
                  doReload={doReload}
                  doCloseModal={() => {
                    setUploadModalVisible(false)
                  }}
                />
              </AppModal>

              <AppModal
                isVisible={createFolderModalVisible}
                onClose={() => {
                  setCreateFolderModalVisible(false)
                }}
              >
                <CreateFolder
                  appState={appState}
                  s3client={s3client}
                  prefix={dataQuery.Prefix}
                  doReload={doReload}
                  doCloseModal={() => {
                    setCreateFolderModalVisible(false)
                  }}
                />
              </AppModal>

              {isTableView ? (
                <DataTable
                  assets={data}
                  onPress={onPress}
                  isLoading={isLoading}
                />
              ) : (
                <DataGrid
                  assets={data}
                  onPress={onPress}
                  isLoading={isLoading}
                />
              )}

              <FAB.Group
                backdropColor="none"
                icon="plus"
                onStateChange={({ open }) => {
                  setIsExtended(open)
                }}
                open={isExtended}
                onPress={() => setIsExtended(!isExtended)}
                visible
                style={[styles.fabStyle]}
                actions={[
                  {
                    icon: 'plus',
                    label: 'Upload',
                    onPress: () => setUploadModalVisible(true),
                  },
                  {
                    icon: 'folder',
                    label: 'New Folder',
                    onPress: () => setCreateFolderModalVisible(true),
                  },
                ]}
              />
            </View>
            {selectedAsset && (
              <Preview
                onClose={() => setSelectedAsset(undefined)}
                asset={selectedAsset}
              />
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
    display: 'flex',
    margin: 10,
    flex: 1
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
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row'
  },
  actionBarContainer: {
    display: 'flex',
    flexDirection: 'row'
  }
})
