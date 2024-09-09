import{verificarTema,trocarTema} from "./helpers/tema-helper.js"

const botaoTema = document.querySelector(".tema button")
const body = document.querySelector("body")
const assunto = localStorage.getItem("assunto")
const botaoJogarNovamente = document.querySelector("main button" )

botaoTema.addEventListener("click", () => {
    trocarTema(body,botaoTema)
    
})

botaoJogarNovamente.addEventListener("click",jogarNovamente)

verificarTema(body,botaoTema)



function inserirResultado(){
    const sectionPontuacao = document.querySelector(".pontuacao")
    const divAssunto = document.querySelector(".assunto")
    const divAssuntoB = document.querySelector(".assunto button")
    const pontos = localStorage.getItem("pontos")

    sectionPontuacao.innerHTML = `
        

                <strong>${pontos}</strong>
               <a href="../atividades.html"><button a   >Jogar Novamente</button></a> 
                <p> de 10</p>
                
                 
    `
}


function jogarNovamente(){
    localStorage.removeItem("pontos")
    localStorage.removeItem("assunto")

    window.location.href = "../atividades.html"
}
inserirResultado()

console.log(pontos)