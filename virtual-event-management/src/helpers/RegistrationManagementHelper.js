const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, '../../data/EventsRegistrations.json');
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
    console.log(newData)
    existingEvents.push(newData);

    await fs.writeFile(filePath, JSON.stringify(existingEvents, null, 2), 'utf-8');
    console.log('Event appended to file.');
  } catch (error) {
    console.error('Error appending user to file:', error);
    throw error;
  }
}

async function getEvents(id) {
  console.log(id);
  return fs.readFile(filePath, 'utf-8')
    .then(data => {
      var users = JSON.parse(data);
      users = users.filter(r => r.userid == id);
      const eventIds = users.map(user => user.eventid);
      console.log(eventIds);
      return eventIds;
    })
    .catch(error => {
      console.error('Error reading or parsing users data:', error);
      throw error;
    });
}


async function updateData(id, regDetails) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const regs = JSON.parse(data);
    console.log(regs[0].regid);
    const regIndex = regs.findIndex(re => re.regid == id);
    if (regIndex !== -1) {
      regs[regIndex].email = regDetails.email;
      regs[regIndex].contact = regDetails.contact;
      await fs.writeFile(filePath, JSON.stringify(regs, null, 2), 'utf-8');
      console.log('User preferences updated');
      return true
    } else {
      console.log("User index not found");
      return false
    }

  } catch (err) {
    console.log(err);
    throw err;
  }
}


async function getParticipantsCount(eventId) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    var regs = JSON.parse(data);
    regs = regs.filter(re => re.eventid === eventId);
    return regs.length;

  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function deleteData(regId) {

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    let regs = JSON.parse(data);
    const regIndex = regs.findIndex(re => re.regid == regId);
    if (regIndex !== -1) {

      regs.splice(regIndex, 1);


      await fs.writeFile(filePath, JSON.stringify(regs, null, 2), 'utf-8');

      return { success: true, message: 'Registration deleted successfully' };
    }

    return { success: false, message: 'Registration not found' };
  } catch (error) {
    console.error('Error deleting registration:', error);
    return { success: false, message: 'Internal server error' };
  }
}
module.exports = {
  fetchData,
  addData,
  getEvents,
  updateData,
  getParticipantsCount,
  deleteData,
}