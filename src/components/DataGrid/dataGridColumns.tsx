import React from 'react'
import { ContextMenu } from '../ContextMenu'
import { createColumnHelper } from '@tanstack/react-table'
import { Asset } from '../../services/types'
import prettyBytes from 'pretty-bytes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { MaterialIcons, Feather } from '@expo/vector-icons'
import { Platform, StyleSheet } from 'react-native'

dayjs.extend(relativeTime)

const styles = StyleSheet.create({
  icon: {
    marginRight: '6px'
  }
})

// icons for different file types or folders
const iconType = (asset: Asset): JSX.Element => {
  const re = /(?:\.([^.]+))?$/
  const internalType = asset.isFolder
    ? 'folder'
    : re.exec(asset.fileName)[1] || ''
  switch (internalType) {
    case 'folder':
      return (
                <MaterialIcons
                    name="folder"
                    color="#ffbd43"
                    size={24}
                    style={styles.icon}
                />
      )
    case 'txt':
      return (
                <Feather
                    name="file-text"
                    color="#6565d6"
                    size={22}
                    style={styles.icon}
                />
      )
    default:
      return (
                <Feather
                    name="file"
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
                        {iconType(row)} {fileName}
                    </>
        )
      }
    }),

    // Display file size
    columnHelper.accessor('fileSize', {
      id: 'fileSize',
      header: 'Size',
      cell: (info) =>
        !info.row.original.isFolder && prettyBytes(info.getValue())
    }),

    // Dispaly last modified
    columnHelper.accessor('updatedAt', {
      id: 'updatedAt',
      header: 'Last Modified',
      cell: (info) => {
        return (
          !info.row.original.isFolder &&
                    dayjs(info.getValue()).fromNow()
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
