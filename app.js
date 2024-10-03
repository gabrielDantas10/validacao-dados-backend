const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

const validDDDs = ['68', '96', '92','97','91','93','94','69','95','63','82','71','73','74','75','77','85','88','98','99','83','81','87','86','89','84','79','61','62','64','65','66',
  '67','27','28','31','32','33','34','35','37','38','21','22','24','11','12','13','14','15','16','17','18','19','41','42','43','44','45','46','51','53','54','55','47','48','49'];

function isValidDDD(ddd) {
  return validDDDs.includes(ddd);
}

app.post('/submit', (req, res) => {
  const { nomeAluno, nascimento, nomeMae, nomePai, ddd, telefone, email, serie, turno, atividades } = req.body;

  if (!nomeAluno || !nascimento || !nomeMae || !nomePai || !ddd || !telefone || !email || !serie || !turno) {
    return res.render('response', { message: 'Todos os campos são obrigatórios!' });
  }

  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(nascimento)) {
    return res.render('response', { message: 'Data de nascimento inválida!' });
  }

  if (!isValidEmail(email)) {
    return res.render('response', { message: 'E-mail inválido!' });
  }

  if (!isValidDDD(ddd)) {
    return res.render('response', { message: 'DDD inválido!' });
  }

  if (atividades && atividades.length > 3) {
    return res.render('response', { message: 'Selecione no máximo 3 atividades!' });
  }

  res.render('response', { message: 'Cadastro realizado com sucesso!' });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
