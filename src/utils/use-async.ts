import { useCallback, useReducer, useState } from "react";
import { useMeountedRef } from "utils";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

// const defaultConfig = {
//   throwOnError: false,
// }

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMeountedRef()

  return useCallback((...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0), [dispatch, mountedRef])  
}

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, dispatch] = useReducer((state:State<D>, action: Partial<State<D>>) => ({...state, ...action}), {
    ...defaultInitialState,
    ...initialState,
  });

  const safeDispatch = useSafeDispatch(dispatch)

  // useState直接传入函数的含义是：惰性初始化；所以，要用useState保存函数，不能直接传入函数
  const [retry, setRetry] = useState(() => () => {});

  const setData = useCallback((data: D) =>
    safeDispatch({
      data,
      stat: "success",
      error: null,
    }), [safeDispatch]);  

  const setError = useCallback((error: Error) =>
    safeDispatch({
      error,
      stat: "error",
      data: null,
    }), [safeDispatch]);

  // run 用来触发异步请求
  const run = useCallback((
    promise: Promise<D>,
    runConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error("请传入Promise 类型数据");
    }
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig);
      }
    });
    safeDispatch({stat: 'loading'});
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        // if(config.throwOnError) return Promise.reject(error)
        return error;
      });
  }, [setData, setError, safeDispatch]);

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    // retry被调用时，重新跑一遍run，让state刷新一遍
    retry,
    ...state,
  };
};
