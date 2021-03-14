const puppeteer = require('puppeteer');


async function scrapeBuilds(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Lines 10-12 is for the image before the title or you can swap them around to however you'd like.
    // You will need to get the src element @id="landingImage on line 11 and replace it by copying the Xpath. Do not copy Full XPath unless this line is giving you problems.
    const [el] = await page.$x('//*[@id="landingImage"]');
    const src = await el.getProperty('src');
    const srcTxt = src.jsonValue();

    // el2 is the second element which can be used for a title as seen on line 16. Replace [@id="productTitle"] just like you did on line 11
    const [el2] = await page.$x('//*[@id="productTitle"]');
    const txt2 = await el2.getProperty('textContent');
    const rawTxt2 = await txt2.jsonValue();

    // el3 is the second element which can be used for a content as seen on line 16. Replace [@id="certified-refurbished-version"]/div/div/div[2]/span[1] just like you did on line 11 & & 16
    const [el3] = await page.$x('//*[@id="certified-refurbished-version"]/div/div/div[2]/span[1]');
    const txt3 = await el3.getProperty('textContent', '<p>');
    const rawTxt3 = await txt3.jsonValue();

    console.log({srcTxt, rawTxt2, rawTxt3});

    browser.close();

}

// Replce the URL with the url to the page you are scraping from
scrapeBuilds('https://www.amazon.com/GIGABYTE-B450M-DS3H-Ryzen-Motherboard/dp/B07FWVJSHC/?_encoding=UTF8&pd_rd_w=Ub8Ik&pf_rd_p=de0c3fe6-321f-473e-bef6-6a700af423d3&pf_rd_r=6HGSJT676F1X97XRBKM9&pd_rd_r=23f5ea35-a011-46c1-9b1b-7b49b592cb0c&pd_rd_wg=opke0&ref_=pd_gw_trq_rep_sims_gw');

// Follow my twitter account at https://twitter.com/icuemike for quesitons and answers or post in the issues section here
