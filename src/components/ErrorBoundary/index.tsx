import React from 'react';

export interface IErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}
type ErrorBoundaryP = { children: JSX.Element };

class ErrorBoundary extends React.Component<
  ErrorBoundaryP,
  IErrorBoundaryState
> {
  constructor(props: ErrorBoundaryP) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): IErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  public render(): JSX.Element {
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
        </div>
      );
    }
    return children;
  }
}
export default ErrorBoundary;
