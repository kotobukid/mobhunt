import {defineStore} from "pinia";
import type {Mob} from "@/types";

type State = {
    mobs: Mob[],
    area: number
}

export const useMobStore = defineStore<'mobs', State, any, any>('mobs', {
    state() {
        return {
            mobs: [],
            area: -1
        }
    },
    actions: {
        set_initial(mobs: Mob[]) {
            this.mobs = mobs;
        },
        set_area(area: number) {
            this.area = area;
        },
        reset_area() {
            this.area = -1;
        }
    },
    getters: {
        mobs_filtered(state: State): Mob[] {
            if (state.area === -1) {
                return state.mobs;
            } else {
                return state.mobs.filter((mob: Mob) => {
                    return mob.area === state.area
                })
            }
        }
    }
});