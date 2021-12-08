import React from "react";

// 错误边界组件一定要class组件
// 错误边界https://react.docschina.org/docs/error-boundaries.html
// 第三方库 https://github.com/bvaughn/react-error-boundary

type FallBackRender = (props: { error: Error | null }) => React.ReactElement;

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallBackRender }>,
  { error: Error | null }
> {
  state = {
    error: null,
  };

  // 当子组件抛出异常 这里会接受到 并且调用，上面的error不是null而是传进来的异常错误了
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }

    return children;
  }
}
