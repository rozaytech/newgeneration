// Controlo do Menu Mobile
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Lógica de PWA (Instalar App)
let deferredPrompt;
const installAppBtn = document.getElementById('installAppBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    // Previne o Chrome de exibir o prompt padrão imediatamente
    e.preventDefault();
    deferredPrompt = e;
    // Torna o botão visível na navegação
    installAppBtn.style.display = 'block';
});

installAppBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        // Exibe o prompt nativo de instalação
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('App da New Generation Instalado');
            installAppBtn.style.display = 'none';
        }
        deferredPrompt = null;
    }
});

// Registo do Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker Registado com sucesso!'))
            .catch(err => console.error('Erro ao registar SW', err));
    });
}