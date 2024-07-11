import {defineStore} from "pinia";
import type {Mob, MobClient} from "@/types";

type State = {
    mobs: MobClient[],
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
            this.mobs = mobs.map(m => {
                return {
                    ...m,
                    selected: false
                };
            });
        },
        toggle_selected(id: number) {
            for (let i = 0; i < this.mobs.length; i++) {
                if (this.mobs[i].id === id) {
                    this.mobs[i].selected = !this.mobs[i].selected;
                    break;
                }
            }
            this.mobs = this.mobs.concat([]);
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
                return state.mobs.filter((mob: MobClient) => {
                    return (mob.area === state.area);
                })
            }
        },
        mobs_selected(state: State): MobClient[] {
            if (state.area === -1) {
                return state.mobs;
            } else {
                return state.mobs.filter((mob: MobClient) => {
                    return (mob.area === state.area) && mob.selected;
                })
            }
        }
    }
});