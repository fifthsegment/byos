import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Asset } from '../../services/types'
import { S3Client } from '@aws-sdk/client-s3'
import { ApplicationState } from '../../contexts/application/ApplicationContext'
import { GridItemImagePreview } from './ImagePreview'
import { GridItemFilePreview } from './FilePreview'
// import { RNFetchBlob } from 'rn-fetch-blob'

export const GridItemPreview = ({
  item,
  onPress,
  s3client,
  s3Initialized,
  appState
}: {
  item: Asset
  onPress: any
  s3client: S3Client
  s3Initialized: boolean
  appState: ApplicationState
}): JSX.Element => {
  const fileExtension = item.fileName.split('.').pop()

  return (
    <View style={styles.item}>
      {(() => {
        switch (fileExtension) {
          case 'png':
          case 'jpeg':
          case 'jpg':
            return (
              <GridItemImagePreview
                item={item}
                onPress={onPress}
                s3client={s3client}
                s3Initialized={s3Initialized}
                appState={appState}
              />
            )
          default:
            return <GridItemFilePreview item={item} onPress={onPress} />
        }
      })()}
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
    height: 200,
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
    textAlign: 'center'
  }
})
