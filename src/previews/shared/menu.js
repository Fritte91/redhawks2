// Read-only view helpers over the existing menu data. Nothing here changes
// products or prices; it only orders and labels them for display.
import { menuItems } from '../../data/menuItems'

export const categories = [
  { id: 'burgers', label: 'Burgers' },
  { id: 'wraps', label: 'Wraps & Kebabs' },
  { id: 'plates', label: 'Plates' },
  { id: 'sides', label: 'Sides' },
  { id: 'extras', label: 'Extras' },
]

export const menuByCategory = categories.map(category => ({
  ...category,
  items: menuItems.filter(item => item.category === category.id),
}))

const PROTEIN_ORDER = ['beef', 'pork', 'chicken']
const PROTEIN_LABELS = { beef: 'Beef', pork: 'Pork', chicken: 'Chicken' }

// [{ key, label, price }] in a stable beef → pork → chicken order.
// Items with a single price (`{ single: 40 }`) get `label: null`.
export const priceOptions = prices =>
  Object.entries(prices)
    .sort(([a], [b]) => PROTEIN_ORDER.indexOf(a) - PROTEIN_ORDER.indexOf(b))
    .map(([key, price]) => ({ key, label: PROTEIN_LABELS[key] ?? null, price }))

export const priceText = prices =>
  priceOptions(prices)
    .map(({ label, price }) => (label ? `${label} ${price}\u00a0฿` : `${price}\u00a0฿`))
    .join(' · ')

export const lowestPrice = item => Math.min(...Object.values(item.prices))

export const getItem = id => menuItems.find(item => item.id === id)

export const categoryLabel = id => categories.find(c => c.id === id)?.label

export const isSpicy = item => item.tags?.includes('spicy')

export const menuStats = {
  total: menuItems.length,
  cheapest: menuItems.reduce((a, b) => (lowestPrice(b) < lowestPrice(a) ? b : a)),
  priciest: menuItems.reduce((a, b) => (lowestPrice(b) > lowestPrice(a) ? b : a)),
  count: id => menuItems.filter(item => item.category === id).length,
}
