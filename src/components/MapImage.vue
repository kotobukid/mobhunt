<script setup lang="ts">
import StartPointView from "@/components/StartPoint.vue"
import MobArea from "@/components/MobArea.vue";


import {useMapStore} from "@/stores/map";
import {useMobStore} from "@/stores/mobs";
import type {Point2DWithID, Point2D} from "@/types";
import {computed, ref} from "vue";

const props = defineProps<{
  route: Point2DWithID[]
  edit: boolean
}>();

const emits = defineEmits<{
  (e: 'target-updated', value: { x: number, y: number, r: number }): void
}>();

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
const locating = ref(false);

const check_locate = (e: PointerEvent) => {
  const pos: Point2D = {x: e.offsetX, y: e.offsetY};
  if (props.edit) {
    locating.value = false;
    temp_circle.value.r = Math.round(temp_circle.value.r);

    emits('target-updated', temp_circle.value);
  } else {
    info.value = pos;
  }
};

const temp_circle = ref({
  x: 0,
  y: 0,
  r: 0
});

const move_locate = (e: PointerEvent) => {
  if (locating.value && props.edit) {
    const r = Math.sqrt(Math.pow(e.offsetX - temp_circle.value.x, 2)
      + Math.pow(e.offsetY - temp_circle.value.y, 2));
    temp_circle.value.r = r;
  }
};

const start_locate = (e: PointerEvent) => {
  if (props.edit) {
    temp_circle.value.r = 0;

    locating.value = true;
    temp_circle.value.x = e.offsetX;
    temp_circle.value.y = e.offsetY;
  }
};


</script>

<template lang="pug">
  .info X: {{ info.x }}, Y: {{ info.y }}
  svg(width="600" height="600" viewBox="0 0 600 600"
    @pointerdown="start_locate"
    @pointermove="move_locate"
    @pointerup="check_locate"
  )
    image(v-if="mapStore.active_map_detail" :href="mapStore.active_map_detail.img")
    line.route(v-for="p in paths" :x1="p.x1" :y1="p.y1" :x2="p.x2" :y2="p.y2")
    mob-area(v-for="mob in mobStore.mobs_selected" :key="mob.id" :mob="mob")
    start-point-view(v-for="start in mapStore.starts_filtered" :key="start.id" :start="start")
    circle.debug(:cx="info.x" :cy="info.y" r="2" stroke="red" stroke-width="1" fill="transparent")
    circle.temp(v-if="locating && props.edit" :cx="temp_circle.x" :cy="temp_circle.y" :r="temp_circle.r")
</template>

<style scoped lang="less">
circle.temp {
  pointer-events: none;
  fill: rgba(26, 255, 102, 0.376);
  stroke: rgb(0, 255, 142);
}

circle.debug {
  pointer-events: none;
}


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