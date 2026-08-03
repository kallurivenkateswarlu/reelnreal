import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Reel N Real app:', error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-4">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Reel N Real Application Error
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-md mb-6 leading-relaxed">
            An unexpected error occurred while loading this page. Please try reloading or clearing your browser cache.
          </p>
          {this.state.error && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-left max-w-lg w-full mb-6 overflow-auto max-h-48 text-xs font-mono text-red-400">
              {this.state.error.toString()}
            </div>
          )}
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold transition-all text-xs shadow-lg shadow-amber-500/20"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reload Application</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
