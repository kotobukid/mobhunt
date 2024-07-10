import './assets/main.css'

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


app.mount('#app')
