<script setup lang="ts">
useHead({ title: 'Checkout — Dapur Onty' })

const { items, subtotal, count, clear, cartKey } = useCart()
const form = reactive({ name: '', phone: '', email: '', address: '', date: '', notes: '' })
const submitting = ref(false)
const error = ref('')

const submit = async () => {
  error.value = ''
  submitting.value = true
  try {
    const order = createLocalOrder({
      type: 'bakery',
      customer: { name: form.name, phone: form.phone, email: form.email },
      delivery: { address: form.address, date: form.date, notes: form.notes },
      items: items.value.map((item) => ({ id: item.id, variant: item.variant, qty: item.qty }))
    })
    clear()
    await navigateTo({ path: '/order', query: { code: order.code } })
  } catch (e: any) {
    error.value = e?.message || 'Gagal membuat pesanan, coba lagi.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section class="mx-auto max-w-5xl px-5 py-14 lg:px-8">
    <h1 class="font-display text-4xl font-bold">Checkout</h1>

    <div v-if="items.length === 0" class="mt-10 rounded-2xl border border-black/5 bg-[#fff9f4] p-10 text-center">
      <p class="font-display text-2xl font-bold">Belum ada item untuk di-checkout</p>
      <NuxtLink to="/bakery" class="mt-6 inline-flex rounded-xl bg-brand-orange px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600">Pilih menu dulu</NuxtLink>
    </div>

    <form v-else class="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]" @submit.prevent="submit">
      <div class="space-y-4">
        <div class="grid gap-4 sm:grid-cols-2">
          <label class="text-sm font-bold">Nama
            <input v-model="form.name" type="text" required class="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-sm font-normal outline-none focus:border-brand-orange">
          </label>
          <label class="text-sm font-bold">No. WhatsApp
            <input v-model="form.phone" type="tel" required placeholder="08xx" class="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-sm font-normal outline-none focus:border-brand-orange">
          </label>
        </div>
        <label class="block text-sm font-bold">Email (opsional)
          <input v-model="form.email" type="email" class="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-sm font-normal outline-none focus:border-brand-orange">
        </label>
        <label class="block text-sm font-bold">Alamat pengiriman
          <textarea v-model="form.address" rows="3" required placeholder="Alamat lengkap + patokan" class="mt-2 w-full resize-none rounded-xl border border-black/10 px-4 py-3 text-sm font-normal outline-none focus:border-brand-orange"></textarea>
        </label>
        <div class="grid gap-4 sm:grid-cols-2">
          <label class="text-sm font-bold">Tanggal pengiriman
            <input v-model="form.date" type="date" :min="todayInput()" required class="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-sm font-normal outline-none focus:border-brand-orange">
          </label>
          <label class="text-sm font-bold">Catatan (opsional)
            <input v-model="form.notes" type="text" placeholder="Ucapan di cake, jam kirim, dll" class="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-sm font-normal outline-none focus:border-brand-orange">
          </label>
        </div>
        <p v-if="error" class="rounded-lg bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{{ error }}</p>
      </div>

      <aside class="h-fit rounded-2xl border border-black/5 bg-[#fff9f4] p-6 lg:sticky lg:top-24">
        <h2 class="font-display text-xl font-bold">Pesananmu ({{ count }})</h2>
        <ul class="mt-4 space-y-3 text-sm">
          <li v-for="item in items" :key="cartKey(item)" class="flex justify-between gap-3">
            <span><span class="font-bold">{{ item.qty }}×</span> {{ item.name }} <span v-if="item.variant" class="text-brand-muted">({{ item.variant }})</span></span>
            <span class="shrink-0 font-bold">{{ formatIDR(item.price * item.qty) }}</span>
          </li>
        </ul>
        <div class="my-4 h-px bg-black/10"></div>
        <p class="flex items-center justify-between text-sm text-brand-muted">Subtotal <span class="font-display text-2xl font-bold text-brand-orange">{{ formatIDR(subtotal) }}</span></p>
        <button type="submit" :disabled="submitting" class="mt-5 w-full rounded-xl bg-brand-orange px-5 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600 disabled:opacity-60">
          {{ submitting ? 'Memproses...' : 'Buat pesanan' }}
        </button>
        <p class="mt-3 text-center text-[11px] leading-5 text-brand-muted">Pembayaran dikonfirmasi via WhatsApp setelah pesanan masuk.</p>
      </aside>
    </form>
  </section>
</template>
