
import { EmailContent } from '@azure/communication-email';
import {EmailService} from '../../services/v1/EmailService';
import { AWSService } from '../../services/v1/AWSServices';


const emailService = new EmailService();
const awsService = new AWSService();

const sendEmail = async(
    subject:string,
    to:Array<{address:string}>,
    logoUrl:string,
    templateName:string,
    emailBody:any
)=>{
    try {
        const htmlContent = emailService.compileTemplate(templateName,{
            subject,
            logoUrl,
            ...emailBody
        });

        const emailContent: EmailContent={
            subject:subject,
            html:htmlContent
        }

        //Azure email send
        const result = await emailService.sendMail({
            to,
            htmlContent:emailContent
        });

        //AWS emails
        // const result = await awsService.sendEmail(
        //     to as unknown as string[],
        //     emailContent.subject,
        //     htmlContent
        // );

        return result;
    } catch (error:any) {
        throw error
    }
};

export {
    sendEmail
}