import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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

// Proteção de Rota
if (localStorage.getItem('ng_auth') !== 'true') window.location.href = 'login.html';
document.getElementById('op-name').innerText = localStorage.getItem('ng_user');

// Monitorar Orçamentos/Pedidos
onValue(ref(db, 'orcamentos'), (snapshot) => {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    const data = snapshot.val();
    if (data) {
        Object.keys(data).reverse().forEach(id => {
            const item = data[id];
            tableBody.innerHTML += `
                <tr>
                    <td>${item.data}</td>
                    <td><strong>${item.cliente}</strong></td>
                    <td>${item.servico}</td>
                    <td>${item.email}</td>
                    <td><span class="status-pill ${item.status.toLowerCase()}">${item.status}</span></td>
                    <td>
                        <button onclick="window.concluir('${id}')" style="background:none; border:1px solid #10b981; color:#10b981; padding:5px; border-radius:4px; cursor:pointer;"><i class="fa-solid fa-check"></i></button>
                        <button onclick="window.apagar('${id}')" style="background:none; border:1px solid #ef4444; color:#ef4444; padding:5px; border-radius:4px; cursor:pointer; margin-left:5px;"><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>`;
        });
    } else {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:20px;">Sem novos pedidos no sistema.</td></tr>';
    }
});

window.concluir = (id) => update(ref(db, `orcamentos/${id}`), { status: 'Concluído' });
window.apagar = (id) => confirm('Apagar permanentemente?') && remove(ref(db, `orcamentos/${id}`));

setInterval(() => {
    document.getElementById('clock').innerText = new Date().toLocaleTimeString('pt-MZ');
}, 1000);