import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _da68403e = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _31b39aaf = () => interopDefault(import('../pages/activate-account.vue' /* webpackChunkName: "pages/activate-account" */))
const _663db42a = () => interopDefault(import('../pages/dashboard/index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _4a142d90 = () => interopDefault(import('../pages/events/index.vue' /* webpackChunkName: "pages/events/index" */))
const _5ed1d759 = () => interopDefault(import('../pages/forgot-password.vue' /* webpackChunkName: "pages/forgot-password" */))
const _7c2b5dbd = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _78e285ff = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _0adc1b60 = () => interopDefault(import('../pages/terms-and-conditions.vue' /* webpackChunkName: "pages/terms-and-conditions" */))
const _aa921396 = () => interopDefault(import('../pages/verify-account.vue' /* webpackChunkName: "pages/verify-account" */))
const _2a0f0063 = () => interopDefault(import('../pages/dashboard/developer.vue' /* webpackChunkName: "pages/dashboard/developer" */))
const _2929935a = () => interopDefault(import('../pages/dashboard/events/index.vue' /* webpackChunkName: "pages/dashboard/events/index" */))
const _12a76702 = () => interopDefault(import('../pages/dashboard/profile.vue' /* webpackChunkName: "pages/dashboard/profile" */))
const _6a3af329 = () => interopDefault(import('../pages/dashboard/promoter.vue' /* webpackChunkName: "pages/dashboard/promoter" */))
const _00887a68 = () => interopDefault(import('../pages/dashboard/transactions.vue' /* webpackChunkName: "pages/dashboard/transactions" */))
const _3870ceb0 = () => interopDefault(import('../pages/dashboard/wallet.vue' /* webpackChunkName: "pages/dashboard/wallet" */))
const _aca0426a = () => interopDefault(import('../pages/dashboard/events/create.vue' /* webpackChunkName: "pages/dashboard/events/create" */))
const _050745ae = () => interopDefault(import('../pages/dashboard/events/details/_id.vue' /* webpackChunkName: "pages/dashboard/events/details/_id" */))
const _22464cc0 = () => interopDefault(import('../pages/events/_id.vue' /* webpackChunkName: "pages/events/_id" */))
const _9af88ab4 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _da68403e,
    name: "about"
  }, {
    path: "/activate-account",
    component: _31b39aaf,
    name: "activate-account"
  }, {
    path: "/dashboard",
    component: _663db42a,
    name: "dashboard"
  }, {
    path: "/events",
    component: _4a142d90,
    name: "events"
  }, {
    path: "/forgot-password",
    component: _5ed1d759,
    name: "forgot-password"
  }, {
    path: "/login",
    component: _7c2b5dbd,
    name: "login"
  }, {
    path: "/register",
    component: _78e285ff,
    name: "register"
  }, {
    path: "/terms-and-conditions",
    component: _0adc1b60,
    name: "terms-and-conditions"
  }, {
    path: "/verify-account",
    component: _aa921396,
    name: "verify-account"
  }, {
    path: "/dashboard/developer",
    component: _2a0f0063,
    name: "dashboard-developer"
  }, {
    path: "/dashboard/events",
    component: _2929935a,
    name: "dashboard-events"
  }, {
    path: "/dashboard/profile",
    component: _12a76702,
    name: "dashboard-profile"
  }, {
    path: "/dashboard/promoter",
    component: _6a3af329,
    name: "dashboard-promoter"
  }, {
    path: "/dashboard/transactions",
    component: _00887a68,
    name: "dashboard-transactions"
  }, {
    path: "/dashboard/wallet",
    component: _3870ceb0,
    name: "dashboard-wallet"
  }, {
    path: "/dashboard/events/create",
    component: _aca0426a,
    name: "dashboard-events-create"
  }, {
    path: "/dashboard/events/details/:id?",
    component: _050745ae,
    name: "dashboard-events-details-id"
  }, {
    path: "/events/:id",
    component: _22464cc0,
    name: "events-id"
  }, {
    path: "/",
    component: _9af88ab4,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
