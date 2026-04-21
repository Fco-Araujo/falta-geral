const loginForm = document.getElementById("loginForm");
const nomeInput = document.getElementById("nome");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = nomeInput.value.trim();

  if (!nome) {
    alert("Digite seu nome para entrar.");
    return;
  }

  localStorage.setItem("usuarioPedidoFalta", nome);
  window.location.href = "dashboard.html";
});