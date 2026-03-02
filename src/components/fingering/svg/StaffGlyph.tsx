// src/components/fingering/svg/StaffGlyph.tsx — v2
// ─────────────────────────────────────────────────────────────
// Pauta SVG — linhas mais espessas, nota maior, proporções melhores
// ─────────────────────────────────────────────────────────────
import React, { memo } from 'react';
import type { StaffPosition } from '../../../lib/fingering/types';

interface StaffGlyphProps {
    staff: StaffPosition;
    width?: number;
    height?: number;
    palette?: 'technical' | 'gold';
}

// ── Constantes ────────────────────────────────────────────────
const GAP = 6;       // espaço entre linhas
const TOP = 14;      // y da 1ª linha
const NOTE_R = 5;       // raio da cabeça de nota
const STEM = 20;      // comprimento da haste

// Y das 5 linhas (E4 = 1ª linha = Y=14)
const LINE_Y = [TOP, TOP + GAP, TOP + GAP * 2, TOP + GAP * 3, TOP + GAP * 4];

/** Converte diatonicStep → y na pauta (step=0 → E4 = 1ª linha) */
const stepToY = (step: number) => TOP - step * GAP;

const ACC: Record<string, string> = {
    sharp: '♯', flat: '♭', natural: '♮',
};

const StaffGlyph: React.FC<StaffGlyphProps> = memo(({
    staff, width = 80, height = 72, palette = 'technical',
}) => {
    const ink = palette === 'technical' ? '#0D2640' : '#C08010';
    const nY = stepToY(staff.diatonicStep);
    const nX = width / 2 + (staff.accidental ? 6 : 0);

    // Linhas suplementares
    const ledgerYs: number[] = [];
    if (staff.ledgerBelow) {
        // C4 (step=-1) e D4 (step=-0.5): ledger em step=-1
        const bottomStep = Math.floor(staff.diatonicStep);
        for (let s = -1; s >= bottomStep; s--) {
            ledgerYs.push(stepToY(s));
        }
        // Garantir C4 se D4
        if (staff.diatonicStep === -0.5 && !ledgerYs.includes(stepToY(-1))) {
            ledgerYs.push(stepToY(-1));
        }
    }
    if (staff.ledgerAbove) {
        const topStep = Math.ceil(staff.diatonicStep);
        for (let s = 5; s <= topStep; s++) {
            ledgerYs.push(stepToY(s));
        }
        if (staff.diatonicStep === 5.5 && !ledgerYs.includes(stepToY(5))) {
            ledgerYs.push(stepToY(5));
        }
    }

    // Haste sobe abaixo do meio, desce acima (B4=2.5 é o centro)
    const stemUp = staff.diatonicStep < 2.5;
    const stemX = stemUp ? nX + NOTE_R - 0.6 : nX - NOTE_R + 0.6;
    const stemY2 = stemUp ? nY - STEM : nY + STEM;

    return (
        <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} aria-hidden="true">
            {/* 5 linhas */}
            {LINE_Y.map((y, i) => (
                <line key={i} x1={5} y1={y} x2={width - 5} y2={y}
                    stroke={ink} strokeWidth={1.0} />
            ))}

            {/* Linhas suplementares */}
            {ledgerYs.map((y, i) => (
                <line key={'l' + i}
                    x1={nX - NOTE_R - 4} y1={y}
                    x2={nX + NOTE_R + 4} y2={y}
                    stroke={ink} strokeWidth={1.0} />
            ))}

            {/* Acidental */}
            {staff.accidental && ACC[staff.accidental] && (
                <text
                    x={nX - NOTE_R - 9}
                    y={nY + 4}
                    fontSize={11}
                    fontFamily="Georgia, serif"
                    fill={ink}
                    textAnchor="middle"
                >
                    {ACC[staff.accidental]}
                </text>
            )}

            {/* Nota (elipse inclinada) */}
            <ellipse
                cx={nX} cy={nY}
                rx={NOTE_R} ry={NOTE_R * 0.68}
                fill={ink}
                transform={`rotate(-12, ${nX}, ${nY})`}
            />

            {/* Haste */}
            <line
                x1={stemX} y1={nY}
                x2={stemX} y2={stemY2}
                stroke={ink} strokeWidth={1.1}
            />
        </svg>
    );
});

StaffGlyph.displayName = 'StaffGlyph';
export default StaffGlyph;
