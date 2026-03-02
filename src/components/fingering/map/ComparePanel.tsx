// src/components/fingering/map/ComparePanel.tsx
// Painel técnico de comparação de duas digitações
// Visual: tabela técnica. Sem modal. Sem efeitos de UI moderna.
import React, { memo, useMemo } from 'react';
import type { FingeringEntry, FingeringKeyId } from '../../../lib/fingering/types';
import SaxDiagramMap from '../svg/SaxDiagramMap';
import StaffGlyph from '../svg/StaffGlyph';

interface ComparePanelProps {
    entryA: FingeringEntry;
    entryB: FingeringEntry;
    onClose: () => void;
}

const ComparePanel: React.FC<ComparePanelProps> = memo(({ entryA, entryB, onClose }) => {
    const varA = entryA.variants[0];
    const varB = entryB.variants[0];

    // Diff: teclas que mudaram (symmetric difference entre pressed lists)
    const { diffKeys, changedCount } = useMemo(() => {
        const pA = new Set(varA.diagram.pressed);
        const pB = new Set(varB.diagram.pressed);
        const keys: FingeringKeyId[] = [];
        for (const k of pA) if (!pB.has(k)) keys.push(k);
        for (const k of pB) if (!pA.has(k)) keys.push(k);
        return { diffKeys: keys, changedCount: keys.length };
    }, [varA, varB]);

    return (
        <div className="fm-compare" role="region" aria-label="Comparação de digitações">
            {/* Header técnico */}
            <div className="fm-compare__header">
                <span className="fm-compare__label">COMPARAÇÃO</span>
                <span className="fm-compare__notes">
                    {entryA.pitch.ptName} — {entryB.pitch.ptName}
                </span>
                <span className="fm-compare__delta">
                    {changedCount === 0
                        ? 'Digitação idêntica'
                        : `Δ ${changedCount} tecla${changedCount > 1 ? 's' : ''} diferente${changedCount > 1 ? 's' : ''}`
                    }
                </span>
                <button
                    className="fm-compare__close"
                    onClick={onClose}
                    aria-label="Fechar comparação"
                >
                    ×
                </button>
            </div>

            {/* Corpo: dois diagramas lado a lado */}
            <div className="fm-compare__body">
                {[
                    { entry: entryA, variant: varA, label: 'A' },
                    { entry: entryB, variant: varB, label: 'B' },
                ].map(({ entry, variant, label }) => (
                    <div key={label} className="fm-compare__col">
                        {/* Nome da nota */}
                        <div className="fm-compare__note-label">
                            <span className="fm-compare__note-pt">{entry.pitch.ptName}</span>
                            <span className="fm-compare__note-en">{entry.pitch.enName}</span>
                        </div>

                        {/* Pauta */}
                        <div className="fm-compare__staff">
                            <StaffGlyph staff={entry.pitch.staff} width={90} height={72} />
                        </div>

                        {/* Diagrama com diff destacado */}
                        <div className="fm-compare__diagram">
                            <SaxDiagramMap
                                pressed={variant.diagram.pressed}
                                optional={variant.diagram.optional}
                                diffKeys={diffKeys}
                                width={70}
                                height={150}
                            />
                        </div>
                    </div>
                ))}

                {/* Coluna central: diff key list */}
                {changedCount > 0 && (
                    <div className="fm-compare__diff-col" aria-label="Teclas que mudam">
                        <span className="fm-compare__diff-title">Δ TECLAS</span>
                        <ul className="fm-compare__diff-list">
                            {diffKeys.map(k => {
                                const inA = varA.diagram.pressed.includes(k);
                                return (
                                    <li key={k} className="fm-compare__diff-item">
                                        <span className={`fm-compare__diff-dot fm-compare__diff-dot--${inA ? 'a' : 'b'}`} />
                                        <code className="fm-compare__diff-key">{k}</code>
                                        <span className="fm-compare__diff-dir">
                                            {inA ? '→ solta' : '→ pressiona'}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
});

ComparePanel.displayName = 'ComparePanel';
export default ComparePanel;
