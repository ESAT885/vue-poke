<script setup lang="ts">
defineProps<{ isFavorite: boolean }>()
defineEmits(['toggle'])
</script>

<template>
  <button
    class="absolute top-3 right-3 btn btn-xs btn-circle"
    @click.stop.prevent="$emit('toggle')"
  >
    <span :class="isFavorite ? 'text-yellow-400' : 'text-gray-400'">★</span>
  </button>
</template>
