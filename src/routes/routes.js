var express = require('express');
var router = express.Router();
var webHook =require('../controllers/ciValidController');
var assistant =require('../controllers/wexController');
//var telegram =require('../controllers/canales/telegramController');
//var facebook =require('../controllers/canales/facebookController');

router.post('/funciones', webHook.postValidCi);
router.post('/assistant', assistant.postEnviarMensajeWex);

//CANALES
//router.post('/canales', telegram.postEnviarMensajeWex);
//router.post('/facebook',facebook.postWebhook);
//router.get('/facebook',facebook.getWebhook);
module.exports=router;