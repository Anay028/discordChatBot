let translate;
try{
translate = require("@plainheart/google-translate-api")
} catch(err){
translate = require('google-translate-api')
}
module.exports = async function(query){

    try{
translation = await translate(query, {to: 'en'})
    } catch (err){
        console.error(err)
return {
    success: false,
    error: err
}
    }
return {
    success: true,
    error: false,
    translation: translation.text,
}
}
