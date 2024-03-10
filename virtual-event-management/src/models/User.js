const bcrypt = require('bcrypt')
class User {
    constructor(id, name, email, password, role) {
      this.id = id;
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