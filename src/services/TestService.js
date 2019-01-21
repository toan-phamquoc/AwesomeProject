import axios from "axios";

export default class TestService {
  constructor() { }
  demoGet = callback => {
    const url = "https://jsonplaceholder.typicode.com/todos";
    console.log(url);
    axios
      .get(url)
      .then(response => {
        console.log(response);
        callback(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getFriendList = (userId) => {
    console.log("get friends of ", userId);
    const url = `https://randomuser.me/api/?&results=20`;
    let rs = {
      error: null
    };
    return axios.get(url)
      .then((res) => {
        if (res.status === 200) {
          rs.data = res.data.results;
        } else {
          rs.error = res.error;
        }
        return rs;
      }).catch(error => {
        rs.error = error;
        return rs;
      });
  };
}
