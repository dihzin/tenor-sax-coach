// src/components/fingering/map/FingeringTile.tsx — v5
// + compare mode (slot A/B) + transition analysis badge
import React, { memo, useState, useCallback, useMemo } from 'react';
import type { FingeringEntry } from '../../../lib/fingering/types';
import StaffGlyph from '../svg/StaffGlyph';
import SaxDiagramMap from '../svg/SaxDiagramMap';

// ── Análise de transição ──────────────────────────────────────
function calcTransition(a: FingeringEntry, b: FingeringEntry) {
    const pA = new Set(a.variants[0]?.diagram.pressed ?? []);
    const pB = new Set(b.variants[0]?.diagram.pressed ?? []);
    let delta = 0;
    for (const k of pA) if (!pB.has(k)) delta++;
    for (const k of pB) if (!pA.has(k)) delta++;
    const difficulty =
        delta === 0 ? null :
            delta <= 1 ? 'fácil' :
                delta <= 3 ? 'média' :
                    'difícil';
    return { delta, difficulty };
}

interface FingeringTileProps {
    entry: FingeringEntry;
    showAlternatives: boolean;
    isFocused?: boolean;
    isDimmed?: boolean;
    onFocusNote?: (id: string) => void;
    /** Nota anterior na seção para análise de transição */
    prevEntry?: FingeringEntry | null;
    /** Modo comparação ativo */
    compareMode?: boolean;
    /** Slot de comparação: 'A' | 'B' | undefined */
    compareSlot?: 'A' | 'B';
    onCompareSelect?: (entry: FingeringEntry) => void;
}

const DIFF_LABEL: Record<string, string> = {
    fácil: '● fácil',
    média: '◆ média',
    difícil: '▲ difícil',
};

const FingeringTile: React.FC<FingeringTileProps> = memo(({
    entry, showAlternatives, isFocused, isDimmed, onFocusNote,
    prevEntry, compareMode, compareSlot, onCompareSelect,
}) => {
    const [variantIdx, setVariantIdx] = useState(0);
    const variant = entry.variants[variantIdx] ?? entry.variants[0];
    const { pitch } = entry;
    const hasAlts = entry.variants.length > 1;

    // Análise de transição — calculada só quando tem nota anterior
    const transition = useMemo(() => {
        if (!prevEntry) return null;
        return calcTransition(prevEntry, entry);
    }, [prevEntry, entry]);

    const handleClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (compareMode) {
            onCompareSelect?.(entry);
        } else {
            onFocusNote?.(entry.id);
        }
    }, [compareMode, entry, onCompareSelect, onFocusNote]);

    // Classes de estado
    let cls = 'fm-tile';
    if (isDimmed) cls += ' fm-tile--dimmed';
    if (isFocused) cls += ' fm-tile--focused';
    if (compareSlot) cls += ` fm-tile--cmp-${compareSlot.toLowerCase()}`;

    return (
        <article
            className={cls}
            aria-label={`Nota ${pitch.ptName} ${pitch.register}`}
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        >
            {/* Header */}
            <div className="fm-tile__header">
                <span className="fm-tile__name-pt">{pitch.ptName}</span>
                {pitch.enharmonicPT && (
                    <span className="fm-tile__enh">{pitch.enharmonicPT}</span>
                )}
                <span className="fm-tile__name-en">{pitch.enName}</span>
                {/* Slot badge (compare mode) */}
                {compareSlot && (
                    <span className="fm-tile__cmp-slot" aria-label={`Nota ${compareSlot}`}>
                        {compareSlot}
                    </span>
                )}
            </div>

            {/* Transition badge — visível apenas quando focada e há nota anterior */}
            {isFocused && transition && transition.difficulty && (
                <div className={`fm-tile__transition fm-tile__transition--${transition.difficulty.replace('í', 'i').replace('é', 'e')}`}>
                    <span className="fm-tile__transition-delta">Δ {transition.delta}</span>
                    <span className="fm-tile__transition-label">
                        {DIFF_LABEL[transition.difficulty]}
                    </span>
                </div>
            )}

            {/* Pauta */}
            <div className="fm-tile__staff">
                <StaffGlyph staff={pitch.staff} width={92} height={80} palette="technical" />
            </div>

            {/* Diagrama */}
            <div className="fm-tile__diagram">
                <SaxDiagramMap
                    pressed={variant.diagram.pressed}
                    optional={variant.diagram.optional}
                    width={65}
                    height={145}
                />
            </div>

            {/* Variant switcher */}
            {showAlternatives && hasAlts && (
                <div className="fm-tile__variants">
                    {entry.variants.map((v, i) => (
                        <button
                            key={v.id}
                            className={`fm-tile__vbtn${variantIdx === i ? ' active' : ''}`}
                            onClick={e => { e.stopPropagation(); setVariantIdx(i); }}
                            aria-pressed={variantIdx === i}
                            title={v.label || 'Principal'}
                        >
                            {i === 0 ? '●' : `A${i}`}
                        </button>
                    ))}
                </div>
            )}
        </article>
    );
});

FingeringTile.displayName = 'FingeringTile';
export default FingeringTile;
