
var resumeBtn = document.querySelector('.button[data-target="resume"]');
resumeBtn.addEventListener('click', function() {
  window.open('assets/MC-SD-resume.pdf');
})

function deactivate(el) {
  el.classList.remove('active');
}

function activate(el) {
  el.classList.add('active');
}
