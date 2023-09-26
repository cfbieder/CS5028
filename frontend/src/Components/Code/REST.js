import axios from "axios";
// Docker or Development mode
//var api = "/api";
var api = "http://192.168.1.252:3001"
console.log("[FE] API used: %s", api);

//TO DO ADD routing optins for Docker
export default class Rest {
  async getTopics() {
    var res = {};
    axios.defaults.headers.common["x-access-token"] = sessionStorage.getItem(
      "token"
    );
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    await axios
      .get(api+'/topics')
      .then(response => {
        res = response.data;
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status);
          res = { Error: error.response.status };
        }
      });
    return res;
  }

  async getSelectedFeeds(qry) {
    var res = {};
    axios.defaults.headers.common["x-access-token"] = sessionStorage.getItem(
      "token"
    );
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    await axios
      .get(api+'/feeds/selected/'+JSON.stringify(qry))
      .then(response => {
        res = response.data;
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status);
          res = { Error: error.response.status };
        }
      });
    return res;
  }




}