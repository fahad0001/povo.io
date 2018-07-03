import {commentsState} from './state'
import {commentsGetters} from './getters'
import {commentsActions} from './actions'
import {commentsMutations} from './mutations'

export default {
  state: commentsState,
  getters: commentsGetters,
  actions: commentsActions,
  mutations: commentsMutations
}
