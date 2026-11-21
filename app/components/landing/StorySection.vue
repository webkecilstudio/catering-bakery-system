<script setup lang="ts">
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaArrowRight } from 'oh-vue-icons/icons/fa'

addIcons(FaArrowRight)
</script>

<template>
  <section id="story" class="bg-[#fff9f4]"><div class="mx-auto max-w-7xl px-5 py-20 lg:px-8">
    <div class="grid items-center gap-12 lg:grid-cols-2">
      <div>
        <SectionHeading eyebrow="Cerita kami" title="Makanan enak dimulai dari niat baik." description="Dapur Onty lahir dari dapur rumah kecil dengan mimpi besar: membuat momen sehari-hari terasa lebih istimewa. Sampai sekarang, kami tetap memanggang dalam batch kecil, memilih bahan dengan teliti, dan menuangkan hati ke setiap kotak." />
        <p class="mt-5 text-sm leading-7 text-brand-muted">Kami percaya resep terbaik selalu dibagi — di meja makan, di pesta, atau di momen tenang bersama secangkir kopi hangat.</p>
        <a href="#contact" class="mt-7 inline-flex items-center gap-2 rounded-xl border border-brand-ink/15 px-6 py-3.5 text-sm font-bold transition hover:border-brand-orange hover:text-brand-orange">
          Kenalan dengan baker kami <OhVueIcon name="fa-arrow-right" scale="0.85" />
        </a>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <img :src="asset('/images/story/1.jpg')" alt="Baker menyiapkan adonan segar" class="mt-10 h-64 w-full rounded-2xl object-cover">
        <img :src="asset('/images/story/2.jpg')" alt="Roti segar dari oven" class="h-64 w-full rounded-2xl object-cover">
      </div>
    </div>
    </div>
  </section>
</template>
