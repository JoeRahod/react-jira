import { useEffect, useState } from "react";

export const isFalsy = (value: any) => (value === 0 ? false : !value);
// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: Object) => {
  // Object.assign({}, object);
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// export const debounce = (fn, delay) => {
//   let timeout;
//   return () => {
//     if(timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(function() {
//       fn();
//     }, delay)
//   }
// }
// const log = debounce(() => console.log('debounce'), 1000);
// log();
// log();
// log();

// <V>泛型占位符
// useDebounce这个costomHook函数作用主要是把value转化成debounceValue;
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    // 每次在value监听变化的时候，设置一个定时器
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    // 每次在上一个useEffect处理之后再运行return的函数
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
};

// 什么时候用像cleanObject这样的普通函数，什么时候用useDebounce这样的costomHook
// 关键在于在该函数内是否需要使用到react本身的hook，需要的话则用use开头的函数，即costomHook

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  const clear = () => {
    setValue([]);
  };
  const removeIndex = (index: number) => {
    const copy = [...value];
    copy.splice(index, 1);
    setValue(copy);
  };
  return {
    value,
    setValue,
    clear,
    add: (item: T) => setValue([...value, item]),
    removeIndex,
  };
};
