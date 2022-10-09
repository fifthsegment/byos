import React, { useEffect } from "react";
import { flexRender, getCoreRowModel, useReactTable, } from '@tanstack/react-table'
import { DataGridColumns } from "./dataGridColumns";
import { Asset } from "../../services/types";

export type DataGridProps = {
  assets: Asset[] | undefined
}

export const DataGrid = ({ assets }: DataGridProps) => {
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
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => {
          return <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        })}
      </tbody>
    </table>
  );
}