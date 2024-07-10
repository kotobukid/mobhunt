<script setup lang="ts">
import {useMobStore} from "@/stores/mobs";

const mobStore = useMobStore();

</script>

<template lang="pug">
  table.mobs
    colgroup
      col(style="width: 100px;")
    thead
      tr
        th 名前
    tbody
      tr(v-for="mob in mobStore.mobs_filtered")
        td {{ mob.name }}
</template>

<style scoped lang="less">
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