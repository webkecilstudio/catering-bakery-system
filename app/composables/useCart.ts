import { computed, onMounted, watch } from 'vue'

export interface CartItem {
  id: string
  slug: string
  name: string
  variant?: string
  price: number
  qty: number
  image: string
}

const STORAGE_KEY = 'baked.cart'
let hydrated = false

export const cartKey = (item: Pick<CartItem, 'id' | 'variant'>) => `${item.id}|${item.variant ?? ''}`

export function useCart() {
  const items = useState<CartItem[]>('cart', () => [])

  const count = computed(() => items.value.reduce((sum, item) => sum + item.qty, 0))
  const subtotal = computed(() => items.value.reduce((sum, item) => sum + item.price * item.qty, 0))

  const add = (item: Omit<CartItem, 'qty'>, qty = 1) => {
    const key = cartKey(item)
    const existing = items.value.find((entry) => cartKey(entry) === key)
    if (existing) existing.qty += qty
    else items.value.push({ ...item, qty })
  }

  const setQty = (key: string, qty: number) => {
    const item = items.value.find((entry) => cartKey(entry) === key)
    if (!item) return
    if (qty < 1) items.value = items.value.filter((entry) => cartKey(entry) !== key)
    else item.qty = Math.min(Math.floor(qty), 99)
  }

  const remove = (key: string) => {
    items.value = items.value.filter((entry) => cartKey(entry) !== key)
  }

  const clear = () => {
    items.value = []
  }

  if (import.meta.client && !hydrated) {
    hydrated = true
    onMounted(() => {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
        if (Array.isArray(saved) && items.value.length === 0) items.value = saved
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
      watch(items, (value) => localStorage.setItem(STORAGE_KEY, JSON.stringify(value)), { deep: true })
    })
  }

  return { items, count, subtotal, add, setQty, remove, clear, cartKey }
}
