import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home-view.vue'
import ResultView from '@/views/result-view.vue'

const routes = [
    { path: '/', component: HomeView },
    {
        path: '/summoner/:gameName/:tagLine',
        component: ResultView,
        props: true
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login-view.vue')
    }

]


export default createRouter({
    history: createWebHistory(),
    routes
})
