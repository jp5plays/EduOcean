document.querySelector("#formulario_log").addEventListener("submit" , function(event) {
  event.preventDefault();
  const email = document.querySelector("#email").value
  const senha = document.querySelector("#senha").value
  const dadoss = {
      email,
      senha
  };

  fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dadoss)
  })
  .then(response => {
      if (response.ok) {
          return response.json().then(data => {
              document.querySelector("#mensagem").innerText = data.message; 
              localStorage.setItem("token", data.token); 
              window.location.href = "../registro/registro.html";
              
          });
      } else {
          return response.json().then(data => {
              document.querySelector("#mensagem").innerText = data.message; 
          });
      }
  })
  .catch(error => {
      console.error("Erro:", error);
      document.querySelector("#mensagem").innerText = "Erro ao realizar o login."; 
  });
  
});

 