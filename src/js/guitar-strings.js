var CHORD_BANK = {
  'eMajor': ['E1', 'B2', 'E3', 'G#4', 'B5', 'E6'],
  'aMajorSus2': ['muted', 'A2', 'E3', 'A4', 'B5', 'E6'],
  'gMajor': ['G1', 'B2', 'D3', 'G4', 'D5', 'G6'],
  'cMajor9': ['muted', 'C2', 'E3', 'G4', 'D5', 'G6'],
  'fMajorM7': ['F1', 'C2', 'F3', 'A4', 'C5', 'E6'],
  'aMajor7': ['muted', 'A2', 'E3', 'G4', 'C#5', 'E6'],
  'dMajorSus4': ['G1', 'muted', 'D3', 'A4', 'D5', 'G6'],
  'eMinor7': ['E1', 'B2', 'E3', 'G4', 'D5', 'G6'],
  'cMinorM7': ['muted', 'C2', 'Eb3', 'G4', 'B5', 'muted']
}

var SOUNDS_BANK = {
  'E1': 'url',
  'F1': 'url',
  'G1': 'url',
  'A2': 'url',
  'B2': 'url',
  'C2': 'url',
  'D3': 'url',
  'Eb3': 'url',
  'E3': 'url',
  'G4': 'url',
  'G#4': 'url',
  'A4': 'url',
  'B5': 'url',
  'C#5': 'url',
  'D5': 'url',
  'E6': 'url',
  'G6': 'url'
}

var COLORS_BANK = [
  '#08F7FE',
  '#09FBD3',
  '#FE53BB',
  '#F5D300',
  '#FFACFC',
  '#F148FB',
  '#7122FA',
  '#FF2281',
  '#011FFD',
  '#13CA91',
  '#FF9472',
  '#A992FA',
  '#F85125',
  '#EBF875',
  '#00A9FE',
  '#EB55CE',
  '#CE0000',
  '#535EEB'
]

var strings = document.querySelectorAll('.string');
var stringColor, selectedChord, colorIdx, lastColorIdx, chordIdx, lastIdx;

window.onload = function() {
  updateStrings();

  var chordChangeBtn = document.getElementById('chord-change');
  chordChangeBtn.addEventListener('click', updateStrings);

  strings.forEach((string) => {
    string.addEventListener('mouseenter', function() {
      animateStrum(this);
    });
  })
}

function updateStrings() {
  setStringNotes();
  setStringColor();
}

function selectRandomChord() {
  var chordBankKeys = Object.keys(CHORD_BANK);
  chordIdx = Math.floor(Math.random() * Math.floor(chordBankKeys.length));

  if (chordIdx === lastIdx) selectRandomChord();

  document.querySelector('.sel-chord-display h3').innerHTML = chordBankKeys[chordIdx];
  lastIdx = chordIdx;
  return chordBankKeys[chordIdx];
}

function setStringNotes() {
  selectedChord = selectRandomChord();
  var chordNotes = CHORD_BANK[selectedChord];

  for (var i = 0; i < strings.length; i++) {
   strings[i].dataset.note = chordNotes[i];
  }
}

function selectColor() {
  colorIdx = Math.floor(Math.random() * Math.floor(COLORS_BANK.length));

  if (colorIdx === lastColorIdx) {
    selectColor();
  }

  lastColorIdx = colorIdx;
  return COLORS_BANK[colorIdx];
}

function setStringColor() {
  stringColor = selectColor();

  strings.forEach((string) => {
    string.style.boxShadow = `0px 0px 16px 13px ${stringColor}`;
    string.style.webkitBoxShadow = `0px 0px 16px 13px ${stringColor}`;
  });

  strings.forEach((string) => {
    gsap.from(string, {duration: 2, marginRight: '15px', marginLeft: '15px', ease: "elastic"});
  })
}

function animateStrum(string) {
  gsap.to(string, {transform: 'translateX(-0.5px)', delay: 0, duration: 0.1});
  gsap.to(string, {transform: 'translateX(0.5px)', delay: 0.1, duration: 0.1});
  gsap.to(string, {transform: 'translateX(-0.5px)', delay: 0.2, duration: 0.1});
  gsap.to(string, {transform: 'translateX(0.5px)', delay: 0.3, duration: 0.1});
  gsap.to(string, {transform: 'translateX(-0.5px)', delay: 0.4, duration: 0.1});
  gsap.to(string, {transform: 'translateX(0.5px)', delay: 0.5, duration: 0.1});
  gsap.to(string, {transform: 'translateX(-0.4px)', delay: 0.6, duration: 0.1});
  gsap.to(string, {transform: 'translateX(0.4px)', delay: 0.7, duration: 0.1});
  gsap.to(string, {transform: 'translateX(-0.3px)', delay: 0.8, duration: 0.1});
  gsap.to(string, {transform: 'translateX(0.3px)', delay: 0.9, duration: 0.1});
  gsap.to(string, {transform: 'translateX(-0.2px)', delay: 1, duration: 0.1});
  gsap.to(string, {transform: 'translateX(0.2px)', delay: 1.1, duration: 0.1});
  gsap.to(string, {transform: 'translateX(-0.2px)', delay: 1.2, duration: 0.1});
  gsap.to(string, {transform: 'translateX(0.2px)', delay: 1.3, duration: 0.1});
}
