// src/components/fingering/svg/StaffGlyph.tsx — v4 (padrão material didático)
// ─────────────────────────────────────────────────────────────
// Hierarquia: Staff (base) → Nota (foco) → Acidental (secundário)
// Acidentes: SVG nativo — sem Unicode emoji musical
// ─────────────────────────────────────────────────────────────
import React, { memo } from 'react';
import type { StaffPosition } from '../../../lib/fingering/types';

interface StaffGlyphProps {
    staff: StaffPosition;
    width?: number;
    height?: number;
    palette?: 'technical' | 'gold';
}

// ── Constantes de geometria (+12% altura, +15% nota) ─────────
const GAP = 7.5;    // espaçamento entre linhas (+15% vs v3)
const TOP = 19;     // y da 1ª linha — respiro superior generoso
const NRX = 6.6;    // notehead rx (+15% vs 5.6)
const NRY = NRX * 0.62;  // notehead ry — oval musical achatado
const ROT = -18;    // graus de rotação — mais musical que -12
const STEM_L = 24;     // comprimento da haste

// y das 5 linhas
const LINE_Y = Array.from({ length: 5 }, (_, i) => TOP + i * GAP);

// step → y: step=0 → 1ª linha (E4 concert), step positivo → cima
const stepToY = (s: number) => TOP - s * GAP;

// ── Componentes de acidentes em SVG puro ─────────────────────
// (sem Unicode — hierarquia visual controlada, sem emoji)

const SharpSign = memo(({ x, y, ink }: { x: number; y: number; ink: string }) => {
    // Duas barras verticais + dois traços oblíquos cruzando
    const vLX = x - 2;   // x da barra esquerda
    const vRX = x + 2;   // x da barra direita
    const vH = 6.5;     // meia-altura das barras verticais
    const hW = 4.5;     // meia-largura dos traços horizontais
    const hSl = 1.0;     // inclinação óptica (y1 mais baixo que y2)
    const b1y = y - 2.8; // y central do traço superior
    const b2y = y + 2.8; // y central do traço inferior
    return (
        <g aria-hidden="true">
            {/* Barra vertical esq */}
            <line x1={vLX} y1={y - vH} x2={vLX} y2={y + vH} stroke={ink} strokeWidth={1.1} strokeLinecap="round" />
            {/* Barra vertical dir */}
            <line x1={vRX} y1={y - vH} x2={vRX} y2={y + vH} stroke={ink} strokeWidth={1.1} strokeLinecap="round" />
            {/* Traço horizontal superior (levemente oblíquo) */}
            <line x1={x - hW} y1={b1y + hSl} x2={x + hW} y2={b1y - hSl} stroke={ink} strokeWidth={1.5} strokeLinecap="round" />
            {/* Traço horizontal inferior */}
            <line x1={x - hW} y1={b2y + hSl} x2={x + hW} y2={b2y - hSl} stroke={ink} strokeWidth={1.5} strokeLinecap="round" />
        </g>
    );
});
SharpSign.displayName = 'SharpSign';

const FlatSign = memo(({ x, y, ink }: { x: number; y: number; ink: string }) => {
    // Haste vertical + barriga arredondada (tipo letra b)
    const stemTop = y - 9;    // haste sobe bastante (cauda longa)
    const bumpTop = y - 1;    // topo da barriga
    const bumpBot = y + 4;    // base da barriga
    // Path: barriga fechada com curva cúbica
    const d = [
        `M ${x} ${bumpTop}`,
        `C ${x + 7} ${bumpTop - 1}`,
        `  ${x + 7} ${bumpBot + 1}`,
        `  ${x} ${bumpBot}`,
    ].join(' ');
    return (
        <g aria-hidden="true">
            {/* Haste */}
            <line x1={x} y1={stemTop} x2={x} y2={bumpBot} stroke={ink} strokeWidth={1.15} strokeLinecap="round" />
            {/* Barriga preenchida */}
            <path d={d} fill={ink} stroke="none" />
        </g>
    );
});
FlatSign.displayName = 'FlatSign';

