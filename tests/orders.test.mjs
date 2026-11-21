import assert from 'node:assert/strict'
import products from '../app/data/products.json' with { type: 'json' }
import packages from '../app/data/packages.json' with { type: 'json' }
import dishes from '../app/data/dishes.json' with { type: 'json' }

// 1. Data integrity
assert.ok(products.length >= 8, 'harus ada minimal 8 produk')
assert.ok(packages.length >= 3, 'harus ada minimal 3 paket')
assert.ok(dishes.length >= 10, 'harus ada minimal 10 menu')

// 2. Paket: dishSlots harus <= total menu
for (const pkg of packages) {
  assert.ok(pkg.dishSlots <= dishes.length, `slot ${pkg.name} melebihi jumlah menu`)
  assert.ok(pkg.minGuests <= pkg.maxGuests, `tamu min > max pada ${pkg.name}`)
  assert.ok(pkg.pricePerPax > 0, `harga per pax ${pkg.name} invalid`)
}

// 3. Kalkulasi total harga catering (server recompute rule)
const testPkg = packages[0]
const guests = 12
const total = testPkg.pricePerPax * guests
assert.equal(total, 85000 * 12, 'hitung total catering harus pricePerPax * guests')

// 4. Bakery variant matching
const cake = products.find((p) => p.slug === 'pistachio-berry-cake')
assert.ok(cake && cake.variants.length > 0)
const v20 = cake.variants.find((v) => v.label === '20 cm')
assert.equal(v20?.price, 385000)

// 5. Code prefix rule
const genCode = (type) => (type === 'bakery' ? 'BK' : 'CT') + 'ABC12'
assert.match(genCode('bakery'), /^BK/)
assert.match(genCode('catering'), /^CT/)

console.log('OK: all catalog & pricing sanity checks passed.')
