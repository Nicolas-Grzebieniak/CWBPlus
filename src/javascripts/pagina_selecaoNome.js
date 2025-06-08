const nomesPrimeiro = [
    "Pipoca", "Alecrim", "Rabanete", "Pequeno", "Grande", "Magnífico",
    "Livro", "Caderno", "Jogador", "Anime", "Minúsculo", "Cadeira"
  ];

  const nomesSegundo = [
    "Furioso", "Sorridente", "Doidão", "Silencioso", "Veloz", "Corajoso",
    "Sonhador", "Engraçado", "Misterioso", "Sábio", "Maluco", "Radiante"
  ];

  function sortearNome(idInput) {
    const lista = idInput === 'primeiroNome' ? nomesPrimeiro : nomesSegundo;
    const nomeSorteado = lista[Math.floor(Math.random() * lista.length)];
    document.getElementById(idInput).value = nomeSorteado;
  }

  function salvarNome() {
    const nome = document.getElementById("nomeUsuario").value;
    localStorage.setItem("nomeDoUsuario", nome);
    }

  function gerarNumeroAleatorio(idInput) {
    const numero = Math.floor(Math.random() * 90) + 10;
    document.getElementById(idInput).value = numero;
}