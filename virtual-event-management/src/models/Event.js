class Event {
    constructor(name, startDate, startTime, endDate, endTime, seats, category) {
      this.name = name;
      this.startDate = startDate;
      this.startTime = startTime;
      this.endDate = endDate;
      this.endTime = endTime;
      this.seats = seats;
this.category = category;
    }
   
    
  }
  
  module.exports = {
    Event,
  };