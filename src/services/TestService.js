import axios from 'axios';

export default class TestService {
  constructor() {}
  demoGet(callback) {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    console.log(url);
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        callback(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
