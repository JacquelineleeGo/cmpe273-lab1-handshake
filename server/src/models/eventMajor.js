const bookshelf = require('./bookshelf');
const CompanyProfile = require('./companyProfile');

module.exports = bookshelf.Model.extend({
    tableName: 'event_major'
})