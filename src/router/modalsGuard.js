import {store} from '../store'
const allowedModalTypes = ['signUp', 'login']

export default (to, from, next) => {
  const { modalType } = to.query
  if (modalType && allowedModalTypes.includes(modalType)) {
    store.commit(modalType + 'Modal', true)
  }
  next(true)
}
