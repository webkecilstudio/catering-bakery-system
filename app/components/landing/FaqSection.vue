<script setup lang="ts">
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaChevronDown } from 'oh-vue-icons/icons/fa'

addIcons(FaChevronDown)

const faqs = [
  {
    q: 'Berapa lama minimal order custom cake?',
    a: 'Untuk cake custom dengan dekorasi, minimal H-2 sebelum tanggal pengiriman. Untuk ukuran atau tulisan sederhana bisa H-1, tergantung slot oven.'
  },
  {
    q: 'Apakah bisa same-day delivery?',
    a: 'Bisa untuk produk yang ready stock, order sebelum jam 15.00 untuk area Jakarta Selatan, Jakarta Pusat, dan sekitarnya.'
  },
  {
    q: 'Minimal order catering berapa pax?',
    a: 'Paket catering mulai dari 10 pax (The Gatherer). Untuk acara di atas 50 pax gunakan paket The Grand Table.'
  },
  {
    q: 'Apakah harga catering sudah termasuk delivery dan setup?',
    a: 'Harga per pax belum termasuk delivery. Biaya delivery & setup dihitung berdasarkan lokasi acara dan akan dikonfirmasi tim kami via WhatsApp.'
  },
  {
    q: 'Bisa request menu khusus atau menghindari alergen?',
    a: 'Bisa. Tulis kebutuhanmu di catatan pesanan atau saat konsultasi. Kami bisa menyesuaikan menu, termasuk opsi tanpa kacang dan tanpa gluten tertentu.'
  },
  {
    q: 'Bagaimana cara pembayarannya?',
    a: 'Setelah pesanan masuk, tim kami konfirmasi ketersediaan via WhatsApp. Pembayaran melalui transfer bank, DP 50% untuk catering.'
  }
]
</script>

<template>
  <section id="faq" class="mx-auto max-w-4xl px-5 py-20 lg:px-8">
    <SectionHeading eyebrow="FAQ" title="Pertanyaan yang sering ditanyakan" description="Belum ketemu jawabannya? Chat kami via WhatsApp." centered />

    <div class="mt-10 space-y-3">
      <details v-for="faq in faqs" :key="faq.q" class="group rounded-2xl border border-black/5 bg-white p-5 open:bg-[#fff9f4]">
        <summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold">
          {{ faq.q }}
          <OhVueIcon name="fa-chevron-down" scale="0.75" class="shrink-0 text-brand-muted transition group-open:rotate-180" />
        </summary>
        <p class="mt-3 text-sm leading-7 text-brand-muted">{{ faq.a }}</p>
      </details>
    </div>
  </section>
</template>
