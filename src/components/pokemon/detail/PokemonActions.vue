<script setup lang="ts">
defineProps<{
  pokemonId?: number
  isFavorite: boolean
}>()

defineEmits<{
  (e: 'toggleFavorite', id: number): void
}>()
</script>

<template>
  <div class="flex justify-between items-center">
    <RouterLink to="/" class="btn btn-outline">← Geri</RouterLink>

    <button
      class="btn"
      :class="isFavorite ? 'btn-warning' : 'btn-outline'"
      @click="$emit('toggleFavorite', pokemonId ?? 0)"
    >
      {{ isFavorite ? '⭐ Favorilerden Çıkar' : '☆ Favorilere Ekle' }}
    </button>
  </div>
</template>
