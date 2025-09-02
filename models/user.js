class User {
  constructor(db) {
    this.db = db;
  }

  async create(userData) {
    const { username, email, dateOfBirth } = userData;
    
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO users (username, email, date_of_birth) VALUES (?, ?, ?)';
      
      this.db.run(sql, [username, email, dateOfBirth], function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            reject(new Error('Email already exists'));
          } else {
            reject(err);
          }
        } else {
          resolve({
            id: this.lastID,
            username,
            email,
            dateOfBirth
          });
        }
      });
    });
  }

  async getAll() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users ORDER BY created_at DESC';
      
      this.db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async getTodaysBirthdays() {
    return new Promise((resolve, reject) => {
      const today = new Date();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      
      const sql = `
        SELECT * FROM users 
        WHERE strftime('%m-%d', date_of_birth) = ?
      `;
      
      this.db.all(sql, [`${month}-${day}`], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = User;
