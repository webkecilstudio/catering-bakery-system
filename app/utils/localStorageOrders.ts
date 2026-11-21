import products from '~/data/products.json'
import packages from '~/data/packages.json'
import dishes from '~/data/dishes.json'

export interface OrderItem {
  id: string
  name: string
  variant?: string
  qty: number
  price: number
  subtotal: number
  image?: string
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'completed'

export interface Order {
  code: string
  type: 'bakery' | 'catering'
  status: OrderStatus
  createdAt: string
  customer: { name: string; phone: string; email?: string }
  delivery?: { address: string; date: string; notes?: string }
  event?: {
    packageId: string
    packageName: string
    guests: number
    date: string
    address: string
    dishes: { id: string; name: string; type: string }[]
    pricePerPax: number
  }
  items: OrderItem[]
  total: number
}

const STORAGE_KEY = 'baked.orders.v1'

export function getLocalOrders(): Order[] {
  if (!import.meta.client) return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

export function saveLocalOrders(orders: Order[]) {
  if (!import.meta.client) return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
}

export function createLocalOrder(body: any): Order {
  const orders = getLocalOrders()
  const prefix = body.type === 'bakery' ? 'BK' : 'CT'
  let code = ''
  do {
    code = prefix + Date.now().toString(36).slice(-5).toUpperCase() + Math.random().toString(36).slice(2, 4).toUpperCase()
  } while (orders.some((o) => o.code === code))

  let items: OrderItem[] = []
  let total = 0
  let delivery = body.delivery
  let event = body.event

  if (body.type === 'bakery') {
    for (const raw of body.items ?? []) {
      const product = products.find((p) => p.id === raw.id)
      if (!product) continue
      const qty = Number(raw.qty) || 1
      const variant = product.variants.find((v) => v.label === raw.variant)
      const price = variant ? variant.price : product.price
      items.push({
        id: product.id,
        name: product.name,
        variant: variant?.label,
        qty,
        price,
        subtotal: price * qty,
        image: product.image
      })
    }
    total = items.reduce((s, i) => s + i.subtotal, 0)
  } else {
    const pkg = packages.find((p) => p.id === event?.packageId)
    const requestedGuests = Number(event?.guests) || 10
    const guests = pkg ? Math.min(pkg.maxGuests, Math.max(pkg.minGuests, requestedGuests)) : requestedGuests
    const selectedDishes = (event?.dishes ?? [])
      .map((id: string) => dishes.find((d) => d.id === id))
      .filter(Boolean)
      .slice(0, pkg?.dishSlots ?? 0)
    total = (pkg?.pricePerPax ?? 0) * guests
    event = {
      packageId: pkg?.id ?? '',
      packageName: pkg?.name ?? '',
      guests,
      date: event?.date ?? '',
      address: event?.address ?? '',
      dishes: selectedDishes.map((d: any) => ({ id: d.id, name: d.name, type: d.type })),
      pricePerPax: pkg?.pricePerPax ?? 0
    }
  }

  const order: Order = {
    code,
    type: body.type,
    status: 'pending',
    createdAt: new Date().toISOString(),
    customer: body.customer,
    delivery,
    event,
    items,
    total
  }

  orders.unshift(order)
  saveLocalOrders(orders)
  return order
}
