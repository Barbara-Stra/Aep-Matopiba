var itensMenu = document.querySelectorAll(".item-menu");

for (var i = 0; i < itensMenu.length; i++) {
  itensMenu[i].onclick = function () {
    for (var j = 0; j < itensMenu.length; j++) {
      itensMenu[j].classList.remove("ativo");
    }

    this.classList.add("ativo");
  };
}

var botoesSalvar = document.querySelectorAll(".salvar");

for (var k = 0; k < botoesSalvar.length; k++) {
  botoesSalvar[k].onclick = function () {
    if (this.classList.contains("marcado")) {
      this.classList.remove("marcado");
      this.innerHTML = "♡";
    } else {
      this.classList.add("marcado");
      this.innerHTML = "♥";
    }
  };
}

var botaoCursos = document.getElementById("botaoCursos");
var cursos = document.querySelector(".cards-cursos");

botaoCursos.onclick = function () {
  cursos.classList.toggle("aberto");

  if (cursos.classList.contains("aberto")) {
    botaoCursos.innerHTML = "Ver menos ›";
  } else {
    botaoCursos.innerHTML = "Ver todos ›";
  }
};
