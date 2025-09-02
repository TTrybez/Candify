const birthdayService = require('../services/birthdayService');

class BirthdayController {
  async triggerBirthdayCheck(req, res) {
    try {
      console.log('Manual birthday check triggered');
      const result = await birthdayService.checkAndSendBirthdayWishes();
      
      if (result.success) {
        res.json({
          message: result.message,
          count: result.count,
          results: result.results
        });
      } else {
        res.status(500).json({
          error: 'Birthday check failed',
          details: result.error
        });
      }
    } catch (error) {
      console.error('Error in birthday controller:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new BirthdayController();