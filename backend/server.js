const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let users = [];

function generateMockToken(username) {
  return `mocked-token-for-${username}`;
}

app.post('/register', (req, res) => {
  const { username, password } = req.body;

  const existingUser = users.find(
    (user) => user.username === username
  );
  if (existingUser) {
    return res
      .status(400)
      .json({ message: 'Пользователь уже существует' });
  }

  users.push({ username, password });

  const token = generateMockToken(username);

  res.status(201).json({ message: 'Регистрация успешна', token });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res
      .status(401)
      .json({ message: 'Неверные учетные данные' });
  }

  const token = generateMockToken(username);

  res.status(200).json({ message: 'Логин успешен', token });
});

// Запускаем сервер
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
