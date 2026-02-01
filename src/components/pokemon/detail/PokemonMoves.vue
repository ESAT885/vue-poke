<script setup lang="ts">
defineProps<{
  moves?: {
    move: {
      name: string
    }
  }[]
}>()
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-2">Hareketler (Moves)</h2>

    <div class="max-h-40 overflow-y-auto border rounded-lg p-3">
      <ul class="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
        <li
          v-for="m in moves?.slice(0, 30)"
          :key="m.move.name"
          class="capitalize"
        >
          {{ m.move.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
