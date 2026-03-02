// ─────────────────────────────────────────────────────────────
// useProgress.ts — Hook para rastrear progresso no localStorage
// Armazena notas praticadas, streak de dias e cobertura por região
// ─────────────────────────────────────────────────────────────
import { useState, useCallback } from 'react';

const STORAGE_KEY = 'tenor-sax-progress';
const DATES_KEY = 'tenor-sax-practice-dates';

interface ProgressData {
    practicedNotes: string[]; // IDs das notas marcadas como praticadas
}

function loadProgress(): ProgressData {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : { practicedNotes: [] };
    } catch {
        return { practicedNotes: [] };
    }
}

function saveProgress(data: ProgressData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/** Registra a data de hoje como dia de prática */
function recordPracticeDay() {
    const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
    const raw = localStorage.getItem(DATES_KEY);
    const dates: string[] = raw ? JSON.parse(raw) : [];
    if (!dates.includes(today)) {
        dates.push(today);
        localStorage.setItem(DATES_KEY, JSON.stringify(dates));
    }
}

/** Calcula streak de dias consecutivos até hoje */
function calcStreak(): number {
    const raw = localStorage.getItem(DATES_KEY);
    if (!raw) return 0;
    const dates: string[] = JSON.parse(raw).sort();
    if (dates.length === 0) return 0;

    let streak = 0;
    const today = new Date();

    for (let i = 0; i < 365; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const ds = d.toISOString().slice(0, 10);
        if (dates.includes(ds)) {
            streak++;
        } else if (i > 0) {
            break; // sequência quebrada
        }
    }
    return streak;
}

export function useProgress() {
    const [data, setData] = useState<ProgressData>(loadProgress);
    const [streak] = useState<number>(calcStreak);

    /** Marca ou desmarca uma nota como praticada */
    const toggleNote = useCallback((noteId: string) => {
        setData(prev => {
            const already = prev.practicedNotes.includes(noteId);
            const newNotes = already
                ? prev.practicedNotes.filter(n => n !== noteId)
                : [...prev.practicedNotes, noteId];
            const next = { ...prev, practicedNotes: newNotes };
            saveProgress(next);
            recordPracticeDay();
            return next;
        });
    }, []);

    /** Verifica se uma nota está praticada */
    const isPracticed = useCallback(
        (noteId: string) => data.practicedNotes.includes(noteId),
        [data]
    );

    /** Percentual de cobertura por região */
    const regionProgress = useCallback(
        (noteIds: string[]): number => {
            if (noteIds.length === 0) return 0;
            const count = noteIds.filter(id => data.practicedNotes.includes(id)).length;
            return Math.round((count / noteIds.length) * 100);
        },
        [data]
    );

    /** Total de notas praticadas */
    const totalPracticed = data.practicedNotes.length;

    return { isPracticed, toggleNote, regionProgress, totalPracticed, streak };
}
