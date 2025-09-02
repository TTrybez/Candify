const nodemailer = require('nodemailer');
require('dotenv').config();

class EmailService {
  constructor() {
    this.transporter = this.createTransporter();
  }

  createTransporter() {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });
  }

  generateBirthdayTemplate(user) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { padding: 30px; text-align: center; }
          .birthday-icon { font-size: 48px; margin: 20px 0; }
          .message { font-size: 18px; line-height: 1.6; color: #333; margin: 20px 0; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
          .confetti { color: #ff6b6b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Happy Birthday! 🎉</h1>
          </div>
          <div class="content">
            <div class="birthday-icon">🎂</div>
            <div class="message">
              <h2>Dear ${user.username},</h2>
              <p>Wishing you a very Happy Birthday! 🎈</p>
              <p>May this special day bring you joy, happiness, and wonderful memories that will last a lifetime.</p>
              <p>Thank you for being part of our community. We hope your day is filled with love, laughter, and all your favorite things!</p>
              <p class="confetti">🎊 Celebrate and enjoy every moment! 🎊</p>
            </div>
          </div>
          <div class="footer">
            <p>Best wishes from the entire team!</p>
            <p>This is an automated birthday message sent with love ❤️</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  async sendBirthdayEmail(user) {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: user.email,
      subject: `🎉 Happy Birthday, ${user.username}! 🎂`,
      html: this.generateBirthdayTemplate(user)
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Birthday email sent to ${user.username} (${user.email})`);
      return { success: true };
    } catch (error) {
      console.error(`Failed to send email to ${user.email}:`, error.message);
      return { success: false, error: error.message };
    }
  }

  async sendBulkBirthdayEmails(users) {
    const results = [];
    
    for (const user of users) {
      const result = await this.sendBirthdayEmail(user);
      results.push({ user: user.email, ...result });
      
      // Add delay between emails to avoid rate limiting
      await this.delay(1000);
    }
    
    return results;
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = new EmailService();
