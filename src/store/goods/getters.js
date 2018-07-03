import _ from 'lodash'

export const goodsGetters = {
  goods: (state) => {
    return _.orderBy(state, ['created_at'], ['desc'])
  }
}
