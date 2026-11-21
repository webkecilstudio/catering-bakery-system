import products from '~/data/products.json'
import packages from '~/data/packages.json'
import dishes from '~/data/dishes.json'

export const getCatalog = () => ({
  products,
  packages,
  dishes
})
