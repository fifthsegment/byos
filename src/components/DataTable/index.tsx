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
  Button
} from 'react-native-paper'
import { ScrollView, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { DataGridColumns } from './dataTableColumns'
import { Asset } from '../../services/types'
import { useScreenSize } from '../../services/rn-responsive-design/useScreenSize'
import { isMobile } from '../../services/rn-responsive-design/utils'

const styles = StyleSheet.create({
  tableHead: {
    height: 'auto'
  },
  sorterIcon: {
    marginLeft: '10px'
  },
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
      <ReactPaperDataTable.Header style={styles.tableHead}>
        {table.getHeaderGroups().map((headerGroup) => (
          <Fragment key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => (
              <ReactPaperDataTable.Title
                key={header.id}
                style={index === 0 ? styles.cellFirstChild : styles.cell}
              >
                <Button>
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
                          <AntDesign
                            name="arrowdown"
                            style={styles.sorterIcon}
                          />
                        )
                      }[header.column.getIsSorted() as string] ?? null}
                    </Text>
                      )}
                </Button>
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
