import {defineStore} from "pinia";
import type {Mob, MobClient} from "@/types";

type State = {
    mobs: MobClient[],
    area: number
};

type Actions = {
    set_initial(mobs: Mob[]): void,
    toggle_selected(id: number): void,
    set_area(area: number): void,
    reset_area(): void
};

type Getters = {
    mobs_filtered(state: State): Mob[],
    mobs_selected(state: State): MobClient[]
};

export const useMobStore = defineStore<'mobs', State, Getters, Actions>('mobs', {
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