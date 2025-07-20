const { chromium } = require('playwright');

const seeds = Array.from({ length: 10 }, (_, i) => 27 + i);

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    let totalSum = 0;

    for (const seed of seeds) {
        const url = `https://scoring.ds.study.iitm.ac.in/qauto/table.html?seed=${seed}`;
        await page.goto(url);
        const numbers = await page.$$eval('table td', cells =>
            cells.map(cell => parseFloat(cell.textContent.replace(/,/g, '').trim())).filter(v => !isNaN(v))
        );
        const seedSum = numbers.reduce((a, b) => a + b, 0);
        console.log(`Seed ${seed}: ${seedSum}`);
        totalSum += seedSum;
    }

    console.log(`TOTAL SUM: ${totalSum}`);
    await browser.close();
})();
