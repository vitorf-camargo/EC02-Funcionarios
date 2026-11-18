class Funcionario {
  constructor(id, nome, idade, cargo, salario) {
    this.id = id
    this.nome = nome
    this.idade = idade
    this.cargo = cargo
    this.salario = salario
  }

  getNome() {
    return this.nome
  }

  setNome(nome) {
    this.nome = nome
  }

  getIdade() {
    return this.idade
  }

  setIdade(idade) {
    this.idade = idade
  }

  getCargo() {
    return this.cargo
  }

  setCargo(cargo) {
    this.cargo = cargo
  }

  getSalario() {
    return this.salario
  }

  setSalario(salario) {
    this.salario = salario
  }

  toString() {
    return this.nome + " - " + this.idade + " anos - " + this.cargo + " - R$ " + this.salario
  }
}

let funcionarios = []
let proximoId = 1
let editandoId = null

const buscarPorId = (id) => funcionarios.find(funcionario => funcionario.id === id)
const buscarPorNome = (nome) => funcionarios.find(funcionario => funcionario.nome === nome)
const removerPorId = (id) => {
  funcionarios = funcionarios.filter(funcionario => funcionario.id !== id)
}

document.getElementById("btn-cadastrar").addEventListener("click", function() {
  cadastrarFuncionario()
})

function cadastrarFuncionario() {
  let nome = document.getElementById("nome").value
  let idade = document.getElementById("idade").value
  let cargo = document.getElementById("cargo").value
  let salario = document.getElementById("salario").value

  if (nome === "" || idade === "" || cargo === "" || salario === "") {
    alert("Preenche todos os campos")
    return
  }

  if (editandoId === null) {
    let funcionario = new Funcionario(proximoId, nome, Number(idade), cargo, Number(salario))
    proximoId = proximoId + 1
    funcionarios.push(funcionario)
    alert("Funcionario cadastrado")
  } else {
    let funcionario = buscarPorId(editandoId)
    funcionario.setNome(nome)
    funcionario.setIdade(Number(idade))
    funcionario.setCargo(cargo)
    funcionario.setSalario(Number(salario))
    editandoId = null
    alert("Funcionario atualizado")
  }

  limparFormulario()
  renderizarTabela()
}

function editarFuncionario(id) {
  let funcionario = buscarPorId(id)

  document.getElementById("nome").value = funcionario.getNome()
  document.getElementById("idade").value = funcionario.getIdade()
  document.getElementById("cargo").value = funcionario.getCargo()
  document.getElementById("salario").value = funcionario.getSalario()

  editandoId = id
  console.log("editando funcionario " + funcionario.getNome())
}

function excluirFuncionario(id) {
  let funcionario = buscarPorId(id)
  removerPorId(id)
  alert("Funcionario excluido")
  console.log("funcionario removido: " + funcionario.getNome())
  renderizarTabela()
}

function limparFormulario() {
  document.getElementById("nome").value = ""
  document.getElementById("idade").value = ""
  document.getElementById("cargo").value = ""
  document.getElementById("salario").value = ""
}

function renderizarTabela() {
  let corpo = document.getElementById("corpo-tabela")
  corpo.innerHTML = ""

  funcionarios.forEach((funcionario) => {
    let linha = document.createElement("tr")

    let tdNome = document.createElement("td")
    tdNome.textContent = funcionario.getNome()

    let tdIdade = document.createElement("td")
    tdIdade.textContent = funcionario.getIdade()

    let tdCargo = document.createElement("td")
    tdCargo.textContent = funcionario.getCargo()

    let tdSalario = document.createElement("td")
    tdSalario.textContent = "R$ " + funcionario.getSalario().toFixed(2)

    let tdAcoes = document.createElement("td")

    let btnEditar = document.createElement("button")
    btnEditar.textContent = "Editar"
    btnEditar.className = "btn btn-warning btn-sm me-1"
    btnEditar.addEventListener("click", function() {
      editarFuncionario(funcionario.id)
    })

    let btnExcluir = document.createElement("button")
    btnExcluir.textContent = "Excluir"
    btnExcluir.className = "btn btn-danger btn-sm"
    btnExcluir.addEventListener("click", function() {
      excluirFuncionario(funcionario.id)
    })

    tdAcoes.appendChild(btnEditar)
    tdAcoes.appendChild(btnExcluir)

    linha.appendChild(tdNome)
    linha.appendChild(tdIdade)
    linha.appendChild(tdCargo)
    linha.appendChild(tdSalario)
    linha.appendChild(tdAcoes)

    corpo.appendChild(linha)
  })
}

document.getElementById("btn-salario-alto").addEventListener("click", function() {
  mostrarSalarioAlto()
})

document.getElementById("btn-media-salarial").addEventListener("click", function() {
  mostrarMediaSalarial()
})

document.getElementById("btn-cargos-unicos").addEventListener("click", function() {
  mostrarCargosUnicos()
})

document.getElementById("btn-nomes-maiusculo").addEventListener("click", function() {
  mostrarNomesMaiusculo()
})

function mostrarSalarioAlto() {
  let filtrados = funcionarios.filter(funcionario => funcionario.getSalario() > 5000)
  let nomes = filtrados.map(funcionario => funcionario.getNome())
  document.getElementById("relatorios").textContent = "Salario acima de 5000: " + nomes.join(", ")
}

function mostrarMediaSalarial() {
  if (funcionarios.length === 0) {
    document.getElementById("relatorios").textContent = "Nenhum funcionario cadastrado"
    return
  }

  let soma = funcionarios.reduce((total, funcionario) => total + funcionario.getSalario(), 0)
  let media = soma / funcionarios.length
  document.getElementById("relatorios").textContent = "Media salarial: R$ " + media.toFixed(2)
}

function mostrarCargosUnicos() {
  let cargos = funcionarios.map(funcionario => funcionario.getCargo())
  let cargosUnicos = [...new Set(cargos)]
  document.getElementById("relatorios").textContent = "Cargos unicos: " + cargosUnicos.join(", ")
}

function mostrarNomesMaiusculo() {
  let nomes = funcionarios.map(funcionario => funcionario.getNome().toUpperCase())
  document.getElementById("relatorios").textContent = "Nomes: " + nomes.join(", ")
}
