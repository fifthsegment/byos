import { S3Client } from "@aws-sdk/client-s3";
import { useMemo } from "react"
import { ApplicationState } from "../contexts/application/ApplicationContext";
import { buildS3Client } from "../services/s3";

export const useS3Client: (appState: ApplicationState) => S3Client | undefined = (appState: ApplicationState) => {
    const { s3credentials } = appState;
    const { apiKey, apiSecret, region, endpoint } = s3credentials;
    const client = useMemo(() => {
        if (apiKey && apiSecret && endpoint) {
            return buildS3Client({
                region,
                credentials: {
                    accessKeyId: apiKey,
                    secretAccessKey: apiSecret
                },
                endpoint
            })
        }
    }, [apiKey, apiSecret, region, endpoint])
    return client;
}