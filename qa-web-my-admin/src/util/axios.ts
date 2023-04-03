import axios from 'axios'

const Client = axios.create({
  baseURL : 'https://findovieml-lvg4jtksiq-as.a.run.app',
  //baseURL : 'http://127.0.0.1:5556',
  headers: {
    //  Authorization: `<Your Auth Token>`,
    "Content-Type": "application/json",
    timeout : 5000,
  }, 
  // .. other options
});

export default Client;