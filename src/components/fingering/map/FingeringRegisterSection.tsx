// src/components/fingering/map/FingeringRegisterSection.tsx — v2
// Grid cromático FIXO com barra de referência cromática acima
import React, { memo } from 'react';
import type { FingeringEntry, Register } from '../../../lib/fingering/types';
import FingeringTile from './FingeringTile';

const REGISTER_LABEL: Record<Register, string> = {
    grave: 'GRAVE',
    medio: 'MÉDIO',
    agudo: 'AGUDO',
    altissimo: 'ALTÍSSIMO',
};

// Ordem cromática fixa (C → B) para o header de referência
const CHROMATIC_ROW = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

interface FingeringRegisterSectionProps {
    register: Register;
    entries: FingeringEntry[];
    showAlternatives: boolean;
}

const FingeringRegisterSection: React.FC<FingeringRegisterSectionProps> = memo(({
    register, entries, showAlternatives,
}) => {
    if (entries.length === 0) return null;

    return (
        <section
            className="fm-section"
            aria-labelledby={`section-${register}`}
            data-register={register}
        >
            {/* Header técnico da seção */}
            <header className="fm-section__header">
                <h2 id={`section-${register}`} className="fm-section__title">
                    {REGISTER_LABEL[register]}
                </h2>
                <span className="fm-section__count">{entries.length} notas</span>
            </header>

            {/* Barra de referência cromática */}
            <div className="fm-chromatic-bar" aria-hidden="true">
                {CHROMATIC_ROW.map(note => {
                    const isPresent = entries.some(e =>
                        e.pitch.enName.replace(/[0-9]/g, '') === note ||
                        e.pitch.enName === note
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
                {entries.map(entry => (
                    <div key={entry.id} role="listitem">
                        <FingeringTile entry={entry} showAlternatives={showAlternatives} />
                    </div>
                ))}
            </div>
        </section>
    );
});

FingeringRegisterSection.displayName = 'FingeringRegisterSection';
export default FingeringRegisterSection;
