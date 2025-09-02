const cron = require('node-cron');
const birthdayService = require('../services/birthdayService');

class BirthdayScheduler {
  static start() {
    // Schedule for 7 AM daily
    cron.schedule('0 7 * * *', async () => {
      console.log('Running scheduled birthday check at 7 AM...');
      await birthdayService.checkAndSendBirthdayWishes();
    });

    console.log('Birthday scheduler started - will run daily at 7 AM');
  }
}

module.exports = BirthdayScheduler;