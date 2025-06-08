function selecionarAvatar(img) {
  const selecionado = document.querySelector('.avatar-selecionado');
  selecionado.style.backgroundImage = `url(${img.src})`;
}
