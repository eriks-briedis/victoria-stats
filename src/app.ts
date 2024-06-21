import puppeteer from 'puppeteer';
import { getSuburbData } from './suburb';

export const App = async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    ignoreDefaultArgs: ['--disable-extensions'],
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  const BASE_URL = 'https://www.abs.gov.au/census/find-census-data/quickstats/2021/SAL'
  const FIRST = 20002
  const LAST = 20002
  // const FIRST = 20001
  // const LAST = 22944

  console.log('Starting...')
  await page.setViewport({ width: 1080, height: 1024 });

  for (let i = FIRST; i <= LAST; i++) {
    const suburb = await getSuburbData(page, `${BASE_URL}${i}`, `SAL${i}`)

    // // Print the full title
    console.log(suburb);
  }

  await browser.close();
}
