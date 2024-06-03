import { Page } from 'puppeteer'
import { formatNumber, formatPercentage } from './formatters'

export const getTableData = async (
  page: Page,
  selector: string,
  numOfColumns: number = 2,
  totalCellType: 'number' | 'percentage' | 'currency' = 'number'
) => {
  const data: any[] = []

  const rows = (await page.$$(selector))
  rows.shift()

  for (const row of rows) {
    const nameCell = await row.$('th')
    const name = await nameCell?.evaluate((el) => el.textContent)

    if (!name) {
      continue
    }

    const cells = await row.$$('td')
    const rowData = {
      name,
      total: 0,
      percentage: 0,
    }

    for (let i = 0; i < cells.length; i++) {
      if (i >= numOfColumns) {
        break
      }

      const cell = cells[i]
      const content = await cell.evaluate((el) => el.textContent)

      if (i === 0) {
        switch (totalCellType) {
          case 'number':
            rowData.total = formatNumber(content)
            break
          case 'percentage':
            rowData.percentage = formatPercentage(content)
            break
          case 'currency':
            rowData.total = formatNumber(content)
            break

        }
      }

      if (i === 1) {
        rowData.percentage = formatPercentage(content)
      }
    }

    data.push(rowData)
  }

  return data
}
