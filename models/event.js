// models/event.js

class Event {
    constructor(title, description, date) {
      this.title = title;
      this.description = description;
      this.date = date;
      this.attendees = [];
    }
  }
  
  module.exports = Event;
  
