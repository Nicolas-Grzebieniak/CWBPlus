const nomesPrimeiro = [
    "Alice", "Bruno", "Carla", "Daniel", "Eduarda", "Felipe",
    "Giovana", "Henrique", "Isabela", "João", "Karla", "Leonardo"
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