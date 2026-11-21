<script setup lang="ts">
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaArrowRight } from 'oh-vue-icons/icons/fa'

addIcons(FaArrowRight)

const catalog = getCatalog()
const products = computed(() => catalog.products.slice(0, 3))
</script>

<template>
  <section id="menu" class="bg-[#fff9f4]">
    <div class="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div class="flex items-end justify-between gap-5">
        <SectionHeading eyebrow="Bakery · Paling dicari" title="Produk terlaris" description="Menu yang selalu bikin pelanggan balik lagi." />
        <NuxtLink to="/bakery" class="hidden items-center gap-1.5 text-sm font-bold text-brand-orange sm:inline-flex">Lihat menu lengkap <OhVueIcon name="fa-arrow-right" scale="0.8" /></NuxtLink>
      </div>
      <div class="mt-10 grid gap-6 md:grid-cols-3">
        <article v-for="product in products" :key="product.id" class="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-100">
          <NuxtLink :to="`/bakery/${product.slug}`" class="relative block overflow-hidden">
            <img :src="product.image" :alt="product.name" class="h-64 w-full object-cover transition duration-500 group-hover:scale-105">
            <span v-if="product.tag" class="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-orange">{{ product.tag }}</span>
          </NuxtLink>
          <div class="p-5">
            <h3 class="font-display text-lg font-bold">
              <NuxtLink :to="`/bakery/${product.slug}`" class="hover:text-brand-orange">{{ product.name }}</NuxtLink>
            </h3>
            <p class="mt-1 text-sm text-brand-muted">{{ product.description }}</p>
            <div class="mt-5 flex items-center justify-between">
              <p class="font-bold text-brand-orange">{{ formatIDR(product.price) }}</p>
              <NuxtLink :to="`/bakery/${product.slug}`" class="rounded-xl bg-brand-orange px-4 py-2.5 text-xs font-bold text-white transition hover:bg-orange-600">Lihat</NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
