import React, { useEffect, useMemo, useState } from 'react'
import { ContextMenu } from '../ContextMenu'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import prettyBytes from 'pretty-bytes'
import { Asset } from '../../services/types'

import { Box, Typography } from '@mui/material'
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid'

export type DataGridProps = {
    assets: Asset[] | undefined
}

const searchBar = () => <GridToolbarQuickFilter />

export const AssetsTable = ({ assets }: DataGridProps) => {
    dayjs.extend(relativeTime)

    // temporary function to display icon based on file name
    // const [fileType, setFileType] = useState<string>('')
    // const folderCheck = (fileName: string) => {
    //     const char = new RegExp('/')
    //     return char.test(fileName)
    // }

    const [data, setData] = React.useState(() => assets || [])
    useEffect(() => {
        setData(assets || [])
    }, [assets])

    const columns = useMemo(
        () => [
            { field: 'fileName', headerName: 'Name', width: 300 },
            {
                field: 'fileSize',
                headerName: 'Size',
                width: 100,
                renderCell: (params) => prettyBytes(params.row.fileSize),
            },
            {
                field: 'updatedAt',
                headerName: 'Last modified',
                width: 140,
                renderCell: (params: any) =>
                    dayjs(params.row.updatedAt).format('DD-MM-YY'),
            },
            {
                field: 'actions',
                headerName: 'Actions',
                width: 70,
                renderCell: () => <ContextMenu />,
            },
        ],
        []
    )

    const [tableSize, setTableSize] = useState(5)

    return (
        <Box sx={{ height: '420px', width: '100%' }}>
            <Typography
                variant="h3"
                component="h2"
                sx={{ textAlign: 'center', mt: 3, mb: 3 }}
            >
                Folders and Files
            </Typography>
            <DataGrid
                columns={columns}
                rows={data}
                getRowId={(row) => row.assetId + row.fileName}
                rowsPerPageOptions={[5, 15, 30]}
                pageSize={tableSize}
                disableColumnMenu
                onPageSizeChange={(newTableSize) => setTableSize(newTableSize)}
                components={{ Toolbar: searchBar }}
            />
        </Box>
    )
}
