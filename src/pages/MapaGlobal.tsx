// src/pages/MapaGlobal.tsx
// ─────────────────────────────────────────────────────────────
// Página do Mapa Global de Digitações (/digitacoes/mapa)
// Rota paralela — não interfere com /digitacoes
// ─────────────────────────────────────────────────────────────
import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { Instrument, Register } from '../lib/fingering/types';
import { TENOR_DATASET, selectByRegister } from '../lib/fingering/dataset.tenor';
import FingeringMapToolbar from '../components/fingering/map/FingeringMapToolbar';
import FingeringRegisterSection from '../components/fingering/map/FingeringRegisterSection';
import '../styles/fingering-map.css';

const REGISTERS: Register[] = ['grave', 'medio', 'agudo'];

const MapaGlobal: React.FC = () => {
    const [instrument, setInstrument] = useState<Instrument>('tenor');
    const [showAltissimo, setShowAltissimo] = useState(false);
    const [showAlternatives, setShowAlternatives] = useState(false);
    const [isPrintMode, setIsPrintMode] = useState(false);

    // Dataset ativo (tenor por enquanto; alto fica pronto para plugar)
    const dataset = instrument === 'tenor' ? TENOR_DATASET : TENOR_DATASET;

    // Registros a mostrar
    const activeRegisters = useMemo<Register[]>(() =>
        showAltissimo ? [...REGISTERS, 'altissimo'] : REGISTERS,
        [showAltissimo]);

    // Notas por registro (memoizadas)
    const notesByRegister = useMemo(() =>
        Object.fromEntries(
            activeRegisters.map(reg => [reg, selectByRegister(dataset, reg)])
        ),
        [dataset, activeRegisters]);

    const handleExportPDF = useCallback(() => {
        setIsPrintMode(true);
        // Aguarda repaint → print → desativa modo
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                window.print();
                setIsPrintMode(false);
            });
        });
    }, []);

    return (
        <div className={`fm-page${isPrintMode ? ' fm-page--print' : ''}`}>

            {/* ── Cabeçalho de página ── */}
            <div className="fm-page-header no-print">
                <div>
                    <h1 className="fm-page-title">
                        Mapa Global de <em>Digitações</em>
                    </h1>
                    <p className="fm-page-sub">
                        Visão cromática completa — {instrument === 'tenor' ? 'Sax Tenor' : 'Sax Alto'}
                    </p>
                </div>
                {/* Link voltar para modo Estudo Individual */}
                <Link to="/digitacoes" className="fm-back-link">
                    ← Estudo Individual
                </Link>
            </div>

            {/* ── Header para PDF (visível só no print) ── */}
            <div className="fm-pdf-header pdf-only">
                <span className="fm-pdf-title">
                    Saxophone Fingering Chart — {instrument === 'tenor' ? 'Tenor' : 'Alto'}
                </span>
                <span className="fm-pdf-date">
                    {new Date().toLocaleDateString('pt-BR')}
                </span>
            </div>

            {/* ── Toolbar ── */}
            <FingeringMapToolbar
                instrument={instrument}
                showAltissimo={showAltissimo}
                showAlternatives={showAlternatives}
                onInstrument={setInstrument}
                onAltissimo={setShowAltissimo}
                onAlternatives={setShowAlternatives}
                onExportPDF={handleExportPDF}
            />

            {/* ── Legenda ── */}
            <div className="fm-legend no-print">
                <span className="fm-legend-item">
                    <span className="fm-legend-dot fm-legend-dot--pressed" />
                    Pressionar
                </span>
                <span className="fm-legend-item">
                    <span className="fm-legend-dot fm-legend-dot--open" />
                    Soltar
                </span>
                <span className="fm-legend-item">
                    <span className="fm-legend-dot fm-legend-dot--optional" />
                    Opcional
                </span>
            </div>

            {/* ── Seções por registro ── */}
            <div className="fm-sections">
                {activeRegisters.map(reg => (
                    <FingeringRegisterSection
                        key={reg}
                        register={reg}
                        entries={notesByRegister[reg] ?? []}
                        showAlternatives={showAlternatives}
                    />
                ))}
            </div>

            {/* ── Legenda PDF (só no print, última página) ── */}
            <div className="fm-pdf-legend pdf-only">
                <div className="fm-pdf-legend-title">Legenda das Chaves</div>
                <div className="fm-pdf-legend-grid">
                    {[
                        { id: 'oct', label: 'Chave de Oitava' },
                        { id: 'T', label: 'Polegar' },
                        { id: '1–3', label: 'Dedos 1-2-3 (mão esq)' },
                        { id: '4–6', label: 'Dedos 4-5-6 (mão dir)' },
                        { id: 'bis', label: 'Chave Bis' },
                        { id: 'pD/pC', label: 'Palm Keys D/C' },
                        { id: 'lBb/lAb', label: 'Pinky esq: Sib/Sol#' },
                        { id: 'rBb/rCs/rEb', label: 'Pinky dir: Sib/Dó#/Mi♭' },
                    ].map(k => (
                        <span key={k.id} className="fm-pdf-legend-item">
                            <strong>{k.id}</strong> — {k.label}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MapaGlobal;
