function confirmar_senha() {
    const senha = document.querySelector("#senha").value;
    const senha2 = document.querySelector("#confirm_senha").value;
    if (senha !== senha2) {
       
        const mensagem = document.querySelector("#mensagem");
        mensagem.innerHTML = "<strong>Coloque a mesma senha nos dois campos</strong>";
    } else {
        
        const mensagem = document.querySelector("#mensagem");
        mensagem.innerHTML = "";
    }
}
document.querySelector("#confirm_senha").addEventListener("input", confirmar_senha);

document.querySelector("#formulario").addEventListener("submit", function(event) {
    event.preventDefault();
    const nome = document.querySelector("#nome").value;
    const email = document.querySelector("#email").value;
    const ra = document.querySelector("#ra").value;
    const senha = document.querySelector("#senha").value;
    const dados = {
       nome,email,senha,ra

    };
    
    fetch("http://localhost:3000/api/registro", {method: "POST", headers: {"Content-Type": "application/json"},body: JSON.stringify(dados)})
    .then(response => response.json()).then(data => {

        document.querySelector("#mensagem").innerText = "Cadastro realizado com sucesso!";
        

})  .catch(error => {
    console.error("Erro:", error);
    document.querySelector("#mensagem").innerText = "Erro ao cadastrar.";
});
   
});