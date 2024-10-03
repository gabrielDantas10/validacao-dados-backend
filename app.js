const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Serve arquivos estáticos (como o HTML do formulário)
app.use(express.static(path.join(__dirname, 'public')));

// Página de sucesso ou erro
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Função para validar email
function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

// Função para validar DDDs
const validDDDs = ['11', '21', '31', '41', '51', '61']; // Exemplo, adicione outros conforme necessário

function isValidDDD(ddd) {
  return validDDDs.includes(ddd);
}

// Rota para lidar com o POST do formulário
app.post('/submit', (req, res) => {
  const { nomeAluno, nascimento, nomeMae, nomePai, ddd, telefone, email, serie, turno, atividades } = req.body;

  // Validações
  if (!nomeAluno || !nascimento || !nomeMae || !nomePai || !ddd || !telefone || !email || !serie || !turno) {
    return res.render('response', { message: 'Todos os campos são obrigatórios!' });
  }

  // Validação da data de nascimento
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(nascimento)) {
    return res.render('response', { message: 'Data de nascimento inválida!' });
  }

  // Validação de e-mail
  if (!isValidEmail(email)) {
    return res.render('response', { message: 'E-mail inválido!' });
  }

  // Validação de DDD
  if (!isValidDDD(ddd)) {
    return res.render('response', { message: 'DDD inválido!' });
  }

  // Validação de atividades extracurriculares (até 3)
  if (atividades && atividades.length > 3) {
    return res.render('response', { message: 'Selecione no máximo 3 atividades!' });
  }

  // Se todas as validações passarem
  res.render('response', { message: 'Cadastro realizado com sucesso!' });
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
