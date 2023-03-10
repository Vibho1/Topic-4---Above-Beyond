const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 3001;
const base = `${__dirname}`;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.get('/', (req, res) => {
  res.sendFile(`${base}/vibho.html`);
  console.log(base);
});


app.get('/script.js', (req, res) => {
  res.sendFile(`${base}/script.js`);
});

app.get('/ss', (req, res) => {
  res.sendFile(`${base}/ss.js`);
});

app.get('/sharma', (req, res) => {
  res.sendFile(`${base}/sharma.html`);
});

app.get('/result', (req, res) => {
  res.sendFile(`${base}/result.html`);
});

app.get('/user', (req, res) => {
  res.sendFile(`${base}/above.html`);
});

app.get('/vibho', (req, res) => {
  res.sendFile(`${base}/vibho.html`);
});


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});