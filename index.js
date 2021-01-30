import { plot } from './data/plot.js';
import { characters } from './data/characters.js';

const mainElement = document.querySelector('.wrapper');
const characterSelect = document.querySelector('#character');
const buttonNextReplica = document.createElement('button');

characters.forEach(element => {
  const option = new Option(`${element.name}`, `${element.shortName}`);
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
        <div data-character=${characters.find(elem => elem.name === element.character).shortName} class="replica">
          <p class="character marked">${element.character}</p>
          <p class="text marked">${element.text}</p>
        </div>`
    } else {
      return `
        <div data-character=${characters.find(elem => elem.name === element.character).shortName} class="replica">
          <p class="character">${element.character}</p>
          <p class="text">${element.text}</p>
        </div>`
    }
  })
  .join('');
  buttonNextReplica.classList.add('next-replica');
  buttonNextReplica.textContent = "Моя следующая реплика";
  if (characterSelect.value != 0) {
    document.body.appendChild(buttonNextReplica);
  } else if (document.querySelector('.next-replica')) {
    document.body.removeChild(buttonNextReplica);
  }
}

function savePosition() {
  localStorage.setItem('offsetY', window.scrollY);
}

function goToNextReplica(e) {
  const selectedReplicas = Array.from(document.querySelectorAll(`[data-character=${characterSelect.value}]`));
  const checkCondition = selectedReplicas.some(element => {
    console.log(element.getBoundingClientRect().top);
    element.getBoundingClientRect().top >= 0;
  });
  console.log(checkCondition);
  //console.log(selectedReplicas[0].getBoundingClientRect().top);//позиция элемента  относительно window
  //console.log(selectedReplicas[0].offsetTop);//позиция по y относительно родителя
  //console.log(window.pageYOffset); //насколько заскролен window начало страницы
  //console.log(window.pageYOffset + window.innerHeight); //насколько заскролен конец страницы
  
  //window.scrollTo(0, 94);
}

window.addEventListener('load', () => {
  characterSelect.value = localStorage.getItem('currentCharacterId') || 0;
  renderPlot(localStorage.getItem('currentCharacterName') || null);
  window.scrollTo(0, localStorage.getItem('offsetY') || 0);
});
window.addEventListener('scroll', savePosition);
characterSelect.addEventListener('change', selectCharacter);

buttonNextReplica.addEventListener('click', (e) => goToNextReplica(e));