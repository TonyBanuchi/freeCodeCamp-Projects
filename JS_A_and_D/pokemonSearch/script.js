const apiUrl = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/'
const searchInputElement = document.getElementById('search-input');
const searchBtnElement = document.getElementById('search-button');
const nameElement = document.getElementById('pokemon-name');
const idElement = document.getElementById('pokemon-id');
const htElement = document.getElementById('height');
const wtElement = document.getElementById('weight');
const typeElement = document.getElementById('types');
const hpElement = document.getElementById('hp');
const spdElement = document.getElementById('speed');
const atkElement = document.getElementById('attack');
const defElement = document.getElementById('defense');
const sAtkElement = document.getElementById('special-attack');
const sDefElement = document.getElementById('special-defense');
const imgElement = document.getElementById('image-container');

const statArray = [
  nameElement,
  idElement,
  htElement,
  wtElement,
  typeElement,
  hpElement,
  spdElement,
  atkElement,
  defElement,
  sAtkElement,
  sDefElement,
  imgElement
];

const clearStats = () => {
  statArray.forEach(stat => {
    stat.innerHTML = '';
  });
};



const search = ()=>{
  clearStats();
  const inputValue = screenInput(searchInputElement.value);
  fetchData(inputValue);
};

const screenInput = inputValue => {
  if(isNaN(inputValue.trim())){
    return inputValue.trim().toLowerCase().replace(/[^a-z]|\s/gi,'-').replace('--','-').replace('♂','m').replace('♀','f');
  }

  return inputValue;
};

const fetchData = async searchValue => {
  try{const url = apiUrl + searchValue;
  return await fetch(url).then( async res => {
    await res.json().then(data => {
      populateStats(data);
    }).catch(err => {throw err;});
  }).catch(err => {throw err;});
  } catch(err){
    alert("Pokémon not found");
    console.error(err);
  }
};

const populateStats = data => {
  const {height,id,name,sprites,stats,types,weight} = data;
  const {back_default,back_female,back_shiny,back_shiny_female,front_default,front_female,front_shiny,front_shiny_female} = sprites;
  nameElement.textContent = name.toUpperCase();
  htElement.textContent = height;
  idElement.textContent = id;
  wtElement.textContent = weight;
  
  let hp, atk, def, spd, sAtk, sDef;
  stats.forEach(stat => {
    switch(stat.stat.name){
      case 'hp': hp = stat.base_stat; break
      case 'attack': atk = stat.base_stat; break
      case 'defense': def = stat.base_stat; break
      case 'speed': spd = stat.base_stat; break
      case 'special-attack': sAtk = stat.base_stat; break
      case 'special-defense': sDef = stat.base_stat; break
    }
  });

  hpElement.textContent = hp;
  atkElement.textContent = atk;
  defElement.textContent = def;
  spdElement.textContent = spd;
  sAtkElement.textContent = sAtk;
  sDefElement.textContent = sDef;

  types.forEach(type => {
    typeElement.innerHTML += `<div class="type-badge ${type.type.name}">${type.type.name.toUpperCase()}</div>`;
  });

  imgElement.innerHTML = `<img id="sprite" src="${front_default}" alt="${name} default front" ?>`;


}

searchBtnElement.addEventListener('click',search)
