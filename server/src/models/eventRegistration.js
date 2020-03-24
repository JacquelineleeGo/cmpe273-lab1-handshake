const bookshelf = require('./bookshelf');
const StudentProfile = require('./studentProfile');

module.exports = bookshelf.Model.extend({
    tableName: 'event_registration',

    studentProfile(){
        this.hasMany(StudentProfile, "student_profile_id");
    }
})