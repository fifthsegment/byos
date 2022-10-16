import React, { Fragment, useEffect, useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import {
  ActivityIndicator,
  DataTable as ReactPaperDataTable,
  Text
} from 'react-native-paper'
import { ScrollView, StyleSheet } from 'react-native'
import { DataGridColumns } from './dataTableColumns'
import { Asset } from '../../services/types'

const styles = StyleSheet.create({
  cell: {
    flexBasis: 'auto',
    paddingRight: '30px'
  },
  cellFirstChild: {
    flexBasis: '78%'
  },
  title: {
    display: 'flex',
    alignItems: 'center'
  }
})

export interface DataTableProps {
  assets: Asset[] | undefined
  onPress: (asset: Asset) => void
  isLoading: boolean
}

export const DataTable: (props: DataTableProps) => JSX.Element = ({
  assets,
  onPress,
  isLoading
}: DataTableProps) => {
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
      <ReactPaperDataTable.Header>
        {table.getHeaderGroups().map((headerGroup) => (
          <Fragment key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => (
              <ReactPaperDataTable.Title
                key={header.id}
                style={index === 0 ? styles.cellFirstChild : styles.cell}
              >
                <Text>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </Text>
              </ReactPaperDataTable.Title>
            ))}
          </Fragment>
        ))}
      </ReactPaperDataTable.Header>
      <ScrollView
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            console.log('[Scroll] Scroll close to bottom')
            setCurrentPage(currentPage + 1)
            // table.setPageSize(20 * 2)
          }
        }}
      >
        <ReactPaperDataTable>
          {isLoading && <ActivityIndicator animating />}
          {table.getRowModel().rows.map((row) => (
            <ReactPaperDataTable.Row
              key={row.id}
              onPress={() => {
                onPress(row.original)
              }}
            >
              {row.getVisibleCells().map((cell, index) => (
                <ReactPaperDataTable.Cell
                  key={cell.id}
                  style={index === 0 ? styles.cellFirstChild : styles.cell}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </ReactPaperDataTable.Cell>
              ))}
            </ReactPaperDataTable.Row>
          ))}
          <ReactPaperDataTable.Pagination
            page={table.getState().pagination.pageIndex + 1}
            numberOfPages={table.getPageCount()}
            onPageChange={(page) => table.setPageIndex(page - 1)}
            label={`${
              table.getState().pagination.pageIndex + 1
            } of ${table.getPageCount()}`}
          />
        </ReactPaperDataTable>
      </ScrollView>
    </>
  )
}
