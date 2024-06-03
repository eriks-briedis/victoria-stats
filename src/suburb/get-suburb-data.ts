import { Page } from 'puppeteer'
import { Suburb } from '../models';
import { getAncestry, getCountryOfBirth, getDwellingCount, getDwellingStructure, getEmploymentStatus, getEmploymentStatusOfCoupleFamilies, getFamilies, getFamilyComposition, getHouseholdComposition, getHouseholdIncome, getIndustry, getLaborForce, getMedianAge, getMedianIncome, getMedianMortgage, getMedianRent, getMedianWeeklyIncome, getMethodOfTravelToWork, getMortgageMonthlyPayment, getNumberOfBedrooms, getNumberOfVehicles, getOccupation, getPopulation, getReligion, getRentWeeklyPayment, getTenureType } from './getters';

export const getSuburbData = async (page: Page, url: string, areacode: string) => {
  // Navigate the page to a URL
  console.info(`Navigating to ${url}`)
  await page.goto(`${url}`);

  // Locate the full title with a unique string
  console.info('Waiting for title...')
  const textSelector = await page.waitForSelector(
    'h1'
  );
  const fullTitle = await page.evaluate(el => el?.textContent, textSelector)
  const tableView = (await page.$('#tablesView')) || '';

  if (!tableView) {
    return
  }

  console.info('Getting data...')

  const suburb = new Suburb(
    areacode,
    fullTitle || '',
    await getPopulation(page),
    await getFamilies(page),
    await getMedianIncome(page),
    await getMedianMortgage(page),
    await getMedianRent(page),
    await getMedianAge(page),
    await getAncestry(page),
    await getCountryOfBirth(page),
    await getReligion(page),
    await getLaborForce(page),
    await getEmploymentStatus(page),
    await getOccupation(page),
    await getIndustry(page),
    await getMedianWeeklyIncome(page),
    await getMethodOfTravelToWork(page),
    await getFamilyComposition(page),
    await getEmploymentStatusOfCoupleFamilies(page),
    await getDwellingCount(page),
    await getDwellingStructure(page),
    await getNumberOfBedrooms(page),
    await getNumberOfVehicles(page),
    await getHouseholdComposition(page),
    await getTenureType(page),
    await getHouseholdIncome(page),
    await getRentWeeklyPayment(page),
    await getMortgageMonthlyPayment(page),
  )

  return suburb
}
