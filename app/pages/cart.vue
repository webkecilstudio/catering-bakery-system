<script setup lang="ts">
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaArrowRight } from 'oh-vue-icons/icons/fa'

addIcons(FaArrowRight)

useHead({ title: 'Keranjang — Dapur Onty' })

const { items, subtotal, count, setQty, remove, clear, cartKey } = useCart()
</script>

<template>
  <section class="mx-auto max-w-4xl px-5 py-14 lg:px-8">
    <h1 class="font-display text-4xl font-bold">Keranjang</h1>
    <p class="mt-2 text-sm text-brand-muted">{{ count }} item</p>

    <div v-if="items.length === 0" class="mt-10 rounded-2xl border border-black/5 bg-[#fff9f4] p-10 text-center">
      <p class="font-display text-2xl font-bold">Keranjang masih kosong</p>
      <p class="mt-2 text-sm text-brand-muted">Yuk pilih cake atau pastry favoritmu dulu.</p>
      <NuxtLink to="/bakery" class="mt-6 inline-flex rounded-xl bg-brand-orange px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600">Lihat katalog bakery</NuxtLink>
    </div>

    <template v-else>
      <ul class="mt-8 space-y-4">
        <li v-for="item in items" :key="cartKey(item)" class="flex flex-wrap items-center gap-4 rounded-2xl border border-black/5 p-4">
          <img :src="item.image" :alt="item.name" class="h-20 w-20 rounded-xl object-cover">
          <div class="min-w-0 flex-1">
            <p class="font-bold">{{ item.name }}</p>
            <p class="text-xs text-brand-muted">{{ item.variant || 'Standar' }} · {{ formatIDR(item.price) }}</p>
          </div>
          <div class="flex items-center rounded-xl border border-black/10">
            <button aria-label="Kurangi" class="h-9 w-9 font-bold transition hover:text-brand-orange" @click="setQty(cartKey(item), item.qty - 1)">−</button>
            <span class="w-10 text-center text-sm font-bold">{{ item.qty }}</span>
            <button aria-label="Tambah" class="h-9 w-9 font-bold transition hover:text-brand-orange" @click="setQty(cartKey(item), item.qty + 1)">+</button>
          </div>
          <p class="w-28 text-right font-bold">{{ formatIDR(item.price * item.qty) }}</p>
          <button class="text-xs font-bold text-brand-muted transition hover:text-red-600" @click="remove(cartKey(item))">Hapus</button>
        </li>
      </ul>

      <div class="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#fff9f4] p-6">
        <div>
          <p class="text-sm text-brand-muted">Subtotal</p>
          <p class="font-display text-3xl font-bold text-brand-orange">{{ formatIDR(subtotal) }}</p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <NuxtLink to="/bakery" class="rounded-xl border border-black/10 px-5 py-3 text-sm font-bold transition hover:border-brand-orange hover:text-brand-orange">Lanjut belanja</NuxtLink>
          <button class="rounded-xl border border-black/10 px-5 py-3 text-sm font-bold transition hover:border-red-300 hover:text-red-600" @click="clear">Kosongkan</button>
          <NuxtLink to="/checkout" class="inline-flex items-center gap-2 rounded-xl bg-brand-orange px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600">
            Checkout <OhVueIcon name="fa-arrow-right" scale="0.85" />
          </NuxtLink>
        </div>
      </div>
    </template>
  </section>
</template>
