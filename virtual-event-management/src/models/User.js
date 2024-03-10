const bcrypt = require('bcrypt')
class User {
    constructor(name, email, password, role) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.role = role;
    }
    setPassword(password) {
      
      const hashedPassword = bcrypt.hashSync(password, 8)
      this.password = hashedPassword;
    }
    
  }
  
  module.exports = {
    User,
  };