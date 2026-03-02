// ─────────────────────────────────────────────────────────────
// Digitacoes.tsx — Tabela interativa de digitações do Sax Tenor
// Integra o SaxDiagram SVG com player de notas via Tone.js
// ─────────────────────────────────────────────────────────────
import React, { useState, useCallback, useRef } from 'react';
import * as Tone from 'tone';
import SaxDiagram from '../components/SaxDiagram';
import { NOTES, REGION_COLOR, REGION_LABEL, KEY_SHORT_LABEL, KEY_LEGEND } from '../data/notes';
import { useProgress } from '../hooks/useProgress';

const Digitacoes: React.FC = () => {
    const [activeIdx, setActiveIdx] = useState(4); // Ré grave por padrão
    const [showLegend, setShowLegend] = useState(false);
    const { isPracticed, toggleNote, regionProgress } = useProgress();

    // Referência para o sintetizador de notas
    const synthRef = useRef<Tone.Synth | null>(null);

    const cur = NOTES[activeIdx];
    const rc = REGION_COLOR[cur.region];

    // IDs de notas por região (para barra de progresso)
    const graveIds = NOTES.filter(n => n.region === 'grave').map(n => n.id);
    const medioIds = NOTES.filter(n => n.region === 'medio').map(n => n.id);
    const agudoIds = NOTES.filter(n => n.region === 'agudo').map(n => n.id);

    /** Toca a nota usando Tone.js */
    const playNote = useCallback(async (freq: number) => {
        await Tone.start();

        if (!synthRef.current) {
            synthRef.current = new Tone.Synth({
                oscillator: { type: 'sawtooth' },
                envelope: { attack: 0.02, decay: 0.1, sustain: 0.4, release: 0.8 },
                volume: -10,
            }).toDestination();

            // Filtro passa-baixo para timbre mais suave (parecido com sax)
            const filter = new Tone.Filter(2000, 'lowpass').toDestination();
            synthRef.current.connect(filter);
        }

        synthRef.current.triggerAttackRelease(freq, '2n');
    }, []);

    /** Seleciona nota e toca o som */
    const handleNoteClick = useCallback((idx: number) => {
        setActiveIdx(idx);
        playNote(NOTES[idx].freq);
    }, [playNote]);

    const progressByRegion = {
        grave: regionProgress(graveIds),
        medio: regionProgress(medioIds),
        agudo: regionProgress(agudoIds),
    };

    return (
        <div>
            <h1 className="pg-title">Tabela de <em>Digitações</em></h1>
            <p className="pg-sub">Clique em uma nota para ver exatamente onde posicionar os dedos — e ouvi-la</p>

            {/* Toggle da legenda de chaves */}
            <button
                id="legend-toggle-btn"
                className="legend-toggle"
                onClick={() => setShowLegend(v => !v)}
                aria-expanded={showLegend}
                aria-controls="legend-panel"
            >
                <span>📋</span>
                {showLegend ? 'Ocultar' : 'Ver'} mapa completo das chaves
                <span style={{ marginLeft: 'auto', color: 'var(--gold)' }}>{showLegend ? '▲' : '▼'}</span>
            </button>

            {/* Painel de legenda */}
            {showLegend && (
                <div id="legend-panel" className="legend-panel">
                    <div className="legend-title">Mapa de todas as chaves</div>
                    <div className="legend-grid">
                        {KEY_LEGEND.map(k => (
                            <div key={k.id} className="legend-row">
                                <div className="legend-row-dot" />
                                <div>
                                    <div className="legend-key">{k.id.toUpperCase()}</div>
                                    <div className="legend-name">{k.name}</div>
                                    <div className="legend-hand">{k.hand}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="layout-fingering">

                {/* ── Coluna esquerda: diagrama fixo ── */}
                <div className="diagram-card">
                    <div className="note-header">
                        <div className="note-big">{cur.name}</div>
                        {cur.enh && <div className="note-enh">= {cur.enh}</div>}
                        <div className="note-region-pill" style={{
                            background: `${rc}18`,
                            border: `1px solid ${rc}40`,
                            color: rc,
                        }}>
                            {REGION_LABEL[cur.region]}
                        </div>
                    </div>

                    <div className="note-desc">
                        {cur.region === 'grave'
                            ? 'Região grave — tecle com firmeza e sopro apoiado.'
                            : cur.region === 'medio'
                                ? 'Região médio — adicione a chave de oitava para as notas de Ré em diante.'
                                : 'Região aguda — embocadura mais firme, mais pressão de ar.'}
                    </div>

                    {/* Diagrama SVG */}
                    <SaxDiagram pressed={cur.pressed} />

                    {/* Botão tocar nota */}
                    <button
                        id={`play-note-${cur.id}`}
                        onClick={() => playNote(cur.freq)}
                        style={{
                            width: '100%',
                            marginTop: 10,
                            marginBottom: 8,
                            padding: '8px',
                            background: 'rgba(212,137,26,.1)',
                            border: '1px solid rgba(212,137,26,.25)',
                            borderRadius: 8,
                            cursor: 'pointer',
                            color: 'var(--gold-l)',
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 11,
                            letterSpacing: 1,
                            transition: 'all 0.15s',
                        }}
                        aria-label={`Tocar nota ${cur.name}`}
                    >
                        🔊 Tocar {cur.name}
                    </button>

                    {/* Botão marcar como praticada */}
                    <button
                        id={`practiced-btn-${cur.id}`}
                        onClick={() => toggleNote(cur.id)}
                        style={{
                            width: '100%',
                            padding: '7px',
                            background: isPracticed(cur.id) ? 'rgba(106,172,245,.12)' : 'transparent',
                            border: `1px solid ${isPracticed(cur.id) ? 'rgba(106,172,245,.4)' : 'rgba(212,137,26,.12)'}`,
                            borderRadius: 8,
                            cursor: 'pointer',
                            color: isPracticed(cur.id) ? '#6AACF5' : 'var(--muted)',
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 10,
                            letterSpacing: 1,
                            transition: 'all 0.2s',
                        }}
                        aria-pressed={isPracticed(cur.id)}
                        aria-label={isPracticed(cur.id) ? `Desmarcar ${cur.name} como praticada` : `Marcar ${cur.name} como praticada`}
                    >
                        {isPracticed(cur.id) ? '✓ Praticada' : '○ Marcar como praticada'}
                    </button>

                    {/* Lista de chaves pressionadas */}
                    <div className="active-keys-box">
                        <div className="active-keys-title">Chaves pressionadas</div>
                        {cur.pressed.map(k => (
                            <span key={k} className="chip">
                                <span className="chip-dot" />
                                {KEY_SHORT_LABEL[k] || k}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ── Coluna direita: seletor de notas ── */}
                <div className="right-col">

                    {/* Notas por região */}
                    {(['grave', 'medio', 'agudo'] as const).map(reg => (
                        <div key={reg} className="region-section">
                            <div className="region-header">
                                <div className="region-dot" style={{ background: REGION_COLOR[reg] }} />
                                <span className="region-name">{REGION_LABEL[reg]}</span>
                                <span className="region-sub" style={{ marginLeft: 6 }}>
                                    — {reg === 'grave' ? 'Sib–Lá' : reg === 'medio' ? 'Sib–Si' : 'Dó–Sol'}
                                </span>
                                {/* Percentual de progresso do registro */}
                                <span style={{
                                    marginLeft: 'auto',
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: 10,
                                    color: REGION_COLOR[reg],
                                }}>
                                    {progressByRegion[reg]}%
                                </span>
                            </div>

                            <div className="notes-grid">
                                {NOTES.map((n, i) => n.region !== reg ? null : (
                                    <button
                                        key={i}
                                        id={`note-btn-${n.id}`}
                                        className={`note-btn${activeIdx === i ? ' active' : ''}${isPracticed(n.id) ? ' practiced' : ''}`}
                                        onClick={() => handleNoteClick(i)}
                                        aria-pressed={activeIdx === i}
                                        aria-label={`Nota ${n.name}${n.enh ? ` (${n.enh})` : ''} — ${REGION_LABEL[reg]}`}
                                    >
                                        <span className="note-btn-n">{n.name}</span>
                                        {n.enh && <span className="note-btn-e">{n.enh}</span>}
                                        <span className="note-btn-r" style={{
                                            background: `${REGION_COLOR[reg]}16`,
                                            color: REGION_COLOR[reg],
                                        }}>
                                            {REGION_LABEL[reg]}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Dica para iniciantes */}
                    <div className="tip-card">
                        <div className="tip-title">💡 Dica para iniciantes</div>
                        <div className="tip-text">
                            Comece pelas notas <strong style={{ color: 'var(--gold)' }}>Ré, Mi, Fá, Sol, Lá</strong> do
                            registro grave — são as mais naturais para os dedos e aparecem em praticamente todas as músicas de nível inicial.
                        </div>
                    </div>

                    {/* Progresso por registro */}
                    <div className="progress-card">
                        <div className="progress-title">Seu progresso</div>
                        {[
                            { label: 'Grave (Sib–Lá)', pct: progressByRegion.grave, c: REGION_COLOR.grave },
                            { label: 'Médio (Sib–Si)', pct: progressByRegion.medio, c: REGION_COLOR.medio },
                            { label: 'Agudo (Dó–Sol)', pct: progressByRegion.agudo, c: REGION_COLOR.agudo },
                        ].map((r, i) => (
                            <div key={i} className="prog-row">
                                <div className="prog-head">
                                    <span className="prog-lbl">{r.label}</span>
                                    <span className="prog-pct" style={{ color: r.c }}>{r.pct}%</span>
                                </div>
                                <div className="prog-bar">
                                    <div className="prog-fill" style={{
                                        width: `${r.pct}%`,
                                        background: `linear-gradient(90deg, ${r.c}55, ${r.c})`,
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Digitacoes;
