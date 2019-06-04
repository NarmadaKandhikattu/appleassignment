const greetingsService = require('./services.js');
module.exports = (app)=>{

    // Route returns birthday greetings and tells number of days unitl for next birthday
    app.post('/api/greetings', (req, res)=>{
        greetingsService.getBirthDayGreetings(req, res);
    });
    
};