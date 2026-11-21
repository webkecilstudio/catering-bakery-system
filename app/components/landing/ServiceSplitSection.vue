<script setup lang="ts">
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaArrowRight } from 'oh-vue-icons/icons/fa'

addIcons(FaArrowRight)

const services = [
  {
    id: 'bakery',
    tag: 'Bakery',
    title: 'Beli satuan, langsung diantar',
    text: 'Roti, kue, pastry, hampers — pesan per item, checkout online, diantar fresh.',
    cta: 'Pesan bakery',
    href: '/bakery',
    steps: [
      { title: 'Pilih menu', text: 'Lihat terlaris & kategori produk.' },
      { title: 'Checkout', text: 'Isi alamat & jadwal pengiriman.' },
      { title: 'Diantar fresh', text: 'Dipanggang hari itu juga, sampai tepat waktu.' }
    ],
    dark: false
  },
  {
    id: 'catering',
    tag: 'Catering',
    title: 'Pesanan event, by request',
    text: 'Pernikahan, acara kantor, ulang tahun — pilih paket, kirim pesanan, tim kami urus sisanya.',
    cta: 'Pesan catering',
    href: '/catering',
    steps: [
      { title: 'Kirim pesanan', text: 'Tanggal, lokasi, jumlah tamu.' },
      { title: 'Konsultasi', text: 'Menu & paket disesuaikan budget.' },
      { title: 'Hari acara', text: 'Tim kami urus setup & penyajian.' }
    ],
    dark: true
  }
]
</script>

<template>
  <section id="cara-pesan" class="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
    <SectionHeading eyebrow="Cara pesan" title="Alur pesan bakery vs catering" description="Dua alur berbeda. Pilih sesuai kebutuhanmu." centered />
    <div class="mt-10 grid gap-5 lg:grid-cols-2">
      <article v-for="service in services" :key="service.id" :class="service.dark ? 'bg-brand-ink text-white' : 'border border-black/5 bg-[#fff9f4] text-brand-ink'" class="flex flex-col rounded-[2rem] p-7 sm:p-9">
        <span :class="service.dark ? 'bg-brand-orange text-white' : 'bg-white text-brand-orange'" class="inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider">{{ service.tag }}</span>
        <h3 class="mt-5 font-display text-2xl font-bold sm:text-3xl">{{ service.title }}</h3>
        <p :class="service.dark ? 'text-white/70' : 'text-brand-muted'" class="mt-3 text-sm leading-7">{{ service.text }}</p>

        <ol class="mt-7 space-y-5">
          <li v-for="(step, index) in service.steps" :key="step.title" class="flex gap-4">
            <span :class="service.dark ? 'bg-white/10 text-brand-orange' : 'bg-white text-brand-orange'" class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold">{{ index + 1 }}</span>
            <div>
              <p class="text-sm font-bold">{{ step.title }}</p>
              <p :class="service.dark ? 'text-white/60' : 'text-brand-muted'" class="mt-0.5 text-xs leading-5">{{ step.text }}</p>
            </div>
          </li>
        </ol>

        <a :href="service.href" :class="service.dark ? 'bg-brand-orange text-white hover:bg-orange-600' : 'bg-brand-ink text-white hover:bg-black'" class="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold transition">
          {{ service.cta }} <OhVueIcon name="fa-arrow-right" scale="0.85" />
        </a>
      </article>
    </div>
  </section>
</template>
