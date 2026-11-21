<script setup lang="ts">
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaArrowLeft, FaArrowRight } from 'oh-vue-icons/icons/fa'

addIcons(FaArrowLeft, FaArrowRight)

const route = useRoute()
const catalog = getCatalog()
const product = computed(() => catalog.products.find((p) => p.slug === route.params.slug))

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Produk tidak ditemukan', fatal: true })
}

useHead({ title: () => `${product.value?.name ?? 'Produk'} — Dapur Onty` })

const variantLabel = ref(product.value.variants[0]?.label ?? '')
const price = computed(
  () => product.value?.variants.find((v) => v.label === variantLabel.value)?.price ?? product.value?.price ?? 0
)
const qty = ref(1)
const { add } = useCart()
const added = ref(false)

const addToCart = () => {
  if (!product.value) return
  add(
    {
      id: product.value.id,
      slug: product.value.slug,
      name: product.value.name,
      variant: variantLabel.value || undefined,
      price: price.value,
      image: product.value.image
    },
    qty.value
  )
  added.value = true
  window.setTimeout(() => { added.value = false }, 2000)
}
</script>

<template>
  <section v-if="product" class="mx-auto max-w-7xl px-5 pb-28 pt-14 lg:px-8 lg:pb-14">
    <NuxtLink to="/bakery" class="inline-flex items-center gap-2 text-sm font-bold text-brand-muted transition hover:text-brand-orange">
      <OhVueIcon name="fa-arrow-left" scale="0.85" /> Kembali ke katalog
    </NuxtLink>

    <div class="mt-6 grid gap-10 lg:grid-cols-2">
      <div class="overflow-hidden rounded-[2rem] bg-orange-50">
        <img :src="product.image" :alt="product.name" class="h-[380px] w-full object-cover sm:h-[480px]">
      </div>

      <div>
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">{{ product.category }}</p>
        <h1 class="mt-3 font-display text-4xl font-bold">{{ product.name }}</h1>
        <p class="mt-4 text-base leading-7 text-brand-muted">{{ product.description }}</p>
        <p class="mt-6 text-3xl font-bold text-brand-orange">{{ formatIDR(price) }}</p>

        <div v-if="product.variants.length" class="mt-8">
          <p class="text-sm font-bold">Pilih ukuran</p>
          <div class="mt-3 flex flex-wrap gap-2">
            <button
              v-for="variant in product.variants"
              :key="variant.label"
              :class="variantLabel === variant.label ? 'border-brand-orange bg-orange-50 text-brand-orange' : 'border-black/10 hover:border-brand-orange'"
              class="rounded-xl border px-4 py-2.5 text-sm font-bold transition"
              @click="variantLabel = variant.label"
            >
              {{ variant.label }} · {{ formatIDR(variant.price) }}
            </button>
          </div>
        </div>

        <div class="mt-8 flex items-center gap-4">
          <div class="flex items-center rounded-xl border border-black/10">
            <button aria-label="Kurangi" class="h-11 w-11 text-lg font-bold transition hover:text-brand-orange" @click="qty = Math.max(1, qty - 1)">−</button>
            <input v-model.number="qty" type="number" min="1" max="99" class="w-12 border-x border-black/10 py-2 text-center text-sm font-bold outline-none" @change="qty = Math.min(99, Math.max(1, Number(qty) || 1))">
            <button aria-label="Tambah" class="h-11 w-11 text-lg font-bold transition hover:text-brand-orange" @click="qty = Math.min(99, qty + 1)">+</button>
          </div>
          <button class="flex-1 rounded-xl bg-brand-orange px-6 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600" @click="addToCart">
            {{ added ? 'Ditambahkan ✓' : 'Tambah ke keranjang' }}
          </button>
        </div>

        <NuxtLink to="/cart" class="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-orange hover:underline">
          Lihat keranjang <OhVueIcon name="fa-arrow-right" scale="0.8" />
        </NuxtLink>
      </div>
    </div>

    <div class="fixed inset-x-0 bottom-0 z-30 border-t border-black/5 bg-white/95 px-5 py-3 backdrop-blur lg:hidden">
      <div class="flex items-center gap-3">
        <div class="min-w-0 flex-1">
          <p class="truncate text-xs text-brand-muted">{{ product.name }}<span v-if="variantLabel"> · {{ variantLabel }}</span></p>
          <p class="font-bold text-brand-orange">{{ formatIDR(price * qty) }}</p>
        </div>
        <button class="rounded-xl bg-brand-orange px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600" @click="addToCart">
          {{ added ? 'Ditambahkan ✓' : 'Tambah' }}
        </button>
      </div>
    </div>
  </section>
</template>
