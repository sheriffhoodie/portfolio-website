
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

function addButtonListeners() {
  var BUTTONS = document.querySelectorAll('.button');

  for (var i = 0; i < BUTTONS.length; i++) {

    BUTTONS[i].addEventListener('mouseenter', function(e) {
      animateButton(this, e);
    });

    BUTTONS[i].addEventListener('mouseleave', function(e) {
      animateButton(this, e);
    });
  }
}
