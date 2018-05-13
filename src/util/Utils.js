/**
 * Created by xieshangwu on 2018/3/11.
 * 简单的工具
 */

export default class Utils {

  /**
   * 移除数组里的项
   * @param arr
   * @param item
   */
  static removeArrayItem(arr, item) {
    if (!arr) {
      return
    }
    let index = arr.indexOf(item);

    if (index !== -1) {
      arr.splice(index, 1);
    }
  }

  /**
   * 生成16位随机id
   */
  static createId() {
    return Math.random().toString(36).substr(2);
  }

  static swapItems(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
  };

  // 上移数组
  static upRecord(arr, item) {
    let index = arr.indexOf(item);
    if(index === -1 || index === 0) {
      return;
    }
    this.swapItems(arr, index, index - 1);
  };

  // 下移数组
  static downRecord (arr, item) {
    let index = arr.indexOf(item);
    if(index === -1 || index === arr.length -1) {
      return;
    }
    this.swapItems(arr, index, index + 1);
  };

  // 判断两个数组是否一致
  static compareArray(a1, a2) {
    if (a1 === a2) return true;
    if ((!a1 && a2) || (a1 && ! a2)) return false;
    if (a1.length !== a2.length) return false;
    for (let i = 0, n = a1.length; i < n; i++) {
      if (a1[i] !== a2[i]) return false;
    }
    return true;
  }

  static exchangeItem(arr, oldItem, newItem) {
    let index = arr.indexOf(oldItem);
    if(index === -1) {
      return false;
    }
    arr.splice(index, 1, newItem);
    return true;
  }
}

