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
 