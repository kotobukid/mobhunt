import {defineStore} from "pinia";
import type {AreaMap, StartPoint} from "@/types";

type State = {
    maps: AreaMap[]
};

type NumericString = string;

export const useMapStore = defineStore<'map', State, any, any>('map', {
    state() {
        return {
            maps: []
        }
    },
    actions: {
        set_initial(maps: AreaMap[]) {
            this.maps = maps;
        }
    },
    getters: {}
})