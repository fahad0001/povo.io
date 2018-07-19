import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import products from './products'
import creatingPoll from './creatingPoll'
import creatingOrder from './creatingOrder'
import polls from './polls'
import goods from './goods'
import addresses from './addresses'
import auth from './auth'
import orders from './orders'
import comments from './comments'
import categories from './categories'
import modals from './modals'
import mediaModals from './media-modals'

Vue.use(Vuex)
export const store = new Vuex.Store({
  modules: {
    user,
    products,
    creatingPoll,
    polls,
    auth,
    goods,
    addresses,
    categories,
    creatingOrder,
    orders,
    comments,
    modals,
    mediaModals
  }
})
