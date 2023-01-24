require('dotenv').config()
const translate = require('@plainheart/google-translate-api');



module.exports = async function(query){
translation = await translate(query, {to: 'en'})
return translation.text
}
