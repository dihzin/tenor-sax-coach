// src/components/fingering/map/FingeringRegisterSection.tsx
// ─────────────────────────────────────────────────────────────
// Seção de um registro (Grave / Médio / Agudo / Altíssimo)
// Grid cromático: scroll horizontal em mobile, fixo em desktop
// ─────────────────────────────────────────────────────────────
import React, { memo } from 'react';
import type { FingeringEntry, Register } from '../../../lib/fingering/types';
import FingeringTile from './FingeringTile';

const REGISTER_LABEL: Record<Register, string> = {
    grave: 'Grave',
    medio: 'Médio',
    agudo: 'Agudo',
    altissimo: 'Altíssimo',
};

const REGISTER_RANGE: Record<Register, string> = {
    grave: 'Sib · Si · Dó · Dó# · Ré · Ré# · Mi · Fá · Fá# · Sol · Sol# · Lá',
    medio: 'Sib · Si · Dó · Dó# · Ré · Ré# · Mi · Fá · Fá# · Sol · Sol# · Lá · Sib · Si',
    agudo: 'Dó · Dó# · Ré · Ré# · Mi · Fá · Fá# · Sol',
    altissimo: 'Sol# · Lá · Sib · Si · Dó · ...',
};

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
            {/* Header da seção */}
            <header className="fm-section__header">
                <h2 id={`section-${register}`} className="fm-section__title">
                    {REGISTER_LABEL[register]}
                </h2>
                <p className="fm-section__range">{REGISTER_RANGE[register]}</p>
            </header>

            {/* Grid cromático — scroll horizontal em mobile */}
            <div className="fm-grid" role="list" aria-label={`Notas do registro ${REGISTER_LABEL[register]}`}>
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
