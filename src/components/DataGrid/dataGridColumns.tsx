import { ContextMenu } from '../ContextMenu'
import { createColumnHelper } from '@tanstack/react-table'
import { Asset } from '../../services/types';
import prettyBytes from 'pretty-bytes';
// @ts-ignore
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import { AntDesign, Feather } from '@expo/vector-icons';

dayjs.extend(relativeTime);

//icons for different file types or folders
const iconType = (asset: Asset) => {
    const re = /(?:\.([^.]+))?$/;
    const internalType = asset.isFolder ? "folder" : (re.exec(asset.fileName)[1] || "")
    switch (internalType) {
        case "folder":
            return <AntDesign name="folder1" size={24} />
        case "txt":
            return <Feather name="file-text" size={24} />
        default:
            return <Feather name="file" size={24} />
    }
};

export const DataGridColumns = () => {
    const columnHelper = createColumnHelper<Asset>()
    const columns = [

        // Dispaly file name with icon
        columnHelper.accessor('fileName', {
            header: "Name",
            cell: info => {
                return (<>{iconType(info.row.original)} {info.getValue()}</>)
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
