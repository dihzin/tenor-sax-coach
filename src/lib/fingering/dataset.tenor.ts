// src/lib/fingering/dataset.tenor.ts
// ─────────────────────────────────────────────────────────────
// Dataset completo do Sax Tenor
// Inclui: Grave (Sib1–Lá1), Médio (Sib2–Si3), Agudo (Dó3–Sol3)
// Estrutura pronta para adicionar alternativas e altíssimo
// ─────────────────────────────────────────────────────────────
import type { FingeringDataset, FingeringEntry } from './types';

const entries: FingeringEntry[] = [
    // ────────────────────────── GRAVE ──────────────────────────
    {
        id: 'Bb1_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Sib', enName: 'Bb', enharmonicPT: 'Lá#', enharmonicEN: 'A#',
            midi: 58, freq: 116.54, register: 'grave',
            staff: { diatonicStep: -2, accidental: 'flat', ledgerBelow: true, ledgerAbove: false, ledgerCount: 1 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['oct', 'T', '1', '2', '3', 'lBb', '4', '5', '6', 'lLow', 'rBb'] },
        }],
        tags: ['beginner'],
    },
    {
        id: 'B1_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Si', enName: 'B', enharmonicPT: 'Dób', enharmonicEN: 'Cb',
            midi: 59, freq: 123.47, register: 'grave',
            staff: { diatonicStep: -1.5, accidental: null, ledgerBelow: true, ledgerAbove: false, ledgerCount: 1 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['T', '1', '2', '3', 'lBb', '4', '5', '6', 'lLow'] },
        }],
    },
    {
        id: 'C1_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Dó', enName: 'C', enharmonicPT: 'Si#', enharmonicEN: 'B#',
            midi: 60, freq: 130.81, register: 'grave',
            staff: { diatonicStep: -1, accidental: null, ledgerBelow: true, ledgerAbove: false, ledgerCount: 1 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['T', '1', '2', '3', '4', '5', '6', 'lLow'] },
        }],
    },
    {
        id: 'Cs1_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Dó#', enName: 'C#', enharmonicPT: 'Réb', enharmonicEN: 'Db',
            midi: 61, freq: 138.59, register: 'grave',
            staff: { diatonicStep: -1, accidental: 'sharp', ledgerBelow: true, ledgerAbove: false, ledgerCount: 1 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['T', '1', '2', '3', '4', '5', '6', 'rCs'] },
        }],
    },
    {
        id: 'D1_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Ré', enName: 'D',
            midi: 62, freq: 146.83, register: 'grave',
            staff: { diatonicStep: -0.5, accidental: null, ledgerBelow: false, ledgerAbove: false, ledgerCount: 0 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['T', '1', '2', '3', '4', '5', '6'] },
        }],
        tags: ['beginner'],
    },
    {
        id: 'Ds1_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Ré#', enName: 'D#', enharmonicPT: 'Mib', enharmonicEN: 'Eb',
            midi: 63, freq: 155.56, register: 'grave',
            staff: { diatonicStep: -0.5, accidental: 'sharp', ledgerBelow: false, ledgerAbove: false, ledgerCount: 0 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['T', '1', '2', '3', '4', '5', '6', 'rEb'] },
        }],
    },
    {
        id: 'E1_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Mi', enName: 'E', enharmonicPT: 'Fáb', enharmonicEN: 'Fb',
            midi: 64, freq: 164.81, register: 'grave',
            staff: { diatonicStep: 0, accidental: null, ledgerBelow: false, ledgerAbove: false, ledgerCount: 0 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['T', '1', '2', '3', '4', '5'] },
        }],
        tags: ['beginner'],
    },
    {
        id: 'F1_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Fá', enName: 'F', enharmonicPT: 'Mi#', enharmonicEN: 'E#',
            midi: 65, freq: 174.61, register: 'grave',
            staff: { diatonicStep: 0.5, accidental: null, ledgerBelow: false, ledgerAbove: false, ledgerCount: 0 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['T', '1', '2', '3', '4'] },
        }],
        tags: ['beginner'],
    },
    {
        id: 'Fs1_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Fá#', enName: 'F#', enharmonicPT: 'Solb', enharmonicEN: 'Gb',
            midi: 66, freq: 185.00, register: 'grave',
            staff: { diatonicStep: 0.5, accidental: 'sharp', ledgerBelow: false, ledgerAbove: false, ledgerCount: 0 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['T', '1', '2', '3', '4', 'Fs'] },
        }],
    },
    {
        id: 'G1_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Sol', enName: 'G',
            midi: 67, freq: 196.00, register: 'grave',
            staff: { diatonicStep: 1, accidental: null, ledgerBelow: false, ledgerAbove: false, ledgerCount: 0 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['T', '1', '2', '3'] },
        }],
        tags: ['beginner'],
    },
    {
        id: 'Ab1_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Sol#', enName: 'G#', enharmonicPT: 'Láb', enharmonicEN: 'Ab',
            midi: 68, freq: 207.65, register: 'grave',
            staff: { diatonicStep: 1, accidental: 'sharp', ledgerBelow: false, ledgerAbove: false, ledgerCount: 0 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['T', '1', '2', '3', 'lAb'] },
        }],
    },
    {
        id: 'A1_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Lá', enName: 'A',
            midi: 69, freq: 220.00, register: 'grave',
            staff: { diatonicStep: 1.5, accidental: null, ledgerBelow: false, ledgerAbove: false, ledgerCount: 0 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['T', '1', '2'] },
        }],
        tags: ['beginner'],
    },

    // ────────────────────────── MÉDIO ──────────────────────────
    {
        id: 'Bb2_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Sib', enName: 'Bb', enharmonicPT: 'Lá#', enharmonicEN: 'A#',
            midi: 70, freq: 233.08, register: 'medio',
            staff: { diatonicStep: 2, accidental: 'flat', ledgerBelow: false, ledgerAbove: false, ledgerCount: 0 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['T', '1', '2', 'bis'] },
        }, {
            id: 'alt-1', label: 'Alt. 1',
            diagram: { pressed: ['T', '1', '2', '3', 'lBb'] },
            notes: 'Alternativa para passagens rápidas',
        }],
    },
    {
        id: 'B2_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Si', enName: 'B',
            midi: 71, freq: 246.94, register: 'medio',
            staff: { diatonicStep: 2.5, accidental: null, ledgerBelow: false, ledgerAbove: false, ledgerCount: 0 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['T', '1'] },
        }],
    },
    {
        id: 'C2_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Dó', enName: 'C',
            midi: 72, freq: 261.63, register: 'medio',
            staff: { diatonicStep: 3, accidental: null, ledgerBelow: false, ledgerAbove: true, ledgerCount: 1 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['2'] },
        }],
    },
    {
        id: 'Cs2_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Dó#', enName: 'C#', enharmonicPT: 'Réb', enharmonicEN: 'Db',
            midi: 73, freq: 277.18, register: 'medio',
            staff: { diatonicStep: 3, accidental: 'sharp', ledgerBelow: false, ledgerAbove: true, ledgerCount: 1 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['pD', '1'] },
        }],
    },
    {
        id: 'D2_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Ré', enName: 'D',
            midi: 74, freq: 293.66, register: 'medio',
            staff: { diatonicStep: 3.5, accidental: null, ledgerBelow: false, ledgerAbove: false, ledgerCount: 0 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['oct', 'T', '1', '2', '3', '4', '5', '6'] },
        }],
    },
    {
        id: 'Ds2_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Ré#', enName: 'D#', enharmonicPT: 'Mib', enharmonicEN: 'Eb',
            midi: 75, freq: 311.13, register: 'medio',
            staff: { diatonicStep: 3.5, accidental: 'sharp', ledgerBelow: false, ledgerAbove: false, ledgerCount: 0 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['oct', 'T', '1', '2', '3', '4', '5', '6', 'rEb'] },
        }],
    },
    {
        id: 'E2_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Mi', enName: 'E',
            midi: 76, freq: 329.63, register: 'medio',
            staff: { diatonicStep: 4, accidental: null, ledgerBelow: false, ledgerAbove: false, ledgerCount: 0 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['oct', 'T', '1', '2', '3', '4', '5'] },
        }],
    },
    {
        id: 'F2_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Fá', enName: 'F',
            midi: 77, freq: 349.23, register: 'medio',
            staff: { diatonicStep: 4.5, accidental: null, ledgerBelow: false, ledgerAbove: false, ledgerCount: 0 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['oct', 'T', '1', '2', '3', '4'] },
        }],
    },
    {
        id: 'Fs2_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Fá#', enName: 'F#', enharmonicPT: 'Solb', enharmonicEN: 'Gb',
            midi: 78, freq: 369.99, register: 'medio',
            staff: { diatonicStep: 4.5, accidental: 'sharp', ledgerBelow: false, ledgerAbove: false, ledgerCount: 0 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['oct', 'T', '1', '2', '3', '4', 'Fs'] },
        }],
    },
    {
        id: 'G2_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Sol', enName: 'G',
            midi: 79, freq: 392.00, register: 'medio',
            staff: { diatonicStep: 5, accidental: null, ledgerBelow: false, ledgerAbove: false, ledgerCount: 0 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['oct', 'T', '1', '2', '3'] },
        }],
    },
    {
        id: 'Ab2_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Sol#', enName: 'G#', enharmonicPT: 'Láb', enharmonicEN: 'Ab',
            midi: 80, freq: 415.30, register: 'medio',
            staff: { diatonicStep: 5, accidental: 'sharp', ledgerBelow: false, ledgerAbove: false, ledgerCount: 0 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['oct', 'T', '1', '2', '3', 'lAb'] },
        }],
    },
    {
        id: 'A2_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Lá', enName: 'A',
            midi: 81, freq: 440.00, register: 'medio',
            staff: { diatonicStep: 5.5, accidental: null, ledgerBelow: false, ledgerAbove: false, ledgerCount: 0 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['oct', 'T', '1', '2'] },
        }],
    },
    {
        id: 'Bb3_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Sib', enName: 'Bb', enharmonicPT: 'Lá#', enharmonicEN: 'A#',
            midi: 82, freq: 466.16, register: 'medio',
            staff: { diatonicStep: 6, accidental: 'flat', ledgerBelow: false, ledgerAbove: false, ledgerCount: 0 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['oct', 'T', '1', '2', 'bis'] },
        }],
    },
    {
        id: 'B3_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Si', enName: 'B',
            midi: 83, freq: 493.88, register: 'medio',
            staff: { diatonicStep: 6.5, accidental: null, ledgerBelow: false, ledgerAbove: false, ledgerCount: 0 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['oct', 'T', '1'] },
        }],
    },

    // ────────────────────────── AGUDO ──────────────────────────
    {
        id: 'C3_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Dó', enName: 'C',
            midi: 84, freq: 523.25, register: 'agudo',
            staff: { diatonicStep: 7, accidental: null, ledgerBelow: false, ledgerAbove: true, ledgerCount: 1 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['oct', '2'] },
        }],
    },
    {
        id: 'Cs3_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Dó#', enName: 'C#', enharmonicPT: 'Réb', enharmonicEN: 'Db',
            midi: 85, freq: 554.37, register: 'agudo',
            staff: { diatonicStep: 7, accidental: 'sharp', ledgerBelow: false, ledgerAbove: true, ledgerCount: 1 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['oct', 'pD', '1'] },
        }],
    },
    {
        id: 'D3_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Ré', enName: 'D',
            midi: 86, freq: 587.33, register: 'agudo',
            staff: { diatonicStep: 7.5, accidental: null, ledgerBelow: false, ledgerAbove: false, ledgerCount: 0 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['oct', 'T', 'pD', '1', '2', '3', '4', '5', '6'] },
        }],
    },
    {
        id: 'Ds3_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Ré#', enName: 'D#', enharmonicPT: 'Mib', enharmonicEN: 'Eb',
            midi: 87, freq: 622.25, register: 'agudo',
            staff: { diatonicStep: 7.5, accidental: 'sharp', ledgerBelow: false, ledgerAbove: false, ledgerCount: 0 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['oct', 'T', 'pD', '1', '2', '3', '4', '5', '6', 'rEb'] },
        }],
    },
    {
        id: 'E3_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Mi', enName: 'E',
            midi: 88, freq: 659.25, register: 'agudo',
            staff: { diatonicStep: 8, accidental: null, ledgerBelow: false, ledgerAbove: false, ledgerCount: 0 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['oct', 'T', '1', '2', '3', '4', '5'] },
        }],
    },
    {
        id: 'F3_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Fá', enName: 'F',
            midi: 89, freq: 698.46, register: 'agudo',
            staff: { diatonicStep: 8.5, accidental: null, ledgerBelow: false, ledgerAbove: false, ledgerCount: 0 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['oct', 'T', 'pC', '1', '2', '3', '4'] },
        }],
    },
    {
        id: 'Fs3_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Fá#', enName: 'F#', enharmonicPT: 'Solb', enharmonicEN: 'Gb',
            midi: 90, freq: 739.99, register: 'agudo',
            staff: { diatonicStep: 8.5, accidental: 'sharp', ledgerBelow: false, ledgerAbove: false, ledgerCount: 0 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['oct', 'T', 'pC', '1', '2', '3', '4', 'Fs'] },
        }],
    },
    {
        id: 'G3_tenor', instrument: 'tenor',
        pitch: {
            ptName: 'Sol', enName: 'G',
            midi: 91, freq: 783.99, register: 'agudo',
            staff: { diatonicStep: 9, accidental: null, ledgerBelow: false, ledgerAbove: false, ledgerCount: 0 },
        },
        variants: [{
            id: 'primary', label: '',
            diagram: { pressed: ['oct', 'T', 'pD', '1', '2', '3'] },
        }],
    },
];

export const TENOR_DATASET: FingeringDataset = {
    instrument: 'tenor',
    version: '1.0.0',
    updatedAt: '2026-03-02',
    entries,
};

/** Seleciona entries por registro, ordenadas por MIDI */
export function selectByRegister(dataset: FingeringDataset, register: Register | Register[]) {
    const regs = Array.isArray(register) ? register : [register];
    return dataset.entries
        .filter(e => regs.includes(e.pitch.register))
        .sort((a, b) => a.pitch.midi - b.pitch.midi);
}

import type { Register } from './types';
