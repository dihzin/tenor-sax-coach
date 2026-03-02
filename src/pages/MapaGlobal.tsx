// src/pages/MapaGlobal.tsx — v3 (compare + transition)
import React, { useState, useMemo, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { Instrument, Register, FingeringEntry } from '../lib/fingering/types';
import { TENOR_DATASET, selectByRegister } from '../lib/fingering/dataset.tenor';
import FingeringMapToolbar from '../components/fingering/map/FingeringMapToolbar';
import FingeringRegisterSection from '../components/fingering/map/FingeringRegisterSection';
import ComparePanel from '../components/fingering/map/ComparePanel';
import '../styles/fingering-map.css';

const REGISTERS: Register[] = ['grave', 'medio', 'agudo'];

const MapaGlobal: React.FC = () => {
    const [, setSearchParams] = useSearchParams();

    const [instrument, setInstrument] = useState<Instrument>('tenor');
    const [showAltissimo, setShowAltissimo] = useState(false);
    const [showAlternatives, setShowAlternatives] = useState(false);
    const [isPrintMode, setIsPrintMode] = useState(false);
    const [focusedId, setFocusedId] = useState<string | null>(
        () => new URLSearchParams(window.location.search).get('nota')
    );

    // ── Compare state ───────────────────────────────────────────
    const [compareMode, setCompareMode] = useState(false);
    const [compareIds, setCompareIds] = useState<string[]>([]);

    const dataset = instrument === 'tenor' ? TENOR_DATASET : TENOR_DATASET;
    const activeRegisters = useMemo<Register[]>(() =>
        showAltissimo ? [...REGISTERS, 'altissimo'] : REGISTERS,
        [showAltissimo]
    );
    const notesByRegister = useMemo(() =>
        Object.fromEntries(
            activeRegisters.map(reg => [reg, selectByRegister(dataset, reg)])
        ),
        [dataset, activeRegisters]
    );

    // Lookup plano de entries por id
    const allEntries = useMemo(() =>
        Object.values(notesByRegister).flat(),
        [notesByRegister]
    );

    // Par para comparação — painel aparece desde a 1ª seleção
    const compareEntryA = useMemo(() =>
        compareIds.length >= 1 ? allEntries.find(e => e.id === compareIds[0]) ?? null : null,
        [compareIds, allEntries]
    );
    const compareEntryB = useMemo(() =>
        compareIds.length >= 2 ? allEntries.find(e => e.id === compareIds[1]) ?? null : null,
        [compareIds, allEntries]
    );

    const handleCompareSelect = useCallback((entry: FingeringEntry) => {
        setCompareIds(prev => {
            if (prev.includes(entry.id)) return prev.filter(id => id !== entry.id);
            if (prev.length >= 2) return [prev[1], entry.id];
            return [...prev, entry.id];
        });
    }, []);

    const handleCompareMode = useCallback((v: boolean) => {
        setCompareMode(v);
        if (!v) setCompareIds([]);
    }, []);

    // ── Focus state ─────────────────────────────────────────────
    const handleFocusNote = useCallback((id: string) => {
        setFocusedId(prev => {
            const next = prev === id ? null : id;
            setSearchParams(next ? { nota: next } : {}, { replace: true });
            return next;
        });
    }, [setSearchParams]);

    const handleExportPDF = useCallback(() => {
        setIsPrintMode(true);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                window.print();
                setIsPrintMode(false);
            });
        });
    }, []);

    const pageClass = `fm-page${isPrintMode ? ' fm-page--print' : ''}`;

    return (
        <div className={pageClass}>

            {/* Cabeçalho */}
            <div className="fm-page-header no-print">
                <div>
                    <h1 className="fm-page-title">
                        Mapa Global de <em>Digitações</em>
                    </h1>
                    <p className="fm-page-sub">
                        Visão cromática completa — {instrument === 'tenor' ? 'Sax Tenor' : 'Sax Alto'}
                    </p>
                </div>
                <Link to="/digitacoes" className="fm-back-link">← Estudo Individual</Link>
            </div>

            {/* Header PDF */}
            <div className="fm-pdf-header pdf-only">
                <span className="fm-pdf-title">
                    Saxophone Fingering Chart — {instrument === 'tenor' ? 'Tenor' : 'Alto'}
                </span>
                <span className="fm-pdf-date">{new Date().toLocaleDateString('pt-BR')}</span>
            </div>

            {/* Toolbar */}
            <FingeringMapToolbar
                instrument={instrument}
                showAltissimo={showAltissimo}
                showAlternatives={showAlternatives}
                compareMode={compareMode}
                onInstrument={setInstrument}
                onAltissimo={setShowAltissimo}
                onAlternatives={setShowAlternatives}
                onCompareMode={handleCompareMode}
                onExportPDF={handleExportPDF}
            />

            {/* Compare Panel — aparece desde a 1ª seleção (espera 2ª nota) */}
            {compareEntryA && (
                <ComparePanel
                    entryA={compareEntryA}
                    entryB={compareEntryB}
                    onClose={() => { setCompareIds([]); setCompareMode(false); }}
                />
            )}

            {/* Legenda */}
            <div className="fm-legend no-print">
                <span className="fm-legend-item">
                    <span className="fm-legend-dot fm-legend-dot--pressed" />Pressionar
                </span>
                <span className="fm-legend-item">
                    <span className="fm-legend-dot fm-legend-dot--open" />Soltar
                </span>
                <span className="fm-legend-item">
                    <span className="fm-legend-dot fm-legend-dot--optional" />Opcional
                </span>
                {compareMode && (
                    <span className="fm-legend-item fm-legend-item--cmp">
                        <span className="fm-legend-dot fm-legend-dot--diff" />Tecla muda
                    </span>
                )}
            </div>

            {/* Seções */}
            <div className="fm-sections">
                {activeRegisters.map(reg => (
                    <FingeringRegisterSection
                        key={reg}
                        register={reg}
                        entries={notesByRegister[reg] ?? []}
                        showAlternatives={showAlternatives}
                        focusedId={focusedId}
                        onFocusNote={handleFocusNote}
                        compareMode={compareMode}
                        compareIds={compareIds}
                        onCompareSelect={handleCompareSelect}
                    />
                ))}
            </div>

            {/* Legenda PDF */}
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
