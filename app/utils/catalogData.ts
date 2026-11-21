import products from '~/data/products.json'
import packages from '~/data/packages.json'
import dishes from '~/data/dishes.json'

export const getCatalog = () => ({
  products: products.map((product) => ({ ...product, image: asset(product.image) })),
  packages: packages.map((pkg) => ({ ...pkg, image: asset(pkg.image) })),
  dishes: dishes.map((dish) => ({ ...dish, image: asset(dish.image) }))
})
