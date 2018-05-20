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
    if (index === -1 || index === 0) {
      return;
    }
    this.swapItems(arr, index, index - 1);
  };

  // 下移数组
  static downRecord(arr, item) {
    let index = arr.indexOf(item);
    if (index === -1 || index === arr.length - 1) {
      return;
    }
    this.swapItems(arr, index, index + 1);
  };

  static exchangeItem(arr, oldItem, newItem) {
    let index = arr.indexOf(oldItem);
    if (index === -1) {
      return false;
    }
    arr.splice(index, 1, newItem);
    return true;
  }

  // 为数组列表添加顺序
  static addOrder(arr) {
    if (!arr || arr.length === 0) {
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      arr[i].channelOrder = i;
    }
  }

}


