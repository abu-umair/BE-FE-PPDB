import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://beppdb.evolusidigital.id/api/ppdb-abudzar/',
  // baseURL: 'http://127.0.0.1:8000/api/ppdb-abudzar/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
// https://chat.openai.com/c/622c9ea9-0d8a-462c-8d40-a0bd4aaae0c2