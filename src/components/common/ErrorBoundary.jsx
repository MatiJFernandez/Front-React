import React from 'react';
import ErrorFallback from './ErrorFallback';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
    console.log('ErrorBoundary inicializado para sección:', props.section);
  }

  static getDerivedStateFromError(error) {
    console.log('getDerivedStateFromError llamado con:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.log('ErrorBoundary capturó un error:', error);
    console.log('Información del error:', errorInfo);
    // Aquí podríamos enviar el error a un servicio de monitoreo
  }

  handleReset = () => {
    console.log('Reseteando ErrorBoundary...');
    this.setState({ hasError: false, error: null });
  };

  render() {
    console.log('ErrorBoundary render - hasError:', this.state.hasError);
    
    if (this.state.hasError) {
      console.log('Renderizando ErrorFallback con error:', this.state.error);
      return (
        <ErrorFallback
          error={this.state.error}
          resetErrorBoundary={this.handleReset}
          section={this.props.section}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 