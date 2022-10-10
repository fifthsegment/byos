import React, { useEffect } from "react";
import { flexRender, getCoreRowModel, useReactTable, } from '@tanstack/react-table'
import { DataGridColumns } from "./dataGridColumns";
import { Asset } from "../../services/types";
import { DataTable, Text } from 'react-native-paper';
import { ScrollView } from "react-native";

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
  })


  return (
    <DataTable >
      <DataTable.Header>
        {table.getHeaderGroups().map(headerGroup => (
          <>
            {headerGroup.headers.map(header => (
              <DataTable.Title key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              </DataTable.Title>
            ))}
          </>
        ))}
      </DataTable.Header>
      <ScrollView>
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
      </ScrollView>
    </DataTable>
  );
}