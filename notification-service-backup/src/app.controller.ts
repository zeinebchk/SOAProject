import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern,Payload } from '@nestjs/microservices';
import { SendmailService } from './sendmail/sendmail.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private readonly mailService:SendmailService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


@MessagePattern("notification-topic")
handleAddUser(@Payload() user:any){
  console.log("received new user",user)
  this.mailService.sendEmail(user.email,user.prenom);
}
}





