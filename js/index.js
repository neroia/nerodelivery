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
        div.innerHTML = `
            <img src="${produto.imagem64}" alt="${produto.nome}" class="foto-produtodestaques">
            <h3 class="nome-produtodestaques">${produto.nome}</h3>
            <p class="preco-produtodestaques">R$ ${produto.preco}</p>
        `;
        destaquesSection.appendChild(div);

       
        div.addEventListener('click', () => {
            const produtoId = id;  // Certifique-se de que o produto tem um id
                window.location.href=`produtos.html?id=${produtoId}`;
        })
 
      
    }

    const ofertaslevesSection = document.getElementById('ofertas');
    ofertaslevesSection.innerHTML = ''; // Limpar a seção antes de adicionar os novos produtos

    for (let id in produtos) {
        const produto = produtos[id];
        const div = document.createElement('div');
        div.classList.add('produtosofertas');
    
        div.innerHTML = `
             <div class="divimg"><img src="${produto.imagem64}" alt="${produto.nome}" class="foto-produtoofertas">
             </div> 
            <div class="divnome">
                <h3 class="nome-produtoofertas">${produto.nome}</h3>
                <p class="descricao">${produto.descricao}</p>
                <p class="preco-produtoofertas">R$ ${produto.preco}</p>
            </div>
        `;
        ofertaslevesSection.appendChild(div);
    }
});


