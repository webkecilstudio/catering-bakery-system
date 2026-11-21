<script setup lang="ts">
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaSync, FaExternalLinkAlt, FaLock, FaArrowLeft } from 'oh-vue-icons/icons/fa'

addIcons(FaSync, FaExternalLinkAlt, FaLock, FaArrowLeft)

useHead({ title: 'Admin Orders — Dapur Onty' })

const authed = ref(false)
const password = ref('')
const error = ref('')
const orders = ref<any[]>([])

const checkAuth = () => {
  if (password.value === 'admin123') {
    authed.value = true
    error.value = ''
    loadOrders()
  } else {
    error.value = 'Password salah (gunakan: admin123)'
  }
}

const loadOrders = () => {
  orders.value = getLocalOrders()
}

const updateStatus = (code: string, status: any) => {
  const all = getLocalOrders()
  const found = all.find((o) => o.code === code)
  if (found) {
    found.status = status
    saveLocalOrders(all)
    loadOrders()
  }
}

const formatDate = (val: string) => (val ? new Date(val).toLocaleString('id-ID') : '-')
</script>

<template>
  <section class="mx-auto max-w-7xl px-5 py-14 lg:px-8">
    <div class="flex items-center justify-between gap-4">
      <div>
        <p class="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Panel Admin</p>
        <h1 class="mt-2 font-display text-3xl font-bold">Manajemen pesanan</h1>
      </div>
      <NuxtLink to="/" class="inline-flex items-center gap-1.5 text-sm font-bold text-brand-muted hover:text-brand-orange">
        <OhVueIcon name="fa-arrow-left" scale="0.8" /> Kembali ke beranda
      </NuxtLink>
    </div>

    <div v-if="!authed" class="mx-auto mt-16 max-w-md rounded-2xl border border-black/5 bg-[#fff9f4] p-8">
      <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-brand-orange">
        <OhVueIcon name="fa-lock" scale="1.1" />
      </div>
      <h2 class="font-display text-xl font-bold">Login Admin</h2>
      <p class="mt-1 text-xs text-brand-muted">Masukkan password pengelola untuk melihat daftar pesanan.</p>
      <form class="mt-6 space-y-4" @submit.prevent="checkAuth">
        <input v-model="password" type="password" required placeholder="Password (admin123)" class="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-orange">
        <p v-if="error" class="text-xs font-bold text-red-600">{{ error }}</p>
        <button type="submit" class="w-full rounded-xl bg-brand-orange px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600">Masuk</button>
      </form>
    </div>

    <div v-else class="mt-10">
      <div class="flex items-center justify-between">
        <p class="text-sm text-brand-muted">Total pesanan lokal: <strong class="text-brand-ink">{{ orders.length }}</strong></p>
        <button class="inline-flex items-center gap-2 rounded-xl border border-black/10 px-4 py-2 text-xs font-bold transition hover:bg-black hover:text-white" @click="loadOrders">
          <OhVueIcon name="fa-sync" scale="0.8" /> Muat ulang data
        </button>
      </div>

      <div v-if="orders.length === 0" class="mt-6 rounded-2xl border border-black/5 bg-[#fff9f4] p-12 text-center text-sm text-brand-muted">
        Belum ada pesanan tersimpan di browser ini.
      </div>

      <div v-else class="mt-6 overflow-x-auto rounded-2xl border border-black/5">
        <table class="w-full text-left text-sm">
          <thead class="bg-[#fff9f4] text-xs uppercase tracking-wider text-brand-muted">
            <tr>
              <th class="p-4">Kode</th>
              <th class="p-4">Tipe</th>
              <th class="p-4">Pemesan</th>
              <th class="p-4">Detail</th>
              <th class="p-4">Total</th>
              <th class="p-4">Status</th>
              <th class="p-4">Waktu</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-black/5">
            <tr v-for="order in orders" :key="order.code" class="hover:bg-orange-50/50">
              <td class="p-4 font-bold">
                <NuxtLink :to="{ path: '/order', query: { code: order.code } }" class="inline-flex items-center gap-1.5 text-brand-orange hover:underline" target="_blank">
                  {{ order.code }} <OhVueIcon name="fa-external-link-alt" scale="0.7" />
                </NuxtLink>
              </td>
              <td class="p-4">
                <span :class="order.type === 'catering' ? 'bg-orange-100 text-brand-orange' : 'bg-black/5 text-brand-ink'" class="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase">{{ order.type }}</span>
              </td>
              <td class="p-4">
                <p class="font-bold">{{ order.customer.name }}</p>
                <p class="text-xs text-brand-muted">{{ order.customer.phone }}</p>
              </td>
              <td class="p-4 text-xs text-brand-muted">
                <template v-if="order.type === 'bakery'">{{ order.items.length }} item</template>
                <template v-else>{{ order.event?.packageName }} ({{ order.event?.guests }} pax)</template>
              </td>
              <td class="p-4 font-bold">{{ formatIDR(order.total) }}</td>
              <td class="p-4">
                <select
                  :value="order.status"
                  class="rounded-lg border border-black/10 bg-white px-3 py-1.5 text-xs font-bold outline-none focus:border-brand-orange"
                  @change="updateStatus(order.code, ($event.target as HTMLSelectElement).value)"
                >
                  <option value="pending">Menunggu</option>
                  <option value="confirmed">Dikonfirmasi</option>
                  <option value="preparing">Disiapkan</option>
                  <option value="shipped">Dikirim</option>
                  <option value="completed">Selesai</option>
                </select>
              </td>
              <td class="p-4 text-xs text-brand-muted">{{ formatDate(order.createdAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
