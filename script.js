class Curso {
  constructor(nome, categoria, progresso, icone, cor) {
    this.nome = nome;
    this.categoria = categoria;
    this.progresso = progresso;
    this.icone = icone;
    this.cor = cor;
    this.concluido = progresso >= 100;
  }

  concluir() {
    this.progresso = 100;
    this.concluido = true;
  }
}

class ListaDesejos {
  constructor() {
    // INICIO DA ESTRUTURA DE DADOS: LISTA
    // A lista foi feita usando um array chamado "itens".
    // Cada posicao desse array guarda um objeto do tipo Curso.
    this.itens = [
      new Curso("Desenvolvimento Web", "Tecnologia", 0, "🌐", "verde-texto"),
      new Curso("Panificacao Artesanal", "Culinaria", 0, "🍞", "laranja-texto"),
      new Curso("Gestao do Tempo", "Educacao", 0, "📘", "azul-texto"),
      new Curso("Sustentabilidade na Pratica", "Meio Ambiente", 0, "🌿", "verde-texto")
    ];
    // FIM DA ESTRUTURA DE DADOS: LISTA
  }

  adicionar(curso) {
    // push adiciona um novo curso no final da lista.
    this.itens.push(curso);
  }

  remover(posicao) {
    // splice remove um item da lista usando a posicao dele.
    this.itens.splice(posicao, 1);
  }

  removerPorNome(nome) {
    // Percorre a lista procurando um curso com o mesmo nome.
    for (var i = 0; i < this.itens.length; i++) {
      if (this.itens[i].nome.toLowerCase() == nome.toLowerCase()) {
        // Quando encontra, remove esse curso da lista.
        this.itens.splice(i, 1);
        return;
      }
    }
  }
}

class Aplicacao {
  constructor() {
    this.cursos = [
      new Curso("Introducao a Programacao", "Tecnologia", 75, "💻", "verde-texto"),
      new Curso("Cozinha Sustentavel", "Culinaria", 40, "🍳", "laranja-texto"),
      new Curso("Tecnicas de Estudo", "Educacao", 20, "🎓", "azul-texto"),
      new Curso("ODS 15 e Ecossistemas", "Meio Ambiente", 55, "🌿", "verde-texto"),
      new Curso("HTML e CSS Basico", "Tecnologia", 30, "🧩", "azul-texto"),
      new Curso("Horta em Casa", "Meio Ambiente", 10, "🥬", "verde-texto")
    ];

    this.listaDesejos = new ListaDesejos();
    // Esta variavel controla se os cursos estao ordenados por progresso.
    this.ordenado = false;
  }

  iniciar() {
    this.configurarMenu();
    this.mostrarCursos();
    this.mostrarDesejos();
    this.atualizarResumo();
    this.configurarFormularioDesejos();
    this.configurarOrdenacao();
  }

  configurarMenu() {
    var botoes = document.querySelectorAll(".item-menu, .link-pagina");

    for (var i = 0; i < botoes.length; i++) {
      botoes[i].onclick = (evento) => {
        var pagina = evento.currentTarget.getAttribute("data-pagina");
        this.abrirPagina(pagina);
      };
    }
  }

  abrirPagina(nomePagina) {
    var paginas = document.querySelectorAll(".pagina-site");
    var botoesMenu = document.querySelectorAll(".item-menu");

    for (var i = 0; i < paginas.length; i++) {
      paginas[i].classList.remove("aparecer");
    }

    for (var j = 0; j < botoesMenu.length; j++) {
      botoesMenu[j].classList.remove("ativo");
      if (botoesMenu[j].getAttribute("data-pagina") == nomePagina) {
        botoesMenu[j].classList.add("ativo");
      }
    }

    document.getElementById(nomePagina).classList.add("aparecer");
    document.getElementById("subtitulo").innerHTML = this.pegarSubtitulo(nomePagina);
  }

