const API_BASE = 'https://pokeapi.co/api/v2/pokemon/';

let base = [];

const pPlim = () => (plim.currentTime = 0) || plim.play();
const pErr = () => (err.currentTime = 0) || err.play();
const pFu = () =>  (fu.currentTime = 0) || fu.play();

const json = async (url) => fetch(url).then((o) => o.json());

const getStat = (stat, arr) => arr.find((item)=>item.stat.name==stat).base_stat;

const ucfirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const pic = (numero) => `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${numero}.svg`;

const random = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);

const getPokemon = async (numero) => {
    const data = await json(API_BASE+numero);
    const retorno = {
        numero,
        name: ucfirst(data.name),
        'HP': getStat('hp', data.stats),
        'Ataque': getStat('attack', data.stats),
        'Defesa': getStat('defense', data.stats),
        'Ataque_especial': getStat('special-attack', data.stats),
        'Defesa_especial': getStat('special-defense', data.stats),
        weight: data.weight,
        img: pic(numero),
    }
    return retorno;
}

const preloadImage = src => {
  return new Promise(r => {
    const image = new Image()
    image.onload = r;
    image.onerror = r;
    image.src = src;
})};

const getPokemons = async (qty) => {
    pokemons = [];
    for (let index = 0; index < qty; index++) {
        pokemons.push(await getPokemon(random(1,151)));
    }
    await Promise.all(pokemons.map(x => preloadImage(x.img)))
    carregando.style.display = "none";
    btnJogar.style.display = "block";
    return pokemons;
}

const darCarta = (carta,para,callback) => {
    if (para.contains(carta)){
        if (para.children.length>1) para.appendChild(carta);
        callback && callback();
    }else{
        carta.classList.add('damage');
        setTimeout(() => carta.classList.remove('damage'),600);
        setTimeout(() => para.appendChild(carta) && callback && callback(),300);
    }
}

const fim = (_) => {
    mensagem.innerText = _;
    setTimeout(()=>fim_msg.style.display = 'block',700);
}

const checkFinish = () => {
    if(jogador1.children.length===0){
        fim('O Jogador 2 venceu!');
    }else if(jogador2.children.length===0){
        fim('O Jogador 1 venceu!');
    }
}

const combate = (e)=>{
    corpo.style.pointerEvents = 'none';
    const clicado = e.target.closest('.coluna').id == 'jogador1' ? 1 : 2;
    const propriedade = e.target.dataset.propriedade;
    let vencedor = 0;
    switch (true) {
        case (parseInt(jogador1.firstElementChild.dataset[propriedade]) > parseInt(jogador2.firstElementChild.dataset[propriedade])):
            vencedor = 1;
            break;
        case (parseInt(jogador1.firstElementChild.dataset[propriedade]) < parseInt(jogador2.firstElementChild.dataset[propriedade])):
            vencedor = 2;
            break;
    }
    if (vencedor === clicado){
        pPlim();
    }else if(vencedor){
        pErr();
    }

    switch (vencedor) {
        case 1:
            darCarta(jogador1.firstElementChild,jogador1);
            darCarta(jogador2.firstElementChild,jogador1, checkFinish);
            break;
        case 2:
            darCarta(jogador2.firstElementChild,jogador2);
            darCarta(jogador1.firstElementChild,jogador2, checkFinish);
            break;
        default:
            darCarta(jogador1.firstElementChild,jogador1);
            darCarta(jogador2.firstElementChild,jogador2);
    }

    setTimeout(() => corpo.style.pointerEvents = '', 1100);

}

const createCard = (dados) => {
    const div = document.createElement('div');
    Object.keys(dados).forEach((chave)=>div.dataset[chave] = dados[chave]);
    div.className = 'card';

    const no = document.createElement('p');
    no.innerText = `${dados.numero} - ${dados.name}`;
    div.appendChild(no).className = 'numero';

    const img = document.createElement('img');
    img.src = dados.img;
    div.appendChild(img);

    const ul = document.createElement('ul');
    ['HP','Ataque','Defesa','Ataque_especial','Defesa_especial'].forEach((attr) => {
        let li = document.createElement('li');
        li.dataset.propriedade = attr;
        li.innerHTML = `<strong>${attr.replace('_',' ')}: </strong>${dados[attr]}`
        li.addEventListener('mouseenter',pFu);
        li.addEventListener('click',combate);
        ul.appendChild(li);
    });

    div.appendChild(ul);
    return div;
}

window.onload = async () => {
    fu.volume = 0.3;
    plim.volume = 0.3;
    err.volume = 0.3;
    musica.volume = 0.1;
    base = await getPokemons(40);
    base.forEach((pokemon, i) => (i%2==0) ? jogador1.appendChild(createCard(pokemon)) : jogador2.appendChild(createCard(pokemon)) );
    setTimeout(()=>{
        let t = document.querySelector('#jogador2 .card');
        //jogador1.append(t);
    },2000);
}