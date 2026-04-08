// 1. IMPORTAÇÃO DAS BIBLIOTECAS DO FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// 2. CREDENCIAIS DO SEU FIREBASE (Obrigatório colocar a sua API KEY)
const firebaseConfig = {
    apiKey: "AIzaSyCSgryH6kCvZ5HJYuB2bROc6ti_XPlIZpMS", 
    authDomain: "newgeneration-27893.firebaseapp.com",
    databaseURL: "https://newgeneration-27893-default-rtdb.firebaseio.com",
    projectId: "newgeneration-27893",
    storageBucket: "newgeneration-27893.firebasestorage.app",
    messagingSenderId: "930109246297", // Copie do console
    appId: "1:930109246297:web:ed14b54f6f380ea637da48" // Copie do console
};

// Inicializa a ligação
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 3. PUXAR PRODUTOS DO FIREBASE PARA A LOJA
const listaProdutos = document.getElementById('lista-produtos');

if (listaProdutos) {
    const produtosRef = ref(db, 'produtos');
    
    // onValue fica a "escutar" o banco. Se mudar lá, muda no site na hora.
    onValue(produtosRef, (snapshot) => {
        const data = snapshot.val();
        listaProdutos.innerHTML = ''; // Limpa a mensagem "a carregar"

        if (data) {
            // Transforma o JSON do Firebase em Cards de HTML
            Object.keys(data).forEach(key => {
                const p = data[key];
                const card = `
                    <div class="card" style="background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 30px; text-align: center;">
                        <i class="fa-solid fa-box-open" style="font-size: 36px; color: #2563eb; margin-bottom: 15px;"></i>
                        <h3 style="color: #0f172a; margin-bottom: 10px;">${p.nome}</h3>
                        <p style="color: #64748b; font-size: 14px; margin-bottom: 15px;">${p.descricao}</p>
                        <div style="font-size: 24px; font-weight: 800; color: #2563eb; margin-bottom: 20px;">MT ${p.preco}</div>
                        <a href="https://wa.me/258846166104?text=Olá, tenho interesse no produto: ${p.nome}" class="btn-primary" style="background: #2563eb; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; display: block;">Comprar</a>
                    </div>`;
                listaProdutos.innerHTML += card;
            });
        } else {
            listaProdutos.innerHTML = '<p>Nenhum produto cadastrado no momento.</p>';
        }
    });
}

// 4. ENVIAR FORMULÁRIO DE ORÇAMENTO PARA O FIREBASE
const formOrcamento = document.getElementById('form-orcamento');

if (formOrcamento) {
    formOrcamento.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede a página de recarregar
        
        // Recolhe os dados que o cliente escreveu
        const novoOrcamento = {
            cliente: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            servico: document.getElementById('servico-select').value,
            mensagem: document.getElementById('mensagem').value,
            data: new Date().toLocaleString('pt-MZ'),
            status: "Pendente"
        };

        // Grava no nó "orcamentos" do Firebase
        push(ref(db, 'orcamentos'), novoOrcamento)
            .then(() => {
                alert('O seu pedido foi enviado com sucesso! A equipa New Generation entrará em contacto.');
                formOrcamento.reset(); // Limpa o formulário
            })
            .catch((error) => {
                console.error("Erro ao enviar:", error);
                alert('Erro ao enviar pedido. Tente novamente.');
            });
    });
}

// 5. LÓGICA DO MENU MOBILE
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if(menuToggle && navLinks) {
    menuToggle.onclick = () => navLinks.classList.toggle('active');
}