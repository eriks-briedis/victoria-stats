export const formatCurrency = (value: string | null | undefined) => {
  return parseInt((value || '').trim().replace('$', '').replace(',', ''), 10)
}

export const formatNumber = (value: string | null | undefined) => {
  const val = parseInt((value || '').trim().replace(',', ''), 10)

  return isNaN(val) ? 0 : val
}

export const formatPercentage = (value: string | null | undefined) => {
  return parseFloat((value || ''))
}
