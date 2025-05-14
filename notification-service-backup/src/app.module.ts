import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { SendmailService } from './sendmail/sendmail.service';


@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'notification_users_group',
          },
        },
      },
    ]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'zeinebchekir742@gmail.com',
          pass: 'zyybozwvbjfrmykd',
        },
      },
      defaults: {
        from: '"No Reply" <zeinebchekir742@gmail.com>',
      },
      preview:true,
      template:{
        dir:process.cwd()+"/template/",
        adapter:new HandlebarsAdapter(),
        options:{
          strict:true,
        }
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService, SendmailService],
})
export class AppModule {}
