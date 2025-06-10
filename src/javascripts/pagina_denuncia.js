document.getElementById("btn-fazer-denuncia").addEventListener("click", function () {
  const local = document.getElementById("input-local").value;
  const tipo = document.getElementById("select-tipo").value;
  const data = document.getElementById("input-data").value;
  const hora = document.getElementById("input-hora").value;
  const descricao = document.querySelector(".textarea-descricao").value;

  if (!local || tipo === "Escolha a opção" || !data || !hora || !descricao) {
    alert("Preencha todos os campos!");
    return;
  }

  // Aqui usaremos a localização do usuário como exemplo
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const denuncia = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        tipo,
        descricao,
        data,
        hora
      };

      const denunciasSalvas = JSON.parse(localStorage.getItem("denuncias")) || [];
      denunciasSalvas.push(denuncia);
      localStorage.setItem("denuncias", JSON.stringify(denunciasSalvas));

      alert("Denúncia registrada com sucesso!");
      window.location.href = "../pages/pagina_inicial.html";
    },
    () => {
      alert("Não foi possível obter sua localização.");
    }
  );
});
