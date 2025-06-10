const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
    const page = await browser.newPage();

    const urls = fs.readFileSync('urls.txt', 'utf-8').split('\n').filter(Boolean);

    for (const url of urls) {
        console.log(`Warming cache for: ${url}`);
        try {
            await page.goto(url, { waitUntil: 'networkidle2' });
        } catch (err) {
            console.error(`Failed to visit ${url}:`, err.message);
        }
    }

    await browser.close();
})();