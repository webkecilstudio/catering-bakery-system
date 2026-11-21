<script setup lang="ts">
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaStar, FaBreadSlice, FaTruck, FaLeaf } from 'oh-vue-icons/icons/fa'

addIcons(FaStar, FaBreadSlice, FaTruck, FaLeaf)

const items = [
  { icon: 'fa-star', title: 'Rating 4,9/5', text: '2.000+ pelanggan puas' },
  { icon: 'fa-bread-slice', title: 'Fresh setiap hari', text: 'Batch kecil, tanpa kompromi' },
  { icon: 'fa-truck', title: 'Dikirim hari ini', text: 'Order sebelum jam 15.00' },
  { icon: 'fa-leaf', title: 'Bahan premium', text: 'Kualitas yang bisa dirasakan' }
]
</script>

<template>
  <section class="border-b border-black/5 bg-white">
    <div class="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-8 lg:grid-cols-4 lg:px-8">
      <div v-for="item in items" :key="item.title" class="flex items-center gap-3">
        <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-brand-orange">
          <OhVueIcon :name="item.icon" scale="0.95" />
        </span>
        <div>
          <p class="text-sm font-bold">{{ item.title }}</p>
          <p class="text-xs text-brand-muted">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
