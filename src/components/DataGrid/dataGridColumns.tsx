import { ContextMenu } from '../ContextMenu'
import { createColumnHelper } from '@tanstack/react-table'
import { dataModel } from './dataModel'
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';


//icons for different file types or folders
const iconType = (icon:any)=>{
    switch(icon){
        case "folder":
            return <FolderIcon></FolderIcon>
        case "textFile":
            return <InsertDriveFileIcon></InsertDriveFileIcon>
        default:
            return <InsertDriveFileIcon></InsertDriveFileIcon>
    }
};


export const DataGridColumns = () =>{
    const columnHelper = createColumnHelper<dataModel>()
    const columns = [
       
        // Dispaly file name with icon
        columnHelper.accessor('name', {
            header: "Name",
            cell: info => {
                return (<>{iconType(info.row.original.icon)} {info.getValue()}</>)
            }
        }),
        
        // Display file size
        columnHelper.accessor('size', {
          header: 'Size',
          cell: info => info.getValue()
        }),
        
        //Dispaly last modified
        columnHelper.accessor('lastModified', {
          header: 'Last Modified',
          cell: info => info.getValue()
        }),

        //Display column size
        columnHelper.display({
            id: 'actions',
            cell: () => <ContextMenu />,
          }),
      ]
      return columns
}
