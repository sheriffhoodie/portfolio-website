document.addEventListener('DOMContentLoaded', function() {
  contentPageTL.to('.active', {opacity: 0.6, duration: 1.2, transform: 'scale(1.05)', delay: 0.3})
    .to('.active', {duration: 0.5, opacity: 1, transform: 'scale(1)', ease: Power2.easeInOut}, '-=0.3');
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

function fireTransition(oldPage, newPage) {

  gsap.to(oldPage, {opacity: 0, ease: Power2.easeIn, duration: 0.3, onComplete: onExitComplete});

  function onExitComplete() {
    deactivate(currentPage);
    activate(newPage);
  }

  contentPageTL.fromTo(newPage, {opacity: 0, transform: 'scale(0.9)'}, {opacity: 0.6, duration: 1.2, transform: 'scale(1.05)', delay: 0.5})
    .to(newPage, {duration: 0.5, opacity: 1, transform: 'scale(1)', ease: Power2.easeInOut}, '-=0.3');

  var wipeTL = gsap.timeline();
  wipeTL.fromTo('.wipe', {left: '-100vw', transform: 'rotate(-45deg)'}, {duration: 1.5, transform: 'rotate(-45deg) translateX(100vw)', ease: Power1.easeOut});

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

  var relX = event.pageX - ctx.offsetLeft,
  relY = event.pageY - ctx.offsetTop;

  gsap.to(btnSpan, { duration: 0.1, top: relY, left: relX });
}
