import { plot } from './data/plot.js';
import { characters } from './data/characters.js';

const mainElement = document.querySelector('.wrapper');
const characterSelect = document.querySelector('#character');

characters.forEach(element => {
  const option = new Option(`${element.name}`, `${element.id}`);
  characterSelect.appendChild(option);
});

function selectCharacter(e) {
  const currChar = e.target.selectedOptions[0].textContent;
  renderPlot(currChar);
  localStorage.setItem('currentCharacterName', currChar);
  localStorage.setItem('currentCharacterId', e.target.value);
}

function renderPlot(character = 'all') {
  mainElement.innerHTML = plot
  .map(element => {
    if (element.isDescription) {
      return `
        <div class="replica">
          <p class="text description">${element.text}</p>
        </div>`
    } else if (character === element.character) {
      return `
        <div class="replica">
          <p class="character marked">${element.character}</p>
          <p class="text marked">${element.text}</p>
        </div>`
    } else {
      return `
        <div class="replica">
          <p class="character">${element.character}</p>
          <p class="text">${element.text}</p>
        </div>`
    }
  })
  .join('');
}

function savePosition() {
  localStorage.setItem('offsetY', window.scrollY);
}

window.addEventListener('load', () => {
  renderPlot(localStorage.getItem('currentCharacterName') || null);
  characterSelect.value = localStorage.getItem('currentCharacterId') || 0;
});
window.addEventListener('load', () => {
  window.scrollTo(0, localStorage.getItem('offsetY') || 0);
});
window.addEventListener('scroll', savePosition);
characterSelect.addEventListener('change', selectCharacter);