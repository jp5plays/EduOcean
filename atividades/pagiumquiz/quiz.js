import { verificarTema, trocarTema } from "./helpers/tema-helper.js";

const botaoTema = document.querySelector(".tema button");
const body = document.querySelector("body");
const assunto = localStorage.getItem("assunto");

let quiz = {};
let pontos = 0;
let pergunta = 1;
let resposta = "";
let idInputResposta = "";
let respostaCorretaId = "";

botaoTema.addEventListener("click", () => {
    trocarTema(body, botaoTema);
});

verificarTema(body, botaoTema);

async function buscarPerguntas() {
    const urlDados = "../data.json";
    try {
        const resposta = await fetch(urlDados);
        const dados = await resposta.json();
        
        // Debug: Verifique se o JSON está correto
        console.log(dados);
        
        // Encontrar o quiz com base no assunto
        quiz = dados.quizzes.find(dado => dado.title === assunto);
        
        // Debug: Verifique se o assunto foi encontrado
        if (quiz) {
            console.log("Quiz encontrado:", quiz);
            quiz.questions.forEach(q => q.respostaCerta = null); // Inicializa o status das respostas
        } else {
            console.error("Assunto não encontrado:", assunto);
        }
    } catch (erro) {
        console.error("Erro ao buscar perguntas:", erro);
    }
}

function montarPergunta() {
    if (!quiz.questions || quiz.questions.length === 0) {
        console.error("Nenhuma pergunta encontrada para o assunto selecionado.");
        return;
    }

    const main = document.querySelector("main");
    const perguntaAtual = quiz.questions[pergunta - 1];

    main.innerHTML = `
        <section class="pergunta">
            <p>Questão ${pergunta} de ${quiz.questions.length}</p>
            <h2 id="t">${perguntaAtual.question}</h2>
            <section></section>
        </section>
        <section class="alternativas">
            <form action="">
                ${perguntaAtual.options.map((option, index) => `
                    <label for="alternativa_${String.fromCharCode(97 + index)}">
                        <input type="radio" id="alternativa_${String.fromCharCode(97 + index)}" name="alter" value="${option}">
                        <div>
                            <span>${String.fromCharCode(65 + index)}</span>
                            ${option}
                        </div>
                    </label>
                `).join('')}
            </form>
            <button>Enviar</button>
        </section>
    `;

    if (!document.querySelector('.bolinhas-container')) {
        const bolinhasContainer = document.createElement('div');
        bolinhasContainer.classList.add('bolinhas-container');
        bolinhasContainer.innerHTML = Array.from({ length: quiz.questions.length }, (_, i) => `
            <div class="bolinha" data-id="${i + 1}"></div>
        `).join('');
        main.querySelector(".pergunta").appendChild(bolinhasContainer);
    }

    adicionarEventoInputs();
    atualizarBolinhas(); // Garantir que as bolinhas mantenham as cores
}

function guardarResposta(evento) {
    resposta = evento.target.value;
    idInputResposta = evento.target.id;
    const botaoEnviar = document.querySelector(".alternativas button");
    botaoEnviar.addEventListener("click", validarResposta);
}

function validarResposta() {
    const botaoEnviar = document.querySelector(".alternativas button");
    botaoEnviar.innerText = pergunta === quiz.questions.length ? "Finalizar" : "Próxima";
    botaoEnviar.removeEventListener("click", validarResposta);
    botaoEnviar.addEventListener("click", pergunta === quiz.questions.length ? finalizar : proximaPergunta);

    const perguntaAtual = quiz.questions[pergunta - 1];
    
    if (resposta === perguntaAtual.answer) {
        document.querySelector(`label[for='${idInputResposta}']`).setAttribute("id", "correta");
        pontos += 1;
        quiz.questions[pergunta - 1].respostaCerta = true; // Marca a resposta como correta
    } else {
        document.querySelector(`label[for='${idInputResposta}']`).setAttribute("id", "errada");
        document.querySelector(`label[for='${respostaCorretaId}']`).setAttribute("id", "correta");
        quiz.questions[pergunta - 1].respostaCerta = false; // Marca a resposta como errada
    }

    atualizarBolinhas(); // Atualiza as cores das bolinhas após a resposta ser validada
}

function atualizarBolinhas() {
    const bolinhas = document.querySelectorAll('.bolinha');
    bolinhas.forEach((bolinha, index) => {
        bolinha.classList.remove('verde', 'vermelha');

        // Mantém as cores das bolinhas anteriores
        if (quiz.questions[index].respostaCerta === true) {
            bolinha.classList.add('verde');
        } else if (quiz.questions[index].respostaCerta === false) {
            bolinha.classList.add('vermelha');
        }
    });
}

function finalizar() {
    localStorage.setItem("pontos", pontos);
    window.location.href = "./resultado.html";
}

function proximaPergunta() {
    pergunta += 1;
    montarPergunta();
}

function adicionarEventoInputs() {
    const inputsResposta = document.querySelectorAll(".alternativas input");
    inputsResposta.forEach(input => {
        input.addEventListener("click", guardarResposta);

        if (input.value === quiz.questions[pergunta - 1].answer) {
            respostaCorretaId = input.id;
        }
    });
}

async function iniciar() {
    await buscarPerguntas();
    if (quiz.questions && quiz.questions.length > 0) {
        montarPergunta();
    } else {
        console.error("Não foi possível iniciar o quiz. Verifique o assunto e as perguntas.");
    }
}

iniciar();


