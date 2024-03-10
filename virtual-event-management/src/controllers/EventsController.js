const { json } = require('express');
const eventsHelper = require('../helpers/EventsHelper');
const eventModel = require('../models/Event');
const { validateUserDetails } = require('../helpers/validators');
var getEvents = async (req, res) => {
    const organizers = await eventsHelper.fetchData();

    if (organizers) {
        return res.status(200).json({ data: organizers });
    } else {
        return res.status(200).send("No events exist");
    }

}
var addEvent = async (req, res) => {
    const event = new eventModel.User(req.body.name, req.body.startDate, req.body.startTime, req.body.endDate, req.body.endTime, req.body.seats, req.body.category);
    console.log(event);
    if (validators.validateEventDetails(event)) {
        try {
            const events = await eventsHelper.fetchData();
            if (!validators.eventExists(events, event.name)) {
                if (validators.isValidDate(event.startDate) && validators.isValidDate(event.endDate)) {
                    
                    eventsHelper.addData(event);
                    return res.status(200).send("Organizer added successfully");

                }
                else {
                    return res.status(400).send("enter the correct date format");
                }

            } else {
                return res.status(400).send("organizer already exists");
            }
        } catch (error) {
            return res.status(500).send("error while writing");
        }
    } else {
        return res.status(400).send("enter all the details");
    }
}
var updateEvent = async (req, res) => {

}
var getEventRegistrations = async (req, res) => {

}
var getAvailableEvents = async (req, res) => {

}
var eventRegistration = async (req, res) => {

}

var updateEventRegistration = async (req, res) => {

}
var deleteEventRegistration = async (req, res) => {

}

module.exports = {
    getEvents,
    addEvent,
    updateEvent,
    getEventRegistrations,
    getAvailableEvents,
    eventRegistration,
    updateEventRegistration,
    deleteEventRegistration
}