require('dotenv').config()
// This package(google-translate-api) was been cloned from https://github.com/plainheart/google-translate-api due to some hosing issues with this package
const translate = require('./google-translate-api');



module.exports = async function(query){
translation = await translate(query, {to: 'en'})
return translation.text
}
