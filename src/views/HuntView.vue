<script setup lang="ts">
import MapList from "@/components/MapList.vue";
import MobList from "@/components/MobList.vue";
import MapImage from "@/components/MapImage.vue";
import type {Point2DWithID} from "@/types";
import {type Ref, ref} from "vue";

const points: Ref<Point2DWithID[]> = ref([]);

const routeUpdated = (_points: Point2DWithID[]) => {
  points.value = _points;
};

</script>

<template lang="pug">
  ul
    li(v-for="p in points") {{ p }}
  MapList(@route-updated="routeUpdated")
  MobList
  MapImage(:route="points")
</template>

<style scoped>

</style>