  pegarSubtitulo(pagina) {
    if (pagina == "cursos") return "Escolha um curso e acompanhe seu progresso.";
    if (pagina == "desejos") return "Guarde cursos para fazer depois.";
    if (pagina == "matopiba") return "Entenda a regiao e o impacto ambiental do projeto.";
    if (pagina == "sobre") return "Conheca os requisitos atendidos pela aplicacao.";
    return "Que bom ter voce aqui. Continue aprendendo e plantando o futuro!";
  }

  mostrarCursos() {
    var cursosInicio = document.getElementById("cursosInicio");
    var listaCursos = document.getElementById("listaCursos");
    var htmlInicio = "";
    var htmlTodos = "";

    for (var i = 0; i < this.cursos.length; i++) {
      var card = this.criarCardCurso(this.cursos[i]);
      htmlTodos += card;

      if (i < 3) {
        htmlInicio += card;
      }
    }

    cursosInicio.innerHTML = htmlInicio;
    listaCursos.innerHTML = htmlTodos;
  }

  criarCardCurso(curso) {
    var textoBotao = "Concluir curso";
    var classeConcluido = "";

    if (curso.concluido == true) {
      textoBotao = "Curso concluido";
      classeConcluido = "curso-concluido";
    }

    return `
      <div class="curso ${classeConcluido}">
        <div class="icone">${curso.icone}</div>
        <p class="categoria ${curso.cor}">${curso.categoria}</p>
        <h3>${curso.nome}</h3>
        <p>${curso.progresso}% concluido</p>
        <div class="barra"><span style="width:${curso.progresso}%"></span></div>
        <button class="botao-desejo" data-nome="${curso.nome}" data-categoria="${curso.categoria}" data-icone="${curso.icone}">Adicionar aos desejos</button>
        <button class="botao-concluir" data-nome="${curso.nome}">${textoBotao}</button>
      </div>
    `;
  }

  mostrarDesejos() {
    var lista = document.getElementById("listaDesejos");
    var desejosInicio = document.getElementById("desejosInicio");
    var htmlLista = "";
    var htmlInicio = "";

    // Percorre a lista de desejos e monta o HTML de cada item na tela.
    for (var i = 0; i < this.listaDesejos.itens.length; i++) {
      var item = this.listaDesejos.itens[i];

      htmlLista += `
        <div class="desejo">
          <span>${item.icone}</span>
          <div>
            <h4>${item.nome}</h4>
            <p>${item.categoria}</p>
          </div>
          <button class="remover" data-posicao="${i}">Remover</button>
        </div>
      `;

      if (i < 4) {
        htmlInicio += `
          <div class="desejo">
            <span>${item.icone}</span>
            <div>
              <h4>${item.nome}</h4>
              <p>${item.categoria}</p>
            </div>
            <button class="salvar marcado">♥</button>
          </div>
        `;
      }
    }

    if (this.listaDesejos.itens.length == 0) {
      htmlLista = "<p class='vazio'>Sua lista esta vazia. Adicione um curso para fazer depois.</p>";
      htmlInicio = "<p class='vazio'>Nenhum desejo salvo ainda.</p>";
    }

    lista.innerHTML = htmlLista;
    desejosInicio.innerHTML = htmlInicio;
    this.configurarBotoesDesejos();
    this.atualizarContadorDesejos();
  }

  configurarBotoesDesejos() {
    var botoesRemover = document.querySelectorAll(".remover");
    var botoesAdicionar = document.querySelectorAll(".botao-desejo");
    var botoesConcluir = document.querySelectorAll(".botao-concluir");

    for (var i = 0; i < botoesRemover.length; i++) {
      botoesRemover[i].onclick = (evento) => {
        var posicao = evento.currentTarget.getAttribute("data-posicao");
        // Remove o desejo pela posicao que ele ocupa na lista.
        this.listaDesejos.remover(posicao);
        this.mostrarDesejos();
      };
    }

    for (var j = 0; j < botoesAdicionar.length; j++) {
      botoesAdicionar[j].onclick = (evento) => {
        var botao = evento.currentTarget;
        var nome = botao.getAttribute("data-nome");
        var categoria = botao.getAttribute("data-categoria");
        var icone = botao.getAttribute("data-icone");
        // Adiciona o curso selecionado na lista de desejos.
        this.adicionarNaLista(nome, categoria, icone);
      };
    }

    for (var k = 0; k < botoesConcluir.length; k++) {
      botoesConcluir[k].onclick = (evento) => {
        var nomeCurso = evento.currentTarget.getAttribute("data-nome");
        this.concluirCurso(nomeCurso);
      };
    }
  }

