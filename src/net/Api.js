/**
 * Created by pain on 2018/3/24.
 */
import Http from "./Http";
import Axios from 'axios';

export default class Api {

  static getLoanList() {
    // http://39.107.125.244:8080/loan/api/channel/list
    let url = 'http://39.107.125.244:8080/loan/api/channel/list';
    return Http.get(url);
  }

  static uploadLoanList(data) {
    let url = 'http://39.107.125.244:8080/loan/api/channel/update';
    return Http.post(url,data);
  }

  static uploadImg(file) {
    let formdata=new FormData();
    formdata.append('channelImg',file,file.name);
    let url = 'http://39.107.125.244:8080/loan/api/channel/img';
    return Http.post(url, formdata);
  }
}
