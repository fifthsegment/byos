import React, { HTMLProps } from 'react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import prettyBytes from 'pretty-bytes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Feather } from '@expo/vector-icons'
import { Platform, StyleSheet } from 'react-native'
import { Checkbox, Text } from 'react-native-paper'

import { ContextMenu } from '../ContextMenu'
import { Asset } from '../../services/types'
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

const IndeterminateCheckbox = ({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>): JSX.Element => {
  const ref = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean' && ref.current) {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

  return (
    <Checkbox
      status={rest.checked ? 'checked' : 'unchecked'}
      onPress={() => rest.onChange()}
      ref={ref}
      // className={className + ' cursor-pointer'}
      {...rest}
    />
  )
}

export const DataGridColumns = (): any => {
  const columnHelper = createColumnHelper<Asset>()
  const columns: Array<ColumnDef<Asset, any>> = [
    columnHelper.accessor('select', {
      id: 'select',
      header: ({ table }) => (
        /* <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler()
          }}
        /> */
        <></>
      ),
      cell: ({ row }) => {
        return (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.toggleSelected
            }}
          />
        )
      }
    }),
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
            <Text style={styles.filename}>
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
