<script setup lang="ts">
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaArrowRight, FaSearch } from 'oh-vue-icons/icons/fa'

addIcons(FaArrowRight, FaSearch)

useHead({ title: 'Bakery — Dapur Onty' })

const route = useRoute()
const catalog = getCatalog()
const products = computed(() => catalog.products)
const categories = computed(() => ['Semua', ...new Set(products.value.map((p) => p.category))])
const active = ref('Semua')
const search = ref(String(route.query.q ?? ''))
const sort = ref('default')

const filtered = computed(() => {
  const keyword = search.value.trim().toLowerCase()
  let list = products.value.filter((product) => {
    const matchCategory = active.value === 'Semua' || product.category === active.value
    const matchSearch = !keyword || `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(keyword)
    return matchCategory && matchSearch
  })
  if (sort.value === 'termurah') list = [...list].sort((a, b) => a.price - b.price)
  if (sort.value === 'termahal') list = [...list].sort((a, b) => b.price - a.price)
  if (sort.value === 'nama') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
  return list
})

const { add } = useCart()
const qtys = reactive<Record<string, number>>({})
const qtyOf = (id: string) => qtys[id] ?? 1
const step = (id: string, delta: number) => {
  qtys[id] = Math.min(99, Math.max(1, qtyOf(id) + delta))
}

const toastName = ref('')
let toastTimer: ReturnType<typeof setTimeout> | undefined
const quickAdd = (product: (typeof products.value)[number]) => {
  add(
    { id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.image },
    qtyOf(product.id)
  )
  qtys[product.id] = 1
  toastName.value = product.name
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastName.value = '' }, 2500)
}
</script>

<template>
  <section class="mx-auto max-w-7xl px-5 py-14 lg:px-8">
    <p class="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Bakery</p>
    <h1 class="mt-3 font-display text-4xl font-bold sm:text-5xl">Katalog bakery</h1>
    <p class="mt-4 max-w-xl text-base leading-7 text-brand-muted">Pilih menu, tambah ke keranjang, checkout, dan kami antar fresh di hari yang sama.</p>

    <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="relative w-full sm:max-w-xs">
        <OhVueIcon name="fa-search" class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" scale="0.8" />
        <input v-model="search" type="search" placeholder="Cari kue, roti, pastry..." class="w-full rounded-xl border border-black/10 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-brand-orange">
      </div>
      <select v-model="sort" class="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-brand-orange">
        <option value="default">Urutan default</option>
        <option value="termurah">Harga termurah</option>
        <option value="termahal">Harga termahal</option>
        <option value="nama">Nama A–Z</option>
      </select>
    </div>

    <div class="mt-5 flex flex-wrap gap-2">
      <button
        v-for="category in categories"
        :key="category"
        :class="active === category ? 'bg-brand-ink text-white' : 'bg-orange-50 text-brand-ink hover:bg-orange-100'"
        class="rounded-full px-4 py-2 text-xs font-bold transition"
        @click="active = category"
      >
        {{ category }}
      </button>
    </div>

    <p class="mt-6 text-sm text-brand-muted">{{ filtered.length }} produk ditemukan</p>

    <div v-if="filtered.length === 0" class="mt-8 rounded-2xl border border-black/5 bg-[#fff9f4] p-10 text-center">
      <p class="font-display text-xl font-bold">Produk tidak ditemukan</p>
      <p class="mt-2 text-sm text-brand-muted">Coba kata kunci lain atau pilih kategori berbeda.</p>
    </div>

    <div v-else class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <article v-for="product in filtered" :key="product.id" class="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100">
        <NuxtLink :to="`/bakery/${product.slug}`" class="relative block overflow-hidden">
          <img :src="product.image" :alt="product.name" class="h-56 w-full object-cover transition duration-500 group-hover:scale-105">
          <span v-if="product.tag" class="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-orange">{{ product.tag }}</span>
        </NuxtLink>
        <div class="flex flex-1 flex-col p-5">
          <p class="text-[11px] font-bold uppercase tracking-wider text-brand-muted">{{ product.category }}</p>
          <h2 class="mt-1 font-display text-lg font-bold">
            <NuxtLink :to="`/bakery/${product.slug}`" class="hover:text-brand-orange">{{ product.name }}</NuxtLink>
          </h2>
          <p class="mt-1 flex-1 text-sm leading-6 text-brand-muted">{{ product.description }}</p>
          <p class="mt-4 font-bold text-brand-orange">{{ formatIDR(product.price) }}</p>

          <NuxtLink v-if="product.variants.length" :to="`/bakery/${product.slug}`" class="mt-4 inline-flex justify-center rounded-xl bg-brand-ink px-4 py-2.5 text-xs font-bold text-white transition hover:bg-black">Pilih ukuran</NuxtLink>
          <div v-else class="mt-4 flex items-center gap-2">
            <div class="flex items-center rounded-xl border border-black/10">
              <button aria-label="Kurangi" class="h-9 w-9 font-bold transition hover:text-brand-orange" @click="step(product.id, -1)">−</button>
              <span class="w-8 text-center text-sm font-bold">{{ qtyOf(product.id) }}</span>
              <button aria-label="Tambah" class="h-9 w-9 font-bold transition hover:text-brand-orange" @click="step(product.id, 1)">+</button>
            </div>
            <button class="flex-1 rounded-xl bg-brand-orange px-4 py-2.5 text-xs font-bold text-white transition hover:bg-orange-600" @click="quickAdd(product)">Tambah</button>
          </div>
        </div>
      </article>
    </div>

    <div v-if="toastName" class="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-xl bg-brand-ink px-5 py-3 text-sm font-bold text-white shadow-xl">
      <span>{{ toastName }} masuk keranjang</span>
      <NuxtLink to="/cart" class="inline-flex items-center gap-1 text-brand-orange hover:underline">Lihat <OhVueIcon name="fa-arrow-right" scale="0.7" /></NuxtLink>
    </div>
  </section>
</template>
