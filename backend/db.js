const mysql = require ('mysql');

const connection = mysql.createConnection({
    host: 'localhost', // O host do banco. Ex: localhost
    user: 'usu', // Um usuário do banco. Ex: user 
    password: 'usu', // A senha do usuário. Ex: user123
    database: 'eduocean', // A base de dados a qual a aplicação irá se conectar, deve ser a mesma onde foi executado o Código 1. Ex: node_mysql
    port: 3306
});


connection.connect(err => {
    if (err) {
        console.error('Erro ao se conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados');
});


module.exports = connection;