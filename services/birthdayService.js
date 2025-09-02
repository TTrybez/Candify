const User = require('../models/user');
const emailService = require('./emailService');
const database = require('../config/database');

class BirthdayService {
  constructor() {
    this.userModel = new User(database.getConnection());
  }

  async checkAndSendBirthdayWishes() {
    try {
      console.log('Checking for today\'s birthdays...');
      
      const birthdayUsers = await this.userModel.getTodaysBirthdays();
      
      if (birthdayUsers.length === 0) {
        console.log('No birthdays today');
        return { success: true, message: 'No birthdays today', count: 0 };
      }

      console.log(`Found ${birthdayUsers.length} birthday(s) today!`);
      
      const emailResults = await emailService.sendBulkBirthdayEmails(birthdayUsers);
      
      const successCount = emailResults.filter(result => result.success).length;
      const failCount = emailResults.length - successCount;
      
      return {
        success: true,
        message: `Birthday wishes sent: ${successCount} successful, ${failCount} failed`,
        count: birthdayUsers.length,
        results: emailResults
      };
      
    } catch (error) {
      console.error('Error in birthday service:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = new BirthdayService();
