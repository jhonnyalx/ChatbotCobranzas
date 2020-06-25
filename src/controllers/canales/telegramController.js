const TelegramBot = require('node-telegram-bot-api');
var credencialesWex=require("../../credentials/credentialsApis");
const bot = new TelegramBot(credencialesWex.Telegram.key, {polling: true});
var Request = require("request");
var idUsuarioTelegram="970689129";//telegram holger

//Telegram
bot.on('message',msg => {
    console.log(msg)
     conexionOrquestador(msg);
  });

async function conexionOrquestador(msg){
    Request.post({
        "headers": { "content-type": "application/json" },
        "url": "http://localhost:4000/assistant/assistant",
        "body": JSON.stringify({
            "text": msg.text,
            "id": msg.chat.id
        })
    }, async(error, response, body) => {
        if(error) {
            console.log("error");
            return console.dir(error);
        }
        var result=await JSON.parse(body).result;
        var intents=result.intents;
        var output=result.output;
        for(var i in output.generic){
            if(output.generic[i].response_type=="text"){
                console.log(output.generic[i].text);
                if(intents.length>0){
                for(var j in intents){
                    if(intents[j].intent=="General_Connect_to_Agent"){
                        bot.sendMessage(idUsuarioTelegram,"Hola se requiere atencion a @"+msg.chat.username);
                    }
                }
            }
                await bot.sendMessage(msg.chat.id, output.generic[i].text);
            }else if(output.generic[i].response_type=="option"){
                let replyOptions = {
                    reply_markup: {
                        resize_keyboard: true,
                        one_time_keyboard: true,
                        keyboard: [],
                    },
                };
                
                for(var j in output.generic[i].options){
                    replyOptions.reply_markup.keyboard.push([output.generic[i].options[j].label]);
                }
               await  bot.sendMessage(msg.chat.id, output.generic[i].title,replyOptions);
            }
        }
    });

}
  