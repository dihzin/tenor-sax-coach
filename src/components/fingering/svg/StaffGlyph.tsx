// src/components/fingering/svg/StaffGlyph.tsx
// ─────────────────────────────────────────────────────────────
// Pauta SVG minimalista com nota, acidente e linhas suplementares
// Clef: Treble (Sol) — nota ESCRITA para instrumento Bb
// ─────────────────────────────────────────────────────────────
import React, { memo } from 'react';
import type { StaffPosition } from '../../../lib/fingering/types';

interface StaffGlyphProps {
    staff: StaffPosition;
    width?: number;
    height?: number;
    /** 'technical' = azul naval; 'gold' = âmbar */
    palette?: 'technical' | 'gold';
}

// ── Constantes de layout ──────────────────────────────────────
const LINE_SPACING = 5.5;          // px entre linhas
const STAFF_TOP = 12;           // y da 1a linha (Mi4)

// As 5 linhas em y: E4=12, G4=17.5, B4=23, D5=28.5, F5=34
const LINE_YS = [
    STAFF_TOP,
    STAFF_TOP + LINE_SPACING,
    STAFF_TOP + LINE_SPACING * 2,
    STAFF_TOP + LINE_SPACING * 3,
    STAFF_TOP + LINE_SPACING * 4,
];

// Referência: diatonicStep=0 → E4 (Mi4) = 1a linha
// step 0.5 → F4 = 1º espaço
// step 1   → G4 = 2a linha
// ...
// step 4   → E5 = 5a linha
// step -0.5 → D4 = abaixo da 1a linha (1a linha suplementar inf)
// step -1  → C4 = 1a linha suplementar inferior

function noteY(diatonicStep: number): number {
    return STAFF_TOP - diatonicStep * LINE_SPACING;
}

const ACCIDENTAL = { sharp: '♯', flat: '♭', natural: '♮', null: '' };

const StaffGlyph: React.FC<StaffGlyphProps> = memo(({
    staff, width = 62, height = 56, palette = 'technical',
}) => {
    const ink = palette === 'technical' ? '#1A3A5C' : '#C8820E';
    const nY = noteY(staff.diatonicStep);
    const nX = width / 2 + 4;       // centro da nota (offset p/ acidental)
    const r = 4.2;                  // raio da cabeça de nota

    // Linhas suplementares necessárias
    const ledgerLines: number[] = [];
    if (staff.ledgerBelow) {
        // Abaixo da 1a linha: stepS negativos inteiros
        for (let s = -1; s >= Math.floor(staff.diatonicStep); s--) {
            if (s % 1 === 0) ledgerLines.push(noteY(s));      // apenas posições de linha
        }
    }
    if (staff.ledgerAbove) {
        // Acima da 5a linha (step=4): steps inteiros ≥5
        for (let s = 5; s <= Math.ceil(staff.diatonicStep); s++) {
            if (s % 1 === 0) ledgerLines.push(noteY(s));
        }
    }

    // Middle C suplementar especial (step=-1 = C4)
    const middleCLedger = staff.diatonicStep === -1 || staff.diatonicStep === -0.5;
    if (middleCLedger && !ledgerLines.includes(noteY(-1))) {
        ledgerLines.push(noteY(-1));
    }

    const stemUp = staff.diatonicStep < 2.5;  // Haste para cima se abaixo da linha central
    const stemX = stemUp ? nX + r - 0.5 : nX - r + 0.5;
    const stemY1 = nY;
    const stemY2 = stemUp ? nY - 18 : nY + 18;

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
            aria-hidden="true"
        >
            {/* 5 linhas da pauta */}
            {LINE_YS.map((y, i) => (
                <line key={i} x1="4" y1={y} x2={width - 4} y2={y}
                    stroke={ink} strokeWidth="0.85" />
            ))}

            {/* Linhas suplementares */}
            {ledgerLines.map((y, i) => (
                <line key={'led' + i}
                    x1={nX - r - 3} y1={y}
                    x2={nX + r + 3} y2={y}
                    stroke={ink} strokeWidth="0.85" />
            ))}

            {/* Acidental */}
            {staff.accidental && (
                <text
                    x={nX - r - 7}
                    y={nY + 3.5}
                    fontSize="9"
                    fontFamily="serif"
                    fill={ink}
                    textAnchor="middle"
                >
                    {ACCIDENTAL[staff.accidental]}
                </text>
            )}

            {/* Cabeça de nota (elipse ligeiramente inclinada) */}
            <ellipse
                cx={nX} cy={nY}
                rx={r} ry={r * 0.7}
                fill={ink}
                transform={`rotate(-12, ${nX}, ${nY})`}
            />

            {/* Haste */}
            <line
                x1={stemX} y1={stemY1}
                x2={stemX} y2={stemY2}
                stroke={ink} strokeWidth="0.9"
            />
        </svg>
    );
});

StaffGlyph.displayName = 'StaffGlyph';
export default StaffGlyph;
