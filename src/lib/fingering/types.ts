// src/lib/fingering/types.ts
// ─────────────────────────────────────────────────────────────
// Tipos centrais do sistema de digitações
// ─────────────────────────────────────────────────────────────

export type Instrument = 'tenor' | 'alto';
export type Register = 'grave' | 'medio' | 'agudo' | 'altissimo';

/** IDs estáveis de cada chave do sax tenor */
export type FingeringKeyId =
    | 'oct'                       // chave de oitava
    | 'T'                         // polegar (registro)
    | 'pD' | 'pC'                // palm keys D e C
    | 'sEb' | 'sC'               // side keys Eb e C
    | '1' | '2' | '3'            // mão esquerda 1–3
    | 'bis'                       // bis key
    | '4' | '5' | '6'            // mão direita 4–6
    | 'Fs'                        // Fá# lateral
    | 'lLow' | 'lBb' | 'lAb'    // pinky esq: Low Bb, Sib, Sol#
    | 'rBb' | 'rCs' | 'rEb';    // pinky dir: Sib bx, Dó#, Mi♭

/** Estado de cada chave em um diagrama */
export interface FingeringDiagram {
    pressed: FingeringKeyId[];    // teclas que devem ser pressionadas
    open?: FingeringKeyId[];    // teclas explicitamente abertas (opt)
    optional?: FingeringKeyId[];   // teclas opcionally pressionadas
}

/** Posição na pauta (clef treble, nota escrita) */
export interface StaffPosition {
    /** Grau diatônico a partir de E4 (1a linha). E4=0, F4=0.5, G4=1, etc. */
    diatonicStep: number;
    /** Acidental da nota */
    accidental: 'sharp' | 'flat' | 'natural' | null;
    /** True se há linha suplementar abaixo da pauta */
    ledgerBelow: boolean;
    /** True se há linha suplementar acima da pauta */
    ledgerAbove: boolean;
    /** Número de linhas suplementares (0–3) */
    ledgerCount: number;
}

/** Nota musical */
export interface NotePitch {
    /** Ex: 'Sib', 'Dó#' */
    ptName: string;
    /** Ex: 'Bb', 'C#' */
    enName: string;
    /** Nome enarmônico PT (ex: 'Lá#') */
    enharmonicPT?: string;
    /** Nome enarmônico EN (ex: 'A#') */
    enharmonicEN?: string;
    /** MIDI note number (nota ESCRITA — instrumento transposto) */
    midi: number;
    /** Frequência em Hz (do som real, opcional) */
    freq?: number;
    /** Registro */
    register: Register;
    /** Posição na pauta */
    staff: StaffPosition;
}

/** Uma variante de digitação (principal ou alternativa) */
export interface FingeringVariant {
    /** 'primary' | 'alt-1' | 'alt-2' | etc. */
    id: string;
    /** Label visível: '' para principal, 'Alt. 1', 'Alt. 2' para alternativas */
    label: string;
    /** O diagrama de teclas */
    diagram: FingeringDiagram;
    /** Notas de uso (opcional) */
    notes?: string;
    /** Dificuldade relativa 1–5 */
    difficulty?: 1 | 2 | 3 | 4 | 5;
}

/** Entrada completa de uma nota com suas digitações */
export interface FingeringEntry {
    /** ID único: ex 'Bb1_tenor', 'C2_tenor' */
    id: string;
    /** Instrumento */
    instrument: Instrument;
    /** Pitch (nome, MIDI, freq, pauta) */
    pitch: NotePitch;
    /** Digitação principal (sempre [0]) + alternativas */
    variants: [FingeringVariant, ...FingeringVariant[]];
    /** Tags opcionais: ['beginner', 'chromatic', 'altissimo'] */
    tags?: string[];
}

/** Dataset completo por instrumento */
export interface FingeringDataset {
    instrument: Instrument;
    entries: FingeringEntry[];
    version: string;
    updatedAt: string;
}
