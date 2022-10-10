import React, { useEffect } from "react";
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable, } from '@tanstack/react-table'
import { DataGridColumns } from "./dataGridColumns";
import { Asset } from "../../services/types";
import { DataTable, Text } from 'react-native-paper';
import { ScrollView, View } from "react-native";

export type DataGridProps = {
  assets: Asset[] | undefined,
  onPress: (asset: Asset) => void
}

export const DataGrid = ({ assets, onPress }: DataGridProps) => {
  const [data, setData] = React.useState(() => assets || [])
  useEffect(() => {
    setData(assets || []);
  }, [assets])
  const table = useReactTable({
    data,
    columns: DataGridColumns(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

  })

  useEffect(() => {
    table.setPageSize(20);
  }, [])




  return (
    <DataTable >
      <DataTable.Header>
        {table.getHeaderGroups().map(headerGroup => (
          <View key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <DataTable.Title key={"header" + header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              </DataTable.Title>
            ))}
          </View>
        ))}
      </DataTable.Header>
      {table.getRowModel().rows.map(row => {
        return <DataTable.Row key={"dtbrow-" + row.id} onPress={() => { onPress(row.original) }}>
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


  );
}