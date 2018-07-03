import _ from 'lodash'

export const productsGetters = {
  products: (state) => _.orderBy(state, ['created_at'], ['desc'])
}
