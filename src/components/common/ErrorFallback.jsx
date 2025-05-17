import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorFallback = ({ error, resetErrorBoundary, section }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200">
      <div className="text-red-600 mb-4">
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      
      <h2 className="text-2xl font-bold text-red-700 mb-2">
        Error en {section || 'la aplicación'}
      </h2>
      
      <p className="text-gray-600 text-center mb-6">
        Lo sentimos, ha ocurrido un error al cargar {section ? `la sección de ${section}` : 'la aplicación'}.
      </p>

      {process.env.NODE_ENV === 'development' && (
        <div className="w-full max-w-lg bg-red-100 p-4 rounded-lg mb-6">
          <p className="text-sm font-mono text-red-800 break-all">
            {error.message}
          </p>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Intentar nuevamente
        </button>
        
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback; 