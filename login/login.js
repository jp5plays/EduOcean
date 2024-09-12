function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
 
  
   if (username === '' || password === '') {
      errorMessage.textContent = 'Por favor, preencha todos os campos.';
      return;
    }
 
  
   if (username === 'admin' && password === '1234') {
      alert('Login realizado com sucesso!');
    } else {
      errorMessage.textContent = 'Usuário ou senha incorretos.';
    }
  }

  function validarFormulario() {
    var campos = document.querySelectorAll('.dados input');
    var mensagemErro = '';
  
    for (var i = 0; i < campos.length; i++) {
      if (campos[i].value === '') {
        mensagemErro += 'O campo ' + campos[i].getAttribute('name') + ' é obrigatório.<br>';
      }
    }
  
    if (mensagemErro !== '') {
      document.getElementById('mensagem-erro').innerHTML = mensagemErro;
      document.getElementById('mensagem-erro').style.color = 'red';
    } else {
      document.getElementById('mensagem-erro').innerHTML = '';
    }
  }
  
  document.querySelector('.entrar').addEventListener('click', validarFormulario);
 