import { authState } from './state'
import { authGetters } from './getters'
import { authActions } from './actions'
import { authMutations } from './mutations'

export default {
  state: authState,
  getters: authGetters,
  actions: authActions,
  mutations: authMutations
}
