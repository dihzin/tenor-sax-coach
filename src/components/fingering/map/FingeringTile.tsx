// src/components/fingering/map/FingeringTile.tsx
// ─────────────────────────────────────────────────────────────
// Tile individual do Mapa Global
// Dimensões fixas: 104×200px. Memo puro.
// ─────────────────────────────────────────────────────────────
import React, { memo, useState } from 'react';
import type { FingeringEntry } from '../../../lib/fingering/types';
import StaffGlyph from '../svg/StaffGlyph';
import SaxDiagramMap from '../svg/SaxDiagramMap';

interface FingeringTileProps {
    entry: FingeringEntry;
    showAlternatives: boolean;
}

const FingeringTile: React.FC<FingeringTileProps> = memo(({ entry, showAlternatives }) => {
    const [variantIdx, setVariantIdx] = useState(0);
    const variant = entry.variants[variantIdx] ?? entry.variants[0];
    const { pitch } = entry;
    const hasAlts = entry.variants.length > 1;

    return (
        <article
            className="fm-tile"
            aria-label={`Nota ${pitch.ptName} — ${pitch.register}`}
        >
            {/* ── Header ── */}
            <div className="fm-tile__header">
                <span className="fm-tile__name-pt">{pitch.ptName}</span>
                {pitch.enharmonicPT && (
                    <span className="fm-tile__enh">/ {pitch.enharmonicPT}</span>
                )}
                <span className="fm-tile__name-en">{pitch.enName}</span>
            </div>

            {/* ── Pauta SVG ── */}
            <div className="fm-tile__staff">
                <StaffGlyph staff={pitch.staff} width={62} height={50} palette="technical" />
            </div>

            {/* ── Diagrama SVG ── */}
            <div className="fm-tile__diagram">
                <SaxDiagramMap
                    pressed={variant.diagram.pressed}
                    optional={variant.diagram.optional}
                    width={44}
                    height={88}
                />
            </div>

            {/* ── Variant switcher ── */}
            {showAlternatives && hasAlts && (
                <div className="fm-tile__variants">
                    {entry.variants.map((v, i) => (
                        <button
                            key={v.id}
                            className={`fm-tile__vbtn${variantIdx === i ? ' active' : ''}`}
                            onClick={() => setVariantIdx(i)}
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
