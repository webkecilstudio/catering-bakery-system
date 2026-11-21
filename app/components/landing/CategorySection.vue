<script setup lang="ts">
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaArrowRight, FaBirthdayCake, FaBreadSlice, FaCookieBite, FaGift } from 'oh-vue-icons/icons/fa'
import { MdCake, MdFavorite } from 'oh-vue-icons/icons/md'

addIcons(FaArrowRight, FaBirthdayCake, FaBreadSlice, FaCookieBite, FaGift, MdCake, MdFavorite)

const categories = [
  { name: 'Roti', icon: 'fa-bread-slice', image: '/images/products/sourdough-loaf.jpg' },
  { name: 'Kue', icon: 'md-cake', image: '/images/products/pistachio-berry-cake.jpg' },
  { name: 'Pastry', icon: 'fa-cookie-bite', image: '/images/products/butter-croissant.jpg' },
  { name: 'Dessert', icon: 'md-favorite', image: '/images/products/chocolate-dream-tart.jpg' },
  { name: 'Hampers', icon: 'fa-gift', image: '/images/products/celebration-hamper.jpg' }
]
</script>

<template>
  <section id="bakery" class="mx-auto max-w-7xl px-5 py-20 lg:px-8">
    <div class="flex items-end justify-between gap-5">
      <SectionHeading eyebrow="Bakery · Pilih favoritmu" title="Belanja per kategori" description="Sesuatu yang manis, gurih, atau sedikit dari semuanya." />
      <NuxtLink to="/bakery" class="hidden items-center gap-1.5 text-sm font-bold text-brand-orange sm:inline-flex">Lihat semua <OhVueIcon name="fa-arrow-right" scale="0.8" /></NuxtLink>
    </div>
    <div class="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      <NuxtLink v-for="category in categories" :key="category.name" to="/bakery" class="group relative overflow-hidden rounded-2xl bg-orange-50">
        <img :src="category.image" :alt="category.name" class="h-48 w-full object-cover transition duration-500 group-hover:scale-105">
        <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"></div>
        <div class="absolute bottom-4 left-4 text-white">
          <OhVueIcon :name="category.icon" scale="1.1" />
          <p class="mt-1 text-sm font-bold">{{ category.name }}</p>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>
