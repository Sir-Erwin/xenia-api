//models/user.js
//contains a model of a User
class User {
    constructor(username, email, nameofuser, address, city, zipcode, state, skills, availability) {
      this.username = username;
      this.email = email;
      this.nameofuser = nameofuser;
      this.address = address;
      this.city = city;
      this.zipcode = zipcode;
      this.state = state;
      this.skills = skills;
      this.availability = availability;
    }
  }
  
  module.exports = User;
