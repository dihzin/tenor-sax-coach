// src/components/fingering/svg/StaffGlyph.tsx — v7 (nível referência mundial)
// ─────────────────────────────────────────────────────────────
// Nota dominante, staff neutro, acidentais cirúrgicos.
// Zero Unicode. Hierarquia: staff < ledger < acc < stem < note
// ─────────────────────────────────────────────────────────────
import React, { memo } from 'react';
import type { StaffPosition } from '../../../lib/fingering/types';

interface StaffGlyphProps {
    staff: StaffPosition;
    width?: number;
    height?: number;
    palette?: 'technical' | 'gold';
}

// ── Geometria (+10% notehead, +5% haste, +11% staff SW) ──────
const GAP = 7.5;          // posições de notas: manter compatível com dataset
const TOP = 19;           // y 1ª linha
const NRX = 7.82;         // notehead rx (+10% vs 7.1)
const NRY = NRX * 0.576; // ry → oval editorial, ratio 1.73:1 (ligeiramente mais largo)
const ROT = -15;          // graus — editorial clássico
const STEM_L = 26;           // haste ligeiramente mais longa (+4%)
const OPT_Y = 1.0;         // ajuste óptico vertical
const COS15 = 0.966;        // cos(-15°) para ponto de saída da haste

// Cores — máximo contraste, hierarquia de escuro
const STAFF_INK = '#0D1E30';  // linhas: azul-preto claro, levemente mais escuro
const NOTE_INK = '#030C14';  // notehead: quase-preto, máxima presença

const LINE_Y = Array.from({ length: 5 }, (_, i) => TOP + i * GAP);
const stepToY = (s: number) => TOP - s * GAP + OPT_Y;

// ─────────────────────────────────────────────────────────────
// ACIDENTAIS — geometria tipográfica editorial precisa
// ─────────────────────────────────────────────────────────────

const SharpSign = memo(({ x, y, ink }: { x: number; y: number; ink: string }) => {
    // Proporções finais: verticais estreitas, cruzetas dominantes e oblíquas
    const vSep = 2.0;    // distância entre verticais
    const vH = 6.4;    // meia-altura verticais
    const hW = 4.5;    // meia-largura cruzetas (levemente mais largas)
    const slope = 1.05;   // obliquidade: sobe da esq→dir
    const gap = 2.8;    // meia-distância entre cruzetas
    return (
        <g aria-hidden="true">
            <line x1={x - vSep} y1={y - vH} x2={x - vSep} y2={y + vH}
                stroke={ink} strokeWidth={0.92} strokeLinecap="square" />
            <line x1={x + vSep} y1={y - vH} x2={x + vSep} y2={y + vH}
                stroke={ink} strokeWidth={0.92} strokeLinecap="square" />
            <line x1={x - hW} y1={y - gap + slope} x2={x + hW} y2={y - gap - slope}
                stroke={ink} strokeWidth={1.45} strokeLinecap="round" />
            <line x1={x - hW} y1={y + gap + slope} x2={x + hW} y2={y + gap - slope}
                stroke={ink} strokeWidth={1.45} strokeLinecap="round" />
        </g>
    );
});
SharpSign.displayName = 'SharpSign';

const FlatSign = memo(({ x, y, ink }: { x: number; y: number; ink: string }) => {
    // Haste longa + belly mais volumosa — presença editorial
    const stemTop = y - 10;
    const bt = y - 0.5;
    const bb = y + 4.8;
    const bw = 7.2;   // belly ligeiramente mais larga
    const d = `M ${x} ${bt} C ${x + bw} ${bt - 0.5} ${x + bw} ${bb + 0.5} ${x} ${bb}`;
    return (
        <g aria-hidden="true">
            <line x1={x} y1={stemTop} x2={x} y2={bb}
                stroke={ink} strokeWidth={1.05} strokeLinecap="round" />
            <path d={d} fill={ink} stroke="none" />
        </g>
    );
});
FlatSign.displayName = 'FlatSign';

const NaturalSign = memo(({ x, y, ink }: { x: number; y: number; ink: string }) => {
    const lx = x - 2.4;
    const rx = x + 2.4;
    const bH = 3.2;
    return (
        <g aria-hidden="true">
            <line x1={lx} y1={y - 9} x2={lx} y2={y + bH} stroke={ink} strokeWidth={0.92} strokeLinecap="square" />
            <line x1={rx} y1={y - bH} x2={rx} y2={y + 9} stroke={ink} strokeWidth={0.92} strokeLinecap="square" />
            <line x1={lx} y1={y - bH} x2={rx} y2={y - bH} stroke={ink} strokeWidth={1.35} strokeLinecap="round" />
            <line x1={lx} y1={y + bH} x2={rx} y2={y + bH} stroke={ink} strokeWidth={1.35} strokeLinecap="round" />
        </g>
    );
});
NaturalSign.displayName = 'NaturalSign';

