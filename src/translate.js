require('dotenv').config()
const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
const apiKey = process.env['apiKey']

if(!apiKey){
  throw Error("No api keyfound for translate, if you dont want to use the file delete it")
}
module.exports = async function(query){
const url = 'https://rapid-translate-multi-traduction.p.rapidapi.com/t';

const options = {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': process.env['apiKey'],
    'X-RapidAPI-Host': 'rapid-translate-multi-traduction.p.rapidapi.com'
  },
  body: `{"from":"hi","to":"en","e":"","q":["${query}"]}`
};


response = await fetch(url, options)
responseJson = await response.json()
translation = responseJson[0]
return translation
}