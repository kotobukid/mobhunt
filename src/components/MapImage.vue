<script setup lang="ts">
import StartPointView from "@/components/StartPoint.vue"
import MobArea from "@/components/MobArea.vue";


import {useMapStore} from "@/stores/map";
import {useMobStore} from "@/stores/mobs";
import type {Point2DWithID} from "@/types";
import {computed} from "vue";

const props = defineProps<{ route: Point2DWithID[] }>()

const mapStore = useMapStore()

const mobStore = useMobStore();

const paths = computed(() => {
  const path = [];

  for (let i = 0; i < props.route.length; i++) {
    const next = props.route[i + 1];

    if (next) {
      path.push({
        x1: props.route[i].x,
        y1: props.route[i].y,
        x2: next.x,
        y2: next.y,
      })
    }
  }
  return path;
})
</script>

<template lang="pug">
  svg(width="512" height="512" viewBox="0 0 512 512")
    rect(x="0" y="0" width="512" height="512" stroke-width="0" stroke="black" fill="#d6c9c9")
    line.route(v-for="p in paths" :x1="p.x1" :y1="p.y1" :x2="p.x2" :y2="p.y2")
    mob-area(v-for="mob in mobStore.mobs_filtered" :key="mob.id" :mob="mob")
    start-point-view(v-for="start in mapStore.starts_filtered" :key="start.id" :start="start")


</template>

<style scoped lang="less">
line.route {
  fill: rgb(216, 216, 216);
  stroke: rgb(0, 0, 0);
}
</style>