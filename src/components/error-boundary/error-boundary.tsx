import React, { ReactNode } from 'react';

import { ErrorPage } from './error-page';

type State = {
  hasError: boolean;
};
type Props = {
  children: ReactNode;
};

export class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorPage />;
    }

    return this.props.children;
  }
}
