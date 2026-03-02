// ─────────────────────────────────────────────────────────────
// Dashboard.tsx — Visão geral do progresso do aluno
// ─────────────────────────────────────────────────────────────
import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { NOTES, REGION_COLOR } from '../data/notes';

const Dashboard: React.FC = () => {
    const { totalPracticed, streak, regionProgress } = useProgress();
    const total = NOTES.length;

    // IDs por região
    const graveIds = NOTES.filter(n => n.region === 'grave').map(n => n.id);
    const medioIds = NOTES.filter(n => n.region === 'medio').map(n => n.id);
    const agudoIds = NOTES.filter(n => n.region === 'agudo').map(n => n.id);

    const gravePercent = regionProgress(graveIds);
    const medioPercent = regionProgress(medioIds);
    const agudoPercent = regionProgress(agudoIds);
    const overallPercent = Math.round((totalPracticed / total) * 100);

    const stats = [
        { icon: '🎵', value: totalPracticed, label: 'Notas praticadas' },
        { icon: '🔥', value: `${streak}`, label: streak === 1 ? 'dia de streak' : 'dias de streak' },
        { icon: '📊', value: `${overallPercent}%`, label: 'Cobertura total' },
        { icon: '🎷', value: total, label: 'Total de notas' },
    ];

    const modules = [
        { icon: '◎', title: 'Digitações', desc: 'Diagrama interativo de todas as notas', to: '/digitacoes', color: REGION_COLOR.grave },
        { icon: '♩', title: 'Músicas', desc: 'Repertório com playalongs e partituras', to: '/musicas', color: REGION_COLOR.medio },
        { icon: '◇', title: 'Teoria', desc: 'Módulos de teoria musical e harmonia', to: '/teoria', color: '#9B8EE0' },
        { icon: '◷', title: 'Prática', desc: 'Metrônomo e exercícios guiados', to: '/pratica', color: REGION_COLOR.agudo },
    ];

    return (
        <div>
            <h1 className="pg-title">Bem-vindo ao <em>Tenor Sax Coach</em></h1>
            <p className="pg-sub">Sua jornada no saxofone tenor — acompanhe seu progresso e evolua dia a dia.</p>

            {/* Streak card */}
            {streak > 0 && (
                <div className="streak-card">
                    <span className="streak-flame">🔥</span>
                    <div>
                        <div className="streak-num">{streak}</div>
                        <div className="streak-label">{streak === 1 ? 'dia de prática consecutiva' : 'dias de prática consecutiva'}</div>
                    </div>
                    <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 4 }}>Continue assim!</div>
                        <div style={{ fontSize: 12, color: 'var(--muted)' }}>Cada dia conta 🎷</div>
                    </div>
                </div>
            )}

            {/* Stats grid */}
            <div className="stats-grid">
                {stats.map((s, i) => (
                    <div key={i} className="stat-card" id={`stat-${i}`}>
                        <div className="stat-icon">{s.icon}</div>
                        <div className="stat-value">{s.value}</div>
                        <div className="stat-label">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Progresso por região */}
            <div className="card" style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 16 }}>
                    Progresso por registro
                </div>

                {[
                    { label: 'Grave (Sib–Lá)', pct: gravePercent, color: REGION_COLOR.grave, count: graveIds.length },
                    { label: 'Médio (Sib–Si)', pct: medioPercent, color: REGION_COLOR.medio, count: medioIds.length },
                    { label: 'Agudo (Dó–Sol)', pct: agudoPercent, color: REGION_COLOR.agudo, count: agudoIds.length },
                ].map((r, i) => (
                    <div key={i} className="prog-row">
                        <div className="prog-head">
                            <span className="prog-lbl">{r.label}</span>
                            <span className="prog-pct" style={{ color: r.color }}>{r.pct}%</span>
                        </div>
                        <div className="prog-bar">
                            <div
                                className="prog-fill"
                                style={{ width: `${r.pct}%`, background: `linear-gradient(90deg, ${r.color}55, ${r.color})` }}
                            />
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 3, fontFamily: "'DM Mono', monospace" }}>
                            {Math.round(r.pct * r.count / 100)}/{r.count} notas
                        </div>
                    </div>
                ))}
            </div>

            {/* Módulos de acesso rápido */}
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12 }}>
                Módulos
            </div>
            <div className="modules-grid">
                {modules.map(m => (
                    <Link key={m.to} to={m.to} className="module-card" id={`module-${m.title.toLowerCase()}`}>
                        <div className="module-icon" style={{ color: m.color }}>{m.icon}</div>
                        <div className="module-title">{m.title}</div>
                        <div className="module-desc">{m.desc}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
