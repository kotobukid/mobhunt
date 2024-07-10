<script setup lang="ts">
import {useMapStore} from "@/stores/map";
import {useMobStore} from "@/stores/mobs";
import {useCalcRoute} from "@/composables/calcRoute";
import type {Point2DWithID} from "@/types";

const emits = defineEmits<{
  (e: 'route-updated', points: Point2DWithID[]): void
}>();

const mapStore = useMapStore();
const mobStore = useMobStore();

const {getShortestRoute} = useCalcRoute();

const set_area = (area_id: number) => {
  mobStore.set_area(area_id);
  mapStore.set_area(area_id);

  const points = getShortestRoute(mapStore.starts_filtered, mobStore.mobs_filtered);

  emits('route-updated', points);
};
</script>

<template lang="pug">
ul
  li(v-for="m in mapStore.maps")
    span(@click="set_area(m.id)") {{ m.name }}
    ul
      li(v-for="start in m.starts")
        span {{ start.name }}
</template>

<style scoped lang="less">

</style>