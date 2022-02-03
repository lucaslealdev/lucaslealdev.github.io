function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getPoquemao = () => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getRandomInt(1,151)}.png`;
const lista = document.querySelector('#lista')

let timer = setTimeout(()=>{},0);

const rodar = () =>{
	clearTimeout(timer);
	const elem = document.querySelector('#piao .pokemons');
  elem.classList.remove('animado');
  lista.textContent = '';
  for(let idx=0;idx<41;idx++){
    const img = document.createElement('img');
    img.src = getPoquemao();
    img.className = 'poke';
    lista.appendChild(img)
  }
  setTimeout(()=>elem.classList.add('animado'),1);
}
