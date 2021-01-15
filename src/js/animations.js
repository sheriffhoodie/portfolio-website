document.addEventListener('DOMContentLoaded', function() {
  contentPageTL.to('.active', {opacity: 0.6, duration: 0.8, delay: 0.3})
    .to('.active', {duration: 0.5, opacity: 1, ease: Power2.easeInOut}, '-=0.3');
  // rotateGreeting();

  // Apply Event Listeners for Various Animations
  addButtonListeners();

});

const GREETINGS = [
  'Bonjour!',
  'Buongiorno!',
  'Hola!',
  '안녕하세요!',
  'Guten Tag!',
  'こんにちは!',
  'Hujambo',
  'Hi!'
]

var contentPageTL = gsap.timeline();

function rotateGreeting() {
  var i = 0;
  setInterval(function() {
    document.querySelector('.language-toggle').innerHTML = GREETINGS[i];
    i === GREETINGS.length - 1 ? i = 0 : i++;
  }, 1500);
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

function animateButton(ctx, event) {
  var btnSpan = ctx.querySelector('span');
  gsap.to(btnSpan, {duration: 0.1, top: '50%', left: '50%'});
}
