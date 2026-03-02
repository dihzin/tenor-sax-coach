// src/components/fingering/map/ComparePanel.tsx — v2 (profissional)
// Painel técnico de comparação. Sem modal. Visual de tabela editorial.
import React, { memo, useMemo } from 'react';
import type { FingeringEntry, FingeringKeyId } from '../../../lib/fingering/types';
import SaxDiagramMap from '../svg/SaxDiagramMap';
import StaffGlyph from '../svg/StaffGlyph';

interface ComparePanelProps {
    /** undefined = aguardando seleção da segunda nota */
    entryA: FingeringEntry;
    entryB: FingeringEntry | null;
    onClose: () => void;
}

// Thresholds: 0-2 fácil / 3-4 média / 5+ difícil
function classifyDifficulty(delta: number): 'facil' | 'media' | 'dificil' | 'identica' {
    if (delta === 0) return 'identica';
    if (delta <= 2) return 'facil';
    if (delta <= 4) return 'media';
    return 'dificil';
}

const DIFFICULTY_LABEL: Record<string, string> = {
    identica: 'Idêntica',
    facil: 'Fácil',
    media: 'Média',
    dificil: 'Difícil',
};

function computeDiff(varA: FingeringEntry['variants'][0], varB: FingeringEntry['variants'][0]) {
    const pA = new Set(varA.diagram.pressed);
    const pB = new Set(varB.diagram.pressed);

    // Teclas que saem (pressionadas em A, abertas em B)
    const release: FingeringKeyId[] = [];
    // Teclas que entram (abertas em A, pressionadas em B)
    const press: FingeringKeyId[] = [];
    // Teclas que permanecem pressionadas
    const keep: FingeringKeyId[] = [];

    for (const k of pA) { if (pB.has(k)) keep.push(k); else release.push(k); }
    for (const k of pB) { if (!pA.has(k)) press.push(k); }

    const diffKeys = [...release, ...press];
    return { diffKeys, release, press, keep, delta: diffKeys.length };
}

const ComparePanel: React.FC<ComparePanelProps> = memo(({ entryA, entryB, onClose }) => {
    const varA = entryA.variants[0];
    const varB = entryB?.variants[0] ?? null;

    const diff = useMemo(() => {
        if (!varB) return null;
        return computeDiff(varA, varB);
    }, [varA, varB]);

    const difficulty = diff ? classifyDifficulty(diff.delta) : null;

    return (
        <div className="fm-compare" role="region" aria-label="Comparação de digitações">

            {/* ── Header ── */}
            <div className="fm-compare__header">
                <span className="fm-compare__label">COMPARAÇÃO</span>

                <span className="fm-compare__notes">
                    <span className="fm-compare__note-a">{entryA.pitch.ptName}</span>
                    <span className="fm-compare__arrow">→</span>
                    <span className="fm-compare__note-b">
                        {entryB ? entryB.pitch.ptName : '?'}
                    </span>
                </span>

                {/* Badge de dificuldade */}
                {difficulty && (
                    <span className={`fm-compare__badge fm-compare__badge--${difficulty}`}>
                        {diff?.delta === 0
                            ? 'Digitação idêntica'
                            : `${diff?.delta} dedo${diff!.delta > 1 ? 's' : ''} muda${diff!.delta > 1 ? 'm' : ''} · ${DIFFICULTY_LABEL[difficulty]}`
                        }
                    </span>
                )}

                {/* Estado de espera */}
                {!entryB && (
                    <span className="fm-compare__waiting">
                        Selecione a segunda nota…
                    </span>
                )}

                <button
                    className="fm-compare__close"
                    onClick={onClose}
                    aria-label="Fechar comparação"
                >
                    ×
                </button>
            </div>

            {/* ── Corpo: só renderiza quando ambas estão selecionadas ── */}
            {entryB && diff && varB && (
                <div className="fm-compare__body">

                    {/* Coluna A */}
                    <CompareCol entry={entryA} variant={varA} slot="A" diffKeys={diff.diffKeys} />

                    {/* Coluna central: análise de mudanças */}
                    <div className="fm-compare__diff-col" aria-label="Análise de mudanças">
                        {/* Teclas que mudam */}
                        {diff.delta > 0 && (
                            <>
                                <span className="fm-compare__diff-title">Δ MUDA</span>
                                <ul className="fm-compare__diff-list">
                                    {diff.release.map(k => (
                                        <li key={`rel-${k}`} className="fm-compare__diff-item fm-compare__diff-item--release">
                                            <span className="fm-compare__diff-dot fm-compare__diff-dot--release" />
                                            <code className="fm-compare__diff-key">{k}</code>
                                            <span className="fm-compare__diff-dir">solta</span>
                                        </li>
                                    ))}
                                    {diff.press.map(k => (
                                        <li key={`prs-${k}`} className="fm-compare__diff-item fm-compare__diff-item--press">
                                            <span className="fm-compare__diff-dot fm-compare__diff-dot--press" />
                                            <code className="fm-compare__diff-key">{k}</code>
                                            <span className="fm-compare__diff-dir">pressiona</span>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {/* Teclas que permanecem */}
                        {diff.keep.length > 0 && (
                            <>
                                <span className="fm-compare__diff-title fm-compare__diff-title--keep">= MANTÉM</span>
                                <ul className="fm-compare__diff-list">
                                    {diff.keep.map(k => (
                                        <li key={`kp-${k}`} className="fm-compare__diff-item fm-compare__diff-item--keep">
                                            <span className="fm-compare__diff-dot fm-compare__diff-dot--keep" />
                                            <code className="fm-compare__diff-key">{k}</code>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>

                    {/* Coluna B */}
                    <CompareCol entry={entryB} variant={varB} slot="B" diffKeys={diff.diffKeys} />
                </div>
            )}
        </div>
    );
});
ComparePanel.displayName = 'ComparePanel';

// ── Sub-componente de coluna ──────────────────────────────────
interface CompareColProps {
    entry: FingeringEntry;
    variant: FingeringEntry['variants'][0];
    slot: 'A' | 'B';
    diffKeys: FingeringKeyId[];
}

const CompareCol: React.FC<CompareColProps> = memo(({ entry, variant, slot, diffKeys }) => (
    <div className={`fm-compare__col fm-compare__col--${slot.toLowerCase()}`}>
        <div className="fm-compare__note-label">
            <span className={`fm-compare__slot-badge fm-compare__slot-badge--${slot.toLowerCase()}`}>{slot}</span>
            <span className="fm-compare__note-pt">{entry.pitch.ptName}</span>
            <span className="fm-compare__note-en">{entry.pitch.enName}</span>
        </div>
        <div className="fm-compare__staff">
            <StaffGlyph staff={entry.pitch.staff} width={90} height={72} />
        </div>
        <div className="fm-compare__diagram">
            <SaxDiagramMap
                pressed={variant.diagram.pressed}
                optional={variant.diagram.optional}
                diffKeys={diffKeys}
                width={78}
                height={164}
            />
        </div>
    </div>
));
CompareCol.displayName = 'CompareCol';

export default ComparePanel;
