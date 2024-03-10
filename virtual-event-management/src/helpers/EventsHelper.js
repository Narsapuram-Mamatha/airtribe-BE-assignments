const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, '../../data/Events.json');
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
      const existingEvents = JSON.parse(existingContent);
      existingEvents.push(newData);
      
      await fs.writeFile(filePath, JSON.stringify(existingEvents, null, 2), 'utf-8');
      console.log('Event appended to file.');
    } catch (error) {
      console.error('Error appending user to file:', error);
      throw error;
    }
  }


module.exports = {
    fetchData,
    addData,
}