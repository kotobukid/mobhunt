<script setup lang="ts">
import StartPointView from "@/components/StartPoint.vue"
import MobArea from "@/components/MobArea.vue";


import {useMapStore} from "@/stores/map";
import {useMobStore} from "@/stores/mobs";
import type {Point2DWithID, Point2D} from "@/types";
import {computed, ref} from "vue";

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
});

const info = ref({x: -5, y: -5})

const check_locate = (e: PointerEvent) => {
  const pos: Point2D = {x: e.offsetX, y: e.offsetY};
  info.value = pos;
};
</script>

<template lang="pug">
  .info X: {{ info.x }}, Y: {{ info.y }}
  svg(width="600" height="600" viewBox="0 0 600 600" @pointerup="check_locate")
    image(v-if="mapStore.active_map_detail" :href="mapStore.active_map_detail.img")
    line.route(v-for="p in paths" :x1="p.x1" :y1="p.y1" :x2="p.x2" :y2="p.y2")
    mob-area(v-for="mob in mobStore.mobs_selected" :key="mob.id" :mob="mob")
    start-point-view(v-for="start in mapStore.starts_filtered" :key="start.id" :start="start")
    circle.debug(:cx="info.x" :cy="info.y" r="2" stroke="red" stroke-width="1" fill="transparent")
</template>

<style scoped lang="less">
div.info {
  width: 800px;
  height: 40px;
  padding: 5px;
  background-color: #efefef;
}

line.route {
  fill: rgb(216, 216, 216);
  stroke: rgb(0, 0, 0);
}
</style>