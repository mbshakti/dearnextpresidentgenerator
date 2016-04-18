var exports = module.exports = {};
var cloudinary = require('cloudinary');
var twilio = require('twilio');

cloudinary.config({ 
  cloud_name: 'dr7nigfbn', 
  api_key: '549818289114915', 
  api_secret: 'jimG5WlbsJEFEL4iZ0wor9dCN40' 
});

var client = new twilio.RestClient('AC60588fabe3b7b3d0f924885f37c274ac', 'de2fdb66cd0bbe1350dbc6cfbe78dc72');
