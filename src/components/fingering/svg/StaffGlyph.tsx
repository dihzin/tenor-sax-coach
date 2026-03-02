// src/components/fingering/svg/StaffGlyph.tsx — v3 (+12% escala, linhas mais espessas)
import React, { memo } from 'react';
import type { StaffPosition } from '../../../lib/fingering/types';

interface StaffGlyphProps {
    staff: StaffPosition;
    width?: number;
    height?: number;
    palette?: 'technical' | 'gold';
}

// ── Constantes (escala +12% vs v2) ───────────────────────────
const GAP = 6.5;    // era 6 → +8%
const TOP = 15;     // y da 1ª linha
const NOTE_R = 5.6;    // era 5 → +12%
const STEM = 22;     // haste levemente mais longa

const LINE_Y = [TOP, TOP + GAP, TOP + GAP * 2, TOP + GAP * 3, TOP + GAP * 4];

const stepToY = (s: number) => TOP - s * GAP;

const ACC: Record<string, string> = { sharp: '♯', flat: '♭', natural: '♮' };

const StaffGlyph: React.FC<StaffGlyphProps> = memo(({
    staff, width = 92, height = 76, palette = 'technical',
}) => {
    const ink = palette === 'technical' ? '#08172A' : '#B07800';

    // nX com offset óptico para acomodar acidental sem apertar
    const hasAcc = !!staff.accidental && !!ACC[staff.accidental];
    const nX = width / 2 + (hasAcc ? 7 : 2);
    const nY = stepToY(staff.diatonicStep);

    // Linhas suplementares
    const ledgerYs: number[] = [];
    if (staff.ledgerBelow) {
        const bot = Math.floor(staff.diatonicStep);
        for (let s = -1; s >= bot; s--) ledgerYs.push(stepToY(s));
        // D4 (step=-0.5) precisa de ledger em C4 (step=-1)
        if (staff.diatonicStep === -0.5 && !ledgerYs.includes(stepToY(-1)))
            ledgerYs.push(stepToY(-1));
    }
    if (staff.ledgerAbove) {
        const top = Math.ceil(staff.diatonicStep);
        for (let s = 5; s <= top; s++) ledgerYs.push(stepToY(s));
        if (staff.diatonicStep === 5.5 && !ledgerYs.includes(stepToY(5)))
            ledgerYs.push(stepToY(5));
    }

    // Haste: sobe se abaixo de B4 (step 2 = B4 linha central)
    const stemUp = staff.diatonicStep < 2.5;
    const stemX = stemUp ? nX + NOTE_R - 0.7 : nX - NOTE_R + 0.7;
    const stemY2 = stemUp ? nY - STEM : nY + STEM;

    return (
        <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} aria-hidden="true">

            {/* 5 linhas — mais espessas */}
            {LINE_Y.map((y, i) => (
                <line key={i} x1={5} y1={y} x2={width - 5} y2={y}
                    stroke={ink} strokeWidth={1.15} />
            ))}

            {/* Linhas suplementares */}
            {ledgerYs.map((y, i) => (
                <line key={'l' + i}
                    x1={nX - NOTE_R - 4} y1={y}
                    x2={nX + NOTE_R + 4} y2={y}
                    stroke={ink} strokeWidth={1.1} />
            ))}

            {/* Acidental — serif, centralizado opticamente */}
            {hasAcc && (
                <text
                    x={nX - NOTE_R - 10}
                    y={nY + 4.5}
                    fontSize={12}
                    fontFamily="Georgia, 'Times New Roman', serif"
                    fill={ink}
                    textAnchor="middle"
                >
                    {ACC[staff.accidental!]}
                </text>
            )}

            {/* Nota — elipse inclinada, peso maior */}
            <ellipse
                cx={nX} cy={nY}
                rx={NOTE_R} ry={NOTE_R * 0.68}
                fill={ink}
                transform={`rotate(-12, ${nX}, ${nY})`}
            />

            {/* Haste */}
            <line x1={stemX} y1={nY} x2={stemX} y2={stemY2}
                stroke={ink} strokeWidth={1.2} />
        </svg>
    );
});

StaffGlyph.displayName = 'StaffGlyph';
export default StaffGlyph;
