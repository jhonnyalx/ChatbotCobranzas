const app = require('./src/app');
var fs = require('fs');
var https = require('https');


const privateKey  = fs.readFileSync('921937496d308be.pem','utf8');
const certificate =fs.readFileSync('921937496d308be.crt','utf8');

const credentials = {key: privateKey, cert: certificate};

https.createServer({
    credentials
}, app).listen((process.env.PORT || 4000), function(){
    console.log("My https server listening on port ")});
