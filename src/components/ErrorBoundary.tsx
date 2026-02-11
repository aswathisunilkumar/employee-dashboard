import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private reset = () => {
    this.setState({ error: null });
  };

  public render() {
    const { error } = this.state;

    if (error) {
      if (this.props.fallback) {
        return this.props.fallback(error, this.reset);
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-[var(--color-error-border)] bg-[var(--color-bg-subtle)] p-8 text-center">
          <h2 className="text-xl font-bold text-[var(--color-error-text)]">
            Something went wrong
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            {error.message || "We couldn't load this part of the application."}
          </p>
          <button
            onClick={this.reset}
            className="mt-4 rounded bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-hover)]"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