  configurarFormularioDesejos() {
    document.getElementById("adicionarDesejo").onclick = () => {
      var nome = document.getElementById("nomeDesejo").value;
      var categoria = document.getElementById("categoriaDesejo").value;

      if (nome.trim() == "") {
        this.mostrarAviso("Digite o nome do curso.");
        return;
      }

      this.adicionarNaLista(nome, categoria, "⭐");
      document.getElementById("nomeDesejo").value = "";
    };
  }

  adicionarNaLista(nome, categoria, icone) {
    // Antes de adicionar, percorre a lista para evitar curso repetido.
    for (var i = 0; i < this.listaDesejos.itens.length; i++) {
      if (this.listaDesejos.itens[i].nome.toLowerCase() == nome.toLowerCase()) {
        this.mostrarAviso("Este curso ja esta na lista de desejos.");
        return;
      }
    }

    this.listaDesejos.adicionar(new Curso(nome, categoria, 0, icone, "verde-texto"));
    this.mostrarDesejos();
    this.mostrarAviso("Curso adicionado aos desejos.");
  }

  mostrarAviso(texto) {
    document.getElementById("avisoDesejo").innerHTML = texto;
  }

  concluirCurso(nomeCurso) {
    // Procura o curso pelo nome e altera o progresso dele para 100%.
    for (var i = 0; i < this.cursos.length; i++) {
      if (this.cursos[i].nome == nomeCurso) {
        this.cursos[i].concluir();
      }
    }

    // Se o curso concluido estava na lista de desejos, ele e removido.
    this.listaDesejos.removerPorNome(nomeCurso);
    this.mostrarCursos();
    this.mostrarDesejos();
    this.atualizarResumo();
    this.mostrarAviso("Curso concluido. Ele foi removido da lista de desejos.");
  }

  configurarOrdenacao() {
    document.getElementById("botaoOrdenar").onclick = () => {
      if (this.ordenado == false) {
        this.cursos.sort(function (a, b) {
          return b.progresso - a.progresso;
        });
        this.ordenado = true;
        document.getElementById("botaoOrdenar").innerHTML = "Ordem original";
      } else {
        location.reload();
      }

      this.mostrarCursos();
    };
  }

  atualizarResumo() {
    var soma = 0;

    for (var i = 0; i < this.cursos.length; i++) {
      soma += this.cursos[i].progresso;
    }

    var media = Math.round(soma / this.cursos.length);
    document.getElementById("textoProgresso").innerHTML = media + "%";
    document.getElementById("barraProgresso").style.width = media + "%";
    document.getElementById("totalCursos").innerHTML = this.cursos.length;
    document.getElementById("cursosConcluidos").innerHTML = this.contarConcluidos();
    document.getElementById("totalArvores").innerHTML = this.contarConcluidos() * 8;
  }

  contarConcluidos() {
    var total = 0;

    for (var i = 0; i < this.cursos.length; i++) {
      if (this.cursos[i].concluido == true) {
        total++;
      }
    }

    return total;
  }

  atualizarContadorDesejos() {
    var total = this.listaDesejos.itens.length;
    document.getElementById("contadorDesejos").innerHTML = total + " itens";
    document.getElementById("contadorDesejosInicio").innerHTML = total;
  }
}

var app = new Aplicacao();
app.iniciar();
