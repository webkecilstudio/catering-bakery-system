<script setup lang="ts">
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaArrowRight } from 'oh-vue-icons/icons/fa'

addIcons(FaArrowRight)
</script>

<template>
  <section id="home" class="overflow-hidden bg-[#fff9f4]">
    <div class="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
      <div>
        <div class="mb-6 inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange">
          <span class="h-1.5 w-1.5 rounded-full bg-brand-orange"></span> Dipanggang fresh setiap hari
        </div>
        <h1 class="max-w-xl font-display text-5xl font-bold leading-[1.08] text-brand-ink sm:text-6xl lg:text-7xl">Sedikit kebahagiaan, <span class="text-brand-orange">baru dipanggang.</span></h1>
        <p class="mt-6 max-w-lg text-base leading-8 text-brand-muted sm:text-lg">Roti artisan, kue impian, dan catering lezat yang dibuat dengan bahan pilihan dan sepenuh hati.</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink to="/bakery" class="inline-flex items-center gap-2 rounded-xl bg-brand-orange px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-orange-600">
            Pesan bakery <OhVueIcon name="fa-arrow-right" scale="0.85" />
          </NuxtLink>
          <NuxtLink to="/catering" class="rounded-xl border border-brand-ink/15 bg-white px-6 py-3.5 text-sm font-bold text-brand-ink transition hover:border-brand-orange hover:text-brand-orange">Rencanakan acara</NuxtLink>
        </div>
        <div class="mt-10 flex items-center gap-4">
          <div class="flex -space-x-2">
            <img v-for="n in 3" :key="n" :src="asset(`/images/avatars/${n}.jpg`)" alt="" class="h-9 w-9 rounded-full border-2 border-[#fff9f4] object-cover">
          </div>
          <p class="text-xs leading-5 text-brand-muted"><strong class="text-brand-ink">2.000+</strong> pelanggan puas<br><span class="text-brand-orange">★★★★★</span> rating 4,9/5</p>
        </div>
      </div>
      <div class="relative">
        <div class="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-orange-200/50 blur-3xl"></div>
        <div class="relative overflow-hidden rounded-[2rem] rounded-br-[6rem] shadow-2xl shadow-orange-200/60">
          <img :src="asset('/images/hero.jpg')" alt="Croissant dan roti yang baru dipanggang" class="h-[420px] w-full object-cover sm:h-[540px]">
          <div class="absolute bottom-5 left-5 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur">
            <p class="text-xs font-bold uppercase tracking-wider text-brand-orange">Spesial hari ini</p>
            <p class="mt-1 font-display text-lg font-bold">Croissant Mentega</p>
            <p class="mt-1 text-sm text-brand-muted">Rp28.000 <span class="ml-2 text-yellow-500">★★★★★</span></p>
          </div>
        </div>
        <div class="absolute -bottom-5 -right-3 flex h-24 w-24 rotate-6 items-center justify-center rounded-2xl bg-brand-orange p-3 text-center text-xs font-bold text-white shadow-xl shadow-orange-300 sm:-right-6">Dibuat dengan<br>cinta ♡</div>
      </div>
    </div>
  </section>
</template>
