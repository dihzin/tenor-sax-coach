// src/components/fingering/map/FingeringRegisterSection.tsx — v4
import React, { memo } from 'react';
import type { FingeringEntry, Register } from '../../../lib/fingering/types';
import FingeringTile from './FingeringTile';

const REGISTER_LABEL: Record<Register, string> = {
    grave: 'GRAVE',
    medio: 'MÉDIO',
    agudo: 'AGUDO',
    altissimo: 'ALTÍSSIMO',
};

const CHROMATIC_ROW = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

interface FingeringRegisterSectionProps {
    register: Register;
    entries: FingeringEntry[];
    showAlternatives: boolean;
    focusedId: string | null;
    onFocusNote: (id: string) => void;
    compareMode: boolean;
    compareIds: string[];
    onCompareSelect: (entry: FingeringEntry) => void;
}

const FingeringRegisterSection: React.FC<FingeringRegisterSectionProps> = memo(({
    register, entries, showAlternatives,
    focusedId, onFocusNote,
    compareMode, compareIds, onCompareSelect,
}) => {
    if (entries.length === 0) return null;

    const sectionHasFocus = !compareMode && focusedId !== null &&
        entries.some(e => e.id === focusedId);

    return (
        <section
            className="fm-section"
            aria-labelledby={`section-${register}`}
            data-register={register}
        >
            <header className="fm-section__header">
                <h2 id={`section-${register}`} className="fm-section__title">
                    {REGISTER_LABEL[register]}
                </h2>
                <span className="fm-section__count">{entries.length} notas</span>
                {compareMode && (
                    <span className="fm-section__cmp-hint">
                        Clique em 2 notas para comparar
                    </span>
                )}
            </header>

            {/* Barra cromática */}
            <div className="fm-chromatic-bar" aria-hidden="true">
                {CHROMATIC_ROW.map(note => {
                    const isPresent = entries.some(e =>
                        e.pitch.enName.replace(/[0-9]/g, '') === note
                    );
                    return (
                        <span
                            key={note}
                            className={`fm-chromatic-cell${isPresent ? ' present' : ''}`}
                        >
                            {note}
                        </span>
                    );
                })}
            </div>

            {/* Grid cromático */}
            <div className="fm-grid" role="list">
                {entries.map((entry, idx) => {
                    const isFocused = !compareMode && entry.id === focusedId;
                    const isDimmed = sectionHasFocus && !isFocused;
                    // Compare slots
                    const cmpIdxA = compareIds.indexOf(entry.id);
                    const compareSlot: 'A' | 'B' | undefined =
                        cmpIdxA === 0 ? 'A' : cmpIdxA === 1 ? 'B' : undefined;
                    const prevEntry = idx > 0 ? entries[idx - 1] : null;

                    return (
                        <div key={entry.id} role="listitem">
                            <FingeringTile
                                entry={entry}
                                showAlternatives={showAlternatives}
                                isFocused={isFocused}
                                isDimmed={isDimmed}
                                onFocusNote={onFocusNote}
                                prevEntry={prevEntry}
                                compareMode={compareMode}
                                compareSlot={compareSlot}
                                onCompareSelect={onCompareSelect}
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
});

FingeringRegisterSection.displayName = 'FingeringRegisterSection';
export default FingeringRegisterSection;
