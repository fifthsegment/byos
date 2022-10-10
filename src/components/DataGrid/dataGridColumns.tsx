import { ContextMenu } from '../ContextMenu'
import { createColumnHelper } from '@tanstack/react-table'
import { Asset } from '../../services/types';
import prettyBytes from 'pretty-bytes';
// @ts-ignore
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import { AntDesign, Feather } from '@expo/vector-icons';
import { Platform } from 'react-native';

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
            id: "fileName",
            header: "Name",
            cell: info => {
                const row = info.row.original;
                const fileName = row.isFolder ? info.getValue().slice(0, -1) : info.getValue();
                return (<>{iconType(row)} {fileName}</>)
            }
        }),

        // Display file size
        columnHelper.accessor('fileSize', {
            id: "fileSize",
            header: 'Size',
            cell: info => !info.row.original.isFolder && prettyBytes(info.getValue())
        }),

        //Dispaly last modified
        columnHelper.accessor('updatedAt', {
            id: "updatedAt",
            header: 'Last Modified',
            cell: info => {
                return !info.row.original.isFolder && dayjs(info.getValue()).fromNow()
            }
        }),

        //Display column size
        columnHelper.display({
            id: 'actions',
            cell: () => <ContextMenu />,
        }),
    ]
        .filter((item) => {
            return Platform.OS !== "web" ? item.id === "fileName" : true

        })
    return columns
}
