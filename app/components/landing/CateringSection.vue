<script setup lang="ts">
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaArrowRight, FaBirthdayCake, FaBuilding, FaGlassCheers, FaHeart } from 'oh-vue-icons/icons/fa'

addIcons(FaArrowRight, FaBirthdayCake, FaBuilding, FaGlassCheers, FaHeart)
const services = [
  { title: 'Pernikahan', text: 'Hidangan indah untuk hari istimewamu.', icon: 'fa-heart' },
  { title: 'Acara kantor', text: 'Bikin tim tetap senang dan bersemangat.', icon: 'fa-building' },
  { title: 'Ulang tahun', text: 'Buat perayaannya makin spesial.', icon: 'fa-birthday-cake' },
  { title: 'Acara privat', text: 'Menu penuh perhatian untuk setiap pertemuan.', icon: 'fa-glass-cheers' }
]
</script>

<template>
  <section id="catering" class="mx-auto max-w-7xl px-5 py-20 lg:px-8">
    <div class="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
      <div class="relative">
        <img src="/images/packages/the-celebration.jpg" alt="Hidangan catering untuk acara" class="h-[480px] w-full rounded-[2rem] object-cover">
        <div class="absolute -bottom-5 -right-3 max-w-[190px] rounded-2xl bg-brand-orange p-5 text-white shadow-xl shadow-orange-200 sm:-right-5">
          <p class="font-display text-3xl font-bold">10+</p><p class="mt-1 text-xs leading-5 text-orange-100">tahun bikin acara makin lezat</p>
        </div>
      </div>
      <div>
        <SectionHeading eyebrow="Catering · Kumpul lebih meriah" title="Catering yang bikin setiap acara berkesan" description="Dari makan malam intim sampai perayaan besar, tim kami mengurus setiap detailnya." />
        <div class="mt-8 grid grid-cols-2 gap-5">
          <div v-for="service in services" :key="service.title" class="rounded-2xl border border-black/5 p-4 transition hover:border-orange-200 hover:bg-orange-50">
            <OhVueIcon :name="service.icon" class="text-brand-orange" scale="1.25" />
            <h3 class="mt-3 text-sm font-bold">{{ service.title }}</h3>
            <p class="mt-1 text-xs leading-5 text-brand-muted">{{ service.text }}</p>
          </div>
        </div>
        <NuxtLink to="/catering" class="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-orange px-6 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600">
          Konsultasi tim catering <OhVueIcon name="fa-arrow-right" scale="0.85" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
