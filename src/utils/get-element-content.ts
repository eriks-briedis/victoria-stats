import { Page } from 'puppeteer'

export const getElementContent = async (page: Page, selector: string) => {
  try {
    const element = await page.waitForSelector(selector, { timeout: 1000 })
    return await page.evaluate(el => el?.textContent, element)
  } catch (error) {
    console.error(`Error getting element content for ${selector}`)
    return null
  }
}
