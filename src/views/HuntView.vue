<script setup lang="ts">
import MapList from "@/components/MapList.vue";
import MobList from "@/components/MobList.vue";
import MapImage from "@/components/MapImage.vue";
import type {Point2DWithID} from "@/types";
import {type Ref, ref} from "vue";
import {useCalcRoute} from "@/composables/calcRoute";

const {calc_route} = useCalcRoute();

const points: Ref<Point2DWithID[]> = ref([]);

const routeUpdated = () => {
  points.value = calc_route();
};

</script>

<template lang="pug">
  MapList(@route-updated="routeUpdated")
  MobList(@route-updated="routeUpdated")
  MapImage(:route="points")
</template>

<style scoped>

</style>