import React, { Fragment, useEffect } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import { DataTable, Text } from 'react-native-paper'
import { ScrollView } from 'react-native'
import { DataGridColumns } from './dataGridColumns'
import { Asset } from '../../services/types'
import { DataTable, Text } from 'react-native-paper'
import { StyleSheet } from 'react-native'

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

export interface DataGridProps {
  assets: Asset[] | undefined
  onPress: (asset: Asset) => void
}

export const DataGrid: (props: DataGridProps) => JSX.Element = ({
  assets,
  onPress
}: DataGridProps) => {
  const [data, setData] = React.useState<Asset[]>(() => assets || [])
  useEffect(() => {
    setData(assets || [])
  }, [assets])
  const table = useReactTable({
    data,
    columns: DataGridColumns(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  useEffect(() => {
    table.setPageSize(20)
  }, [])

  return (
        <>
            <DataTable.Header>
                {table.getHeaderGroups().map((headerGroup) => (
                    <Fragment key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <DataTable.Title key={header.id} style={index === 0 ? styles.cellFirstChild : styles.cell}>
                                <Text>
                                    {header.isPlaceholder
                                      ? null
                                      : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                      )}
                                </Text>
                            </DataTable.Title>
                        ))}
                    </Fragment>
                ))}
            </DataTable.Header>
            <ScrollView>
                <DataTable>
                    {table.getRowModel().rows.map((row) => (
                        <DataTable.Row
                            key={row.id}
                            onPress={() => {
                              onPress(row.original)
                            }}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <DataTable.Cell key={cell.id} style={index === 0 ? styles.cellFirstChild : styles.cell}>
                                    <Text>
                                        {flexRender(
                                          cell.column.columnDef.cell,
                                          cell.getContext()
                                        )}
                                    </Text>
                                </DataTable.Cell>
                            ))}
                        </DataTable.Row>
                    ))}
                    <DataTable.Pagination
                        page={table.getState().pagination.pageIndex + 1}
                        numberOfPages={table.getPageCount()}
                        onPageChange={(page) => table.setPageIndex(page - 1)}
                        label={`${
                            table.getState().pagination.pageIndex + 1
                        } of ${table.getPageCount()}`}
                    />
                </DataTable>
            </ScrollView>
        </>
  )
}
