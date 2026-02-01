<script setup lang="ts">
defineProps<{
  stats?: {
    base_stat: number
    stat: {
      name: string
    }
  }[]
}>()
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-2">İstatistikler</h2>

    <div
      v-for="s in stats"
      :key="s.stat.name"
      class="mb-2"
    >
      <div class="flex justify-between text-sm">
        <span class="capitalize">{{ s.stat.name }}</span>
        <span>{{ s.base_stat }}</span>
      </div>

      <progress
        class="progress progress-warning w-full"
        :value="s.base_stat"
        max="150"
      />
    </div>
  </div>
</template>