// ─────────────────────────────────────────────────────────────
// STAFF GLYPH
// ─────────────────────────────────────────────────────────────
const StaffGlyph: React.FC<StaffGlyphProps> = memo(({
    staff, width = 92, height = 80, palette = 'technical',
}) => {
    const noteInk = palette === 'technical' ? NOTE_INK : '#6A3A00';
    const staffInk = palette === 'technical' ? STAFF_INK : '#8A5A00';

    const hasAcc = !!staff.accidental;
    const nX = width / 2 + (hasAcc ? 8 : 1);

    // ── Ledger lines ─────────────────────────────────────────
    // Sistema de steps do dataset:
    //   step  0  = F5 = 1ª linha do topo do staff (LINE_Y[0])
    //   step -4  = E4 = 5ª linha do fundo do staff (LINE_Y[4])
    //   step > 0 = acima do staff → linhas suplementares superiores
    //   step < -4 = abaixo do staff → linhas suplementares inferiores
    // Linhas suplementares são desenhadas SOMENTE em posições inteiras
    // (o .5 indica espaços entre linhas, não linhas em si)
    const ledgerYs: number[] = [];
    const addLedger = (y: number) => { if (!ledgerYs.includes(y)) ledgerYs.push(y); };

    const step = staff.diatonicStep;

    // Linhas suplementares SUPERIORES (step > 0)
    // Linha da nota mais próxima ao staff = floor do step se par (ou ceil se .5)
    if (step > 0) {
        // Traçar ledger em cada posição de linha acima do staff
        // step 0 = 1ª linha topo → ledgers em 1, 2, 3... (posições inteiras)
        const topStep = Math.floor(step);   // linha mais alta necessária
        for (let s = 1; s <= topStep; s++) {
            addLedger(stepToY(s));
        }
        // Se a nota está numa posição de linha (inteiro), já está incluída
        // Se está no espaço (.5), a linha abaixo já foi adicionada
    }

    // Linhas suplementares INFERIORES (step < -4)
    if (step < -4) {
        const botStep = Math.ceil(step);    // linha mais baixa necessária
        for (let s = -5; s >= botStep; s--) {
            addLedger(stepToY(s));
        }
    }

    // ── Clamp dinâmico: nota sempre dentro do viewBox ─────────
    // rawNoteY pode ser negativo em registros altos (MÉDIO, AGUDO, ALTÍSSIMO)
    // → transladamos todo o grupo SVG para baixo, mantendo proporções relativas
    const rawNoteY = stepToY(staff.diatonicStep);
    const NOTE_MIN = NRY + 5;                      // topo mínimo
    const NOTE_MAX = height - NRY - 8;             // fundo máximo
    const clampedY = Math.max(NOTE_MIN, Math.min(NOTE_MAX, rawNoteY));
    const dy = clampedY - rawNoteY;          // delta de translação

    // nY interno ao grupo: posição ANTES do translate
    const nYrel = rawNoteY;

    // Haste — ponto de saída corrigido para elipse girada
    const stemUp = staff.diatonicStep < 2.5;
    const edgeX = NRX * COS15;
    const stemX = stemUp ? nX + edgeX - 0.5 : nX - edgeX + 0.5;
    const stemY1 = stemUp ? nYrel - NRY * 0.42 : nYrel + NRY * 0.42;
    const stemY2 = stemUp ? nYrel - STEM_L : nYrel + STEM_L;

    const accX = nX - NRX - 9.5;

    return (
        <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} aria-hidden="true">

            {/* Grupo transladado: staff + nota seguem juntos.
                viewBox das linhas do staff que saem pelos extremos é clipado automaticamente. */}
            <g transform={`translate(0, ${dy})`}>

                {/* Staff lines */}
                {LINE_Y.map((y, i) => (
                    <line key={i}
                        x1={4} y1={y} x2={width - 4} y2={y}
                        stroke={staffInk} strokeWidth={1.45}
                    />
                ))}

                {/* Ledger lines */}
                {ledgerYs.map((y, i) => (
                    <line key={'l' + i}
                        x1={nX - NRX - 3.5} y1={y}
                        x2={nX + NRX + 3.5} y2={y}
                        stroke={staffInk} strokeWidth={1.35}
                    />
                ))}

                {/* Acidentais */}
                {staff.accidental === 'sharp' && <SharpSign x={accX} y={nYrel} ink={noteInk} />}
                {staff.accidental === 'flat' && <FlatSign x={accX} y={nYrel} ink={noteInk} />}
                {staff.accidental === 'natural' && <NaturalSign x={accX} y={nYrel} ink={noteInk} />}

                {/* Haste */}
                <line
                    x1={stemX} y1={stemY1}
                    x2={stemX} y2={stemY2}
                    stroke={noteInk} strokeWidth={1.00} strokeLinecap="butt"
                />

                {/* Notehead — oval editorial */}
                <ellipse
                    cx={nX} cy={nYrel}
                    rx={NRX} ry={NRY}
                    fill={noteInk}
                    transform={`rotate(${ROT}, ${nX}, ${nYrel})`}
                />
            </g>
        </svg>
    );
});

StaffGlyph.displayName = 'StaffGlyph';
export default StaffGlyph;
