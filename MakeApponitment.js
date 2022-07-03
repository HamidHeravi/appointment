const { By, Builder, until } = require("selenium-webdriver");
const { assert } = require('chai');
require('chai').should();
chrome = require('selenium-webdriver/chrome');
let screen = {
    width: 1920,
    height: 1080
  };


describe("make an appointment", function () {
    this.timeout(50000);

    after('Tear down', async function () {
        await driver.quit();
      });


    it('open website and select appointment type', async function(){
        driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().windowSize(screen)).build();
        await driver.get('https://www.vfsvisaonline.com/Netherlands-Global-Online-Appointment_Zone2/AppScheduling/AppWelcome.aspx?P=Y83R/PGUiM5WxqKHxt0UdPpZ6gYbP6R8WaUj23z35vc=');
        await driver.wait(until.elementLocated(By.xpath('//a[@id="plhMain_lnkSchApp"]')), 20000);
        await driver.findElement(By.xpath('//a[@id="plhMain_lnkSchApp"]')).click();
        await driver.wait(until.elementLocated(By.xpath('//table[@id="plhMain_tbl"]')), 20000);
        // select Legalisation of a signature
        await driver.findElement(By.xpath('//select[@id="plhMain_cboVisaCategory"]/option[contains(text(), "MVV – visa for long stay (>90 days)")]')).click();
        await driver.findElement(By.xpath('//input[@name="ctl00$plhMain$btnSubmit"]')).click(); // click on the continue button
        await driver.wait(until.elementLocated(By.xpath('//table[@id="Maintable"]')), 20000);
    });

    it('enter Applicant Details', async function() {
        // select gender
        await driver.findElement(By.xpath('//select[@id="plhMain_repAppVisaDetails_cboTitle_0"]/option[contains(text(), "MR.")]')).click();
        await driver.findElement(By.xpath('//input[@id="plhMain_repAppVisaDetails_tbxFName_0"]')).sendKeys('ALI'); //first name
        await driver.findElement(By.xpath('//input[@id="plhMain_repAppVisaDetails_tbxLName_0"]')).sendKeys('ABAZARU'); //family name
        await driver.findElement(By.xpath('//input[@id="plhMain_repAppVisaDetails_tbxContactNumber_0"]')).sendKeys('09008782212'); //phone number
        await driver.findElement(By.xpath('//input[@id="plhMain_repAppVisaDetails_tbxEmailAddress_0"]')).sendKeys('test@gmail.com'); //email
        // confirm statement
        await driver.findElement(By.xpath('//select[@id="plhMain_cboConfirmation"]/option[contains(text(), "I confirm the above statement")]')).click();
        // click on the continue button
        await driver.findElement(By.xpath('//input[@name="ctl00$plhMain$btnSubmit"]')).click();
    });

    it('select date from date picker', async function() {
        let month = await driver.wait(until.elementLocated(By.xpath('(//td[contains(text(), "2022")])[2]')), 20000).getText();
        if(month=='June 2022' || month=='July 2022' || month=='August 2022') {
            const days = await driver.wait(until.elementsLocated(By.xpath('//td[@class="OpenDateAllocated"]')), 10000);
            if (typeof(days) != 'object')
            {
            assert.fail('there is not any day to select');  // Exists.
            }
            let num = (days.length)-1
            await days[num].click();
        }
        else {
            assert.fail('the month is out of range');
        }
        
    });

    it('select time', async function() {
        await driver.wait(until.elementLocated(By.xpath('//span[@id="plhMain_lblSchAppDt"]')));
        const times = await driver.wait(until.elementsLocated(By.xpath('//td/a')), 20000);
        await times[0].click();
        await driver.wait(until.alertIsPresent(), 3000); // Wait for the alert to be displayed
        let alert = await driver.switchTo().alert(); // Store the alert in a variable
        await alert.accept(); //Press the OK button
        await driver.wait(until.elementLocated(By.xpath('//span[@id="lblAppInfo"][contains(text(), "Appointment Information")]')));
    });

    it('take screenshot', async function() {
        await driver.wait(until.elementLocated(By.xpath('//table[@id="dgApplett"]')));

        await driver.takeScreenshot().then(
            function(image) {
                require('fs').writeFileSync('captured_image_3.png', image, 'base64');
            }
        );
    });


});