
class RegistrationRecord {
    constructor(regid,userid,eventid , email, contact, status) {
      this.regid = regid;
      this.userid = userid;
      this.eventid = eventid;
      this.email = email;
      this.contact = contact;
      this.status = status;
    }
   
  }
  
  module.exports = {
    RegistrationRecord,
  };