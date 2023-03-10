function login() { 
  const nameEl = document.querySelector("#name"); //#name refers to the element id in index.html
  localStorage.setItem("userName", nameEl.value); //localStorage means stores locally on computer
  window.location.href = "play.html"; //will bring user to a different page
}
