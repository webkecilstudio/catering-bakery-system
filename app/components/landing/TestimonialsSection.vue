<script setup lang="ts">
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaQuoteLeft, FaStar } from 'oh-vue-icons/icons/fa'

addIcons(FaQuoteLeft, FaStar)
const testimonials = [
  { quote: 'Kuenya bukan cuma cantik, tapi jujur ini yang paling enak yang pernah kami coba. Dapur Onty bikin hari kami makin spesial.', name: 'Nadia & Reza', role: 'Perayaan pernikahan', image: '/images/avatars/1.jpg' },
  { quote: 'Catering kantor kami sukses banget! Semuanya datang fresh, dikemas rapi, dan tepat waktu.', name: 'Dimas Pratama', role: 'Acara korporat', image: '/images/avatars/2.jpg' },
  { quote: 'Aku kirim hampers ke mama dan dia suka semua isinya. Detail kecilnya bikin terasa personal.', name: 'Sarah Wijaya', role: 'Pesanan hadiah', image: '/images/avatars/3.jpg' }
]
</script>

<template>
  <section class="bg-white">
    <div class="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <SectionHeading eyebrow="Kata mereka" title="Dicintai pelanggan kami" description="Beberapa kata manis dari orang-orang yang membuat kami terus berkarya." centered />
      <div class="mt-12 grid gap-5 lg:grid-cols-3">
        <article v-for="testimonial in testimonials" :key="testimonial.name" class="rounded-2xl bg-white p-7 shadow-sm">
          <OhVueIcon name="fa-quote-left" class="text-2xl text-orange-200" />
          <p class="mt-5 text-sm leading-7 text-brand-ink">“{{ testimonial.quote }}”</p>
          <div class="mt-7 flex items-center gap-3">
            <img :src="testimonial.image" :alt="testimonial.name" class="h-10 w-10 rounded-full object-cover">
            <div><p class="text-sm font-bold">{{ testimonial.name }}</p><p class="text-xs text-brand-muted">{{ testimonial.role }}</p></div>
            <div class="ml-auto flex gap-0.5 text-yellow-400"><OhVueIcon v-for="star in 5" :key="star" name="fa-star" scale="0.65" /></div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
