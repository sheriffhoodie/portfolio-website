var CHORD_BANK = {
  'eMajor': {
    chordName: 'E Major',
    notes: ['E1', 'B2', 'E3', 'G#4', 'B5', 'E6']
  },
  'aMajorSus2': {
    chordName: 'A Major Sus2',
    notes: ['muted', 'A2', 'E3', 'A4', 'B5', 'E6']
  },
  'gMajor': {
    chordName: 'G Major',
    notes: ['G1', 'B2', 'D3', 'G4', 'D5', 'G6'],
  },
  'cMajor9': {
    chordName: 'C Major 9',
    notes: ['muted', 'C2', 'E3', 'G4', 'D5', 'G6'],
  },
  'fMajorM7': {
    chordName: 'F Major M7',
    notes: ['F1', 'C2', 'F3', 'A4', 'C5', 'E6']
  },
  'aMajor7': {
    chordName: 'A Major 7',
    notes: ['muted', 'A2', 'E3', 'G4', 'C#5', 'E6']
  },
  'dMajorSus4': {
    chordName: 'D Major Sus4',
    notes: ['G1', 'muted', 'D3', 'A4', 'D5', 'G6']
  },
  'eMinor7': {
    chordName: 'E Minor 7',
    notes: ['E1', 'B2', 'E3', 'G4', 'D5', 'G6']
  },
  'cMinor9': {
    chordName: 'C Minor 9',
    notes: ['muted', 'C2', 'Eb3', 'G4', 'D5', 'muted']
  },
  'dMinor': {
    chordName: 'D Minor',
    notes: ['muted', 'A2', 'D3', 'A4', 'D5', 'F6']
  }
}

var SOUNDS_BANK = {
  'E1': 'https://assets-repo.s3.amazonaws.com/audio/js-guitar-E1.m4a',
  'F1': 'https://assets-repo.s3.amazonaws.com/audio/js-guitar-F1.m4a',
  'G1': 'https://assets-repo.s3.amazonaws.com/audio/js-guitar-G1.m4a',
  'A2': 'https://assets-repo.s3.amazonaws.com/audio/js-guitar-A2.m4a',
  'B2': 'https://assets-repo.s3.amazonaws.com/audio/js-guitar-B2.m4a',
  'C2': 'https://assets-repo.s3.amazonaws.com/audio/js-guitar-C2.m4a',
  'D3': 'https://assets-repo.s3.amazonaws.com/audio/js-guitar-D3.m4a',
  'Eb3': 'https://assets-repo.s3.amazonaws.com/audio/js-guitar-Eb3.m4a',
  'E3': 'https://assets-repo.s3.amazonaws.com/audio/js-guitar-E3.m4a',
  'F3': 'https://assets-repo.s3.amazonaws.com/audio/js-guitar-F3.m4a',
  'G4': 'https://assets-repo.s3.amazonaws.com/audio/js-guitar-G4.m4a',
  'G#4': 'https://assets-repo.s3.amazonaws.com/audio/js-guitar-Gsh4.m4a',
  'A4': 'https://assets-repo.s3.amazonaws.com/audio/js-guitar-A4.m4a',
  'B5': 'https://assets-repo.s3.amazonaws.com/audio/js-guitar-B5.m4a',
  'C5': 'https://assets-repo.s3.amazonaws.com/audio/js-guitar-C5.m4a',
  'C#5': 'https://assets-repo.s3.amazonaws.com/audio/js-guitar-Csh5.m4a',
  'D5': 'https://assets-repo.s3.amazonaws.com/audio/js-guitar-D5.m4a',
  'E6': 'https://assets-repo.s3.amazonaws.com/audio/js-guitar-E6.m4a',
  'F6': 'https://assets-repo.s3.amazonaws.com/audio/js-guitar-F6.m4a',
  'G6': 'https://assets-repo.s3.amazonaws.com/audio/js-guitar-G6.m4a'
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
  chordChangeBtn.addEventListener('click', function() {
    pauseNotes();
    updateStrings();
  });

  strings.forEach((string) => {
    string.addEventListener('mouseenter', function() {
      animateStrum(this);
      playNote(this);
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

  document.querySelector('.sel-chord-display h3').innerHTML = CHORD_BANK[chordBankKeys[chordIdx]].chordName;
  lastIdx = chordIdx;
  return chordBankKeys[chordIdx];
}

function setStringNotes() {
  selectedChord = selectRandomChord();
  var chordNotes = CHORD_BANK[selectedChord].notes;

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
  gsap.to(string, {transform: 'translateX(-0.2px)', delay: 1.4, duration: 0.1});
  gsap.to(string, {transform: 'translateX(0.2px)', delay: 1.5, duration: 0.1});
  gsap.to(string, {transform: 'translateX(-0.2px)', delay: 1.6, duration: 0.1});
  gsap.to(string, {transform: 'translateX(0.2px)', delay: 1.7, duration: 0.1});
  gsap.to(string, {transform: 'translateX(-0.2px)', delay: 1.8, duration: 0.1});
  gsap.to(string, {transform: 'translateX(0.2px)', delay: 1.9, duration: 0.1});
}

var activeAudios = [];
function playNote(str) {
  var strNote = str.dataset.note;

  if (strNote === 'muted') return;

  var audioUrl = SOUNDS_BANK[strNote];
  var audioObj = new Audio(audioUrl);
  audioObj.play();
  activeAudios.push(audioObj);
}

function pauseNotes() {
  activeAudios.forEach((sound) => {
    sound.pause();
    sound.load();
  });
}
