import React, { Fragment, useEffect } from 'react'
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { DataGridColumns } from './dataGridColumns'
import { Asset } from '../../services/types'
import { DataTable, Text } from 'react-native-paper'

export interface DataGridProps {
  assets: Asset[] | undefined
  onPress: (asset: Asset) => void
}

export const DataGrid: (props: DataGridProps) => JSX.Element = ({ assets, onPress }: DataGridProps) => {
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
    <DataTable >
      <DataTable.Header>
        {table.getHeaderGroups().map(headerGroup => (
          <Fragment key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <DataTable.Title key={header.id}>
                <Text >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </Text >

              </DataTable.Title>
            ))}
          </Fragment>
        ))}
      </DataTable.Header>
      {table.getRowModel().rows.map(row => {
        return <DataTable.Row key={row.id} onPress={() => { onPress(row.original) }}>
          {row.getVisibleCells().map(cell => (
            <DataTable.Cell key={cell.id}>
              <Text >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Text>
            </DataTable.Cell>
          ))}
        </DataTable.Row>
      })}
      <DataTable.Pagination
        page={table.getState().pagination.pageIndex + 1}
        numberOfPages={table.getPageCount()}
        onPageChange={(page) => table.setPageIndex(page - 1)}
        label={`${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}
      />
    </DataTable>

  )
}
