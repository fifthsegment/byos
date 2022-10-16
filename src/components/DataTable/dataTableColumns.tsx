import React from 'react'
import { ContextMenu } from '../ContextMenu'
import { createColumnHelper } from '@tanstack/react-table'
import { Asset } from '../../services/types'
import prettyBytes from 'pretty-bytes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Feather } from '@expo/vector-icons'
import { Platform, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { fileToIcon } from '../../services/file-icon-service'

dayjs.extend(relativeTime)

const styles = StyleSheet.create({
  icon: {},
  filename: {}
})

// icons for different file types or folders
const iconType = (asset: Asset): JSX.Element => {
  const re = /(?:\.([^.]+))?$/
  const internalType = asset.isFolder
    ? 'folder'
    : re.exec(asset.fileName)[1] || ''
  const fileExtension = asset.fileName.split('.').pop()

  switch (internalType) {
    case 'folder':
      return (
        <Feather name="folder" color="#ffbd43" size={22} style={styles.icon} />
      )
    default:
      return (
        <Feather
          name={fileToIcon(fileExtension) as any}
          color="#6565d6"
          size={22}
          style={styles.icon}
        />
      )
  }
}

export const DataGridColumns: any = () => {
  const columnHelper = createColumnHelper<Asset>()
  const columns: any = [
    // Dispaly file name with icon
    columnHelper.accessor('fileName', {
      id: 'fileName',
      header: 'Name',
      cell: (info) => {
        const row = info.row.original
        const fileName = row.isFolder
          ? info.getValue().slice(0, -1)
          : info.getValue()
        return (
          <>
            <Text variant="bodyLarge" style={styles.filename}>
              {iconType(row)} &nbsp;
              {fileName}
            </Text>
          </>
        )
      }
    }),

    // Display file size
    columnHelper.accessor('fileSize', {
      id: 'fileSize',
      header: 'Size',
      cell: (info) => (
        <Text>
          {!info.row.original.isFolder && prettyBytes(info.getValue())}
        </Text>
      )
    }),

    // Dispaly last modified
    columnHelper.accessor('updatedAt', {
      id: 'updatedAt',
      header: 'Last Modified',
      cell: (info) => {
        return (
          <Text>
            {!info.row.original.isFolder && dayjs(info.getValue()).fromNow()}
          </Text>
        )
      }
    }),

    // Display column size
    columnHelper.display({
      id: 'actions',
      cell: () => <ContextMenu />
    })
  ].filter((item) => {
    return Platform.OS !== 'web' ? item.id === 'fileName' : true
  })
  return columns
}
