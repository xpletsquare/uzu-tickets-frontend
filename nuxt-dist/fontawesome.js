import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import {
  FontAwesomeLayers,
  FontAwesomeLayersText,
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

import {
  faSearch as freeFasFaSearch,
  faChevronRight as freeFasFaChevronRight,
  faChevronDown as freeFasFaChevronDown,
  faExclamation as freeFasFaExclamation,
  faCalendarCheck as freeFasFaCalendarCheck,
  faMapMarkerAlt as freeFasFaMapMarkerAlt,
  faMoneyBillWave as freeFasFaMoneyBillWave,
  faBars as freeFasFaBars,
  faTimes as freeFasFaTimes,
  faClone as freeFasFaClone,
  faPaperPlane as freeFasFaPaperPlane
} from '@fortawesome/free-solid-svg-icons'

import {
  faTwitter as freeFabFaTwitter,
  faLinkedin as freeFabFaLinkedin,
  faInstagram as freeFabFaInstagram,
  faFacebookF as freeFabFaFacebookF
} from '@fortawesome/free-brands-svg-icons'

library.add(
  freeFasFaSearch,
  freeFasFaChevronRight,
  freeFasFaChevronDown,
  freeFasFaExclamation,
  freeFasFaCalendarCheck,
  freeFasFaMapMarkerAlt,
  freeFasFaMoneyBillWave,
  freeFasFaBars,
  freeFasFaTimes,
  freeFasFaClone,
  freeFasFaPaperPlane,
  freeFabFaTwitter,
  freeFabFaLinkedin,
  freeFabFaInstagram,
  freeFabFaFacebookF
)

config.autoAddCss = false

Vue.component('fa', FontAwesomeIcon)
Vue.component('faLayers', FontAwesomeLayers)
Vue.component('faLayersText', FontAwesomeLayersText)
