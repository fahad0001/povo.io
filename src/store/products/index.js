import {productsState} from './state'
import {productsMutations} from './mutations'
import {productsActions} from './actions'
import {productsGetters} from './getters'

export default {
  state: productsState,
  mutations: productsMutations,
  getters: productsGetters,
  actions: productsActions
}
