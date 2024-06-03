import { Page } from 'puppeteer'
import { Suburb } from '../models';
import { getAncestry, getCountryOfBirth, getEmploymentStatus, getEmploymentStatusOfCoupleFamilies, getFamilies, getFamilyComposition, getIndustry, getLaborForce, getMedianAge, getMedianIncome, getMedianMortgage, getMedianRent, getMedianWeeklyIncome, getMethodOfTravelToWork, getOccupation, getPopulation, getReligion } from './getters';

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
  const population = await getPopulation(page)
  const families = await getFamilies(page)
  const medianIncome = await getMedianIncome(page)
  const medianMortgage = await getMedianMortgage(page)
  const medianRent = await getMedianRent(page)
  const medianAge = await getMedianAge(page)
  const ancestry = await getAncestry(page)
  const countryOfBirth = await getCountryOfBirth(page)
  const religion = await getReligion(page)
  const laborForce = await getLaborForce(page)
  const employmentStatus = await getEmploymentStatus(page)
  const occupation = await getOccupation(page)
  const industry = await getIndustry(page)
  const medianWeeklyIncome = await getMedianWeeklyIncome(page)
  const methodOfTravelToWork = await getMethodOfTravelToWork(page)
  const familyComposition = await getFamilyComposition(page)
  const employmentStatusOfCoupleFamilies = await getEmploymentStatusOfCoupleFamilies(page)

  const suburb = new Suburb(
    areacode,
    fullTitle || '',
    population,
    families,
    medianIncome,
    medianMortgage,
    medianRent,
    medianAge,
    ancestry,
    countryOfBirth,
    religion,
    laborForce,
    employmentStatus,
    occupation,
    industry,
    medianWeeklyIncome,
    methodOfTravelToWork,
    familyComposition,
    employmentStatusOfCoupleFamilies,
  )

  return suburb
}
