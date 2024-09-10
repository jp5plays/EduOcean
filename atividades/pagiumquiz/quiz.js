import{verificarTema,trocarTema} from "./helpers/tema-helper.js"
const botaoTema = document.querySelector(".tema button")
const body = document.querySelector("body")
const assunto = localStorage.getItem("assunto")

let quiz = {}
let pontos = 0
let pergunta = 1
let resposta = ""
let idInputResposta = ""
let respostaCorretaId  = ""

botaoTema.addEventListener("click", () => {
    trocarTema(body,botaoTema)
})

verificarTema(body,botaoTema)





async function buscarPerguntas(){
    const urlDados = "../data.json"
    
    await fetch(urlDados).then(resposta => resposta.json()).then(dados => {
        dados.quizzes.forEach(dado => {
            if (dado.title === assunto) {
                quiz = dado
            }
        })
    })
   
}

function montarPergunta() {
    const main = document.querySelector("main")

    main.innerHTML = `
        <section class="pergunta">
            
            <p>Questão ${pergunta} de 10</p>
            <h2 id="t">${quiz.questions[pergunta-1].question}</h2>
                <section></section>
          <div class="bolinhas-container"></div>
            <div class="bolinha" data-id="1"></div>
            <div class="bolinha" data-id="2"></div>
            <div class="bolinha" data-id="3"></div>
            <div class="bolinha" data-id="4"></div>
            <div class="bolinha" data-id="5"></div>
            <div class="bolinha" data-id="6"></div>
            <div class="bolinha" data-id="7"></div>
            <div class="bolinha" data-id="8"></div>
            <div class="bolinha" data-id="9"></div>
            <div class="bolinha" data-id="10"></div>
            </div>
        </section>

       
    
        <section class="alternativas">
            <form action="">
                
                <label for="alternativa_a" >
                    <input type="radio" id="alternativa_a" name="alter" value = "${quiz.questions[pergunta-1].options[0]}">

                    <div>
                        <span>A</span>
                        ${quiz.questions[pergunta-1].options[0]}
                    </div>
                </label>
                

                <label for="alternativa_b" >
                    <input type="radio" id="alternativa_b" name="alter" value = "${quiz.questions[pergunta-1].options[1]}">

                    <div>
                        <span>B</span>
                        ${quiz.questions[pergunta-1].options[1]}
                    </div>
                </label>

                <label for="alternativa_c">
                    <input type="radio" id="alternativa_c" name="alter" value=" ${quiz.questions[pergunta-1].options[2]}">

                    <div>
                        <span>C</span>
                        ${quiz.questions[pergunta-1].options[2]}
                    </div>
                </label>

                <label for="alternativa_d">
                    <input type="radio" id="alternativa_d" name="alter"  value=" ${quiz.questions[pergunta-1].options[3]}">

                    <div>
                        <span>D</span>
                        ${quiz.questions[pergunta-1].options[3]}
                    </div>
                </label>

            </form>

            <button>Enviar</button> 

          

        

        </section>
        `
    
    
}

    function guardarResposta(evento){
        resposta = evento.target.value
        idInputResposta = evento.target.id

        const botaoEnviar = document.querySelector(".alternativas button")
        botaoEnviar.addEventListener("click",validarResposta)
    }

    function validarResposta(){
        const botaoEnviar = document.querySelector(".alternativas button")
        botaoEnviar.innerText = "Próxima"
        botaoEnviar.removeEventListener("click",validarResposta)
       


        if (pergunta ===10){
            botaoEnviar.innerText = "Finalizar"
            botaoEnviar.addEventListener("click",finalizar)

        } 
        else{
            botaoEnviar.addEventListener("click", proximaPergunta)
        }

        if(resposta === quiz.questions[pergunta-1].answer){
            document.querySelector(`label[for='${idInputResposta}']`).setAttribute("id","correta")
            
            pontos = pontos+1
            
        }else{
            document.querySelector(`label[for='${idInputResposta}']`).setAttribute("id","errada")
            document.querySelector(`label[for='${respostaCorretaId}']`).setAttribute("id","correta")

        }

        pergunta = pergunta+1
      
    }

    function finalizar(){
        localStorage.setItem("pontos", pontos)

        window.location.href = "./resultado.html"
    }

    function proximaPergunta(){
        montarPergunta() 
        adicionarEventoInputs()
        
    }
    
    function adicionarEventoInputs(){
        const inputsResposta = document.querySelectorAll(".alternativas input")
        inputsResposta.forEach(input => {
            input.addEventListener("click", guardarResposta )

            if(input.value === quiz.questions[pergunta-1].answer){
                respostaCorretaId = input.id
            }
        })
    }

    async function iniciar() {
     
        await buscarPerguntas()
        montarPergunta()
        adicionarEventoInputs()

    }

    iniciar()


    console.log(pontos)







