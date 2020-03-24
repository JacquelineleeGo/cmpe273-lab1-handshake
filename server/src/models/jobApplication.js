const bookshelf = require('./bookshelf');
const StudentProfile = require('./studentProfile');
const Job = require('./job');

// application -- jid and sid

// 1 1
// 1 2
// 2 1
module.exports = bookshelf.Model.extend({
    tableName: 'job_application',
    studentProfile(){
        this.hasMany(StudentProfile, "student_profile_id");
    },
    job(){
        this.hasMany(Job, "job_id");
    }
});