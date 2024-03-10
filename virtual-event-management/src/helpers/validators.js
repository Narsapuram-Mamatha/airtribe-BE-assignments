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
function eventExists(events, eventName) {
    try {
        for (const event in events) {
          if (events[event].name === eventName) {
            return true;
          }
        }
        return false;
    } catch (error) {
        console.error('Error checking if event exists:', error);
        throw error;
    }
    
}

function regIdExists(regs, regId) {
    try {
        console.log(regs)
        console.log(regId)
        for (const reg in regs) {
          if (regs[reg].regid == regId) {
            return true;
          }
        }
        return false;
    } catch (error) {
        console.error('Error checking if event exists:', error);
        throw error;
    }
    
}
function validateUserDetails(user) {
    const requiredFields = ['name', 'email', 'password', 'role'];

    for (const field of requiredFields) {
        if ((!user[field])) {
            
            console.error(`Error: Missing or invalid ${field} in user details.`);
            return false;
        }
    }

    return true;
}
function validateEventDetails(user) {
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

function validateRegistration(userDetails){
    const requiredFields = ['email', 'contact'];

    for (const field of requiredFields) {
        if ((!userDetails[field])) {
            
            console.error(`Error: Missing or invalid ${field} in user details.`);
            return false;
        }
    }

    return true;
}
function regExists(regs, userReg){
    
    console.log(userReg.eventid);
    const regEvents = regs.filter(re => re.eventid == userReg.eventid)
    console.log(regEvents)
    try {
        for (const reg in regEvents) {
          if (regs[reg].email === userReg.email) {
            return true;
          }
        }
        return false;
    } catch (error) {
        console.error('Error checking if user exists:', error);
        throw error;
    }
}


function fetchId(users, email) {
    try {
        for (const userKey in users) {
          if (users[userKey].email == email) {
            return users[userKey].id;
          }
        }
        return undefined;
    } catch (error) {
        console.error('Error checking if user exists:', error);
        throw error;
    }
    
}


module.exports = {
    userExists,
    validateUserDetails,
    validateEventDetails,
    isValidDate,
    isValidTime,
    eventExists,
    validateRegistration,
    regExists,
    fetchId,
    regIdExists,
}