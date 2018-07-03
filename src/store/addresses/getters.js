import _ from 'lodash'

export const addressesGetters = {
  addresses: (state) => {
    return _.orderBy(state, ['created_at'], ['desc'])
  }
}
