import _ from 'lodash';

class Utils {
  static upperCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  static deleteArrayElement(array, stringArray) {
    for (let i = 0; i < stringArray?.length; i++) {
      array = array.filter(e => e !== stringArray[i]);
    }
    return array;
  }

  static removeFromId(array, stringArray) {
    stringArray.map(i => _.remove(array, function (n) {
      return +i === +n.id
    }))
  }
  static sliceText(text, maxLetters = 10) {
    if (text.length > maxLetters) {
      return text.slice(0, maxLetters) + '..'
    } else {
      return text
    }
  }

}

export default Utils;
