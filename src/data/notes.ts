// ─────────────────────────────────────────────────────────────
// notes.ts — Array de notas do Sax Tenor
// Digitações baseadas no padrão Tomplay Fingering Chart (PDF)
// IDs das chaves:
//   oct = chave de oitava (polegar esq, costas)
//   T   = polegar esq (frente, registro)
//   1   = indicador esq   2 = médio esq    3 = anelar esq
//   4   = indicador dir   5 = médio dir    6 = anelar dir
//   bis = chave Bis (lateral ind. esq)
//   pC  = Palm C (palma esq, lado)
//   pD  = Palm D (palma esq, lado, acima de pC)
//   lBb = Mesa Sib (mindinho esq, superior)
//   lLow= Low Bb (mindinho esq, inferior)
//   lAb = Sol# (mindinho esq)
//   Fs  = Fá# lateral (dedão dir)
//   rBb = Sib baixo (mindinho dir, superior)
//   rCs = Dó# (mindinho dir, médio)
//   rEb = Mi♭ (mindinho dir, inferior)
// ─────────────────────────────────────────────────────────────

export interface Note {
    id: string;
    name: string;
    enh: string;
    region: 'grave' | 'medio' | 'agudo';
    pressed: string[];
    /** Frequência em Hz (Sax Tenor em Bb: transpõe uma 2ª maior abaixo) */
    freq: number;
}

/**
 * Digitações do Sax Tenor — referência: Tomplay Saxophone Fingering Chart
 * Chaves principais:
 *   Registro GRAVE (sem oct):  Sib1 a Lá1
 *   Registro MÉDIO (com oct):  Sib2 a Si3  (precisam da chave de oitava)
 *   Registro AGUDO (com oct):  Dó3 a Sol3
 *
 * Observações sobre T (Polegar):
 *   - Para as notas C2 (Dó Médio), B2 (Si Médio), Bb2 (Sib Médio):
 *     o polegar de registro (T) sustenta a posição mas as notas mais agudas
 *     dependem da oitava.
 *   - C2 = apenas tecla 2 do dedo médio esquerdo. (digitação padrão universal)
 *   - Dó# médio = tecla 1 + pD (Palm D) como chave auxiliar
 */
