<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{ sprites: any }>()
const selected = ref<string | null>(null)

const thumbnails = computed(() =>
  [
    props.sprites?.other?.['official-artwork']?.front_default,
    props.sprites?.front_default,
    props.sprites?.back_default,
    props.sprites?.front_shiny,
    props.sprites?.other?.home?.front_default
  ].filter(Boolean)
)

const mainImage = computed(() => selected.value || thumbnails.value[0])
</script>

<template>
  <div class="text-center">
    <img v-if="mainImage" :src="mainImage" class="w-56 h-56 mx-auto" />

    <div class="flex gap-3 justify-center mt-4">
      <img
        v-for="(img,i) in thumbnails"
        :key="i"
        :src="img"
        class="w-20 h-20 cursor-pointer border rounded-lg"
        @click="selected = img"
      />
    </div>
  </div>
</template>
