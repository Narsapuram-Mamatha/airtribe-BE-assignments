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

  async function updateData(id, eventDetails){
    try{
      const data = await fs.readFile(filePath, 'utf-8');
      const events = JSON.parse(data);
      console.log(events[0].id);
      const eventIndex = events.findIndex(event => event.id == id);
      if (eventIndex !== -1) {
        events[eventIndex].name = eventDetails.name;
        events[eventIndex].startDate = eventDetails.startDate;
        events[eventIndex].startTime = eventDetails.startTime;
        events[eventIndex].endDate = eventDetails.endDate;
        events[eventIndex].endTime = eventDetails.endTime;
        events[eventIndex].seats = eventDetails.seats;
        await fs.writeFile(filePath, JSON.stringify(events, null, 2), 'utf-8');
        console.log('User preferences updated');
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

 


async function getEventDetails(eventIds){
  const data = await fs.readFile(filePath, 'utf-8');
    var events = JSON.parse(data);
    console.log(events);
    console.log(eventIds);
    var reqEvents = events.filter(eve => eventIds.includes(eve.id.toString()));
    console.log(reqEvents);
    return reqEvents;
  }
module.exports = {
    fetchData,
    addData,
    updateData,
    getEventDetails,
}