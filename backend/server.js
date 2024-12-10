const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(bodyParser.json());

let users = [];

function generateMockToken(username) {
  return `mocked-token-for-${username}`;
}

app.post('/register', (req, res) => {
  const { username, login, password } = req.body;

  const existingUser = users.find((user) => user.login === login);
  if (existingUser) {
    return res
      .status(400)
      .json({ message: 'Пользователь уже существует' });
  }

  users.push({ login, password });

  const token = generateMockToken(username);

  res.status(201).json({ message: 'Регистрация успешна', token });
});

app.post('/login', (req, res) => {
  const { username, login, password } = req.body;

  const user = users.find(
    (user) => user.login === login && user.password === password
  );

  if (!user) {
    return res
      .status(401)
      .json({ message: 'Неверные учетные данные' });
  }

  const token = generateMockToken(username);

  res.status(200).json({ message: 'Логин успешен', token });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
