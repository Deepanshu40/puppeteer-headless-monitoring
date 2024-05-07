const express  = require('express');
const app = express();
const port = 8080;
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const checkPath = (pathToCheck) => {
    try {
        // Check if the file exists in the given path
        if (fs.existsSync(pathToCheck)) {
            console.log(`Found at: ${pathToCheck}`);
        } else {
            console.log(`Not found: ${pathToCheck}`);
        }
    } catch (err) {
        console.error('Error checking path:', err);
    }
};

// Use this function in your Puppeteer setup code

// app.get('/list-files', (req, res) => {
    const directoryPath = '/opt/render/.cache/puppeteer/chrome/linux-124.0.6367.91';

        fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.log('Error getting directory information.', err);
            // return res.status(500).send('Failed to read directory');
        }

        console.log(files);
    });
// });

const chromiumPath = '/opt/render/.cache/puppeteer/chrome/linux-124.0.6367.91/chrome';
checkPath(chromiumPath);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

const puppeteerSession = async () => {
    try {
        const browserInstance = await puppeteer.launch({
            headless:true,
            executablePath: '/opt/render/.cache/puppeteer/chrome/linux-124.0.6367.91/chrome.exe',
        });
        const page = await browserInstance.newPage();
        await page.goto('https://en.wikipedia.org/wiki/Ram_Charan', { waitUntil: 'networkidle0' });
        const items = await page.evaluate(() => {
            const paragraphs = Array.from(document.querySelectorAll('p')); // Convert NodeList to Array
            return paragraphs.map(p => p.innerText); // Map over the array to return innerText of each paragraph
        });
        console.log(items.length);
        
    
    } catch(err) {
    console.log(err);
    }
}

// puppeteerSession();
