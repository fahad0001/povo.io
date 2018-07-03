import _ from 'lodash'

export const categoriesGetters = {
  categories: (state) => {
    return _.orderBy(state, ['created_at'], ['desc'])
  }
}
