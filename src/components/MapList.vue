<script setup lang="ts">
import {useMapStore} from "@/stores/map";
import MobList from "@/components/MobList.vue";
import {useMobStore} from "@/stores/mobs";

const mapStore = useMapStore();
const mobStore = useMobStore();

const set_area = (area_id: number) => {
  mobStore.set_area(area_id);
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