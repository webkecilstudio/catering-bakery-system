<script setup lang="ts">
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaWhatsapp } from 'oh-vue-icons/icons/fa'

addIcons(FaWhatsapp)

const route = useRoute()
const mounted = ref(false)
onMounted(() => { mounted.value = true })

const code = computed(() => String(route.query.code ?? '').toUpperCase())
const order = computed(() => (mounted.value ? getLocalOrders().find((o) => o.code === code.value) : undefined))

useHead({ title: () => `Pesanan ${code.value || ''} — Dapur Onty` })

const steps = [
  { status: 'pending', label: 'Menunggu', text: 'Pesanan masuk, menunggu konfirmasi.' },
  { status: 'confirmed', label: 'Dikonfirmasi', text: 'Pesanan dikonfirmasi & pembayaran dicek.' },
  { status: 'preparing', label: 'Disiapkan', text: 'Sedang disiapkan / dipanggang.' },
  { status: 'shipped', label: 'Dikirim', text: 'Dalam perjalanan ke lokasi.' },
  { status: 'completed', label: 'Selesai', text: 'Pesanan selesai. Terima kasih!' }
] as const

const currentIndex = computed(() => Math.max(0, steps.findIndex((step) => step.status === order.value?.status)))
const formatDate = (value: string) =>
  value ? new Date(value).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '-'

