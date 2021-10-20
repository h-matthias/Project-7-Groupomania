import { createRouter, createWebHistory } from "vue-router";

//Pages
import Home from "../views/Home.vue";
const Login = () => import("../views/Login.vue");
const Account = () => import("../views/Account.vue");
const Mod = () => import("../views/Moderateur.vue");
const NotFound = () => import('../views/NotFound.vue')

//creation des routes
const routes = [
    {
        path: "/",
        name: "login",
        component: Login,
        beforeEnter: [checkNotLoggedIn],
    },
    {
        path: "/home",
        name: "home",
        component: Home,
        beforeEnter: [checkLoggedIn],
    },
    {
        path: "/account",
        name: "account",
        component: Account,
        beforeEnter: [checkLoggedIn],
    },
    {
        path: "/mod",
        name: "moderateur",
        component: Mod,
        /* 
            TODO : check mod 
        */
    },
    {
        path: '/notfound',
        name: 'NotFound',
        component: NotFound
      },
      {
        path: '/:wrongPath(.*)',
        redirect: (to) => {
          return { name: 'NotFound', params: { wrongPath: to.params.wrongPath } }
        }
      }
];

// creation du router
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

/* Global LocalStorage */

function checkLoggedIn() {
    if (!localStorage.getItem("currentUser")) {
        return "/login";
    }
}

function checkNotLoggedIn() {
    if (localStorage.getItem("currentUser")) {
        return "/home";
    }
}

// Exportation du router
export default router;
