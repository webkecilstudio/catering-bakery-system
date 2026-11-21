<script setup lang="ts">
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { FaArrowLeft } from 'oh-vue-icons/icons/fa'

addIcons(FaArrowLeft)

const route = useRoute()
const catalog = getCatalog()
const pkg = computed(() => catalog.packages.find((p) => p.slug === route.params.slug))

if (!pkg.value) {
  throw createError({ statusCode: 404, statusMessage: 'Paket tidak ditemukan', fatal: true })
}

useHead({ title: () => `${pkg.value?.name ?? 'Paket'} — Dapur Onty` })

const dishes = computed(() => catalog.dishes)
const dishGroups = [
  { type: 'savory', label: 'Gurih' },
  { type: 'sweet', label: 'Manis' },
  { type: 'drink', label: 'Minuman' }
] as const

const guests = ref(pkg.value.minGuests)
const selected = ref<string[]>([])
const warning = ref('')
const form = reactive({ name: '', phone: '', email: '', date: '', address: '' })
const total = computed(() => pkg.value.pricePerPax * guests.value)
const submitting = ref(false)
const error = ref('')

const toggleDish = (id: string) => {
  warning.value = ''
  if (selected.value.includes(id)) {
    selected.value = selected.value.filter((dishId) => dishId !== id)
    return
  }
  if (selected.value.length >= pkg.value.dishSlots) {
    warning.value = `Maksimal ${pkg.value.dishSlots} menu untuk paket ini`
    return
  }
  selected.value.push(id)
}

