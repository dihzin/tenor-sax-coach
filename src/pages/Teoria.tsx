// ─────────────────────────────────────────────────────────────
// Teoria.tsx — Módulos de teoria musical
// ─────────────────────────────────────────────────────────────
import React, { useState } from 'react';
import { THEORY_MODULES } from '../data/theory';

type DiffFilter = 'todos' | 'basico' | 'intermediario' | 'avancado';

const DIFF_LABEL: Record<string, string> = {
    basico: 'Básico',
    intermediario: 'Intermediário',
    avancado: 'Avançado',
};

const Teoria: React.FC = () => {
    const [filter, setFilter] = useState<DiffFilter>('todos');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const modules = filter === 'todos'
        ? THEORY_MODULES
        : THEORY_MODULES.filter(m => m.difficulty === filter);

    const filters: { value: DiffFilter; label: string }[] = [
        { value: 'todos', label: 'Todos' },
        { value: 'basico', label: 'Básico' },
        { value: 'intermediario', label: 'Intermediário' },
        { value: 'avancado', label: 'Avançado' },
    ];

    return (
        <div>
            <h1 className="pg-title">Módulos de <em>Teoria</em></h1>
            <p className="pg-sub">Fundamentos musicais e harmonia aplicada ao saxofone tenor</p>

            {/* Filtros */}
            <div className="songs-filters" role="group" aria-label="Filtrar por dificuldade">
                {filters.map(f => (
                    <button
                        key={f.value}
                        id={`theory-filter-${f.value}`}
                        className={`filter-btn${filter === f.value ? ' active' : ''}`}
                        onClick={() => setFilter(f.value)}
                        aria-pressed={filter === f.value}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Grid de módulos */}
            <div className="theory-grid">
                {modules.map(mod => (
                    <div
                        key={mod.id}
                        id={`theory-${mod.id}`}
                        className="theory-card"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setExpandedId(expandedId === mod.id ? null : mod.id)}
                    >
                        <div className="theory-icon">{mod.icon}</div>

                        <span className={`theory-badge badge-${mod.difficulty}`}>
                            {DIFF_LABEL[mod.difficulty]}
                        </span>

                        <div className="theory-title" style={{ marginTop: 6 }}>{mod.title}</div>
                        <div className="theory-desc">{mod.description}</div>

                        {/* Tópicos expandidos */}
                        {expandedId === mod.id && (
                            <div style={{
                                marginBottom: 12,
                                padding: '10px 12px',
                                background: 'rgba(212,137,26,.04)',
                                border: '1px solid rgba(212,137,26,.1)',
                                borderRadius: 8,
                            }}>
                                <div style={{
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: 8,
                                    letterSpacing: 2,
                                    textTransform: 'uppercase',
                                    color: 'var(--copper)',
                                    marginBottom: 8,
                                }}>
                                    Tópicos
                                </div>
                                {mod.topics.map((t, i) => (
                                    <div key={i} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        fontSize: 12,
                                        color: 'var(--cream)',
                                        marginBottom: 5,
                                    }}>
                                        <span style={{ color: 'var(--gold)', fontSize: 10 }}>◆</span>
                                        {t}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Barra de progresso */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: 'var(--muted)' }}>
                                {mod.progress > 0 ? `${mod.progress}% concluído` : 'Não iniciado'}
                            </span>
                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: 'var(--gold)' }}>
                                {expandedId === mod.id ? '▲ Recolher' : '▼ Ver tópicos'}
                            </span>
                        </div>
                        <div className="theory-progress">
                            <div className="theory-progress-fill" style={{ width: `${mod.progress}%` }} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Dica sobre transposição */}
            <div className="tip-card" style={{ marginTop: 24 }}>
                <div className="tip-title">🎷 Lembre-se: Sax Tenor em Bb</div>
                <div className="tip-text">
                    O Saxofone Tenor é um instrumento transpositor em Si♭. Quando você toca um Dó escrito,
                    soa um Si♭ no piano (uma 2ª maior abaixo). Sempre verifique se sua partitura está
                    escrita para instrumento em Bb.
                </div>
            </div>
        </div>
    );
};

export default Teoria;
