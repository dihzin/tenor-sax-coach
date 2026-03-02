// ─────────────────────────────────────────────────────────────
// Pratica.tsx — Metrônomo e exercícios guiados
// ─────────────────────────────────────────────────────────────
import React from 'react';
import Metronome from '../components/Metronome';

// ── Exercícios guiados ──────────────────────────────────────
const EXERCISES = [
    {
        id: 'longa-tom',
        title: 'Notas Longas',
        desc: 'Toque cada nota por 4 tempos. Foque na qualidade do som, afinação e embocadura estável.',
        bpm: 60,
        tag: 'Sonoridade',
        difficulty: 'Iniciante',
    },
    {
        id: 'cromático',
        title: 'Escala Cromática',
        desc: 'Suba e desça cromaticamente do Sib grave ao Sol agudo. Mantenha articulação uniforme.',
        bpm: 72,
        tag: 'Técnica',
        difficulty: 'Iniciante',
    },
    {
        id: 'maior-c',
        title: 'Escala de Dó Maior',
        desc: 'Escala de Dó Maior no saxofone (soará Sib no piano). Legato e staccato.',
        bpm: 80,
        tag: 'Escalas',
        difficulty: 'Iniciante',
    },
    {
        id: 'arpejo-g',
        title: 'Arpejo de Sol Maior',
        desc: 'Sol-Si-Ré em colcheias. Alterne sentido ascendente e descendente.',
        bpm: 90,
        tag: 'Arpejos',
        difficulty: 'Iniciante',
    },
    {
        id: 'blues-f',
        title: 'Blues de Fá',
        desc: 'Escala de Blues de Fá (Fá-Láb-Sib-Si-Dó-Mib). Improvise sobre backing track.',
        bpm: 120,
        tag: 'Improvisação',
        difficulty: 'Intermediário',
    },
    {
        id: 'dórico-d',
        title: 'Modo Dórico em Ré',
        desc: 'Toque o modo Dórico em Ré em colcheias no ritmo de swing — pré-requisito para "So What".',
        bpm: 136,
        tag: 'Modos',
        difficulty: 'Intermediário',
    },
    {
        id: 'ii-v-i',
        title: 'ii-V-I em Dó',
        desc: 'Am7 - D7 - GMaj7 (escrito para Sax Tenor). Toque arpejos e depois escale a progressão.',
        bpm: 100,
        tag: 'Harmonia',
        difficulty: 'Intermediário',
    },
    {
        id: 'bebop-escala',
        title: 'Escala Bebop Dominante',
        desc: 'Adicione o 7º maior passante na escala dominante. Use em loops de Fá7.',
        bpm: 160,
        tag: 'Bebop',
        difficulty: 'Avançado',
    },
];

const Pratica: React.FC = () => {
    return (
        <div>
            <h1 className="pg-title">Sessão de <em>Prática</em></h1>
            <p className="pg-sub">Metrônomo interativo e exercícios guiados para aprimorar sua técnica</p>

            {/* Layout: metrônomo + dicas */}
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 24, alignItems: 'start', marginBottom: 32 }}>

                {/* Metrônomo */}
                <Metronome />

                {/* Dicas de prática */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div className="card-sm">
                        <div className="tip-title" style={{ marginBottom: 8 }}>📐 Como usar o metrônomo</div>
                        <ol style={{ paddingLeft: 18, fontSize: 12.5, color: 'var(--cream)', lineHeight: 1.8 }}>
                            <li>Comece <strong>20–30 BPM abaixo</strong> da velocidade alvo</li>
                            <li>Toque a célula rítmica sem erros por <strong>3 repetições</strong></li>
                            <li>Aumente <strong>5 BPM</strong> e repita</li>
                            <li>Ao atingir a velocidade alvo, toque por <strong>5 minutos</strong> contínuos</li>
                        </ol>
                    </div>

                    <div className="card-sm">
                        <div className="tip-title" style={{ marginBottom: 8 }}>🎷 Rotina diária recomendada</div>
                        <div style={{ fontSize: 12.5, color: 'var(--cream)', lineHeight: 1.8 }}>
                            <div>🔵 <strong>5 min</strong> — aquecimento de embocadura</div>
                            <div>🟡 <strong>10 min</strong> — notas longas (60 BPM)</div>
                            <div>🟠 <strong>10 min</strong> — escalas e arpejos</div>
                            <div>🔴 <strong>15 min</strong> — repertório / improvisação</div>
                            <div>🔵 <strong>5 min</strong> — resfriamento e limpeza</div>
                        </div>
                    </div>

                    <div className="card-sm">
                        <div className="tip-title" style={{ marginBottom: 6 }}>⏱ Andamentos de referência</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                            {[
                                ['Largo', '< 60'],
                                ['Adágio', '66–76'],
                                ['Andante', '76–108'],
                                ['Moderato', '108–120'],
                                ['Allegro', '120–156'],
                                ['Presto', '> 176'],
                            ].map(([name, range]) => (
                                <div key={name} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: 11,
                                    padding: '3px 0',
                                    borderBottom: '1px solid rgba(255,255,255,.04)',
                                    color: 'var(--cream)',
                                }}>
                                    <span style={{ fontStyle: 'italic' }}>{name}</span>
                                    <span style={{ fontFamily: "'DM Mono', monospace", color: 'var(--gold)', fontSize: 10 }}>{range}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Exercícios guiados */}
            <div style={{ marginBottom: 16 }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: 'var(--cream)', marginBottom: 4 }}>
                    Exercícios <em style={{ color: 'var(--gold)' }}>Guiados</em>
                </h2>
                <p style={{ fontSize: 13, color: 'var(--muted)' }}>
                    Selecione um exercício, ajuste o BPM no metrônomo e pratique
                </p>
            </div>

            <div className="exercises-grid">
                {EXERCISES.map(ex => (
                    <div key={ex.id} id={`exercise-${ex.id}`} className="exercise-card">
                        <div className="exercise-title">{ex.title}</div>
                        <div className="exercise-desc">{ex.desc}</div>
                        <div className="exercise-meta">
                            <span className="exercise-tag">{ex.tag}</span>
                            <span className="exercise-tag" style={{
                                background: ex.difficulty === 'Iniciante'
                                    ? 'rgba(106,172,245,.1)'
                                    : ex.difficulty === 'Intermediário'
                                        ? 'rgba(232,184,75,.1)'
                                        : 'rgba(224,107,107,.1)',
                                color: ex.difficulty === 'Iniciante'
                                    ? '#6AACF5'
                                    : ex.difficulty === 'Intermediário'
                                        ? '#E8B84B'
                                        : '#E06B6B',
                            }}>
                                {ex.difficulty}
                            </span>
                            <span className="exercise-tag" style={{ background: 'rgba(255,255,255,.04)', color: 'var(--muted)' }}>
                                ♩ {ex.bpm} BPM sugerido
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pratica;
