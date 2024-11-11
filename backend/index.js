const connection = require('./db');
require('dotenv').config();
const jwt = require("jsonwebtoken");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/api/registro', (req, res) => {
    const { nome, email, ra, senha } = req.body;
    const query = 'INSERT INTO users (nome, email, ra, senha) VALUES (?, ?, ?, ?)';

    connection.query(query, [nome, email, ra, senha], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ id: results.insertId, nome, email, ra, senha });
    });
});

app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;

    // Query para buscar o usuário pelo email
    connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
        }

        // Verificar se o usuário existe
        if (results.length === 0) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos' });
        }

        // Verificar se a senha corresponde
        const user = results[0]; // A primeira linha do resultado é o usuário encontrado
        if (senha === user.senha) {
            // Extrair as variáveis necessárias para o token
            const { nome, id } = user;

            // Gerar o token JWT com o nome e id do usuário
            const token = jwt.sign({ email, nome, id }, process.env.SECRET_KEY, { expiresIn: "1h" });

            // Retornar o token e a mensagem de sucesso
            return res.status(200).json({ message: 'Usuário logado com sucesso!', token, ok: true });
        }

        // Se a senha não for válida, retornar erro
        res.status(401).json({ message: 'Usuário ou senha inválidos' });
    });
});


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});