import { ContextMenu } from '../ContextMenu'
import { createColumnHelper } from '@tanstack/react-table'
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Asset } from '../../services/types';
import prettyBytes from 'pretty-bytes';
// @ts-ignore
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);

//icons for different file types or folders
const iconType = (icon: string) => {
    switch (icon) {
        case "folder":
            return <FolderIcon />
        case "textFile":
            return <InsertDriveFileIcon />
        default:
            return <InsertDriveFileIcon />
    }
};

export const DataGridColumns = () => {
    const columnHelper = createColumnHelper<Asset>()
    const columns = [

        // Dispaly file name with icon
        columnHelper.accessor('fileName', {
            header: "Name",
            cell: info => {
                return (<>{iconType(info.row.original.fileType)} {info.getValue()}</>)
            }
        }),

        // Display file size
        columnHelper.accessor('fileSize', {
            header: 'Size',
            cell: info => prettyBytes(info.getValue())
        }),

        //Dispaly last modified
        columnHelper.accessor('updatedAt', {
            header: 'Last Modified',
            cell: info => {
                return dayjs(info.getValue()).fromNow()
            }
        }),

        //Display column size
        columnHelper.display({
            id: 'actions',
            cell: () => <ContextMenu />,
        }),
    ]
    return columns
}
