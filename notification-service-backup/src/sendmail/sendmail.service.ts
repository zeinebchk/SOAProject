import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendmailService {

    constructor(private readonly mailerService: MailerService) {}
    public sendEmail(email:string, prenom :string): void {
       console.log("received email",email);
       
        this.mailerService
          .sendMail({
            to: email, // list of receivers
            from: 'zeinebchekir742@gmail.com', // sender address
            subject: 'Testing Nest MailerModule ✔', // Subject line
            text: `Welcome to our company Mr/Ms ${prenom}`, // plaintext body
            html: `<b>Welcome, ${prenom}</b>`, // HTML body content
          })
          .then(() => {
            console.log("message sended successsfully")
          })
          .catch((message) => {
            console.error(message);
            
          });
      }
}
