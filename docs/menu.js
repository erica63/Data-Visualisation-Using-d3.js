/* The menuToggler helps ensure that the website has mobile-first responsiveness. */
menuToggler.addEventListener('click', ev => {
  menu.classList.toggle('open');
  links.classList.toggle('open');
  menuToggler.textContent = menuToggler.textContent === "" ? "≡" : "×";
});
