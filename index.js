require('dotenv').config();
const express = require('express');
const request = require('request-promise-native');

const app = express();
app.use(express.static('public'));

const port = 3000 || process.env.PORT;

app.get('/api/words', async (req, res) => {
  const options = {
    uri: 'https://wordsapiv1.p.mashape.com/words/',
    qs: { random: true },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY
    },
    json: true
  };
  const { word: adjective } = await request({
    ...options, qs: { ...options.qs, partOfSpeech: 'adjective' }
  });
  const { word: noun } = await request({
    ...options, qs: { ...options.qs, partOfSpeech: 'noun' }
  });
  const { word: verb } = await request({
    ...options, qs: { ...options.qs, partOfSpeech: 'verb' }
  });
  console.log(`adjective = ${adjective}, noun = ${noun}, verb = ${verb}`);
  return res.send(`${adjective}, ${noun}, ${verb}`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
