import { PutObjectCommand, PutObjectCommandInput, S3Client } from "@aws-sdk/client-s3"
import { buildS3Client } from "../services/s3";
var clc = require("cli-color");
import * as dotenv from 'dotenv'
import chalkAnimation from 'chalk-animation';
import { uniqueNamesGenerator, Config, adjectives, colors, animals, countries } from 'unique-names-generator';


export const getFileBody = () => {
    var blob = new Blob(["File Body."],
        { type: "text/plain;charset=utf-8" });
    return blob;
}

export const fileBodyGenerator = (length: number = 10) => {
    const dictionaries = [adjectives, animals, colors, countries];
    const timesToGenerate = length / dictionaries.length
    let text = ""
    for (let index = 0; timesToGenerate; index++) {
        text += uniqueNamesGenerator({
            length: 3,
            dictionaries,
            seed: Math.floor(Math.random() * 1000)
        });

    }
    return text
}

export const generateAndUploadFile = async (s3Client: S3Client, filename: string, bucket: string) => {

    const input = {
        Body: uniqueNamesGenerator({
            length: 3,
            dictionaries: [adjectives, animals, colors, countries],
            seed: Math.floor(Math.random() * 1000)
        }),
        Key: filename,
        Bucket: bucket
    } as PutObjectCommandInput;
    const cmd = new PutObjectCommand(input);
    const response = await s3Client.send(cmd);
    return response;
}

export const buildClient = (region: string, apiKey: string, apiSecret: string, endpoint: string) => {
    return buildS3Client({
        region,
        credentials: {
            accessKeyId: apiKey,
            secretAccessKey: apiSecret
        },
        endpoint
    })
}

const checkingText = (text: string) => {
    const rainbow = chalkAnimation.rainbow(text);
    let i = 0;
    const interval = setInterval(() => {
        if (i > 9) {
            clearInterval(interval)
            return;
        }
        i++;
        rainbow.replace(text += '.');
    }, 100);
}

const generateAndUploadFiles = async (client, total: number = 10, prefix: string, BUCKET: string, log: (...args) => void) => {
    const green = clc.green;
    console.log(`Uploading a total of ${total} files`)
    for (let index = 0; index < total; index++) {
        console.log(green("Uploading File " + (index + 1)))
        const uniqueName = uniqueNamesGenerator({
            dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
            length: 2
        });
        const fileExtension = ".txt";
        const fileName = `${prefix}${uniqueName}${fileExtension}`;
        log(green("Generating file = ", fileName))
        log(green("Uploading file"))
        const response = generateAndUploadFile(client, fileName, BUCKET);
        log("Response", response)
    }
}

const getLog = (verbose: boolean = true) => verbose ? console.log : (...args) => { }

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const main = async () => {
    const green = clc.green;
    const blue = clc.blue;
    const red = clc.red;
    const yellow = clc.yellow;
    console.log(blue(`
    ██████╗░██╗░░░██╗░█████╗░░██████╗░██████╗░███████╗███╗░░██╗██╗
    ██╔══██╗╚██╗░██╔╝██╔══██╗██╔════╝██╔════╝░██╔════╝████╗░██║██║
    ██████╦╝░╚████╔╝░██║░░██║╚█████╗░██║░░██╗░█████╗░░██╔██╗██║██║
    ██╔══██╗░░╚██╔╝░░██║░░██║░╚═══██╗██║░░╚██╗██╔══╝░░██║╚████║╚═╝
    ██████╦╝░░░██║░░░╚█████╔╝██████╔╝╚██████╔╝███████╗██║░╚███║██╗
    ╚═════╝░░░░╚═╝░░░░╚════╝░╚═════╝░░╚═════╝░╚══════╝╚═╝░░╚══╝╚═╝`))

    console.log(`\r\n`)
    checkingText('Checking credentials');
    await delay(1000)

    const result = dotenv.config();
    if (result.error) {
        console.log(red("[ERROR] Parsing .env file"))
    }

    const { ENDPOINT, API_KEY, API_SECRET, BUCKET, VERBOSE, TOTAL_TO_GENERATE, KEY_PREFIX } = process.env;

    const parsedCredentials = ENDPOINT && API_KEY && API_SECRET && BUCKET && TOTAL_TO_GENERATE && KEY_PREFIX;
    if (!parsedCredentials) {
        console.log(red("[ERROR] All credentials fields must be filled. Found the following data = ", JSON.stringify(result.parsed)))
        console.log(red(`Create a .env file with the following template in the byos directory: 
            REGION=""
            API_KEY=""
            API_SECRET=""
            BUCKET=""
            TOTAL_TO_GENERATE=1
            KEY_PREFIX="folderWith1File/"
        `))
    } else {
        console.log(green("Succesfully read credential file"))
        console.log(green("Creating S3 Client"))
        const client = buildClient("us-west", API_KEY, API_SECRET, ENDPOINT)
        console.log(green("Client created"))
        generateAndUploadFiles(client, +TOTAL_TO_GENERATE, KEY_PREFIX, BUCKET, getLog(VERBOSE === "true"))

    }
}

main();

