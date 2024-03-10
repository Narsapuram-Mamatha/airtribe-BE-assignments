const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, '../../data/Users.json');
function getUsers() {
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

async function addUser(newUser) {
  try {
    const existingContent = await fs.readFile(filePath, 'utf-8');
    const existingUsers = JSON.parse(existingContent);
    existingUsers.push(newUser);
    
    await fs.writeFile(filePath, JSON.stringify(existingUsers, null, 2), 'utf-8');
    console.log('User appended to file.');
  } catch (error) {
    console.error('Error appending user to file:', error);
    throw error;
  }
}



module.exports = {
  getUsers, addUser,
};