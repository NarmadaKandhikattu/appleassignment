const moment = require("moment");

const greetingsService = {

    calcDaysDifference(date1, date2){
        let timeDiff = (date1 - date2)/1000;    
        let daysDifference = (timeDiff/86400).toFixed(0);
        return (daysDifference);
    },

    getMessage (req, res) {
        var todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);
        
        var inputDate = new Date(todayDate.getFullYear()+"-"+req.dob);
        var daysDifference = greetingsService.calcDaysDifference(inputDate, todayDate);

        if (daysDifference == 0 ) {
            res.send("Hello " + req.firstName + ". Happy Birthday!");
        } else if(daysDifference>=1) {
            res.send("Hello " + req.firstName + ". You have " + daysDifference +" day(s) until your birthday!");
        } else {
            var nextBirthDayYear = todayDate.getFullYear() + 1;
            if (req.dob.substr(0, 2)=="02" && req.dob.substr(3, 4)=="29") {
                while( (nextBirthDayYear%4 != 0) && (nextBirthDayYear%100 != 0) && (nextBirthDayYear%400 != 0) ){
                    nextBirthDayYear = nextBirthDayYea + 1;                    
                }  
            }
            var nextBirdayDate = new Date(nextBirthDayYear+"-"+req.dob);
            daysDifference = greetingsService.calcDaysDifference(nextBirdayDate, todayDate);
            res.send("Hello " + req.firstName + ". You have " + daysDifference +" day(s) until your birthday!");
        }
    },

    getBirthDayGreetings (req, res){
        let userInput = {
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "dob": req.body.DOB
        };
        try {
            // Validate day and month value received in request in valid or not as per current year.
            // 'moment' returns the correct response except given date is 02-29 and current year is not leap year. 
            if ((moment(userInput.dob, "MM-DD", true).isValid()) || (userInput.dob.substr(0,2)==2 && userInput.dob.substr(3,4)<=29)) {
                greetingsService.getMessage(userInput, res);
            }
            else{
                res.status(400).send({"status": 400, "message":"Enter Date of Birth in mm-dd format only"});
            }
        } catch(err) {
           // console.log(err);
            res.status(500).send({"status": 500, "message":"Server Error. Provide input in expected format only."});
        }
    }
};
module.exports = greetingsService;