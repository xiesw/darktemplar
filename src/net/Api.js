/**
 * Created by pain on 2018/3/24.
 */
import Http from "./Http";

export default class Api {

  static getLoanList() {
    let url = 'https://www.easy-mock.com/mock/5ab5bb961a094046dab2caba/example/loanlist';
    return Http.get(url);

  }

}
