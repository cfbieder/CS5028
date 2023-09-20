import axios from "axios";

export default class Rest {
    async getTopics() {
        var res = {};
        axios.defaults.headers.common["x-access-token"] = sessionStorage.getItem(
          "token"
        );
        axios.defaults.headers.post["Content-Type"] =
          "application/x-www-form-urlencoded";
        await axios
          .get(`http://192.168.1.252:5000/topics`)
          .then(response => {
            res = response.data;
          })
          .catch(function(error) {
            if (error.response) {
              console.log(error.response.status);
              res = { Error: error.response.status };
            }
          });
        return res;
      }



}