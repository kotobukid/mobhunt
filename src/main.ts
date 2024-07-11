// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import data from "./assets/items.json";

console.log(data);

import App from './App.vue'
import router from './router'
import {useMapStore} from "@/stores/map";
import {useMobStore} from "@/stores/mobs";

const app = createApp(App)

app.use(createPinia())
app.use(router)

const mapStore = useMapStore();
mapStore.set_initial(data.maps);

const mobStore = useMobStore();
mobStore.set_initial(data.mobs);

if (data.maps.length > 0) {
    mapStore.set_area(data.maps[0].id);
    mobStore.set_area(data.maps[0].id);
} else {
    mapStore.set_area(0);
    mobStore.set_area(0);
}


app.mount('#app')
