<script setup lang="ts">
import type {MobClient} from "@/types";
import {useMobStore} from "@/stores/mobs";

const props = defineProps<{
  edit_target_id: number
}>();

const emits = defineEmits<{
  (e: 'route-updated', value: void): void
  (e: 'set-edit-target', value: MobClient): void
}>();

const mobStore = useMobStore();

const toggle_selected = (id: number) => {
  mobStore.toggle_selected(id);

  emits('route-updated');
};


const start_edit = (mob: MobClient) => {
  emits('set-edit-target', mob);
};

</script>

<template lang="pug">
  table.mobs(style="width: 220px;")
    colgroup
      col(style="width: 20px;")
      col(style="width: 200px;")
      col(style="width: 40px;")
      col(style="width: 40px;")
      col(style="width: 40px;")
      col(style="width: 120px;")
    thead
      tr
        th
        th 名前
        th X
        th Y
        th R
        th op
    tbody
      tr.mob(
        v-for="mob in mobStore.mobs_filtered"
        @click="toggle_selected(mob.id)"
        :class="props.edit_target_id == mob.id ? 'edit_target' : ''"
      )
        td.center
          span(v-if="mob.selected") ✔
          span(v-else)
        td {{ mob.name }}
        td.center {{ mob.x }}
        td.center {{ mob.y }}
        td.center {{ mob.r }}
        td
          button(@click.stop="start_edit(mob)") edit
</template>

<style scoped lang="less">

.center {
  text-align: center;
}

table.mobs {
  table-layout: fixed;
  border-collapse: collapse;
}

tr.mob {
  background-color: white;
  &.edit_target {
    background-color: lightgreen;
  }
}

th {
  background-color: #121212;
  color: white;
}

td {
  background-color: transparent;
  border: 1px solid #121212;
  color: #121212
}
</style>