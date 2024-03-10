const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, '../../data/Users.json');
const bcrypt = require('bcrypt')
function fetchData() {
  return fs.readFile(filePath, 'utf-8')
    .then(data => {
      const users = JSON.parse(data);
      
      return users;
    })
    .catch(error => {
      console.error('Error reading or parsing users data:', error);
      throw error;
    });
}

async function addData(newData) {
    try {
      const existingContent = await fs.readFile(filePath, 'utf-8');
      const existingUsers = JSON.parse(existingContent);
      existingUsers.push(newData);
      
      await fs.writeFile(filePath, JSON.stringify(existingUsers, null, 2), 'utf-8');
      console.log('User appended to file.');
    } catch (error) {
      console.error('Error appending user to file:', error);
      throw error;
    }
  }


  async function updatePassword(email, newPassword){
    try{
      const data = await fs.readFile(filePath, 'utf-8');
      const users = JSON.parse(data);
      const userIndex = users.findIndex(user => user.email === email);
      if (userIndex !== -1) {
        const pass  = bcrypt.hashSync(newPassword, 8);
        users[userIndex].password = pass;
        await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');
        console.log('User password updated');
        return true
      }else{
        console.log("User index not found");
        return false
      }
        
    }catch(err){
      console.log(err);
      throw err;
    }
  }
  
module.exports = {
    fetchData,
    addData,
    updatePassword,
  };