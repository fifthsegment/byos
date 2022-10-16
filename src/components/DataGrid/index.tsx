import React, { useContext, useEffect, useState } from 'react'
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import { ActivityIndicator } from 'react-native-paper'
import { FlatList, ScrollView, StyleSheet, View } from 'react-native'
import { Asset } from '../../services/types'
import { GridItemPreview } from '../GridItemPreview'
import {
  ApplicationContext,
  ApplicationContextType
} from '../../contexts/application/ApplicationContext'
import { useS3Client } from '../../hooks/useS3Client'

const styles = StyleSheet.create({
  cell: {
    flexBasis: 'auto',
    minWidth: '105px',
    paddingRight: '15px'
  },
  cellFirstChild: {
    flexBasis: '78%'
  },
  title: {
    display: 'flex',
    alignItems: 'center'
  },
  columnWrapperStyle: {
    display: 'flex'
  }
})

export interface DataTableProps {
  assets: Asset[] | undefined
  onPress: (asset: Asset) => void
  isLoading: boolean
}

export const DataGrid: (props: DataTableProps) => JSX.Element = ({
  assets,
  onPress,
  isLoading
}: DataTableProps) => {
  const [appState] = useContext<ApplicationContextType>(ApplicationContext)
  const [s3client, s3Initialized] = useS3Client(appState)
  const [data, setData] = React.useState<Asset[]>(() => assets || [])
  const [currentPage, setCurrentPage] = useState(1)
  useEffect(() => {
    setData(assets || [])
    setCurrentPage(1)
  }, [assets])
  const table = useReactTable({
    data,
    columns: DataGridColumns(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  const items = table.getRowModel().flatRows.map((item) => item.original)

  useEffect(() => {
    table.setPageSize(20 * currentPage)
  }, [currentPage])

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize
  }): boolean => {
    const paddingToBottom = 20
    return (
      /* eslint-disable */
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
      /* eslint-enable */
    )
  }

  return (
    <>
      <ScrollView
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            console.log('[Scroll] Scroll close to bottom')
            setCurrentPage(currentPage + 1)
          }
        }}
      >
        {isLoading && <ActivityIndicator animating />}

        <View>
          <FlatList
            columnWrapperStyle={styles.columnWrapperStyle}
            numColumns={4}
            data={items}
            renderItem={({ item }: { item: Asset }) => {
              return (
                <GridItemPreview
                  item={item}
                  onPress={onPress}
                  s3client={s3client}
                  s3Initialized={s3Initialized}
                  appState={appState}
                />
              )
            }}
            keyExtractor={(item: Asset) => item.fileName}
          ></FlatList>
          <></>
        </View>
      </ScrollView>
    </>
  )
}

export const DataGridColumns: any = () => {
  const columnHelper = createColumnHelper<Asset>()
  const columns: any = [
    columnHelper.accessor('fileName', {
      id: 'fileName',
      header: 'Name',
      cell: (info) => <></>
    })
  ]
  return columns
}