const submit = async () => {
  error.value = ''
  if (selected.value.length === 0) {
    error.value = 'Pilih minimal 1 menu untuk acaramu'
    return
  }
  submitting.value = true
  try {
    const order = createLocalOrder({
      type: 'catering',
      customer: { name: form.name, phone: form.phone, email: form.email },
      event: {
        packageId: pkg.value.id,
        guests: guests.value,
        date: form.date,
        address: form.address,
        dishes: selected.value
      }
    })
    await navigateTo({ path: '/order', query: { code: order.code } })
  } catch (e: any) {
    error.value = e?.message || 'Gagal mengirim pesanan, coba lagi.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section v-if="pkg" class="mx-auto max-w-7xl px-5 py-14 lg:px-8">
    <NuxtLink to="/catering" class="inline-flex items-center gap-2 text-sm font-bold text-brand-muted transition hover:text-brand-orange">
      <OhVueIcon name="fa-arrow-left" scale="0.85" /> Semua paket catering
    </NuxtLink>

    <div class="mt-6 grid gap-4 sm:grid-cols-3">
      <div class="overflow-hidden rounded-2xl bg-orange-50 sm:col-span-2">
        <img :src="pkg.image" :alt="pkg.name" class="h-44 w-full object-cover">
        <div class="p-5">
          <h1 class="font-display text-3xl font-bold sm:text-4xl">{{ pkg.name }}</h1>
          <p class="mt-2 text-sm leading-6 text-brand-muted">{{ pkg.description }}</p>
          <p class="mt-4 text-2xl font-bold text-brand-orange">{{ formatIDR(pkg.pricePerPax) }} <span class="text-sm font-normal text-brand-muted">/ pax</span></p>
        </div>
      </div>
      <div class="rounded-2xl bg-brand-ink p-5 text-white">
        <p class="text-xs font-bold uppercase tracking-wider text-orange-300">Termasuk</p>
        <ul class="mt-3 space-y-2 text-sm">
          <li v-for="item in pkg.includes" :key="item"><span class="mr-2 text-orange-300">✓</span>{{ item }}</li>
        </ul>
      </div>
    </div>

    <form class="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]" @submit.prevent="submit">
      <div class="space-y-10">
        <div>
          <div class="flex items-end justify-between gap-4">
            <div>
              <h2 class="font-display text-2xl font-bold">1. Pilih menu</h2>
              <p class="mt-1 text-sm text-brand-muted">Pilih {{ pkg.dishSlots }} menu. Terpilih {{ selected.length }}/{{ pkg.dishSlots }}.</p>
            </div>
          </div>
          <p v-if="warning" class="mt-3 rounded-lg bg-orange-50 px-4 py-2 text-xs font-bold text-brand-orange">{{ warning }}</p>

          <div v-for="group in dishGroups" :key="group.type" class="mt-6">
            <h3 class="text-xs font-bold uppercase tracking-wider text-brand-muted">{{ group.label }}</h3>
            <div class="mt-3 grid gap-2 sm:grid-cols-2">
              <label
                v-for="dish in dishes.filter((d) => d.type === group.type)"
                :key="dish.id"
                :class="selected.includes(dish.id) ? 'border-brand-orange bg-orange-50' : 'border-black/10 hover:border-brand-orange'"
                class="flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition"
              >
                <input type="checkbox" class="accent-brand-orange" :checked="selected.includes(dish.id)" @change="toggleDish(dish.id)">
                <img :src="dish.image" :alt="dish.name" class="h-12 w-12 shrink-0 rounded-lg object-cover">
                <span>
                  <span class="block font-bold">{{ dish.name }}</span>
                  <span class="block text-xs text-brand-muted">{{ dish.description }}</span>
                </span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <h2 class="font-display text-2xl font-bold">2. Detail acara</h2>
          <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <label class="text-sm font-bold">Jumlah tamu
              <input v-model.number="guests" type="number" :min="pkg.minGuests" :max="pkg.maxGuests" required class="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-sm font-normal outline-none focus:border-brand-orange">
            </label>
            <label class="text-sm font-bold">Tanggal acara
              <input v-model="form.date" type="date" :min="todayInput()" required class="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-sm font-normal outline-none focus:border-brand-orange">
            </label>
            <label class="text-sm font-bold sm:col-span-2">Lokasi / alamat acara
              <input v-model="form.address" type="text" required placeholder="Nama venue dan alamat lengkap" class="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-sm font-normal outline-none focus:border-brand-orange">
            </label>
          </div>
          <p class="mt-3 text-xs text-brand-muted">Minimal {{ pkg.minGuests }} tamu, maksimal {{ pkg.maxGuests }} tamu untuk paket ini.</p>
        </div>

        <div>
          <h2 class="font-display text-2xl font-bold">3. Data pemesan</h2>
          <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <label class="text-sm font-bold">Nama
              <input v-model="form.name" type="text" required class="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-sm font-normal outline-none focus:border-brand-orange">
            </label>
            <label class="text-sm font-bold">No. WhatsApp
              <input v-model="form.phone" type="tel" required placeholder="08xx" class="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-sm font-normal outline-none focus:border-brand-orange">
            </label>
            <label class="text-sm font-bold sm:col-span-2">Email (opsional)
              <input v-model="form.email" type="email" class="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-sm font-normal outline-none focus:border-brand-orange">
            </label>
          </div>
        </div>
      </div>

      <aside class="h-fit rounded-2xl border border-black/5 bg-[#fff9f4] p-6 lg:sticky lg:top-24">
        <h2 class="font-display text-xl font-bold">Ringkasan</h2>
        <dl class="mt-4 space-y-2 text-sm">
          <div class="flex justify-between"><dt class="text-brand-muted">Paket</dt><dd class="font-bold">{{ pkg.name }}</dd></div>
          <div class="flex justify-between"><dt class="text-brand-muted">Tamu</dt><dd class="font-bold">{{ guests }} pax</dd></div>
          <div class="flex justify-between"><dt class="text-brand-muted">Menu terpilih</dt><dd class="font-bold">{{ selected.length }}/{{ pkg.dishSlots }}</dd></div>
          <div class="flex justify-between"><dt class="text-brand-muted">Harga / pax</dt><dd class="font-bold">{{ formatIDR(pkg.pricePerPax) }}</dd></div>
        </dl>
        <div class="my-4 h-px bg-black/10"></div>
        <p class="flex items-center justify-between text-sm text-brand-muted">Total estimasi <span class="font-display text-2xl font-bold text-brand-orange">{{ formatIDR(total) }}</span></p>
        <p v-if="error" class="mt-4 rounded-lg bg-red-50 px-4 py-2 text-xs font-bold text-red-600">{{ error }}</p>
        <button type="submit" :disabled="submitting" class="mt-5 w-full rounded-xl bg-brand-orange px-5 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600 disabled:opacity-60">
          {{ submitting ? 'Mengirim...' : 'Kirim pesanan catering' }}
        </button>
        <p class="mt-3 text-center text-[11px] leading-5 text-brand-muted">Belum ada pembayaran. Tim kami konfirmasi ketersediaan dan pembayaran via WhatsApp.</p>
      </aside>
    </form>
  </section>
</template>
