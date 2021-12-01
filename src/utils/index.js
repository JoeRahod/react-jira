import { useEffect, useState } from "react";

export const isFalsy = (value) => (value === 0 ? false : !value);
// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object) => {
  // Object.assign({}, object);
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback) => {
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

// useDebounce这个costomHook函数作用主要是把value转化成debounceValue;
export const useDebounce = (value, delay) => {
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
