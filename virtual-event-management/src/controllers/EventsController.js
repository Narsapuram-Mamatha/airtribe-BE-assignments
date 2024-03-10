const { json } = require('express');
const eventsHelper = require('../helpers/EventsHelper');
const eventModel = require('../models/Event');
const validators = require('../helpers/validators')
const regHelper = require('../helpers/RegistrationManagementHelper');
var getEvents = async (req, res) => {
    const organizers = await eventsHelper.fetchData();

    if (organizers) {
        return res.status(200).json({ data: organizers });
    } else {
        return res.status(200).send("No events exist");
    }

}
var addEvent = async (req, res) => {
    const events = await eventsHelper.fetchData();
    const idNum = events.length + 1;
    const event = new eventModel.Event( idNum, req.body.name, req.body.startDate, req.body.startTime, req.body.endDate, req.body.endTime, req.body.seats, req.body.category);
    console.log(event);
    if (validators.validateEventDetails(event)) {
        try {
            
            if (!validators.eventExists(events, event.name)) {
                if (validators.isValidDate(event.startDate) && validators.isValidDate(event.endDate)) {
                    
                     eventsHelper.addData(event);
                    return res.status(200).send("Event added successfully");

                }
                else {
                    return res.status(400).send("enter the correct date format");
                }

            } else {
                return res.status(400).send("Event already exists");
            }
        } catch (error) {
            console.log(error)
            return res.status(500).send("error while writing");
        }
    } else {
        return res.status(400).send("enter all the details");
    }
}


var updateEvent = async (req, res) => {
    const eventDetails = req.body;
    const id = req.params.eventId;
    console.log(eventDetails);
    console.log(id);

    if (validators.validateEventDetails(eventDetails)) {
        try {
            const events = await eventsHelper.fetchData();
            if (!validators.eventExists(events, eventDetails.name)) {
                if (validators.isValidDate(eventDetails.startDate) && validators.isValidDate(eventDetails.endDate)) {
                    
                    await eventsHelper.updateData(id, eventDetails);
                    return res.status(200).send("Event updated successfully");

                }
                else {
                    return res.status(400).send("enter the correct date format");
                }

            } else {
                return res.status(400).send("Event already exists");
            }
        } catch (error) {
            console.log(error)
            return res.status(500).send("error while writing");
        }
    } else {
        return res.status(400).send("enter all the details");
    }
    
}
var getAvailableEvents = async (req, res) => {
    var events = await eventsHelper.fetchData();
    console.log(events);
    const today = new Date();   
    events = events.filter(event => new Date(event.startDate) > today);
    
    events = events.filter(event => event.seats > regHelper.getParticipantsCount(event.Id))
    if (events) {
        return res.status(200).json({ data: events });
    } else {
        return res.status(200).send("No events exist");
    }
}

module.exports = {
    getEvents,
    addEvent,
    updateEvent,
    getAvailableEvents,
}