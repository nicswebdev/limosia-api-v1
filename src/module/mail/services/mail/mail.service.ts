import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    public readonly mailerService: MailerService,
    public readonly configService: ConfigService,
  ) {}

  sendMail(opts: ISendMailOptions) {
    return this.mailerService.sendMail({
      from: `${this.configService.get(
        'MAIL_FROM_NAME',
      )} <${this.configService.get('MAIL_FROM_ADDRESS')}>`,
      to: opts.to,
      subject: opts.subject || 'Greetings from Limosia!',
      text: 'Hehe',
      template: 'welcome.mail.hbs',
      context: {
        APP_NAME: this.configService.get('APP_NAME'),
        APP_URL: this.configService.get('APP_URL'),
        FRONTEND_URL: this.configService.get('FRONTEND_URL'),
        date: Date().toString(),
        username: 'r4e',
        name: 'Richie',
        support_email: 'support@limosia.com',
        support_url: `${process.env.FRONTEND_URL}/support`,
        help_url: `${process.env.FRONTEND_URL}/support`,
        action_url: `${process.env.FRONTEND_URL}/action`,
        operating_system: '',
        browser_name: '',
        login_url: `${process.env.FRONTEND_URL}/login`,
      },
    });
  }
}
