<script setup lang="ts">
import {useMapStore} from "@/stores/map";
import {useMobStore} from "@/stores/mobs";
import {useCalcRoute} from "@/composables/calcRoute";

const emits = defineEmits<{
  (e: 'route-updated', value: void): void
}>();

const mapStore = useMapStore();
const mobStore = useMobStore();

const set_area = (area_id: number) => {
  mobStore.set_area(area_id);
  mapStore.set_area(area_id);

  emits('route-updated');
};
</script>

<template lang="pug">
ul
  li(v-for="m in mapStore.maps")
    span(@click="set_area(m.id)") {{ m.name }}
    //ul
      //li(v-for="start in m.starts")
      //  span {{ start.name }}
</template>

<style scoped lang="less">

</style>