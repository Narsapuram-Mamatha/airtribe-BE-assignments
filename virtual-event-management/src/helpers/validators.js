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
    const requiredFields = ['name', 'startDate', 'startTime', 'endDate', 'endTime', 'seats', 'category'];

    for (const field of requiredFields) {
        if ((!user[field])) {
            
            console.error(`Error: Missing or invalid ${field} in user details.`);
            return false;
        }
    }

    return true;
}

function isValidDate(dateString) {
    const parsedDate = new Date(dateString);
    return !isNaN(parsedDate) && parsedDate.toISOString().slice(0, 10) === dateString;
}

function isValidTime(timeString) {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(timeString);
}

module.exports = {
    userExists,
    validateUserDetails,
    isValidDate,
    isValidTime
}