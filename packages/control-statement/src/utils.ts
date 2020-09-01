type LoopFunc = (item: any, index: number, len: number, lenObj: number) => any;

function _iteratorLoop(record, func: LoopFunc, isMap?: boolean) {
  const size = record.size;
  let i = 0;

  for (const item of record) {
    let ret = null;
    if (isMap) {
      const [k, v] = item;
      ret = func.call(record, v, k, i, size);
    } else {
      ret = func.call(record, item, i, size);
    }

    if (ret === false) {
      break;
    }
    i++;
  }
}

export type EachType = 1 | 2 | 3 | 4;

export function each(record: any, func: LoopFunc, type: EachType = 1) {
  if (!record) {
    return;
  }

  switch (type) {
    case 1: // Array
      {
        for (let i = 0, l = record.length; i < l; i++) {
          const ret = func.call(record, record[i], i, l);

          if (ret === false) {
            break;
          }
        }
      }
      break;
    case 2: // Object
      {
        const keys = Object.keys(record),
          l = keys.length;
        for (let i = 0; i < l; i++) {
          const k = keys[i],
            ret = func.call(record, record[k], k, i, l);

          if (ret === false) {
            break;
          }
        }
      }
      break;
    case 3: // Map or WeakMap
      {
        _iteratorLoop(record, func, true);
      }
      break;
    case 4: // Set or WeakSet
      {
        _iteratorLoop(record, func);
      }
      break;
  }
}
