const adminHelper = require('../helpers/AdminHelper');

const updatePassword = async (req, res) => {
    try {
        const id = req.email;
        const newPassword = req.body.password;
console.log(newPassword);
        const updateResult = await adminHelper.updatePassword(id, newPassword);

        if (updateResult) {
            return res.status(200).send("Password updated successfully");
        } else {
            return res.status(404).send("User not found");
        }
    } catch (error) {
        console.error('Error while updating password:', error);
        return res.status(500).send("Error while updating password");
    }
};


module.exports ={
    updatePassword,
}