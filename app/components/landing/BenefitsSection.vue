<script setup lang="ts">
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaCheckCircle, FaHeart, FaStar, FaTruck } from 'oh-vue-icons/icons/fa'

addIcons(FaCheckCircle, FaHeart, FaStar, FaTruck)
const benefits = [
  { title: 'Fresh setiap hari', text: 'Dipanggang dalam batch kecil tiap pagi.', icon: 'fa-heart' },
  { title: 'Bahan premium', text: 'Hanya bahan terbaik yang masuk ke resep kami.', icon: 'fa-star' },
  { title: 'Bisa custom', text: 'Dibuat khusus untuk momen spesialmu.', icon: 'fa-check-circle' },
  { title: 'Tepat waktu', text: 'Dikemas hati-hati dan dikirim sesuai jadwal.', icon: 'fa-truck' }
]
</script>

<template>
  <section class="bg-[#fff9f4]">
    <div class="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <SectionHeading eyebrow="Janji Dapur Onty" title="Kenapa pilih kami?" description="Karena kamu layak mendapat hidangan yang dibuat dengan hati, bukan asal jadi." centered />
      <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="benefit in benefits" :key="benefit.title" class="text-center">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand-orange shadow-sm"><OhVueIcon :name="benefit.icon" scale="1.25" /></div>
          <h3 class="mt-5 text-sm font-bold">{{ benefit.title }}</h3>
          <p class="mt-2 text-sm leading-6 text-brand-muted">{{ benefit.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
