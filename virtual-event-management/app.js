const express = require('express');
const app = express();
const port = 3000;
const authController = require('./src/controllers/AuthController')
const adminController = require('./src/controllers/AdminController')
const eventsController = require('./src/controllers/EventsController')
const organizerController = require('./src/controllers/OrganizersController')
const verifyToken =  require('./src/authJWT');
const { verify } = require('jsonwebtoken');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', async (req, res) => {
   return res.status(200).send("Hello!!")
});

//Authentication Endpoints
app.post('/auth/signup', authController.signup);
app.post('/auth/login', authController.login);

// Admin Endpoints
app.get('/admin/organizers', verifyToken.verifyAdmin, adminController.getOrganizers);
app.post('/admin/organizers', verifyToken.verifyAdmin, adminController.addOrganizer);


// Event Endpoints Organizer
app.put('/organizers/password', verifyToken.verifyOrganizer, organizerController.updatePassword);
app.get('/organizers/events', verifyToken.verifyOrganizer, eventsController.getEvents);
app.post('/events', verifyToken.verifyOrganizer, eventsController.addEvent);
app.put('/events/:eventId', verifyToken.verifyOrganizer, eventsController.updateEvent);

app.get('/events/:eventId/registrations', verifyToken.verifyOrganizer, eventsController.getEventRegistrations);

// Event Endpoints User
app.get('/users/events', verifyToken.verifyUser, eventsController.getAvailableEvents);
app.post('/events/:eventId/registration', verifyToken.verifyUser, eventsController.eventRegistration);
app.put('/events/:eventId/registrations/:registrationId', verifyToken.verifyUser, eventsController.updateEventRegistration);
app.delete('/events/:eventId/registrations/:registrationId', verifyToken.verifyUser, eventsController.deleteEventRegistration);


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;