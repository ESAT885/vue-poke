<script setup lang="ts">
defineProps<{
  height?: number
  weight?: number
  baseExp?: number
  captureRate?: number
}>()
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div class="stat bg-base-200 p-4 rounded-xl">
      <div class="stat-title">Boy</div>
      <div class="stat-value">{{ (height ?? 0) / 10 }} m</div>
    </div>

    <div class="stat bg-base-200 p-4 rounded-xl">
      <div class="stat-title">Kilo</div>
      <div class="stat-value">{{ (weight ?? 0) / 10 }} kg</div>
    </div>

    <div class="stat bg-base-200 p-4 rounded-xl">
      <div class="stat-title">Base Exp</div>
      <div class="stat-value">{{ baseExp }}</div>
    </div>

    <div class="stat bg-base-200 p-4 rounded-xl">
      <div class="stat-title">Yakalama</div>
      <div class="stat-value">{{ captureRate }}</div>
    </div>
  </div>
</template>
