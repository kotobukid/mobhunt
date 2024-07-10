<script setup lang="ts">
import type {Mob} from "@/types";
import {computed} from "vue";

const props = defineProps<{mob: Mob}>();

const transform = computed(() => {
  return `transform: translate(${props.mob.x}px, ${props.mob.y}px);`;
});
</script>

<template lang="pug">
  g.mob_area(:style="transform")
    circle(cx="0" cy="0" r="40" fill="pink" stroke="red" stroke-width="1")
    text(x="-2" y="8") {{ props.mob.name }}
</template>

<style scoped lang="less">
g.mob_area {
  circle {
    opacity: 0.5;
  }

  text {
    white-space: pre;
    fill: red;
    stroke: white;
    stroke-width: 1px;
    paint-order: stroke;
    font-family: Arial, sans-serif;
    font-size: 16px;
    text-anchor: middle;
  }
}
</style>