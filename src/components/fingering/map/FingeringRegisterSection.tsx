// src/components/fingering/map/FingeringRegisterSection.tsx — v3 (foco passado ao tile)
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
    /** ID da nota em foco (global, pode ser de outra seção) */
    focusedId: string | null;
    onFocusNote: (id: string) => void;
}

const FingeringRegisterSection: React.FC<FingeringRegisterSectionProps> = memo(({
    register, entries, showAlternatives, focusedId, onFocusNote,
}) => {
    if (entries.length === 0) return null;

    // Há foco ativo nesta seção?
    const sectionHasFocus = focusedId !== null && entries.some(e => e.id === focusedId);

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
            <div
                className="fm-grid"
                role="list"
                aria-label={`Notas do registro ${REGISTER_LABEL[register]}`}
            >
                {entries.map(entry => {
                    const isFocused = entry.id === focusedId;
                    // Dimmed só se houver foco nesta seção E não for a nota focada
                    const isDimmed = sectionHasFocus && !isFocused;
                    return (
                        <div key={entry.id} role="listitem">
                            <FingeringTile
                                entry={entry}
                                showAlternatives={showAlternatives}
                                isFocused={isFocused}
                                isDimmed={isDimmed}
                                onFocusNote={onFocusNote}
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
