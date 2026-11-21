<script setup lang="ts">
import { ref } from 'vue'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaBars, FaSearch, FaShoppingBag, FaTimes } from 'oh-vue-icons/icons/fa'

addIcons(FaBars, FaSearch, FaShoppingBag, FaTimes)

const isOpen = ref(false)
const { count } = useCart()
const links = [
  { label: 'Beranda', to: '/' },
  { label: 'Bakery', to: '/bakery' },
  { label: 'Catering', to: '/catering' },
  { label: 'Galeri', to: '/#gallery' },
  { label: 'FAQ', to: '/#faq' },
  { label: 'Kontak', to: '/#contact' }
]
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-black/5 bg-white/90 backdrop-blur-md">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
      <NuxtLink to="/" class="flex items-center gap-2.5" @click="isOpen = false">
        <img :src="asset('/webkecilstudio.png')" alt="Dapur Onty" class="h-10 w-10 rounded-xl object-cover">
        <span class="font-display text-xl font-bold tracking-tight">Dapur <span class="text-brand-orange">Onty</span></span>
      </NuxtLink>

      <nav class="hidden items-center gap-8 lg:flex">
        <NuxtLink v-for="link in links" :key="link.label" :to="link.to" class="text-sm font-medium text-brand-muted transition hover:text-brand-orange">{{ link.label }}</NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <NuxtLink aria-label="Cari produk" to="/bakery" class="hidden h-10 w-10 items-center justify-center rounded-full text-brand-ink transition hover:bg-orange-50 hover:text-brand-orange sm:flex">
          <OhVueIcon name="fa-search" scale="0.9" />
        </NuxtLink>
        <NuxtLink aria-label="Keranjang" to="/cart" class="relative flex h-10 w-10 items-center justify-center rounded-full text-brand-ink transition hover:bg-orange-50 hover:text-brand-orange">
          <OhVueIcon name="fa-shopping-bag" scale="0.9" />
          <span v-if="count" class="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-orange px-1 text-[10px] font-bold text-white">{{ count }}</span>
        </NuxtLink>
        <NuxtLink to="/#cara-pesan" class="hidden rounded-xl bg-brand-orange px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-orange-600 sm:inline-flex">Pesan sekarang</NuxtLink>
        <button aria-label="Buka menu" class="flex h-10 w-10 items-center justify-center rounded-full lg:hidden" @click="isOpen = !isOpen">
          <OhVueIcon :name="isOpen ? 'fa-times' : 'fa-bars'" scale="1.1" />
        </button>
      </div>
    </div>
    <nav v-if="isOpen" class="border-t border-black/5 bg-white px-5 py-4 lg:hidden">
      <NuxtLink v-for="link in links" :key="link.label" :to="link.to" class="block border-b border-black/5 py-3 text-sm font-medium" @click="isOpen = false">{{ link.label }}</NuxtLink>
      <NuxtLink to="/#cara-pesan" class="mt-4 inline-flex rounded-xl bg-brand-orange px-5 py-3 text-sm font-bold text-white" @click="isOpen = false">Pesan sekarang</NuxtLink>
    </nav>
  </header>
</template>
