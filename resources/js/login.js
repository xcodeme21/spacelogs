document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('login-form')

  form.addEventListener('submit', function (event) {
    event.preventDefault() // Prevent the default form submission

    // Clear previous errors
    const errorElement = document.getElementById('error')
    if (errorElement) {
      errorElement.textContent = ''
    }

    const formData = new FormData(form)

    axios
      .post(form.action, formData)
      .then((response) => {
        const data = response.data
        if (data.message === 'Login successful') {
          window.location.href = '/dashboard'
        } else {
          displayError('Failed to login.')
        }
      })
      .catch((error) => {
        if (error.response && error.response.data.error) {
          displayError(error.response.data.error)
        } else {
          displayError('An unexpected error occurred.')
        }
      })
  })

  function displayError(message) {
    const errorElement = document.getElementById('error')
    if (errorElement) {
      errorElement.textContent = message
    } else {
      const errorParagraph = document.createElement('p')
      errorParagraph.id = 'error'
      errorParagraph.className = 'text-sm text-danger mb-2 -mt-2'
      errorParagraph.textContent = message
      form.querySelector('div').appendChild(errorParagraph)
    }
  }
})
