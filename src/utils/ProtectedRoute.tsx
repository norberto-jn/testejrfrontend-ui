import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Verifica se o token está presente no localStorage
  const token = localStorage.getItem('token');

  // Se o token não existir, redireciona para a página de login
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  // Se o token existir, renderiza os children
  return <>{children}</>;
};

export default ProtectedRoute;