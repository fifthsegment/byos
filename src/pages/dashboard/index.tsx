import React from 'react'
import { ListAssets } from '../../components/ListAssets'
import { DataGrid } from '../../components/DataGrid'

export default function Dashboard() {
    return (
        <div>
            Dashboard
            <ListAssets />
            
            <DataGrid/>
        </div>
    )
}