export const NOTES: Note[] = [
    // ── GRAVE ─────────────────────────────────────────────────
    // Sib1 — Lá# grave
    {
        id: 'Bb1', name: 'Sib', enh: 'Lá#', region: 'grave',
        pressed: ['oct', 'T', '1', '2', '3', 'lBb', '4', '5', '6', 'lLow', 'rBb'], freq: 116.54
    },
    // Si1
    {
        id: 'B1', name: 'Si', enh: 'Dób', region: 'grave',
        pressed: ['T', '1', '2', '3', 'lBb', '4', '5', '6', 'lLow'], freq: 123.47
    },
    // Dó1 grave — Low C: dedos 1-2-3-4-5-6 + T + Low C (mindinho dir inferior)
    {
        id: 'C1', name: 'Dó', enh: 'Si#', region: 'grave',
        pressed: ['T', '1', '2', '3', '4', '5', '6', 'lLow'], freq: 130.81
    },
    // Dó#1 grave — + mindinho dir Dó#
    {
        id: 'Cs1', name: 'Dó#', enh: 'Réb', region: 'grave',
        pressed: ['T', '1', '2', '3', '4', '5', '6', 'rCs'], freq: 138.59
    },
    // Ré1 grave — 1-2-3-4-5-6 + T
    {
        id: 'D1', name: 'Ré', enh: '', region: 'grave',
        pressed: ['T', '1', '2', '3', '4', '5', '6'], freq: 146.83
    },
    // Ré#1 / Mib grave — + mindinho dir Mib
    {
        id: 'Ds1', name: 'Ré#', enh: 'Mib', region: 'grave',
        pressed: ['T', '1', '2', '3', '4', '5', '6', 'rEb'], freq: 155.56
    },
    // Mi1 grave
    {
        id: 'E1', name: 'Mi', enh: 'Fáb', region: 'grave',
        pressed: ['T', '1', '2', '3', '4', '5'], freq: 164.81
    },
    // Fá1 grave
    {
        id: 'F1', name: 'Fá', enh: 'Mi#', region: 'grave',
        pressed: ['T', '1', '2', '3', '4'], freq: 174.61
    },
    // Fá#1 grave — Fá + chave Fá# lateral
    {
        id: 'Fs1', name: 'Fá#', enh: 'Solb', region: 'grave',
        pressed: ['T', '1', '2', '3', '4', 'Fs'], freq: 185.00
    },
    // Sol1 grave — apenas 1-2-3 mão esq + T
    {
        id: 'G1', name: 'Sol', enh: '', region: 'grave',
        pressed: ['T', '1', '2', '3'], freq: 196.00
    },
    // Sol#1 / Láb grave — Sol + mindinho esq Sol#
    {
        id: 'Ab1', name: 'Sol#', enh: 'Láb', region: 'grave',
        pressed: ['T', '1', '2', '3', 'lAb'], freq: 207.65
    },
    // Lá1 grave — teclas 1-2 mão esq + T
    {
        id: 'A1', name: 'Lá', enh: '', region: 'grave',
        pressed: ['T', '1', '2'], freq: 220.00
    },

    // ── MÉDIO ─────────────────────────────────────────────────
    // Sib2 médio — Lá + chave Bis
    {
        id: 'Bb2', name: 'Sib', enh: 'Lá#', region: 'medio',
        pressed: ['T', '1', '2', 'bis'], freq: 233.08
    },
    // Si2 médio — apenas T + tecla 1
    {
        id: 'B2', name: 'Si', enh: '', region: 'medio',
        pressed: ['T', '1'], freq: 246.94
    },
    {
        id: 'C2', name: 'Dó', enh: '', region: 'medio',
        pressed: ['2'], freq: 261.63
    },
    {
        id: 'Cs2', name: 'Dó#', enh: 'Réb', region: 'medio',
        pressed: ['pD', '1'], freq: 277.18
    },
    // Ré2 médio — com oct + digitação de Ré
    {
        id: 'D2', name: 'Ré', enh: '', region: 'medio',
        pressed: ['oct', 'T', '1', '2', '3', '4', '5', '6'], freq: 293.66
    },
    // Ré#2 / Mib médio
    {
        id: 'Ds2', name: 'Ré#', enh: 'Mib', region: 'medio',
        pressed: ['oct', 'T', '1', '2', '3', '4', '5', '6', 'rEb'], freq: 311.13
    },
    // Mi2 médio
    {
        id: 'E2', name: 'Mi', enh: '', region: 'medio',
        pressed: ['oct', 'T', '1', '2', '3', '4', '5'], freq: 329.63
    },
    // Fá2 médio
    {
        id: 'F2', name: 'Fá', enh: '', region: 'medio',
        pressed: ['oct', 'T', '1', '2', '3', '4'], freq: 349.23
    },
    // Fá#2 médio
    {
        id: 'Fs2', name: 'Fá#', enh: 'Solb', region: 'medio',
        pressed: ['oct', 'T', '1', '2', '3', '4', 'Fs'], freq: 369.99
    },
    // Sol2 médio
    {
        id: 'G2', name: 'Sol', enh: '', region: 'medio',
        pressed: ['oct', 'T', '1', '2', '3'], freq: 392.00
    },
    // Sol#2 / Láb médio
    {
        id: 'Ab2', name: 'Sol#', enh: 'Láb', region: 'medio',
        pressed: ['oct', 'T', '1', '2', '3', 'lAb'], freq: 415.30
    },
    // Lá2 médio
    {
        id: 'A2', name: 'Lá', enh: '', region: 'medio',
        pressed: ['oct', 'T', '1', '2'], freq: 440.00
    },
    // Sib3 médio
    {
        id: 'Bb3', name: 'Sib', enh: 'Lá#', region: 'medio',
        pressed: ['oct', 'T', '1', '2', 'bis'], freq: 466.16
    },
    // Si3 médio
    {
        id: 'B3', name: 'Si', enh: '', region: 'medio',
        pressed: ['oct', 'T', '1'], freq: 493.88
    },

    // ── AGUDO ─────────────────────────────────────────────────
    // Dó3 agudo — oct + tecla 2 (oitava acima do Dó médio)
    {
        id: 'C3', name: 'Dó', enh: '', region: 'agudo',
        pressed: ['oct', '2'], freq: 523.25
    },
    {
        id: 'Cs3', name: 'Dó#', enh: 'Réb', region: 'agudo',
        pressed: ['oct', 'pD', '1'], freq: 554.37
    },
    // Ré3 agudo
    {
        id: 'D3', name: 'Ré', enh: '', region: 'agudo',
        pressed: ['oct', 'T', 'pD', '1', '2', '3', '4', '5', '6'], freq: 587.33
    },
    // Ré#3 / Mib agudo
    {
        id: 'Ds3', name: 'Ré#', enh: 'Mib', region: 'agudo',
        pressed: ['oct', 'T', 'pD', '1', '2', '3', '4', '5', '6', 'rEb'], freq: 622.25
    },
    // Mi3 agudo
    {
        id: 'E3', name: 'Mi', enh: '', region: 'agudo',
        pressed: ['oct', 'T', 'pD', '1', '2', '3', '4', '5'], freq: 659.25
    },
    // Fá3 agudo
    {
        id: 'F3', name: 'Fá', enh: '', region: 'agudo',
        pressed: ['oct', 'T', 'pD', '1', '2', '3', '4'], freq: 698.46
    },
    // Fá#3 agudo
    {
        id: 'Fs3', name: 'Fá#', enh: 'Solb', region: 'agudo',
        pressed: ['oct', 'T', 'pD', '1', '2', '3', 'Fs'], freq: 739.99
    },
    // Sol3 agudo
    {
        id: 'G3', name: 'Sol', enh: '', region: 'agudo',
        pressed: ['oct', 'T', 'pD', '1', '2', '3'], freq: 783.99
    },
];

