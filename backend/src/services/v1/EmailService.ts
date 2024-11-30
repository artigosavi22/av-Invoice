
import {EmailClient} from '@azure/communication-email';
import fs from 'fs';
import path from 'path';
import handlebars from "handlebars";
import{ EMAIL_TYPE} from "../../models/v1/Generals";
import AppError  from '../../utils/AppError';

const connectionString = `endpoint=${process.env.COMMUNICATION_SERVICES_COMMUNICATION_STRING_URL};accesskey=${process.env.COMMUNICATION_SERVICES_COMMUNICATION_STRING_ACCESS_KEY}`;
const senderAddress = process.env["SENDER_ADDRESS"] as string;
export class EmailService{
    private client: EmailClient;
    private senderAddress: string;

    constructor(){
        this.client= new EmailClient(connectionString);
        this.senderAddress= senderAddress;
    }

    public compileTemplate<T>(templateName:string,data:T):string{
        const filePath = path.join(
            __dirname,
            "../../templates",
            `${templateName}.hbs`
        );
        if(!fs.existsSync(filePath)){
            throw new AppError(`Template file not found: ${filePath}`,400);
        }

        const source = fs.readFileSync(filePath,"utf-8");
        const template = handlebars.compile(source);
        return template(data);
    }

    public async sendMail(emailInfo:EMAIL_TYPE):Promise<any>{
        const {to,htmlContent}= emailInfo;
        try {
            const emailMessage ={
                senderAddress:this.senderAddress,
                content:htmlContent,
                recipients:{
                    to,
                },
            };
            const poller = await this.client.beginSend(emailMessage);
            const result = await poller.pollUntilDone();
            return result;
        } catch (error) {
            throw new Error(`Failed to send email:${error}`);
        }
    }
}