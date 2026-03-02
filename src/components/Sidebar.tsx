// ─────────────────────────────────────────────────────────────
// Sidebar.tsx — Navegação lateral fixa com suporte mobile
// ─────────────────────────────────────────────────────────────
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { NOTES } from '../data/notes';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const NAV_ITEMS = [
    { icon: '⊞', label: 'Dashboard', to: '/' },
    { icon: '◎', label: 'Digitações', to: '/digitacoes' },
    { icon: '♩', label: 'Músicas', to: '/musicas' },
    { icon: '◇', label: 'Teoria', to: '/teoria' },
    { icon: '◷', label: 'Prática', to: '/pratica' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const { totalPracticed, streak } = useProgress();
    const total = NOTES.length;
    const progressPct = Math.round((totalPracticed / total) * 100);

    // Determina nível baseado no progresso
    const getLevel = () => {
        if (progressPct < 20) return 'Iniciante';
        if (progressPct < 50) return 'Aprendiz';
        if (progressPct < 80) return 'Intermediário';
        return 'Avançado';
    };

    return (
        <>
            {/* Overlay para mobile */}
            <div
                className={`sidebar-overlay${isOpen ? ' visible' : ''}`}
                onClick={onClose}
                aria-hidden="true"
            />

            <aside className={`sidebar${isOpen ? ' open' : ''}`} role="navigation" aria-label="Menu principal">
                {/* Logo */}
                <div className="sidebar-logo">
                    <div className="logo-mark">🎷 Tenor</div>
                    <div className="logo-sub">Sax Coach</div>
                </div>

                {/* Links de navegação */}
                <nav className="nav-group">
                    <div className="nav-label">Navegação</div>
                    {NAV_ITEMS.map(item => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.to === '/'}
                            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
                            onClick={onClose} // fecha sidebar em mobile ao navegar
                            id={`nav-${item.label.toLowerCase().replace(/[^a-z]/g, '-')}`}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Rodapé com nível e streak */}
                <div className="sidebar-foot">
                    {/* Streak badge */}
                    {streak > 0 && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            marginBottom: 10,
                            padding: '7px 10px',
                            background: 'rgba(212,137,26,.07)',
                            borderRadius: 8,
                            border: '1px solid rgba(212,137,26,.15)',
                        }}>
                            <span style={{ fontSize: 16 }}>🔥</span>
                            <div>
                                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 7, color: 'var(--muted)', letterSpacing: 1, textTransform: 'uppercase' }}>Streak</div>
                                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, color: 'var(--gold-l)', fontWeight: 700 }}>
                                    {streak} {streak === 1 ? 'dia' : 'dias'}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Badge de nível */}
                    <div className="lvl-badge">
                        <div className="lvl-lbl">Nível atual</div>
                        <div className="lvl-name">{getLevel()}</div>
                        <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 4, fontFamily: "'DM Mono', monospace" }}>
                            {totalPracticed}/{total} notas
                        </div>
                        <div className="lvl-bar">
                            <div className="lvl-fill" style={{ width: `${progressPct}%` }} />
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
