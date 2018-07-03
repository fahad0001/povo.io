import _orderBy from 'lodash/orderBy'

export const pollsGetters = {
  polls: (state) => {
    return _orderBy(state, ['created_at'], ['desc'])
  },

  actualPolls: (state) => {
    return _orderBy(state, ['created_at'], ['desc'])
  },

  popularPolls: (state) => {
    return _orderBy(state, ['votes_count'], ['desc'])
  },

  endingSoonPolls: (state) => {
    return _orderBy(state, ['expiration_date'], ['asc'])
  }
}
