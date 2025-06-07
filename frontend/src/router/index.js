import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home-view.vue'
import ResultView from '@/views/result-view.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/summoner/:name', component: ResultView, props: true }
]

export default createRouter({
    history: createWebHistory(),
    routes
})
