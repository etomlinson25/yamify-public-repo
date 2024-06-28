const express = require('express');
const axios = require('axios');

const app = express();
const port = 8081;

// Set up a middleware to use the common headers in all the requests
app.use((req, res, next) => {
  req.headers = {
    'X-RapidAPI-Key': '7f1334b7c3msha2e8edbc004ef7cp19bbacjsn62c7f6baa035',
    'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com',
  };
  next();
});

/**
 * Returns the most recent finance news
 */
app.get('/news', async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://mboum-finance.p.rapidapi.com/ne/news',
      headers: req.headers,
    };
    const response = await axios.request(options);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
});
app.get('/quote/:symbol', async (req, res) => {
  const symbol = req.params.symbol;

  try {
    const options = {
      method: 'GET',
      url: 'https://mboum-finance.p.rapidapi.com/qu/quote',
      params: { symbol: symbol },
      headers: req.headers,
    };
    const response = await axios.request(options);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
});
app.get('/form4', async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://mboum-finance.p.rapidapi.com/v1/sec/form4',
      headers: req.headers,
    };
    const response = await axios.request(options);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
});

app.get('/newsForSymbol', async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://mboum-finance.p.rapidapi.com/ne/news/',
      params: { symbol: 'AAPL,MSFT' },
      headers: req.headers,
    };
    const response = await axios.request(options);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
});

app.get('/module', async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://mboum-finance.p.rapidapi.com/mo/module/',
      params: { symbol: 'AAPL', module: 'asset-profile,financial-data,earnings' },
      headers: req.headers,
    };
    const response = await axios.request(options);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
});

app.get('/history', async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://mboum-finance.p.rapidapi.com/hi/history',
      params: { symbol: 'AAPL', interval: '15m', diffandsplits: 'false' },
      headers: req.headers,
    };
    const response = await axios.request(options);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`App running on http://18.118.32.185:8081`);
});

