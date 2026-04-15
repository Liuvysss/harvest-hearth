const FORM_MESSAGES = {
  contact: 'Thanks. Your note has been queued for the cafe team, and we will follow up within two business days.',
  newsletter: 'Thanks. You are on the list for seasonal drinks, pastry drops, and neighborhood updates.',
}

const getFeedbackElement = (form) => form.querySelector('[data-form-feedback]')

const getSubmitControl = (form) =>
  form.querySelector('button[type="submit"], input[type="submit"]')

const setFeedbackState = (feedbackElement, state, message) => {
  if (!(feedbackElement instanceof HTMLElement)) {
    return
  }

  feedbackElement.hidden = false
  feedbackElement.dataset.state = state
  feedbackElement.textContent = message
}

const resetFeedbackState = (feedbackElement) => {
  if (!(feedbackElement instanceof HTMLElement)) {
    return
  }

  feedbackElement.hidden = true
  feedbackElement.textContent = ''
  delete feedbackElement.dataset.state
}

const handleFeedbackFormSubmit = (event) => {
  const form = event.target

  if (!(form instanceof HTMLFormElement) || !form.matches('[data-feedback-form]')) {
    return
  }

  event.preventDefault()

  if (!form.reportValidity()) {
    return
  }

  const feedbackElement = getFeedbackElement(form)
  const submitControl = getSubmitControl(form)
  const formKind = form.dataset.formKind || 'newsletter'
  const successMessage = FORM_MESSAGES[formKind] || FORM_MESSAGES.newsletter

  resetFeedbackState(feedbackElement)

  if (submitControl instanceof HTMLElement) {
    submitControl.setAttribute('disabled', '')
  }

  form.setAttribute('aria-busy', 'true')
  setFeedbackState(feedbackElement, 'pending', 'Sending...')

  window.setTimeout(() => {
    form.reset()
    form.removeAttribute('aria-busy')

    if (submitControl instanceof HTMLElement) {
      submitControl.removeAttribute('disabled')
    }

    setFeedbackState(feedbackElement, 'success', successMessage)
  }, 280)
}

document.addEventListener('submit', handleFeedbackFormSubmit)
