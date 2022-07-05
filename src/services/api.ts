import axios from 'axios';

const key = '8b1668bc91db1b51d54700077725fd58a155ffc0';

const bitly = axios.create({
  baseURL: 'https://api-ssl.bitly.com/v4',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${key}`,
  },
});

export default bitly;
