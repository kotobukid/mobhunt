<script setup lang="ts">
import type {StartPoint} from "@/types";
import {computed} from "vue";

const props = defineProps<{start: StartPoint}>();

const transform = computed(() => {
  return `transform: translate(${props.start.x}px, ${props.start.y}px);`;
});
</script>

<template lang="pug">
  g.start_point(:style="transform")
    circle(cx="0" cy="0" r="4" fill="lightblue" stroke="blue" stroke-width="2")
    text(x="-2" y="24") {{ props.start.name }}
</template>

<style scoped lang="less">
g.start_point {
  text {
    white-space: pre;
    fill: black;
    stroke: white;
    stroke-width: 1px;
    paint-order: stroke;
    font-family: Arial, sans-serif;
    font-size: 16px;
    text-anchor: middle;
  }
}
</style>