import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-[var(--color-error-border)] bg-[var(--color-bg-subtle)] p-8 text-center">
          <h2 className="text-xl font-bold text-[var(--color-error-text)]">
            Something went wrong
          </h2>
          <p className="mt-2 text-[var(--color-text-secondary)]">
            We couldn't load this part of the application.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-hover)]"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
