const bookshelf = require('./bookshelf');
const CompanyProfile = require('./companyProfile');
const EventMajor = require('./eventMajor');

module.exports = bookshelf.Model.extend({
    tableName: 'event',
    companyProfile(){
        this.belongsTo(CompanyProfile, 'company_profile_id');
    },
    eventMajor(){
        this.hasOne(EventMajor, 'event_major');
    }
})