import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Login"; // Página de login
import Dashboard from "../components/Dashboard"; // Dashboard principal
import ProjectDetails from "../components/ProjectDetails"; // Página de detalhes do projeto
import PhaseDetails from "../components/PhaseDetails.JSX"; // Detalhes de uma fase
import CompletedTasks from "../components/CompletedTasks"; // Página de tarefas concluídas

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Função para simular login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Função para logout
  const handleLogout = () => {
    setIsAuthenticated(false); // Redefine o estado para desautenticar o usuário
    localStorage.removeItem("user"); // Remove dados do usuário do localStorage
  };

  return (
    <Router>
      <Routes>
        {/* Redireciona para o login ou dashboard com base na autenticação */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
          }
        />

        {/* Página de Login */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" replace />
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" replace />
          }
        />

        {/* Detalhes do Projeto */}
        <Route
          path="/projects/:id"
          element={
            isAuthenticated ? <ProjectDetails /> : <Navigate to="/login" replace />
          }
        />

        {/* Detalhes da Fase */}
        <Route
          path="/phases/:id"
          element={
            isAuthenticated ? <PhaseDetails /> : <Navigate to="/login" replace />
          }
        />

        {/* Página de Tarefas Concluídas (anteriormente "Deliveries") */}
        <Route
          path="/completed-tasks"
          element={
            isAuthenticated ? <CompletedTasks /> : <Navigate to="/login" replace />
          }
        />

        {/* Rota para páginas não encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
