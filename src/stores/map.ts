import {defineStore} from "pinia";
import type {AreaMap, StartPoint} from "@/types";

type State = {
    maps: AreaMap[],
    active: number
};

type NumericString = string;

export const useMapStore = defineStore<'map', State, any, any>('map', {
    state() {
        return {
            maps: [],
            active: 0
        }
    },
    actions: {
        set_initial(maps: AreaMap[]) {
            this.maps = maps;
        },
        set_area(active: number) {
            this.active = active;
        }
    },
    getters: {
        starts_filtered(state: State): StartPoint[] {
            const active_area = state.maps.find(map => map.id === state.active);
            if (active_area) {
                return active_area.starts;
            } else {
                return [];
            }
        },
        active_map_detail(state: State): AreaMap {
            return state.maps.find(m => m.id === state.active)!;
        }
    }
})