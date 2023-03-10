import axios from 'axios'

const Client = axios.create({
  //baseURL : 'https://qa-website-api.herokuapp.com',
  baseURL : 'http://127.0.0.1:5001',
  headers: {
    //  Authorization: `<Your Auth Token>`,
    "Content-Type": "application/json",
    timeout : 5000,
  }, 
  // .. other options
});

export default Client;