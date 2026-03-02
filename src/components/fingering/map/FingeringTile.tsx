// src/components/fingering/map/FingeringTile.tsx — v4 (interatividade invisível)
import React, { memo, useState, useCallback } from 'react';
import type { FingeringEntry } from '../../../lib/fingering/types';
import StaffGlyph from '../svg/StaffGlyph';
import SaxDiagramMap from '../svg/SaxDiagramMap';

interface FingeringTileProps {
    entry: FingeringEntry;
    showAlternatives: boolean;
    /** true  → tile em foco (opacidade 100%) */
    isFocused?: boolean;
    /** true  → tile fora do foco (opacidade reduzida) */
    isDimmed?: boolean;
    onFocusNote?: (id: string) => void;
}

const FingeringTile: React.FC<FingeringTileProps> = memo(({
    entry, showAlternatives, isFocused, isDimmed, onFocusNote,
}) => {
    const [variantIdx, setVariantIdx] = useState(0);
    const variant = entry.variants[variantIdx] ?? entry.variants[0];
    const { pitch } = entry;
    const hasAlts = entry.variants.length > 1;

    const handleClick = useCallback(() => {
        onFocusNote?.(entry.id);
    }, [entry.id, onFocusNote]);

    // Classe de foco aplicada ao article
    let focusCls = '';
    if (isDimmed) focusCls = ' fm-tile--dimmed';
    if (isFocused) focusCls = ' fm-tile--focused';

    return (
        <article
            className={`fm-tile${focusCls}`}
            aria-label={`Nota ${pitch.ptName} ${pitch.register}`}
            aria-pressed={isFocused}
            onClick={handleClick}
            style={{ cursor: onFocusNote ? 'pointer' : 'default' }}
        >
            {/* Header */}
            <div className="fm-tile__header">
                <span className="fm-tile__name-pt">{pitch.ptName}</span>
                {pitch.enharmonicPT && (
                    <span className="fm-tile__enh">{pitch.enharmonicPT}</span>
                )}
                <span className="fm-tile__name-en">{pitch.enName}</span>
            </div>

            {/* Pauta SVG */}
            <div className="fm-tile__staff">
                <StaffGlyph staff={pitch.staff} width={92} height={80} palette="technical" />
            </div>

            {/* Diagrama SVG — hover CSS atua em .sax-key--open/.sax-key--pressed */}
            <div className="fm-tile__diagram">
                <SaxDiagramMap
                    pressed={variant.diagram.pressed}
                    optional={variant.diagram.optional}
                    width={65}
                    height={140}
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
