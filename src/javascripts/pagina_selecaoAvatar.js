window.addEventListener('DOMContentLoaded', () => {
        const nome = localStorage.getItem("nomeDoUsuario");
        const saudacao = document.getElementById("saudacaoUsuario");
        
        if (nome) {
            saudacao.textContent = `Bem-vindo(a), ${nome}! Escolha o seu avatar.`;
        } else {
            saudacao.textContent = "Bem-vindo(a)! Escolha o seu avatar.";
        }
    });