<script setup lang="ts">
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaArrowRight, FaClock, FaMapMarkedAlt, FaBirthdayCake } from 'oh-vue-icons/icons/fa'

addIcons(FaArrowRight, FaClock, FaMapMarkedAlt, FaBirthdayCake)

const info = [
  { icon: 'fa-clock', title: 'Same-day delivery', text: 'Order sebelum jam 15.00 untuk kirim hari yang sama.' },
  { icon: 'fa-map-marked-alt', title: 'Area pengiriman', text: 'Jakarta Selatan, Pusat, dan sekitarnya. Luar area via kurir.' },
  { icon: 'fa-birthday-cake', title: 'Custom cake', text: 'Pesan minimal H-2 untuk dekorasi & ukuran custom.' }
]
</script>

<template>
  <section class="mx-auto max-w-7xl px-5 py-16 lg:px-8">
    <div class="overflow-hidden rounded-[2rem] bg-brand-ink">
      <div class="grid items-center gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_auto]">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Order & delivery</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">Pesan hari ini, nikmati besok.</h2>
          <div class="mt-6 grid gap-4 sm:grid-cols-3">
            <div v-for="item in info" :key="item.title" class="rounded-xl bg-white/5 p-4">
              <OhVueIcon :name="item.icon" class="text-brand-orange" scale="0.95" />
              <p class="mt-2 text-sm font-bold text-white">{{ item.title }}</p>
              <p class="mt-1 text-xs leading-5 text-white/60">{{ item.text }}</p>
            </div>
          </div>
        </div>
        <NuxtLink to="/bakery" class="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600">
          Pesan bakery <OhVueIcon name="fa-arrow-right" scale="0.85" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