const waNumber = '6282313153539'
const waLink = computed(() => {
  if (!order.value) return '#'
  const o = order.value
  const lines = [
    `Halo Dapur Onty, saya mau konfirmasi pesanan ${o.code}.`,
    `Nama: ${o.customer.name}`,
    `Telepon: ${o.customer.phone}`,
    `Total: ${formatIDR(o.total)}`
  ]
  if (o.type === 'bakery') {
    lines.push('Item:', ...o.items.map((item) => `- ${item.qty}x ${item.name}${item.variant ? ` (${item.variant})` : ''}`))
    lines.push(`Pengiriman: ${formatDate(o.delivery?.date ?? '')}`, `Alamat: ${o.delivery?.address ?? '-'}`)
    if (o.delivery?.notes) lines.push(`Catatan: ${o.delivery.notes}`)
  } else if (o.event) {
    lines.push(`Paket: ${o.event.packageName}`, `Tamu: ${o.event.guests} pax`, `Tanggal acara: ${formatDate(o.event.date)}`, `Lokasi: ${o.event.address}`)
    lines.push('Menu:', ...o.event.dishes.map((dish) => `- ${dish.name}`))
  }
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(lines.join('\n'))}`
})
</script>

<template>
  <section v-if="!mounted" class="mx-auto max-w-4xl px-5 py-20 text-center text-sm text-brand-muted">Memuat pesanan...</section>

  <section v-else-if="!order" class="mx-auto max-w-4xl px-5 py-20 text-center">
    <h1 class="font-display text-3xl font-bold">Pesanan tidak ditemukan</h1>
    <p class="mt-2 text-sm text-brand-muted">Pastikan kode pesanan sudah benar. Data pesanan tersimpan di browser tempat kamu memesan.</p>
    <NuxtLink to="/" class="mt-6 inline-flex rounded-xl bg-brand-orange px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600">Beranda</NuxtLink>
  </section>

  <section v-else class="mx-auto max-w-4xl px-5 py-14 lg:px-8">
    <p class="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">{{ order.type === 'catering' ? 'Catering' : 'Bakery' }} order</p>
    <h1 class="mt-3 font-display text-4xl font-bold">Terima kasih, {{ order.customer.name }}!</h1>
    <p class="mt-2 text-sm text-brand-muted">Kode pesanan <strong class="text-brand-ink">{{ order.code }}</strong> · dibuat {{ formatDate(order.createdAt) }}</p>

    <ol class="mt-10 space-y-4">
      <li v-for="(step, index) in steps" :key="step.status" class="flex gap-4">
        <span
          :class="index <= currentIndex ? 'bg-brand-orange text-white' : 'bg-black/5 text-brand-muted'"
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
        >{{ index + 1 }}</span>
        <div :class="index <= currentIndex ? '' : 'opacity-50'">
          <p class="text-sm font-bold">{{ step.label }}</p>
          <p class="text-xs leading-5 text-brand-muted">{{ step.text }}</p>
        </div>
      </li>
    </ol>

    <div class="mt-10 grid gap-5 lg:grid-cols-2">
      <div class="rounded-2xl border border-black/5 p-6">
        <h2 class="font-display text-xl font-bold">Detail pesanan</h2>

        <template v-if="order.type === 'bakery'">
          <ul class="mt-4 space-y-3 text-sm">
            <li v-for="item in order.items" :key="`${item.id}-${item.variant}`" class="flex justify-between gap-3">
              <span><span class="font-bold">{{ item.qty }}×</span> {{ item.name }} <span v-if="item.variant" class="text-brand-muted">({{ item.variant }})</span></span>
              <span class="shrink-0 font-bold">{{ formatIDR(item.subtotal) }}</span>
            </li>
          </ul>
          <div class="mt-4 space-y-1 rounded-xl bg-[#fff9f4] p-4 text-sm">
            <p class="text-brand-muted">Pengiriman: <span class="font-bold text-brand-ink">{{ formatDate(order.delivery?.date ?? '') }}</span></p>
            <p class="text-brand-muted">Alamat: <span class="font-bold text-brand-ink">{{ order.delivery?.address }}</span></p>
            <p v-if="order.delivery?.notes" class="text-brand-muted">Catatan: {{ order.delivery.notes }}</p>
          </div>
        </template>

        <template v-else-if="order.event">
          <dl class="mt-4 space-y-2 text-sm">
            <div class="flex justify-between"><dt class="text-brand-muted">Paket</dt><dd class="font-bold">{{ order.event.packageName }}</dd></div>
            <div class="flex justify-between"><dt class="text-brand-muted">Tamu</dt><dd class="font-bold">{{ order.event.guests }} pax</dd></div>
            <div class="flex justify-between"><dt class="text-brand-muted">Tanggal</dt><dd class="font-bold">{{ formatDate(order.event.date) }}</dd></div>
            <div class="flex justify-between gap-6"><dt class="text-brand-muted">Lokasi</dt><dd class="text-right font-bold">{{ order.event.address }}</dd></div>
          </dl>
          <div class="mt-4 rounded-xl bg-[#fff9f4] p-4">
            <p class="text-xs font-bold uppercase tracking-wider text-brand-muted">Menu terpilih</p>
            <ul class="mt-2 grid gap-1 text-sm sm:grid-cols-2">
              <li v-for="dish in order.event.dishes" :key="dish.id">• {{ dish.name }}</li>
            </ul>
          </div>
        </template>

        <div class="my-4 h-px bg-black/10"></div>
        <p class="flex items-center justify-between text-sm text-brand-muted">Total <span class="font-display text-2xl font-bold text-brand-orange">{{ formatIDR(order.total) }}</span></p>
      </div>

      <div class="h-fit rounded-2xl bg-brand-ink p-6 text-white">
        <h2 class="font-display text-xl font-bold">Langkah selanjutnya</h2>
        <p class="mt-3 text-sm leading-6 text-white/70">Simpan kode pesanan ini. Kirim konfirmasi via WhatsApp supaya tim kami bisa cek ketersediaan dan pembayaran untuk {{ order.customer.phone }}.</p>
        <a :href="waLink" target="_blank" rel="noopener" class="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-600">
          <OhVueIcon name="fa-whatsapp" scale="1" /> Konfirmasi via WhatsApp
        </a>
        <NuxtLink to="/" class="mt-3 block text-sm font-bold text-white/60 transition hover:text-white">Kembali ke beranda</NuxtLink>
      </div>
    </div>
  </section>
</template>