const NaturalSign = memo(({ x, y, ink }: { x: number; y: number; ink: string }) => {
    // Dois segmentos verticais + retângulo aberto (♮ simplificado)
    const lx = x - 2.5;
    const rx = x + 2.5;
    const barH = 3.5;
    return (
        <g aria-hidden="true">
            {/* Barra esq (longa, sobe) */}
            <line x1={lx} y1={y - 9} x2={lx} y2={y + barH} stroke={ink} strokeWidth={1.1} strokeLinecap="round" />
            {/* Barra dir (longa, desce) */}
            <line x1={rx} y1={y - barH} x2={rx} y2={y + 9} stroke={ink} strokeWidth={1.1} strokeLinecap="round" />
            {/* Topo horizontal */}
            <line x1={lx} y1={y - barH} x2={rx} y2={y - barH} stroke={ink} strokeWidth={1.4} strokeLinecap="round" />
            {/* Base horizontal */}
            <line x1={lx} y1={y + barH} x2={rx} y2={y + barH} stroke={ink} strokeWidth={1.4} strokeLinecap="round" />
        </g>
    );
});
NaturalSign.displayName = 'NaturalSign';

// ── StaffGlyph ────────────────────────────────────────────────
const StaffGlyph: React.FC<StaffGlyphProps> = memo(({
    staff, width = 92, height = 80, palette = 'technical',
}) => {
    const ink = palette === 'technical' ? '#08172A' : '#B07800';

    const hasAcc = !!staff.accidental;
    // Offset óptico: nota levemente à direita quando há acidental
    const nX = width / 2 + (hasAcc ? 8 : 1);
    const nY = stepToY(staff.diatonicStep);

    // ── Linhas suplementares ───────────────────────────────────
    const ledgerYs: number[] = [];
    if (staff.ledgerBelow) {
        const bot = Math.floor(staff.diatonicStep);
        for (let s = -1; s >= bot; s--) {
            const y = stepToY(s);
            if (!ledgerYs.includes(y)) ledgerYs.push(y);
        }
        // D4 (step=-0.5) precisa de ledger em C4
        if (staff.diatonicStep === -0.5) {
            const cY = stepToY(-1);
            if (!ledgerYs.includes(cY)) ledgerYs.push(cY);
        }
    }
    if (staff.ledgerAbove) {
        const top = Math.ceil(staff.diatonicStep);
        for (let s = 5; s <= top; s++) {
            const y = stepToY(s);
            if (!ledgerYs.includes(y)) ledgerYs.push(y);
        }
        if (staff.diatonicStep === 5.5) {
            const cY = stepToY(5);
            if (!ledgerYs.includes(cY)) ledgerYs.push(cY);
        }
    }

    // ── Haste ─────────────────────────────────────────────────
    // Sobe quando nota abaixo do centro (B4 = step 2.5)
    const stemUp = staff.diatonicStep < 2.5;
    // Haste sai do extremo do notehead, não do centro
    const stemX = stemUp ? nX + NRX - 0.8 : nX - NRX + 0.8;
    const stemY1 = stemUp ? nY - NRY * 0.5 : nY + NRY * 0.5;
    const stemY2 = stemUp ? nY - STEM_L : nY + STEM_L;

    // X do acidental: espaçado da nota (respiro musical)
    const accX = nX - NRX - 7;

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
            aria-hidden="true"
        >
            {/* ── 5 linhas do staff ── */}
            {LINE_Y.map((y, i) => (
                <line
                    key={i}
                    x1={5} y1={y} x2={width - 5} y2={y}
                    stroke={ink} strokeWidth={1.3}
                />
            ))}

            {/* ── Linhas suplementares (ledger) ── */}
            {ledgerYs.map((y, i) => (
                <line
                    key={'l' + i}
                    x1={nX - NRX - 4} y1={y}
                    x2={nX + NRX + 4} y2={y}
                    stroke={ink} strokeWidth={1.2}
                />
            ))}

            {/* ── Acidental SVG ── */}
            {staff.accidental === 'sharp' && <SharpSign x={accX} y={nY} ink={ink} />}
            {staff.accidental === 'flat' && <FlatSign x={accX} y={nY} ink={ink} />}
            {staff.accidental === 'natural' && <NaturalSign x={accX} y={nY} ink={ink} />}

            {/* ── Haste ── */}
            <line
                x1={stemX} y1={stemY1}
                x2={stemX} y2={stemY2}
                stroke={ink} strokeWidth={1.05}
                strokeLinecap="round"
            />

            {/* ── Notehead — oval musical rotacionado ── */}
            <ellipse
                cx={nX} cy={nY}
                rx={NRX} ry={NRY}
                fill={ink}
                transform={`rotate(${ROT}, ${nX}, ${nY})`}
            />
        </svg>
    );
});

StaffGlyph.displayName = 'StaffGlyph';
export default StaffGlyph;
