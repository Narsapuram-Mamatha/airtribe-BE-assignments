function userExists(users, email) {
    try {
        for (const userKey in users) {
          if (users[userKey].email === email) {
            return true;
          }
        }
        return false;
    } catch (error) {
        console.error('Error checking if user exists:', error);
        throw error;
    }
    
}

function validateUserDetails(user) {
    const requiredFields = ['name', 'email', 'password', 'preferences'];

    for (const field of requiredFields) {
        if ((!user[field])) {
            
            console.error(`Error: Missing or invalid ${field} in user details.`);
            return false;
        }
    }

    return true;
}

module.exports = {
    userExists,
    validateUserDetails,
}