const app = require('./src/app');
async function init(){
    await app.listen((process.env.PORT || 4000));
    console.log('Server on port 4000.')
}

init();