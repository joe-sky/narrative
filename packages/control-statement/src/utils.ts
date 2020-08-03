// Internal function for creating a toString-based type tester.
function _tagTester(name) {
  return function(obj) {
    return toString.call(obj) === '[object ' + name + ']';
  };
}

export const isMap = _tagTester('Map');
export const isWeakMap = _tagTester('WeakMap');
export const isSet = _tagTester('Set');
export const isWeakSet = _tagTester('WeakSet');

function _getProperty(key: string) {
  return function(obj) {
    return obj == null ? void 0 : obj[key];
  };
}

const _getLength = _getProperty('length');

export function isArrayLike(obj) {
  const length = _getLength(obj);
  return typeof length == 'number' && length >= 0;
}

function _iteratorLoop(obj, func: Function, isMap?: boolean) {
  const size = obj.size;
  let i = 0;

  for (const item of obj) {
    let ret;
    if (isMap) {
      const [k, v] = item;
      ret = func.call(obj, v, k, i, size);
    } else {
      ret = func.call(obj, item, i, size);
    }

    if (ret === false) {
      break;
    }
    i++;
  }
}

export function each(obj, func: Function, isArr?: boolean) {
  if (!obj) {
    return;
  }

  if (isArr == null) {
    isArr = isArrayLike(obj);
  }

  if (isArr) {
    for (let i = 0, l = obj.length; i < l; i++) {
      const ret = func.call(obj, obj[i], i, l);

      if (ret === false) {
        break;
      }
    }
  } else if (isSet(obj) || isWeakSet(obj)) {
    _iteratorLoop(obj, func);
  } else if (isMap(obj) || isWeakMap(obj)) {
    _iteratorLoop(obj, func, true);
  } else {
    const keys = Object.keys(obj),
      l = keys.length;
    for (let i = 0; i < l; i++) {
      const k = keys[i],
        ret = func.call(obj, obj[k], k, i, l);

      if (ret === false) {
        break;
      }
    }
  }
}
