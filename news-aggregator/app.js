const express = require('express');
const app = express();
const port = 3000;
const authController = require('./src/controllers/authController')
const userController = require('./src/controllers/userController')
const newsController = require('./src/controllers/newsController')
const verifyToken =  require('./src/authJWT')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', async (req, res) => {
   return res.status(200).send("Hello!!")
});

app.post('/users/signup', authController.signup);

app.post('/users/login', authController.login)

app.get('/users/preferences', verifyToken.verifyToken, userController.getPreferences);

app.put('/users/preferences', verifyToken.verifyToken, userController.updatePreferences);

app.get('/news', verifyToken.verifyToken, newsController.getNews);

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;