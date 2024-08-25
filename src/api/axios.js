import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3500' // set to the destination of axios i.e. the NodeJS app
})