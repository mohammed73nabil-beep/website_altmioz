const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        
        page.on('console', msg => {
            if (msg.type() === 'error') {
                console.log('CONSOLE ERROR:', msg.text());
            }
        });
        
        page.on('pageerror', error => {
            console.log('PAGE EXCEPTION:', error.message);
        });

        await page.goto('http://127.0.0.1:8000', { waitUntil: 'networkidle2' });
        await browser.close();
    } catch (e) {
        console.error('SCRIPT ERROR:', e);
    }
})();
