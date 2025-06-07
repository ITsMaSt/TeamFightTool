import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '@/views/home-view.vue'
import LoginView from '@/views/login-view.vue'
import ResultView from '@/views/result-view.vue'

const routes = [
    //{ path: '/', name: 'home', component: HomeView },
    { path: '/', name: 'login', component: LoginView },
    {
        path: '/summoner/:gameName/:tagLine',
        component: ResultView,
        props: true
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
