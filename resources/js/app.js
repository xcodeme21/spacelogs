document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('mobile-menu-button')
  const mobileMenu = document.getElementById('mobile-menu')
  const openIcon = menuButton.querySelector('svg:nth-of-type(1)')
  const closeIcon = menuButton.querySelector('svg:nth-of-type(2)')

  menuButton.addEventListener('click', function () {
    mobileMenu.classList.toggle('hidden')
    openIcon.classList.toggle('hidden')
    closeIcon.classList.toggle('hidden')
  })

  const button = document.getElementById('user-menu-button')
  const dropdownMenu = document.getElementById('dropdown-menu')

  button.addEventListener('click', function () {
    dropdownMenu.classList.toggle('hidden')
  })
});