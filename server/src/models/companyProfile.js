const bookshelf = require("./bookshelf");
const Job = require("./job");
const Event = require("./event");
const User = require("./user");

module.exports = bookshelf.Model.extend({
  tableName: "company_profile",
  user(){
    this.belongsTo(User, "user_id");
  }, 
  job(){
    this.hasMany(Job, "company_profile_id");
  },
  event(){
    this.hasMany(Event, "company_profile_id")
  }
});