## Project description:
- In this project, I have tried to write a code for people who have problems in getting an appointment at the Dutch Embassy in Iran.

## How it works:
- In the code, you put your personal information instead of the information provided as an example and also you will enter your desired date. after that you should add a cronjob on your system or your server for runing this code for every 2 minutes. when you start to runing code, this code will try to find a appointment time for you and if it finds an empty time slot on the date you want, it will book it and save a screenshot of the booked appointment information for you in the system.

## setup project by this commands
- npm int(run this command in your project folder)
- npm install selenium-webdriver
- npm install mocha
- npm install chai
- npm install chromedriver --chromedriver_version=LATEST


## edit package.json file
- open package.json and edit this line
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
  
 to this:
 
 "scripts": {
    "test": "mocha MakeApponitment.js"
  }


## run file
- for run file run this command: npm test
