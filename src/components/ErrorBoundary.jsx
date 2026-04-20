import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // componentDidCatch removed for linter


  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center', 
          color: 'var(--au-text)',
          background: 'var(--au-panel)'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Something went wrong.</h1>
          <button onClick={() => this.setState({ hasError: false })} style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;

