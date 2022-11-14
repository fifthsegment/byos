import React, { Fragment, useEffect, useMemo, useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table'
import {
  ActivityIndicator,
  DataTable as ReactPaperDataTable,
  Text,
  ToggleButton
} from 'react-native-paper'
import { ScrollView, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { DataGridColumns } from './dataTableColumns'
import { Asset } from '../../services/types'
import { useScreenSize } from '../../services/rn-responsive-design/useScreenSize'
import { isMobile } from '../../services/rn-responsive-design/utils'
import { Portal } from '@gorhom/portal'

const styles = StyleSheet.create({
  tableHead: {
    height: 'auto'
  },
  sorterIcon: {
    marginLeft: '10px'
  },
  cell: {
    // flexBasis: 'auto',
    // paddingRight: '30px',
  },
  cellFirstChild: {
    flexBasis: '50%'
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
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columns, setColumns] = useState(DataGridColumns())
  const [currentPage, setCurrentPage] = useState(1)
  const screenType = useScreenSize()
  useMemo(() => {
    if (isMobile()) {
      setColumns(DataGridColumns().filter((column) => column.id === 'fileName'))
    } else {
      setColumns(DataGridColumns())
    }
  }, [screenType])
  useEffect(() => {
    setData(assets || [])
    setCurrentPage(1)
  }, [assets])
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })
  const selectedRows = table.getSelectedRowModel().rows

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

  const getStyle = (
    id: string,
    isHeader: boolean = false
  ): React.CSSProperties => {
    switch (id) {
      case 'select': {
        if (isHeader) {
          return {
            maxWidth: 50,
            position: 'relative',
            top: -3
          }
        }
        return {
          maxWidth: 50
        }
      }
      case 'fileName': {
        return { flexBasis: '50%' }
      }
      case 'fileSize': {
        return {
          justifyContent: 'end',
          marginRight: 30
        }
      }
      default: {
        return {}
      }
    }
  }

  const deleteMultipleAssets = (): void => {
    console.log('Delete multiple assets')
  }

  return (
    <>
      <Portal hostName="listassetsheader">
        {selectedRows?.length > 0 && (
          <ToggleButton
            icon="delete"
            value="delete"
            onPress={() => {
              deleteMultipleAssets()
            }}
          />
        )}
      </Portal>
      <ReactPaperDataTable.Header style={styles.tableHead}>
        {table.getHeaderGroups().map((headerGroup) => (
          <Fragment key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => (
              <ReactPaperDataTable.Title
                key={header.id}
                style={getStyle(header.id, true)}
              >
                {header.isPlaceholder
                  ? null
                  : (
                  <Text
                    {...{
                      onClick: header.column.getToggleSortingHandler()
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: (
                        <AntDesign name="arrowup" style={styles.sorterIcon} />
                      ),
                      desc: (
                        <AntDesign name="arrowdown" style={styles.sorterIcon} />
                      )
                    }[header.column.getIsSorted() as string] ?? null}
                  </Text>
                    )}
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
                  style={getStyle(cell.column.id)}
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
