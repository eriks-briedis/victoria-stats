import { Page } from 'puppeteer'
import { formatCurrency, formatNumber, formatPercentage, getElementContent, getTableData } from '../utils'

export const getPopulation = async (page: Page) => {
  const population = await getElementContent(page, '#summary-container .qsPeople .strongRow td')

  return formatNumber(population)
}

export const getFamilies = async (page: Page) => {
  const families = await getElementContent(page, '#summary-container .qsFamilies .strongRow td')

  return formatNumber(families)
}

export const getMedianIncome = async (page: Page) => {
  const medianIncome = await getElementContent(page, '#summary-container .qsDwelling tr:nth-child(3) td')

  return formatCurrency(medianIncome)
}

export const getMedianMortgage = async (page: Page) => {
  const medianRent = await getElementContent(page, '#summary-container .qsDwelling tr:nth-child(4) td')

  return formatCurrency(medianRent)
}

export const getMedianRent = async (page: Page) => {
  const medianMortgage = await getElementContent(page, '#summary-container .qsDwelling tr:nth-child(5) td')

  return formatCurrency(medianMortgage)
}

export const getMedianAge = async (page: Page) => {
  const medianAge = await getElementContent(
    page,
    '#tablesView .abs-collapsible-paragraph .qsTable:nth-child(5) tr:nth-child(2) td:nth-child(2)',
  )

  return formatNumber(medianAge)
}

export const getAncestry = async (page: Page) => {
  const ancestry: any[] = []

  for (let i = 2; i <= 5; i++) {
    const row = await getElementContent(
      page,
      `#tablesView .abs-collapsible-paragraph:nth-child(4) .qsTable:nth-child(1) tr:nth-child(${i})`,
    )
    const cells = row?.trim().split(' ') || []
    ancestry.push({
      name: cells[0],
      total: formatNumber(cells[1]),
      percentage: formatPercentage(cells[2]),
    })
  }

  return ancestry
}

export const getCountryOfBirth = async (page: Page) => {
  const countryOfBirth = await getTableData(
    page,
    `#tablesView .abs-collapsible-paragraph:nth-child(4) .qsTable:nth-child(3) tr`
  )

  return countryOfBirth.filter((_, i) => i !== 1)
}

export const getReligion = async (page: Page) => {
  return await getTableData(
    page,
    `#tablesView .abs-collapsible-paragraph:nth-child(4) .qsTable:nth-child(11) tr`
  )
}

export const getLaborForce = async (page: Page) => {
  return await getTableData(
    page,
    `#tablesView .abs-collapsible-paragraph:nth-child(5) .qsTable:nth-child(1) tr`
  )
}

export const getEmploymentStatus = async (page: Page) => {
  return await getTableData(
    page,
    `#tablesView .abs-collapsible-paragraph:nth-child(5) .qsTable:nth-child(3) tr`
  )
}

export const getOccupation = async (page: Page) => {
  return await getTableData(
    page,
    `#tablesView .abs-collapsible-paragraph:nth-child(5) .qsTable:nth-child(7) tr`
  )
}

export const getIndustry = async (page: Page) => {
  return await getTableData(
    page,
    `#tablesView .abs-collapsible-paragraph:nth-child(5) .qsTable:nth-child(9) tr`
  )
}

export const getMedianWeeklyIncome = async (page: Page) => {
  return await getTableData(
    page,
    `#tablesView .abs-collapsible-paragraph:nth-child(5) .qsTable:nth-child(11) tr`,
    1,
    'currency',
  )
}

export const getMethodOfTravelToWork = async (page: Page) => {
  const data = await getTableData(
    page,
    `#tablesView .abs-collapsible-paragraph:nth-child(5) .qsTable:nth-child(13) tr`
  )

  return data.filter((_, i) => i !== 5 && i !== 8)
}

export const getFamilyComposition = async (page: Page) => {
  return await getTableData(
    page,
    `#tablesView .abs-collapsible-paragraph:nth-child(9) .qsTable:nth-child(1) tr`
  )
}

export const getEmploymentStatusOfCoupleFamilies = async (page: Page) => {
  return await getTableData(
    page,
    `#tablesView .abs-collapsible-paragraph:nth-child(9) .qsTable:nth-child(5) tr`
  )
}

export const getDwellingCount = async (page: Page) => {
  return await getTableData(
    page,
    `#tablesView .abs-collapsible-paragraph:nth-child(10) .qsTable:nth-child(1) tr`
  )
}

export const getDwellingStructure = async (page: Page) => {
  return await getTableData(
    page,
    `#tablesView .abs-collapsible-paragraph:nth-child(10) .qsTable:nth-child(3) tr`
  )
}

export const getNumberOfBedrooms = async (page: Page) => {
  const data = await getTableData(
    page,
    `#tablesView .abs-collapsible-paragraph:nth-child(10) .qsTable:nth-child(5) tr`
  )

  return data.filter((_, i) => i !== 6)
}

export const getNumberOfVehicles = async (page: Page) => {
  return await getTableData(
    page,
    `#tablesView .abs-collapsible-paragraph:nth-child(10) .qsTable:nth-child(7) tr`
  )
}

export const getHouseholdComposition = async (page: Page) => {
  return await getTableData(
    page,
    `#tablesView .abs-collapsible-paragraph:nth-child(11) .qsTable:nth-child(1) tr`
  )
}

export const getTenureType = async (page: Page) => {
  return await getTableData(
    page,
    `#tablesView .abs-collapsible-paragraph:nth-child(11) .qsTable:nth-child(3) tr`
  )
}

export const getHouseholdIncome = async (page: Page) => {
  return await getTableData(
    page,
    `#tablesView .abs-collapsible-paragraph:nth-child(11) .qsTable:nth-child(5) tr`,
    2,
    'currency',
  )
}

export const getRentWeeklyPayment = async (page: Page) => {
  const data = await getTableData(
    page,
    `#tablesView .abs-collapsible-paragraph:nth-child(11) .qsTable:nth-child(8) tr`,
    2,
    'currency',
  )

  return data.filter((_, i) => i !== 1)
}

export const getMortgageMonthlyPayment = async (page: Page) => {
  const data = await getTableData(
    page,
    `#tablesView .abs-collapsible-paragraph:nth-child(11) .qsTable:nth-child(10) tr`,
    2,
    'currency',
  )

  return data.filter((_, i) => i !== 1)
}
