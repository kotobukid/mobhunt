<script setup lang="ts">
import MapList from "@/components/MapList.vue";
import MobList from "@/components/MobList.vue";
import MapImage from "@/components/MapImage.vue";
import type {Mob, MobClient, Point2DWithID} from "@/types";
import {type Ref, ref} from "vue";
import {useCalcRoute} from "@/composables/calcRoute";
import {useMobStore} from "@/stores/mobs";
import {useMapStore} from "@/stores/map";

const mobStore = useMobStore();
const mapStore = useMapStore();

const {calc_route, calculateAllDistances} = useCalcRoute();

const points: Ref<Point2DWithID[]> = ref([]);

const routeUpdated = () => {
  points.value = calc_route(map_distances_all.value);
};

const edit_target: Ref<MobClient | null> = ref(null);

const set_edit_target_mob = (m: MobClient) => {
  edit_target.value = m;
};

const target_updated = (circle: { x: number, y: number, r: number }) => {
  mobStore.update_mob({
    ...edit_target.value!,
    ...circle
  });
  edit_target.value = null;
};

const map_distances_all: Ref<Map<string, number>> = ref(new Map())

const pre_calc_all_distances = () => {
  const map = mapStore.active_map_detail;
  const mobs = mobStore.mobs_filtered;
  const allDistances = calculateAllDistances([...map!.starts, ...mobs]);
  console.log(allDistances);
  map_distances_all.value = allDistances;
}
</script>

<template lang="pug">
  MapList(@route-updated="routeUpdated")
  button(@click="pre_calc_all_distances") 距離計算
  MobList(
    @route-updated="routeUpdated"
    @set-edit-target="set_edit_target_mob"
    :edit_target_id="edit_target ? edit_target.id : 0"
  )
  MapImage(
    :route="points"
    :edit="edit_target ? edit_target.id > 0 : false"
    @target-updated="target_updated"
  )
</template>

<style scoped>

</style>