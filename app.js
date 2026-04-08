import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCSgryH6kCvZ5HJYuB2bROc6ti_XPlIZpM",
  authDomain: "newgeneration-27893.firebaseapp.com",
  databaseURL: "https://newgeneration-27893-default-rtdb.firebaseio.com",
  projectId: "newgeneration-27893",
  storageBucket: "newgeneration-27893.firebasestorage.app",
  messagingSenderId: "930109246297",
  appId: "1:930109246297:web:ed14b54f6f380ea637da48"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// --- LISTAR PRODUTOS ---
const listaProdutos = document.getElementById('lista-produtos');
if (listaProdutos) {
    onValue(ref(db, 'produtos'), (snapshot) => {
        const data = snapshot.val();
        listaProdutos.innerHTML = '';
        if (data) {
            Object.keys(data).forEach(key => {
                const p = data[key];
                listaProdutos.innerHTML += `
                    <div class="card" style="background:#fff; border:1px solid #eee; border-radius:12px; padding:25px; text-align:center;">
                        <i class="fa-solid fa-microchip" style="font-size:30px; color:#2563eb; margin-bottom:15px;"></i>
                        <h3>${p.nome}</h3>
                        <p style="font-size:13px; color:#666;">${p.descricao}</p>
                        <div style="font-size:22px; font-weight:800; color:#2563eb; margin:15px 0;">MT ${p.preco}</div>
                        <a href="https://wa.me/258846166104?text=Interesse: ${p.nome}" class="btn-primary" style="display:block; text-decoration:none;">Encomendar</a>
                    </div>`;
            });
        } else {
            listaProdutos.innerHTML = '<p>Catálogo em atualização.</p>';
        }
    });
}

// --- ENVIAR ORÇAMENTO ---
const formOrcamento = document.getElementById('form-orcamento');
if (formOrcamento) {
    formOrcamento.addEventListener('submit', (e) => {
        e.preventDefault();
        const dados = {
            cliente: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            servico: document.getElementById('servico-select').value,
            mensagem: document.getElementById('mensagem').value,
            data: new Date().toLocaleString('pt-MZ'),
            status: "Pendente"
        };
        push(ref(db, 'orcamentos'), dados).then(() => {
            alert('Enviado com sucesso ao NOC New Generation!');
            formOrcamento.reset();
        });
    });
}