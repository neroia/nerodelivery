const urlParams = new URLSearchParams(window.location.search);
const produtoIdUrl = urlParams.get('id');  // Obter o 'id' da URL
console.log(produtoIdUrl);  // Exibe o ID na console

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAPYdZ0Ku-P9LvFtb2oXgi6FFHwgiLUb6w",
    authDomain: "nerodelivery-bea3c.firebaseapp.com",
    projectId: "nerodelivery-bea3c",
    storageBucket: "nerodelivery-bea3c.appspot.com",
    databaseURL: "https://nerodelivery-bea3c-default-rtdb.firebaseio.com/",
    messagingSenderId: "123417290337",
    appId: "1:123417290337:web:14f2a3865d74ca27dd6c20",
    measurementId: "G-X7NQ9J7LJN"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Referência ao banco de dados onde os produtos estão armazenados
const produtosRef = ref(db, 'produtos');

// Função para exibir os produtos
onValue(produtosRef, (snapshot) => {
    const produtos = snapshot.val();
    const cimasection = document.getElementById('cimasection');
    const bebidasSection = document.getElementById('bebidasSection'); // Nova seção para bebidas

    cimasection.innerHTML = ''; // Limpar seções
    bebidasSection.innerHTML = '';

    for (let id in produtos) {
        const produto = produtos[id];

        // Exibir o produto clicado
        if (produto.id === produtoIdUrl) {
            const div = document.createElement('div');
            div.classList.add('produto-selecionado');
            div.innerHTML = `
                <div class="fundo">
                    <div class="fundoimg">
                        <img src="${produto.imagem64}" alt="${produto.nome}" class="foto-produto">
                    </div>
                    <h3 class="nome-produto">${produto.nome}</h3>
                    <p class="descricao">${produto.descricao}</p>
                    </p>
                </div>
                <p class="preco-produto">R$ ${produto.preco}
            `;
            cimasection.appendChild(div);
        }

        // Exibir apenas as bebidas na segunda seção
        if (produto.categoria && produto.categoria.toLowerCase() === 'bebidas') {
            const bebidaDiv = document.createElement('div');
            bebidaDiv.classList.add('produto-bebida');
            bebidaDiv.innerHTML = `
                <div class="fundobebidas">
                    <div class="fundoimgbebidas">
                        <img src="${produto.imagem64}" alt="${produto.nome}" class="foto-bebidas">
                    </div>
                    <div class="divnome">
                    <h3 class="nome-produtobebidas">${produto.nome}</h3>
                    <p class="preco-produtobebidas">R$ ${produto.preco}</p>
                    </div>
                    <div class="plus"> <img src="../imgs/+.svg" alt"+" class="plusimg">
                    </div>
                </div>
            `;
            bebidasSection.appendChild(bebidaDiv);
        }
    }
});