/** Cores por região */
export const REGION_COLOR: Record<string, string> = {
    grave: '#6AACF5',
    medio: '#E8B84B',
    agudo: '#E06B6B',
};

/** Rótulos por região */
export const REGION_LABEL: Record<string, string> = {
    grave: 'Grave',
    medio: 'Médio',
    agudo: 'Agudo',
};

/** Mapa de IDs de teclas para rótulos curtos */
export const KEY_SHORT_LABEL: Record<string, string> = {
    oct: 'Oitava', T: 'Polegar', '1': 'Tecla 1', '2': 'Tecla 2', '3': 'Tecla 3',
    bis: 'Bis', pC: 'Palm C', pD: 'Palm D', lBb: 'Mesa Sib', lLow: 'Low Bb', lAb: 'Sol#',
    '4': 'Tecla 4', '5': 'Tecla 5', '6': 'Tecla 6', Fs: 'Fá# lat.', rBb: 'Sib bx.',
    rCs: 'Dó#', rEb: 'Mi♭',
};

/** Legenda completa de todas as teclas */
export const KEY_LEGEND = [
    { id: 'oct', name: 'Oitava', hand: 'Polegar esq. (costas do tubo)' },
    { id: 'T', name: 'Polegar (T)', hand: 'Polegar esquerdo, frente' },
    { id: '1', name: 'Tecla 1', hand: 'Indicador esquerdo' },
    { id: '2', name: 'Tecla 2', hand: 'Médio esquerdo' },
    { id: '3', name: 'Tecla 3', hand: 'Anelar esquerdo' },
    { id: 'bis', name: 'Bis', hand: 'Lateral do indicador esq.' },
    { id: 'pC', name: 'Palm C', hand: 'Lateral esq., lado do corpo' },
    { id: 'pD', name: 'Palm D', hand: 'Lateral esq., acima do Palm C' },
    { id: 'lBb', name: 'Mesa Sib', hand: 'Mindinho esq. (superior)' },
    { id: 'lLow', name: 'Low Bb', hand: 'Mindinho esq. (inferior)' },
    { id: 'lAb', name: 'Sol# / Láb', hand: 'Mindinho esq. (extra)' },
    { id: '4', name: 'Tecla 4', hand: 'Indicador direito' },
    { id: '5', name: 'Tecla 5', hand: 'Médio direito' },
    { id: '6', name: 'Tecla 6', hand: 'Anelar direito' },
    { id: 'Fs', name: 'Fá# lateral', hand: 'Dedo auxiliar direito' },
    { id: 'rBb', name: 'Sib baixo', hand: 'Mindinho dir. (superior)' },
    { id: 'rCs', name: 'Dó# / Réb', hand: 'Mindinho dir. (médio)' },
    { id: 'rEb', name: 'Mi♭ / Ré#', hand: 'Mindinho dir. (inferior)' },
];
