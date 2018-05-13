/**
 * Created by pain on 2018/3/24.
 */
import {Host, ImageHost} from "../common/Constants";
import Axios from 'axios';

export default class Http {

  static getUrl(url) {
    return Host + url;
  }

  static getImagePath(imageName) {
    return ImageHost + imageName;
  }


  static get(url) {
    return this.asyncGet(url);
  }

  static post(url, data) {
    return this.asyncP('POST', url, data);
  }

  static patch(url, data) {
    return this.asyncP('PATCH', url, data);
  }

  static put(url, data) {
    return this.asyncP('PUT', url, data);
  }

  static delete(url) {
    return this.asyncP('DELETE', url, {});
  }

  static asyncGet(url) {
    return Axios({
      url,
      method: "GET",
      headers: this.getHeaders()
    })
      .then((response) => Http.processResponse(response))
      .catch((error) => Http.processError(error))
  }

  static asyncP(method, url, data) {
    return Axios({
      url: url,
      method: method,
      headers: this.getHeaders(),
      data: data
    })
      .then((response) => Http.processResponse(response))
      .catch((error) => Http.processError(error));
  }

  /**
   * 统一的消息处理
   * @param response
   * @returns {Promise}
   */
  static processResponse(response) {
    return new Promise((resolve, reject) => {
      let {status = 0} = response;
      if (status >= 200 && status < 400) {
        resolve(response.data);
      } else {
        reject({'status': status, 'message': status + ' 网络错误'});
      }
    })
  }

  static processError(error) {
    return new Promise((resolve, reject) => {
      if(error.response){
        //请求已经发出，但是服务器响应返回的状态吗不在2xx的范围内
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.header);
        let {status = 0} = error.response;
        if (status >= 500) {
          reject({'status': status, 'message': status + ' 服务器异常'});
        } else {
          // 会话过期统一处理
          reject({'status': status, 'message': status + ' 网络错误'});
        }
      }else {
        //一些错误是在设置请求的时候触发
        console.log('Error',error.message);
        reject({'message': error.message});
      }
      console.log(error.config);
    })
  }

  /**
   * 统一的消息头
   */
  static getHeaders() {
    return Http.getHeadersWithoutToken();
  }

  /**
   * 不带token的消息头
   */
  static getHeadersWithoutToken() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }
}
