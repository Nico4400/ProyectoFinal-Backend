// import nodemailer from 'nodemailer'
// import { getVariables } from '../../config/config.js'
// import processOptions from '../../utils/process.js'

// const { googleUser, googlePass } = getVariables(processOptions)

// export default class MailingService {
//   constructor() {
//     this.client = nodemailer.createTransport({
//       host: 'smtp-relay.brevo.com',
//       port: 587,
//       secure: false,
//       auth: {
//         user: googleUser,
//         pass: googlePass
//       }
//     })
//   }

//   sendSimpleMail = async ({ from, to, subject, html, attachments = [] }) => {
//     const result = await this.client.sendMail({ from, to, subject, html, attachments })
//     return result
//   }
// }


import Brevo from 'sib-api-v3-sdk';
import { getVariables } from '../../config/config.js';
import processOptions from '../../utils/process.js';

const { BREVO_API_KEY, googleUser } = getVariables(processOptions);

export default class MailingService {
  constructor() {
    this.client = Brevo.ApiClient.instance;
    const apiKey = this.client.authentications['api-key'];
    apiKey.apiKey = BREVO_API_KEY;

    this.api = new Brevo.TransactionalEmailsApi();
  }

  async sendSimpleMail({ to, subject, html }) {
    const sender = { email: googleUser, name: 'Notificación Proyecto Final' };

    const receivers = [{ email: to }];

    try {
      const result = await this.api.sendTransacEmail({
        sender,
        to: receivers,
        subject,
        htmlContent: html,
      });
      return result;
    } catch (error) {
      console.error('Error al enviar email con Brevo:', error);
      throw error;
    }
  }
}
