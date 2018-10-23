var mongoose = require('mongoose');


var rx_drugbank_data = mongoose.Schema({
    // dbca_id: mongoose.Schema.Types.ObjectId,
    dbca_drug_name: String,
    dbca_drug_description: mongoose.Schema.Types.Mixed,
    dbca_created_date: Date
})


module.exports = mongoose.model('dbca_data', rx_drugbank_data, ' drugbank_ca_data');
