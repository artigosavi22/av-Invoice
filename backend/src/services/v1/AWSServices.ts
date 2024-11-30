
import {
    GetObjectCommand,
    GetObjectCommandOutput,
    PutObjectCommand,
S3Client
} from "@aws-sdk/client-s3";
import {
    SendEmailCommand,
    SESClient
} from "@aws-sdk/client-ses";
import express from 'express';
import { Readable } from "stream";
import Utils from "../../utils/Utils";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const AWS_CONFIG ={
    credentials: {
        accessKeyId:process.env.AWS_ACCESS_KEY!,
        secretAccessKey:process.env.AWS_ACCESS_KEY!
    },
    region: process.env.AWS_REGION
}
export class AWSService {
    private s3: S3Client;
    private ses: SESClient;

    constructor() {
      this.s3 = new S3Client(AWS_CONFIG);
      this.ses = new SESClient(AWS_CONFIG);
    }
  
    public uploadFileToS3 = async(
        file: Express.Multer.File,
        bucketName : string
    )=>{
        try {
            const params = {
                Bucket :bucketName,
                Key : `${file.destination}${file.originalName}`,
                Body: file.buffer,
                ContentType:file.mimetype,
            }
            const command = new PutObjectCommand(params);
            await this.s3.send(command);
        } catch (error) {
            throw error;
        }
    }

    public getFileFromS3 = async(
        filePath: string
    )=>{
        const params = {
            Bucket :process.env.S3_BUCKET_NAME,
            Key : filePath,
           }
      
        try {
            const command = new GetObjectCommand(params);
           const data: GetObjectCommandOutput =  await this.s3.send(command);
           if(data.Body instanceof Readable){
            return await Utils.streamToBuffer(data.Body);
           }
           throw new Error("Invalid S3 Response, expencted a readable stream");
        } catch (error) {
            throw error;
        }
    }

    public async sendEmail(
        to:string[],
        subject: string,
        bodyHtml: string,
    ):Promise<any>{
        try {
            const staticParams= {
                Source:process.env.SENDER_EMAIL_ID,
                Destination: {
                    ToAddresses:to,
                },
                Message:{
                    Subject:{
                        Data:subject
                    },
                    Body:{
                        Html:{
                            Data:bodyHtml,
                        },
                    },
                },
            };
            const command = new SendEmailCommand(staticParams);
            const response = await this.ses.send(command);
            return response;   
        } catch (error) {
            throw error;
        }
    }

    public downloadFileFromS3 = async(
        filePath: string
    )=>{
        try {
            const params = {
                Bucket : process.env.S3_BUCKET_NAME!,
                Key : filePath,
               }
          
            const command = new GetObjectCommand(params);
            const url = await getSignedUrl(this.s3,  command, {expiresIn :3600})
           return url;
        } catch (error) {
            throw error;
        }
    }


}

