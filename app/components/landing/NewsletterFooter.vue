<script setup lang="ts">
import { ref } from 'vue'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaTwitter } from 'oh-vue-icons/icons/fa'

addIcons(FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaTwitter)
const subscribed = ref(false)
</script>

<template>
  <footer id="contact" class="bg-brand-ink text-white">
    <div class="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div class="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div><p class="font-display text-3xl font-bold">Sedikit manis,<br><span class="text-brand-orange">langsung ke inbox-mu.</span></p><p class="mt-4 max-w-md text-sm leading-6 text-white/60">Dapatkan info pertama soal menu baru, promo musiman, dan hidangan spesial.</p>
          <form v-if="!subscribed" class="mt-6 flex max-w-md gap-2" @submit.prevent="subscribed = true"><input required type="email" placeholder="Alamat email kamu" class="min-w-0 flex-1 rounded-xl bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:ring-2 focus:ring-brand-orange"><button type="submit" class="rounded-xl bg-brand-orange px-5 py-3 text-sm font-bold">Langganan</button></form>
          <p v-else class="mt-6 text-sm font-bold text-orange-300">Kamu sudah terdaftar. Sampai jumpa di inbox!</p>
        </div>
        <div class="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div><p class="text-xs font-bold uppercase tracking-wider text-white/40">Jelajahi</p><div class="mt-4 space-y-3 text-sm text-white/70"><NuxtLink class="block hover:text-white" to="/bakery">Menu kami</NuxtLink><NuxtLink class="block hover:text-white" to="/catering">Catering</NuxtLink><NuxtLink class="block hover:text-white" to="/#story">Cerita kami</NuxtLink><NuxtLink class="block hover:text-white" to="/#faq">FAQ</NuxtLink><NuxtLink class="block hover:text-white" to="/#gallery">Galeri</NuxtLink></div></div>
          <div><p class="text-xs font-bold uppercase tracking-wider text-white/40">Kunjungi kami</p><div class="mt-4 space-y-3 text-sm text-white/70"><p class="flex gap-2"><OhVueIcon name="fa-map-marker-alt" scale="0.8" /> Jl. Kemang Raya 12</p><p class="flex gap-2"><OhVueIcon name="fa-phone" scale="0.8" /> +62 823-1315-3539</p><p class="flex gap-2"><OhVueIcon name="fa-envelope" scale="0.8" /> hello@dapurontyco</p></div></div>
          <div class="col-span-2 sm:col-span-1"><p class="text-xs font-bold uppercase tracking-wider text-white/40">Jam buka</p><div class="mt-4 space-y-3 text-sm text-white/70"><p>Senin–Jumat: 07.00–20.00</p><p>Sabtu–Minggu: 08.00–21.00</p></div></div>
        </div>
      </div>
      <div class="mt-14 flex flex-col justify-between gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center"><p class="text-xs text-white/40">© 2026 Dapur Onty. Seluruh hak cipta dilindungi.</p><div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/40"><span>Created by <a href="https://webkecilstudio.github.io/catalogue/" target="_blank" rel="noopener" class="font-bold text-white/70 underline underline-offset-2 transition hover:text-brand-orange">Webkecil Studio</a></span><span class="hidden sm:inline">·</span><a href="tel:+6282313153539" class="transition hover:text-white">+62 823-1315-3539</a></div><div class="flex gap-4 text-white/60"><a href="#" aria-label="Instagram" class="transition hover:text-brand-orange"><OhVueIcon name="fa-instagram" /></a><a href="#" aria-label="Facebook" class="transition hover:text-brand-orange"><OhVueIcon name="fa-facebook" /></a><a href="#" aria-label="Twitter" class="transition hover:text-brand-orange"><OhVueIcon name="fa-twitter" /></a></div></div>
    </div>
  </footer>
</template>
