const bookshelf = require("./bookshelf");
const ProfileBasic = require("./basicProfile");
const ProfileEducation = require("./educationProfile");
const ProfileExperience = require("./experienceProfile");
const JobApplication = require("./jobApplication");
const User = require("./user");

module.exports = bookshelf.Model.extend({
  tableName: "student_profile",
  user(){
    return this.belongsTo(User, 'user_id');
  },
  profileBasic() {
    return this.hasOne(ProfileBasic, 'student_profile_id');
  },
  profileEducation() {
    return this.hasOne(ProfileEducation, 'student_profile_id');
  },
  profileExperience() { 
    return this.hasMany(ProfileExperience, 'student_profile_id');
  },
  jobApplication(){
    return this.hasMany(JobApplication, 'job_id')
  }
}, 
{
    dependents: ['profileBasic', "profileEducation", "profileExperience"]
},

);

  // user: function() {
  //   return this.belongsTo(User);
  // },
  // profileBasic: function(){
  //   return this.hasOne(ProfileBasic);
  // }