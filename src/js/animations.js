const GREETINGS = [
  'Bonjour!',
  'Buongiorno!',
  'Hola!',
  '안녕하세요!',
  'Guten Tag!',
  'こんにちは!',
  'Hi!'
]

function rotateGreeting() {
  var i = 0;
  setInterval(function() {
    document.querySelector('.language-toggle').innerHTML = GREETINGS[i];
    i === GREETINGS.length - 1 ? i = 0 : i++;
  }, 1500);
}

function animateButton(ctx, event) {
  var btnSpan = ctx.querySelector('span');

  var relX = event.pageX - ctx.offsetLeft,
  relY = event.pageY - ctx.offsetTop;

  gsap.to(btnSpan, { duration: 0.1, top: relY, left: relX });
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

document.addEventListener('DOMContentLoaded', function() {
  // rotateGreeting();

  // Apply Event Listeners for Various Animations
  addButtonListeners();

});

var tl = gsap.timeline({paused: true});
console.log(tl);
