const userHelper = require('../helpers/UserHelper')
var getPreferences = (req, res) => {
    if (req.email) {
       
        return res.status(200).json({
            preferences: req.preferences});
    }
    else {
        return res.status(401).send({
            message: req.message
        });
    }
}
var updatePreferences = (req, res) => {
    var newPreferences = req.body.preferences;
    var email = req.body.email;
    if (
        userHelper.updateUserPreferences(email, newPreferences)) {

        console.log('Update successful!');
        res.status(200).send('Update successful');
    }
    else {
        console.error('Update failed:', err);
        res.send(500).status("Error while Updare: " + err)
    }
}
module.exports = {
    getPreferences,
    updatePreferences,
}