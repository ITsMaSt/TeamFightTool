import { createRouter, createWebHistory } from 'vue-router'
import HomeViewView from '../views/home-view.vue'

const routes = [
    { path: '/', component: HomeViewView },
    // später: { path: '/stats/:puuid', component: StatView }
]

export default createRouter({
    history: createWebHistory(),
    routes
})
