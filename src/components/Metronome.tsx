// ─────────────────────────────────────────────────────────────
// Metronome.tsx — Componente visual do metrônomo
// Usa o hook useMetronome para toda a lógica de áudio
// ─────────────────────────────────────────────────────────────
import React from 'react';
import { useMetronome } from '../hooks/useMetronome';
import type { TimeSig } from '../hooks/useMetronome';

const TIME_SIGS: TimeSig[] = [2, 3, 4];

const Metronome: React.FC = () => {
    const {
        bpm,
        timeSig,
        isPlaying,
        currentBeat,
        toggle,
        handleBpmChange,
        handleTimeSigChange,
    } = useMetronome();

    return (
        <div className="metronome-card">
            {/* BPM display */}
            <div className="bpm-display">{bpm}</div>
            <div className="bpm-label">BPM</div>

            {/* Slider de BPM */}
            <input
                id="bpm-slider"
                type="range"
                min={40}
                max={220}
                value={bpm}
                onChange={e => handleBpmChange(Number(e.target.value))}
                className="bpm-slider"
                aria-label="Ajustar BPM"
            />
            <div className="bpm-range">
                <span>♩= 40</span>
                <span>♩= 220</span>
            </div>

            {/* Seletor de compasso */}
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 8 }}>
                Compasso
            </div>
            <div className="time-sig-group">
                {TIME_SIGS.map(sig => (
                    <button
                        key={sig}
                        id={`time-sig-${sig}`}
                        className={`time-sig-btn${timeSig === sig ? ' active' : ''}`}
                        onClick={() => handleTimeSigChange(sig)}
                        aria-pressed={timeSig === sig}
                        aria-label={`Compasso ${sig}/4`}
                    >
                        {sig}/4
                    </button>
                ))}
            </div>

            {/* Indicadores visuais dos tempos */}
            <div className="beat-dots" aria-live="polite" aria-label={`Tempo ${currentBeat + 1} de ${timeSig}`}>
                {Array.from({ length: timeSig }, (_, i) => (
                    <div
                        key={i}
                        className={`beat-dot${i === 0 ? ' accent' : ''}${currentBeat === i ? ' active' : ''}`}
                        aria-current={currentBeat === i}
                    />
                ))}
            </div>

            {/* Botão play/stop */}
            <button
                id="metronome-toggle-btn"
                className={`play-btn ${isPlaying ? 'playing' : 'stopped'}`}
                onClick={toggle}
                aria-label={isPlaying ? 'Parar metrônomo' : 'Iniciar metrônomo'}
            >
                {isPlaying ? '⏹ PARAR' : '▶ INICIAR'}
            </button>

            {/* Dica de tempo verbal */}
            {bpm < 60 && (
                <div style={{ textAlign: 'center', marginTop: 12, fontSize: 11, color: 'var(--muted)', fontFamily: "'DM Mono', monospace" }}>
                    Largo — muito lento
                </div>
            )}
            {bpm >= 60 && bpm < 66 && (
                <div style={{ textAlign: 'center', marginTop: 12, fontSize: 11, color: 'var(--muted)', fontFamily: "'DM Mono', monospace" }}>
                    Larghetto
                </div>
            )}
            {bpm >= 66 && bpm < 76 && (
                <div style={{ textAlign: 'center', marginTop: 12, fontSize: 11, color: 'var(--muted)', fontFamily: "'DM Mono', monospace" }}>
                    Adágio
                </div>
            )}
            {bpm >= 76 && bpm < 108 && (
                <div style={{ textAlign: 'center', marginTop: 12, fontSize: 11, color: 'var(--muted)', fontFamily: "'DM Mono', monospace" }}>
                    Andante
                </div>
            )}
            {bpm >= 108 && bpm < 120 && (
                <div style={{ textAlign: 'center', marginTop: 12, fontSize: 11, color: 'var(--muted)', fontFamily: "'DM Mono', monospace" }}>
                    Moderato
                </div>
            )}
            {bpm >= 120 && bpm < 156 && (
                <div style={{ textAlign: 'center', marginTop: 12, fontSize: 11, color: 'var(--muted)', fontFamily: "'DM Mono', monospace" }}>
                    Allegro
                </div>
            )}
            {bpm >= 156 && bpm < 176 && (
                <div style={{ textAlign: 'center', marginTop: 12, fontSize: 11, color: 'var(--muted)', fontFamily: "'DM Mono', monospace" }}>
                    Vivace
                </div>
            )}
            {bpm >= 176 && (
                <div style={{ textAlign: 'center', marginTop: 12, fontSize: 11, color: 'var(--muted)', fontFamily: "'DM Mono', monospace" }}>
                    Presto — muito rápido
                </div>
            )}
        </div>
    );
};

export default Metronome;
