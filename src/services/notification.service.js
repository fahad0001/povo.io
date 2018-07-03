class NotificationService {
  showSuccess (message) {
    /* eslint-disable no-undef */
    return toastr.success(message)
  }

  showError (message) {
    /* eslint-disable no-undef */
    return toastr.error(message)
  }
}

export default new NotificationService()
