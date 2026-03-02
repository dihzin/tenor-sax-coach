// ─────────────────────────────────────────────────────────────
// App.tsx — Componente raiz com roteamento e layout principal
// ─────────────────────────────────────────────────────────────
import React, { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Digitacoes from './pages/Digitacoes';
import Musicas from './pages/Musicas';
import Teoria from './pages/Teoria';
import Pratica from './pages/Pratica';

const App: React.FC = () => {
  // Estado do menu mobile (aberto/fechado)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <BrowserRouter>
      <div className="app-wrapper">

        {/* Botão hamburguer (só visível em mobile) */}
        <button
          id="hamburger-btn"
          className="hamburger-btn"
          onClick={openSidebar}
          aria-label="Abrir menu"
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

        {/* Conteúdo principal */}
        <main id="main-content" className="main-content" role="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/digitacoes" element={<Digitacoes />} />
            <Route path="/musicas" element={<Musicas />} />
            <Route path="/teoria" element={<Teoria />} />
            <Route path="/pratica" element={<Pratica />} />
            {/* Rota 404 */}
            <Route path="*" element={
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, color: 'var(--gold)', marginBottom: 8 }}>404</div>
                <div style={{ fontSize: 14, color: 'var(--muted)' }}>Página não encontrada</div>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
