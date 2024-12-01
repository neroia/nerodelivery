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
    const destaquesSection = document.getElementById('destaques');
    destaquesSection.innerHTML = ''; // Limpar a seção antes de adicionar os novos produtos

    for (let id in produtos) {
        const produto = produtos[id];
        const div = document.createElement('div');
        div.classList.add('produtodestaques');
        div.dataset.id = id; // Armazenar o ID no atributo data
        div.dataset.nome = produto.nome;
        div.dataset.descricao = produto.descricao;
        div.dataset.preco = produto.preco;
        div.dataset.imagem64 = produto.imagem64;

        div.innerHTML = `
            <img src="${produto.imagem64}" alt="${produto.nome}" class="foto-produtoofertas">
            <h3 class="nome-produtodestaques">${produto.nome}</h3>
            <p class="preco-produtodestaques">R$ ${produto.preco}</p>
        `;

        // Adicionar evento de clique para redirecionar
        div.addEventListener('click', () => {
            const queryParams = new URLSearchParams({
                id: div.dataset.id,
                nome: div.dataset.nome,
                descricao: div.dataset.descricao,
                preco: div.dataset.preco,
                imagem64: div.dataset.imagem64,
            }).toString();
            window.location.href = `adpedidos.html?${queryParams}`;
        });

        destaquesSection.appendChild(div);
    }
});
