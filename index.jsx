<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Horrores de um Brasil Esquecido</title>
    <style>
        body { margin: 0; background: black; color: red; font-family: Arial, sans-serif; }
        h1 { text-align: center; margin-top: 20px; }
        .regioes { display: flex; justify-content: center; gap: 10px; margin: 20px; flex-wrap: wrap; }
        .regiao { background: darkred; padding: 20px; border-radius: 10px; cursor: pointer; transition: transform 0.2s; }
        .regiao:hover { transform: scale(1.1); background: red; }
        .lendas { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-top: 20px; }
        .lenda { background: #222; padding: 15px; border-radius: 10px; text-align: center; cursor: pointer; transition: transform 0.2s; }
        .lenda:hover { transform: scale(1.05); background: #444; }
        .popup { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); display: flex; align-items: center; justify-content: center; }
        .popup-content { background: #333; padding: 30px; border-radius: 15px; text-align: center; position: relative; max-width: 500px; }
        .popup-content img { width: 150px; height: 150px; margin-bottom: 15px; }
        .close { position: absolute; top: 10px; right: 15px; cursor: pointer; color: red; font-size: 24px; }
    </style>
</head>
<body>

<h1>Horrores de um Brasil Esquecido</h1>
<p style="text-align:center; font-style:italic;">por Bruno Reallyme - Universo Reallyme - <a href="https://universoreallyme.com.br" style="color:red;">universoreallyme.com.br</a></p>

<div class="regioes" id="regioes"></div>
<div class="lendas" id="lendas"></div>
<div class="popup" id="popup" style="display:none;"></div>

<audio id="hino" src="/sons/hino_dissonante.mp3" loop autoplay></audio>

<script>
const regioesData = {
    "Norte": [
        {nome: "Curupira", som: "/sons/curupira.mp3", imagem: "/img/curupira.png", descricao: "Guardião das matas, com pés virados para trás, confunde caçadores e protege a floresta. Lenda indígena da Amazônia."},
        {nome: "Boto-cor-de-rosa", som: "/sons/boto.mp3", imagem: "/img/boto.png", descricao: "Encantado que vira homem bonito em festas, seduz mulheres e depois retorna ao rio. Cultura amazônica ribeirinha."}
    ],
    "Nordeste": [
        {nome: "Cabeleira de Fogo", som: "/sons/cabeleira.mp3", imagem: "/img/cabeleira.png", descricao: "Assombração de uma mulher com cabelos flamejantes que aterroriza vilarejos. Presente no folclore nordestino."}
    ],
    "Centro-Oeste": [
        {nome: "Cabeça de Cuia", som: "/sons/cuia.mp3", imagem: "/img/cuia.png", descricao: "Homem amaldiçoado após matar a própria mãe, transformado em monstro que assombra rios."}
    ],
    "Sudeste": [
        {nome: "Mula Sem Cabeça", som: "/sons/mula.mp3", imagem: "/img/mula.png", descricao: "Mulher amaldiçoada que se transforma em uma mula em chamas, ligada ao imaginário católico colonial."}
    ],
    "Sul": [
        {nome: "Negrinho do Pastoreio", som: "/sons/negrinho.mp3", imagem: "/img/negrinho.png", descricao: "Espírito de um menino escravizado que ajuda a encontrar objetos perdidos. Folclore gaúcho de origem afro-brasileira."}
    ]
};

const sonsAmbientais = ["/sons/sussurros.mp3", "/sons/grito.mp3", "/sons/vento.mp3"];

const regioesContainer = document.getElementById('regioes');
const lendasContainer = document.getElementById('lendas');
const popup = document.getElementById('popup');

Object.keys(regioesData).forEach(regiao => {
    const div = document.createElement('div');
    div.className = 'regiao';
    div.textContent = regiao;
    div.onclick = () => mostrarLendas(regiao);
    regioesContainer.appendChild(div);
});

function mostrarLendas(regiao) {
    lendasContainer.innerHTML = '';
    regioesData[regiao].forEach(lenda => {
        const div = document.createElement('div');
        div.className = 'lenda';
        div.innerHTML = `<img src="${lenda.imagem}" alt="${lenda.nome}" style="width:100px;height:100px"><p>${lenda.nome}</p>`;
        div.onclick = () => mostrarPopup(lenda);
        lendasContainer.appendChild(div);
    });
}

function mostrarPopup(lenda) {
    popup.style.display = 'flex';
    popup.innerHTML = `
        <div class='popup-content'>
            <span class='close' onclick='popup.style.display="none";'>&times;</span>
            <h2>${lenda.nome}</h2>
            <img src='${lenda.imagem}' alt='${lenda.nome}'>
            <p>${lenda.descricao}</p>
            <button onclick='new Audio("${lenda.som}").play();'>Ouvir Som da Lenda</button>
        </div>
    `;
}

function tocarAmbientais() {
    const som = new Audio(sonsAmbientais[Math.floor(Math.random() * sonsAmbientais.length)]);
    som.play();
    setTimeout(tocarAmbientais, 5000 + Math.random() * 10000);
}

tocarAmbientais();
</script>

</body>
</html>
