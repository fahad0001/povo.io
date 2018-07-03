import {ordersState} from './state'
import {ordersGetters} from './getters'
import {ordersActions} from './actions'
import {ordersMutations} from './mutations'

export default {
  state: ordersState,
  getters: ordersGetters,
  actions: ordersActions,
  mutations: ordersMutations
}
