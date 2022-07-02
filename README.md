# appointment

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
