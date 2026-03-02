// ─────────────────────────────────────────────────────────────
// useMetronome.ts — Hook do metrônomo com Tone.js
// Suporta BPM ajustável, compassos e acento no 1º tempo
// ─────────────────────────────────────────────────────────────
import { useRef, useState, useCallback, useEffect } from 'react';
import * as Tone from 'tone';

export type TimeSig = 2 | 3 | 4;

interface MetronomeState {
    isPlaying: boolean;
    currentBeat: number; // 0-indexed dentro do compasso
}

export function useMetronome() {
    const [bpm, setBpm] = useState(100);
    const [timeSig, setTimeSig] = useState<TimeSig>(4);
    const [state, setState] = useState<MetronomeState>({ isPlaying: false, currentBeat: -1 });

    // Referências para Tone.js (evita recriação a cada render)
    const sequenceRef = useRef<Tone.Sequence | null>(null);
    const accentSynthRef = useRef<Tone.MembraneSynth | null>(null);
    const clickSynthRef = useRef<Tone.MembraneSynth | null>(null);
    const beatRef = useRef(0);

    /** Inicializa os sintetizadores uma única vez */
    const initSynths = useCallback(() => {
        if (!accentSynthRef.current) {
            accentSynthRef.current = new Tone.MembraneSynth({
                pitchDecay: 0.05,
                octaves: 6,
                envelope: { attack: 0.001, decay: 0.15, sustain: 0, release: 0.1 },
            }).toDestination();
            accentSynthRef.current.volume.value = -6;
        }

        if (!clickSynthRef.current) {
            clickSynthRef.current = new Tone.MembraneSynth({
                pitchDecay: 0.02,
                octaves: 3,
                envelope: { attack: 0.001, decay: 0.08, sustain: 0, release: 0.05 },
            }).toDestination();
            clickSynthRef.current.volume.value = -12;
        }
    }, []);

    /** Inicia o metrônomo */
    const start = useCallback(async () => {
        await Tone.start(); // necessário em navegadores modernos (autoplay policy)
        initSynths();

        Tone.getTransport().bpm.value = bpm;
        beatRef.current = 0;

        // Cria sequência com Tone.Sequence
        const beats = Array.from({ length: timeSig }, (_, i) => i);

        sequenceRef.current = new Tone.Sequence(
            (time, beat) => {
                const isAccent = beat === 0;

                if (isAccent) {
                    accentSynthRef.current?.triggerAttackRelease('C2', '8n', time);
                } else {
                    clickSynthRef.current?.triggerAttackRelease('C3', '16n', time);
                }

                // Atualiza estado visual no próximo frame do React
                Tone.getDraw().schedule(() => {
                    setState({ isPlaying: true, currentBeat: beat as number });
                }, time);
            },
            beats,
            '4n' // cada step = 1 semínima
        );

        sequenceRef.current.start(0);
        Tone.getTransport().start();

        setState(prev => ({ ...prev, isPlaying: true }));
    }, [bpm, timeSig, initSynths]);

    /** Para o metrônomo */
    const stop = useCallback(() => {
        Tone.getTransport().stop();
        sequenceRef.current?.dispose();
        sequenceRef.current = null;

        setState({ isPlaying: false, currentBeat: -1 });
    }, []);

    /** Alterna play/pause */
    const toggle = useCallback(() => {
        if (state.isPlaying) {
            stop();
        } else {
            start();
        }
    }, [state.isPlaying, start, stop]);

    /** Atualiza BPM em tempo real */
    const handleBpmChange = useCallback((newBpm: number) => {
        setBpm(newBpm);
        if (state.isPlaying) {
            Tone.getTransport().bpm.value = newBpm;
        }
    }, [state.isPlaying]);

    /** Muda compasso — reinicia se estiver tocando */
    const handleTimeSigChange = useCallback((sig: TimeSig) => {
        setTimeSig(sig);
        if (state.isPlaying) {
            stop();
        }
    }, [state.isPlaying, stop]);

    // Limpa recursos ao desmontar o componente
    useEffect(() => {
        return () => {
            stop();
            accentSynthRef.current?.dispose();
            clickSynthRef.current?.dispose();
        };
    }, [stop]);

    return {
        bpm,
        timeSig,
        isPlaying: state.isPlaying,
        currentBeat: state.currentBeat,
        toggle,
        handleBpmChange,
        handleTimeSigChange,
    };
}
