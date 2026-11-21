<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description?: string
  centered?: boolean
}>()
</script>

<template>
  <div :class="centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'">
    <p class="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">{{ eyebrow }}</p>
    <h2 class="font-display text-3xl font-bold leading-tight text-brand-ink sm:text-4xl">{{ title }}</h2>
    <p v-if="description" class="mt-4 text-base leading-7 text-brand-muted">{{ description }}</p>
  </div>
</template>
