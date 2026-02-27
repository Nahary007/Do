import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import FoodKinds from './components/FoodKinds.vue'
import FoodAbout from './components/Foodabout.vue'

const app = createApp(App)

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/about', component: FoodAbout
        },
        {
            path: '/kinds', component: FoodKinds
        }
    ]
});

app.use(router);
app.mount('#app')
