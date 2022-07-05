import axios from 'axios';

const key = 'your key';

const bitly = axios.create({
  baseURL: 'https://api-ssl.bitly.com/v4',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${key}`,
  },
});

export default bitly;
