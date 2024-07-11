<script setup lang="ts">
import {useMobStore} from "@/stores/mobs";

const emits = defineEmits<{
  (e: 'route-updated', value: void): void
}>();

const mobStore = useMobStore();

const toggle_selected = (id: number) => {
  mobStore.toggle_selected(id);

  emits('route-updated');
};

</script>

<template lang="pug">
  table.mobs(style="width: 220px;")
    colgroup
      col(style="width: 20px;")
      col(style="width: 200px;")
    thead
      tr
        th
        th 名前
    tbody
      tr(v-for="mob in mobStore.mobs_filtered" @click="toggle_selected(mob.id)")
        td.center
          span(v-if="mob.selected") ✔
          span(v-else)
        td {{ mob.name }}
</template>

<style scoped lang="less">

.center {
  text-align: center;
}

table.mobs {
  table-layout: fixed;
  border-collapse: collapse;
}

th {
  background-color: #121212;
  color: white;
}

td {
  background-color: white;
  border: 1px solid #121212;
  color: #121212
}
</style>