// Nav Functionality
var navLinks = document.querySelectorAll('[data-link]');
var contentPages = document.querySelectorAll('.content-page');
var contentPagesArray = Array.from(contentPages);
var pageMatch, currentPage;

for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener('click', function() {

    pageMatch = contentPagesArray.filter(page => page.id === this.dataset.link)[0];
    currentPage = document.querySelector('.content-page.active');

    deactivate(currentPage);
    activate(pageMatch);

    animateWipe();

  });
}
