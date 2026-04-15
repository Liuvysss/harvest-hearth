const NAV_BREAKPOINT = window.matchMedia('(min-width: 70rem)')

const NAV_LABELS = {
  open: 'Open navigation menu',
  close: 'Close navigation menu',
}

const FORM_MESSAGES = {
  contact: 'Thanks. Your note has been queued for the cafe team, and we will follow up within two business days.',
  newsletter: 'Thanks. You are on the list for seasonal drinks, pastry drops, and neighborhood updates.',
}

const getNavigationElements = (header) => {
  if (!(header instanceof HTMLElement)) {
    return null
  }

  const toggle = header.querySelector('[data-nav-toggle]')
  const panel = header.querySelector('[data-nav-panel]')

  if (!(toggle instanceof HTMLButtonElement) || !(panel instanceof HTMLElement)) {
    return null
  }

  return { toggle, panel }
}

const isNavigationExpanded = (toggle) => toggle.getAttribute('aria-expanded') === 'true'

const getFirstNavigationLink = (panel) => panel.querySelector('a[href], button:not([disabled])')

const setNavigationLabel = (toggle, expanded) => {
  toggle.setAttribute('aria-label', expanded ? NAV_LABELS.close : NAV_LABELS.open)
}

const setNavigationState = (header, expanded, options = {}) => {
  const elements = getNavigationElements(header)

  if (!elements) {
    return
  }

  const { toggle, panel } = elements
  const shouldExpand = !NAV_BREAKPOINT.matches && expanded

  header.classList.toggle('site-header--nav-open', shouldExpand)
  toggle.setAttribute('aria-expanded', shouldExpand ? 'true' : 'false')
  setNavigationLabel(toggle, shouldExpand)
  panel.classList.toggle('site-nav--open', shouldExpand)
  panel.hidden = !NAV_BREAKPOINT.matches && !shouldExpand

  if (!shouldExpand && options.returnFocus) {
    toggle.focus()
  }
}

const handleNavigationToggle = (header) => {
  const elements = getNavigationElements(header)

  if (!elements || NAV_BREAKPOINT.matches) {
    return
  }

  const { toggle } = elements
  setNavigationState(header, !isNavigationExpanded(toggle))
}

const handleNavigationResize = () => {
  document.querySelectorAll('.site-header').forEach((header) => {
    setNavigationState(header, false)
  })
}

const setupSiteNavigation = () => {
  document.documentElement.classList.add('has-js-nav')

  const headers = document.querySelectorAll('.site-header')

  headers.forEach((header) => {
    const elements = getNavigationElements(header)

    if (!elements) {
      return
    }

    const { toggle, panel } = elements

    setNavigationState(header, false)

    toggle.addEventListener('click', () => {
      handleNavigationToggle(header)
    })

    toggle.addEventListener('keydown', (event) => {
      if (NAV_BREAKPOINT.matches || event.key !== 'ArrowDown') {
        return
      }

      event.preventDefault()
      setNavigationState(header, true)

      const firstLink = getFirstNavigationLink(panel)

      if (firstLink instanceof HTMLElement) {
        firstLink.focus()
      }
    })

    panel.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') {
        return
      }

      event.preventDefault()
      setNavigationState(header, false, { returnFocus: true })
    })

    panel.addEventListener('click', (event) => {
      if (NAV_BREAKPOINT.matches) {
        return
      }

      const target = event.target

      if (!(target instanceof Element) || !target.closest('a[href]')) {
        return
      }

      setNavigationState(header, false)
    })

    document.addEventListener('click', (event) => {
      if (NAV_BREAKPOINT.matches || !isNavigationExpanded(toggle)) {
        return
      }

      const target = event.target

      if (target instanceof Node && header.contains(target)) {
        return
      }

      setNavigationState(header, false)
    })
  })

  NAV_BREAKPOINT.addEventListener('change', handleNavigationResize)
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

setupSiteNavigation()
document.addEventListener('submit', handleFeedbackFormSubmit)
