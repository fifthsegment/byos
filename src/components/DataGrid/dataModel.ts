import { Asset } from "../../services/types";

//defination of data model for row items (files or folders)
export type dataModel = {
    icon: string,
    name: string,
    size: string,
    lastModified: string,
    s3Object: Asset
};

const tempAssets: Array<Asset> = [
    {
        fileType: "folder",
        fileName: "Tutorials",
        fileSize: "15 MB",
        updatedAt: "07/10/2022",
        createdAt: "",
        assetId: ""
    },
    {
        fileType: "file",
        fileName: "Hello World.c",
        fileSize: "15 KB",
        updatedAt: "07/10/2022",
        createdAt: "",
        assetId: ""
    },
    {
        fileType: "file",
        fileName: "Hello World.py",
        fileSize: "15 KB",
        updatedAt: "07/10/2022",
        createdAt: "",
        assetId: ""
    },
    {
        fileType: "file",
        fileName: "Moonlight Saga",
        fileSize: "15 KB",
        updatedAt: "07/10/2022",
        createdAt: "",
        assetId: ""
    }
];


export const fillDataModel = () => {
    const assets: Array<Asset> = tempAssets //replace this with actual assets
    return assets?.map((item: Asset) => {
        return {
            name: item.fileName,
            size: item.fileSize,
            lastModified: item.updatedAt,
            s3Object: item,
            icon: item.fileType
        } as dataModel
    })
};
