// // This package(google-translate-api) was been cloned from https://github.com/plainheart/google-translate-api due to some hosing issues with this package
try{
const translate = require('google-translate-api');
} catch(err){
const translate = require("@plainheart/google-translate-api")
}
module.exports = async function(query){
translation = await translate(query, {to: 'en'})
return translation.text
}
