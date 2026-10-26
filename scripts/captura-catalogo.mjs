import { chromium } from '@playwright/test';
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
await page.goto('http://127.0.0.1:5173');
await page.evaluate(()=>document.fonts.ready);
await page.locator('.content-grid').screenshot({path:'evidencias/14-detalle-atelier.png'});
await browser.close();
