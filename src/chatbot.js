require("dotenv").config()

if(!process.env['bid'] || !process.env['key']){
    throw Error("There must a valid bid and key value in .env, refer to readme.md for more info!")
}

async function chat(message, id){
try{
response = await (await fetch(`http://api.brainshop.ai/get?bid=${process.env['bid']}&key=${process.env['key']}&uid=${id}&msg=${message}`)).json()
response = response.cnt.replace("Aco", "ChatBot")
return response
} catch(err){
    console.log(err);
    console.log(response);
    return "Something went wrong. Error by Chatbot. it has been recorded in the console"

}

}


module.exports = chat