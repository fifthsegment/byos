import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import { Feather } from '@expo/vector-icons'
import { Asset } from '../../services/types'
import { fileToIcon } from '../../services/file-icon-service'
// import { RNFetchBlob } from 'rn-fetch-blob'

export const GridItemFilePreview = ({
  item,
  onPress
}: {
  item: Asset
  onPress: any
}): JSX.Element => {
  const fileExtension = item.fileName.split('.').pop()
  const fileIcon = !item.isFolder ? fileToIcon(fileExtension) : 'folder'

  const onPressPreview = (): void => {
    onPress(item)
  }

  return (
    <TouchableOpacity onPress={onPressPreview}>
      <Feather name={fileIcon as any} size={100} style={styles.icon} />
      <Text
        style={styles.fileName}
        onPress={() => {
          onPress(item)
        }}
      >
        {item.fileName}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  icon: {
    marginTop: 20
  },
  wrapper: {},
  fileName: {
    bottom: 0,
    textAlign: 'center'
  },
  errorIcon: {
    color: 'red'
  }
})
