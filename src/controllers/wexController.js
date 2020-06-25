const controllerWatson={};
var credencialesWex=require("../credentials/credentialsApis");
var watson= require('ibm-watson/assistant/v1');
const storage = require('node-sessionstorage')
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new watson({
    version: '2020-04-01',
    authenticator: new IamAuthenticator({
      apikey: credencialesWex.WatsonAssistant.wconv_apikey,
    }),
    url: credencialesWex.WatsonAssistant.wconv_url
  });
  controllerWatson.postEnviarMensajeWex =async(req,res)=>{  
    const {text,id}=req.body;
    var context=null;
    if(storage.getItem(id)!=undefined){
      context=storage.getItem(id);
    };
    res.send(await consultaWatson(text,context,id));
  }
  async function consultaWatson(mensaje,contexto,id){
    var conversacion = await assistant.message({
      workspaceId: credencialesWex.WatsonAssistant.wconv_workspaceId,
      input: {'text': mensaje},
      context:contexto
    }); 
    storage.setItem(id, conversacion.result.context)
    //req.session.context=conversacion.context;
    return conversacion;
  }

  module.exports=controllerWatson;