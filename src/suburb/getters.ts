import { Page } from 'puppeteer'
import { formatCurrency, formatNumber, formatPercentage, getElementContent } from '../utils'

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
  const countryOfBirth: any[] = []

  const rows = (await page.$$(`#tablesView .abs-collapsible-paragraph:nth-child(4) .qsTable:nth-child(3) tr`))
  rows.shift()

  for (const row of rows) {
    const data = {
      country: '',
      total: 0,
      percentage: 0,
    }
    const head = await row.$('th')
    const country = await head?.evaluate((el) => el.textContent)

    data.country = country || ''

    const cells = await row.$$('td')

    for (let i = 0; i < cells.length; i++) {
      if (i >= 2) {
        break
      }

      const cell = cells[i]
      const content = await cell.evaluate((el) => el.textContent)
      if (i === 0) {
        data.total = formatNumber(content)
      }

      if (i === 1) {
        data.percentage = formatPercentage(content)
      }
    }

    countryOfBirth.push(data)
  }

  return countryOfBirth
}

export const getReligion = async (page: Page) => {
  const religion: any[] = []

  const rows = (await page.$$(`#tablesView .abs-collapsible-paragraph:nth-child(4) .qsTable:nth-child(4) tr`))
  rows.shift()

  for (const row of rows) {

  }

  return religion
}
