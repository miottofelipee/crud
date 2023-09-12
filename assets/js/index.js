function criarEquipe() {
    let nome = document.getElementById("nomeDaEquipe").value
    let quantidade = Number(document.getElementById("quantidade").value)
    const novaEquipe = new Equipe(nome, quantidade)
    console.log(novaEquipe);
    equipeService.adicionarEquipe(novaEquipe);
    listarEquipes();
}

class Equipe {
    constructor(nome, quantidade) {
        this.id = this.gerarId();
        this.nome = nome;
        this.quantidade = quantidade;
        this.reserva = this.calcularReservas();
        this.totaldeJogadores = this.totaldeJogadores();
    }

    gerarId() {
        return Math.floor(Math.random() * 1000);
    }

    calcularReservas() {
        return Math.floor(this.quantidade / 2);
    }

    totaldeJogadores() {
        return this.quantidade + this.reserva;
    }
}

class EquipeService {
    constructor() {
        this.equipes = [];
    }

    adicionarEquipe(parametro) {
        this.equipes.push(parametro)
    }

    listarEquipes() {
        return this.equipes;
    }

    listarEquipesPorId(parametro) {
        return this.equipes.find(equipe => equipe.id == parametro);
    }

    atualizarEquipes(id, nome, quantidade) {
        const equipe = this.listarEquipesPorId(id);
        equipe.nome = nome;
        equipe.quantidade = quantidade;
        equipe.reserva = equipe.calcularReservas();
        equipe.totaldeJogadores = equipe.totaldeJogadores();

        return equipe;
    }

    deletarEquipe(parametro) {
        return (this.equipes = this.equipes.filter(
            (equipe) => equipe.id != parametro
        ))
    }
}

const equipeService = new EquipeService();

function listarEquipes() {
    const equipes = equipeService.listarEquipes();
    console.log(equipes);

    const elementoLista = document.getElementById("listarEquipes");
    elementoLista.innerHTML = '';
    let content = '';
    equipes.forEach((equipe) => {
        content += `
        <div onclick="listarEquipesPorId(${equipe.id})">
        <p> Nome: ${equipe.nome}</p>
        </div>
        `
    }
    )
    elementoLista.innerHTML = content;
}

function listarEquipesPorId(id) {
    const equipe = equipeService.listarEquipesPorId(id);
    console.log(equipe)

    const elementoLista = document.getElementById("listarEquipesUnica");
    elementoLista.innerHTML = '';
    let content = "";
    content = `
        <div>
        <p> Id: ${equipe.id}</p>
        <p> Nome: ${equipe.nome}</p>
        <p> Total de jogadores: ${equipe.totaldeJogadores}</p>
        <p> Titulares: ${equipe.quantidade}</p>
        <p> Reservas: ${equipe.reserva}</p>
        <button onclick="atualizarEquipes(${equipe.id})">Editar</button>
        <button onclick=" deletarEquipe(${equipe.id})">Deletar</button>
        </div>
    `
    elementoLista.innerHTML = content;
}

let aux = null;

function atualizarEquipes(id) {
    const equipe = equipeService.listarEquipesPorId(id);

    document.getElementById("nomeDaEquipe").value = equipe.nome;
    document.getElementById("quantidade").value = equipe.quantidade;

    document.getElementById("botaoCadastrar").classList.add("hidden");
    document.getElementById("botaoEditar").classList.remove("hidden");
    aux = id;
}

function editarEquipe() {
    const nome = document.getElementById("nomeDaEquipe").value
    const quantidade = document.getElementById("quantidade").value

    equipeService.atualizarEquipes(aux, nome, quantidade);

    listarEquipes();

    document.getElementById("botaoCadastrar").classList.remove("hidden");
    document.getElementById("botaoEditar").classList.add("hidden");

    document.getElementById('listarEquipesUnica').classList.add('hidden');
    aux = null;
}

function limparinputs() {
    document.getElementById("nomeDaEquipe").value = '';
    document.getElementById("quantidade").value = '';
}

function deletarEquipe(id) {
    equipeService.deletarEquipe(id);
    listarEquipes();
    document.getElementById('listarEquipesUnica').classList.add('hidden');
}

