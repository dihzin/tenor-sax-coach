// src/components/fingering/map/FingeringMapToolbar.tsx — v2
import React from 'react';
import type { Instrument } from '../../../lib/fingering/types';

interface FingeringMapToolbarProps {
    instrument: Instrument;
    showAltissimo: boolean;
    showAlternatives: boolean;
    compareMode: boolean;
    onInstrument: (i: Instrument) => void;
    onAltissimo: (v: boolean) => void;
    onAlternatives: (v: boolean) => void;
    onCompareMode: (v: boolean) => void;
    onExportPDF: () => void;
}

const FingeringMapToolbar: React.FC<FingeringMapToolbarProps> = ({
    instrument, showAltissimo, showAlternatives, compareMode,
    onInstrument, onAltissimo, onAlternatives, onCompareMode, onExportPDF,
}) => (
    <div className="fm-toolbar no-print" role="toolbar" aria-label="Controles do mapa">

        {/* Instrumento */}
        <div className="fm-toolbar__group" role="group" aria-label="Instrumento">
            <span className="fm-toolbar__label">Instrumento</span>
            <div className="fm-toolbar__toggle">
                {(['tenor', 'alto'] as Instrument[]).map(inst => (
                    <button
                        key={inst}
                        id={`instrument-${inst}`}
                        className={`fm-toggle-btn${instrument === inst ? ' active' : ''}`}
                        onClick={() => onInstrument(inst)}
                        aria-pressed={instrument === inst}
                    >
                        {inst === 'tenor' ? 'Tenor' : 'Alto'}
                    </button>
                ))}
            </div>
        </div>

        {/* Altíssimo */}
        <div className="fm-toolbar__group">
            <label className="fm-toolbar__check" htmlFor="toggle-altissimo">
                <input
                    id="toggle-altissimo" type="checkbox"
                    checked={showAltissimo}
                    onChange={e => onAltissimo(e.target.checked)}
                />
                Altíssimo
            </label>
        </div>

        {/* Alternativas */}
        <div className="fm-toolbar__group">
            <label className="fm-toolbar__check" htmlFor="toggle-alts">
                <input
                    id="toggle-alts" type="checkbox"
                    checked={showAlternatives}
                    onChange={e => onAlternatives(e.target.checked)}
                />
                Mostrar alternativas
            </label>
        </div>

        {/* Comparar */}
        <div className="fm-toolbar__group">
            <button
                id="compare-mode-btn"
                className={`fm-toggle-btn fm-toolbar__compare${compareMode ? ' active' : ''}`}
                onClick={() => onCompareMode(!compareMode)}
                aria-pressed={compareMode}
                title="Selecione 2 notas para comparar digitações"
            >
                {compareMode ? '⊠ Comparando' : '⊞ Comparar'}
            </button>
        </div>

        {/* Exportar */}
        <button
            id="export-pdf-btn"
            className="fm-toolbar__export"
            onClick={onExportPDF}
            aria-label="Exportar mapa como PDF"
        >
            ↓ Exportar PDF
        </button>
    </div>
);

export default FingeringMapToolbar;
