function login() {
  const nameEl = document.querySelector("#name");
  sessionStorage.setItem("userName", nameEl.value);
  window.location.href = "play.html";
}
