const { json } = require('express');
const regHelper = require('../helpers/RegistrationManagementHelper');
const eventModel = require('../models/Event');
const validators = require('../helpers/validators')
const regModel = require('../models/RegistrationRecord');
const eventsHelper = require('../helpers/EventsHelper');
const userHelper = require('../helpers/UserHelper')

var getEventRegistrations = async (req, res) => {

}

var eventRegistration = async (req, res) => {

    const eventId = req.params.eventId;
    const userDetails = req.body;
    const events = await eventsHelper.fetchData();
    const regs = await regHelper.fetchData();
    const users = await userHelper.getUsers();
    const user = await validators.fetchId(users,req.email);
    console.log(user);
    const regId = regs.length + 1;
    const userReg = new regModel.RegistrationRecord(regId, user.id, eventId, userDetails.email, userDetails.contact, "registered")
    if (validators.validateRegistration(userDetails)) {
        try {
            
            if (!validators.regExists(regs, userReg)) {
               
                regHelper.addData(userReg);
                return res.status(200).send("Registration successfully");

               
            } else {
                return res.status(400).send("Already Registered");
            }
        } catch (error) {
            console.log(error)
            return res.status(500).send("error while writing");
        }
    } else {
        return res.status(400).send("enter all the details");
    }

    
    
}
var getRegisteredEvents = async(req, res) => {
    try{
    const users = await userHelper.getUsers();
  
    const userid = await validators.fetchId(users,req.email);
    var eventIds = await regHelper.getEvents(userid);
    const events = await eventsHelper.getEventDetails(eventIds);
    return res.status(200).json({ data:events});
    }catch(ex){
        console.log(ex);
        return res.status(500).send("error while reading");
    }
}
var updateEventRegistration = async (req, res) => {
    const regDetails = req.body;
    const id = req.params.registrationId;
    console.log(regDetails);
    console.log(id);

    if (regDetails.email && regDetails.contact) {
        try {
            const regs = await regHelper.fetchData();
            if (!validators.regIdExists(regs, id)) {
               
                    await regHelper.updateData(id, regDetails);
                    return res.status(200).send("Registration updated successfully");

            } else {
                return res.status(400).send("Registration doesn't exist");
            }
        } catch (error) {
            console.log(error)
            return res.status(500).send("error while writing");
        }
    } else {
        return res.status(400).send("enter all the details");
    }
}
var deleteEventRegistration = async (req, res) => {
    const id = req.params.registrationId;
    const regs = await regHelper.fetchData();
    if(validators.regIdExists(regs, id)){
        await regHelper.deleteData(id);
        return res.status(200).send("registration has been cancelled successfully");
    }
    else{
        return res.status(404).send("Not found");
    }
}

module.exports = {
    getEventRegistrations,
    eventRegistration,
    updateEventRegistration,
    deleteEventRegistration,
    getRegisteredEvents
}