const bookshelf = require('./bookshelf');
const CompanyProfile = require('./companyProfile');

module.exports = bookshelf.Model.extend({
    tableName: "job",
    companyProfile(){
        this.belongsTo(CompanyProfile, 'company_profile_id');
    }
})