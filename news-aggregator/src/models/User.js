const bcrypt = require('bcrypt')
class User {
    constructor(name, email, password, preferences) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.preferences = preferences;
    }
    setPassword(password) {
      
      const hashedPassword = bcrypt.hashSync(password, 8)
      this.password = hashedPassword;
    }
    
  }
  
  module.exports = {
    User,
  };