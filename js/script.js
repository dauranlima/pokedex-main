const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const enter = document.querySelector('.btn-enter');

const hp = document.querySelector('.hp');
const attack = document.querySelector('.attack');
const defense = document.querySelector('.defense');
const specialAttack = document.querySelector('.special-attack');
const specialDefense = document.querySelector('.special-defense');
const speed = document.querySelector('.speed');
const type = document.querySelector('.type-pokemon');

const hab1 = document.querySelector('.hab1');
const hab2 = document.querySelector('.hab2');

const move1 = document.querySelector('.move1');
const move2 = document.querySelector('.move2'); 
const move3 = document.querySelector('.move3');

const sound = new Audio('assets/click.mp3')
const alert = new Audio('assets/not_found_click.mp3')
buttonPrev.addEventListener('click', () => {
  sound.play();
});
buttonNext.addEventListener('click', () => {
  sound.play();
});

const playSound = () => {
  if(input.value.length === 0){
    alert.play();
  }if(input.value.length > 0){
    sound.play();
  }
};

enter.addEventListener('click', () => {
  playSound();
});

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}



const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    
    hp.innerHTML = data.stats[0].base_stat;
    attack.innerHTML = data.stats[1].base_stat;
    defense.innerHTML = data.stats[2].base_stat;
    specialAttack.innerHTML = data.stats[3].base_stat;
    specialDefense.innerHTML = data.stats[4].base_stat;
    speed.innerHTML = data.stats[5].base_stat;
    type.innerHTML = data.types[0].type.name;

    hab1.innerHTML = data.abilities[0].ability.name;
    hab2.innerHTML = data.abilities[1].ability.name;
    move1.innerHTML = data.moves[10].move.name;
    move2.innerHTML = data.moves[11].move.name;
    move3.innerHTML = data.moves[12].move.name;
    
    input.value = '';
    searchPokemon = data.id;
  } else {
    alert.play();
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
    hp.innerHTML = '';
    attack.innerHTML = '';
    defense.innerHTML = '';
    specialAttack.innerHTML = '';
    specialDefense.innerHTML = '';
    speed.innerHTML = '';
    type.innerHTML = '';
    hab1.innerHTML = '';
    hab2.innerHTML = '';
    move1.innerHTML = '';
    move2.innerHTML = '';
    move3.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
