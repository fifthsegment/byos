import FileCopyIcon from '@mui/icons-material/FileCopy';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const menuItems = [
    {
        label: "Copy",
        icon: FileCopyIcon,
        action: () => {console.log("clicked on copy")}
    },
    {
        label: "Edit",
        icon: EditIcon,
        action: () => {console.log("clicked on edit")}
    },
    {
        label: "Move",
        icon: DriveFileMoveIcon,
        action: () => {console.log("clicked on move")}
    },
    {
        label: "Delete",
        icon: DeleteIcon,
        action: () => {console.log("clicked on delete")}
    }    
]