// ─────────────────────────────────────────────────────────────
// Musicas.tsx — Repertório de músicas com filtro por nível
// ─────────────────────────────────────────────────────────────
import React, { useState } from 'react';
import SongCard from '../components/SongCard';
import { SONGS } from '../data/songs';
import type { Level } from '../data/songs';

type Filter = 'todos' | Level;

const FILTERS: { value: Filter; label: string }[] = [
    { value: 'todos', label: 'Todos' },
    { value: 'iniciante', label: 'Iniciante' },
    { value: 'intermediario', label: 'Intermediário' },
    { value: 'avancado', label: 'Avançado' },
];

const Musicas: React.FC = () => {
    const [filter, setFilter] = useState<Filter>('todos');

    const songs = filter === 'todos'
        ? SONGS
        : SONGS.filter(s => s.level === filter);

    const counts = {
        iniciante: SONGS.filter(s => s.level === 'iniciante').length,
        intermediario: SONGS.filter(s => s.level === 'intermediario').length,
        avancado: SONGS.filter(s => s.level === 'avancado').length,
    };

    return (
        <div>
            <h1 className="pg-title">Repertório de <em>Músicas</em></h1>
            <p className="pg-sub">{SONGS.length} músicas em níveis variados — pop, jazz, bossa nova e além</p>

            {/* Estatísticas rápidas */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
                {[
                    { label: 'Iniciante', count: counts.iniciante, color: '#6AACF5' },
                    { label: 'Intermediário', count: counts.intermediario, color: '#E8B84B' },
                    { label: 'Avançado', count: counts.avancado, color: '#E06B6B' },
                ].map(s => (
                    <div key={s.label} style={{
                        background: 'var(--dark2)',
                        border: `1px solid ${s.color}22`,
                        borderRadius: 10,
                        padding: '12px 18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                    }}>
                        <div style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 26,
                            fontWeight: 900,
                            color: s.color,
                            lineHeight: 1,
                        }}>{s.count}</div>
                        <div style={{ fontSize: 12, color: 'var(--muted)' }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Filtros */}
            <div className="songs-filters" role="group" aria-label="Filtrar por nível">
                {FILTERS.map(f => (
                    <button
                        key={f.value}
                        id={`filter-${f.value}`}
                        className={`filter-btn${filter === f.value ? ' active' : ''}`}
                        onClick={() => setFilter(f.value)}
                        aria-pressed={filter === f.value}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Grid de músicas */}
            {songs.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '40px 0' }}>
                    Nenhuma música encontrada para este nível.
                </div>
            ) : (
                <div className="songs-grid">
                    {songs.map(song => (
                        <SongCard key={song.id} song={song} />
                    ))}
                </div>
            )}

            {/* Nota sobre play-alongs */}
            <div className="tip-card" style={{ marginTop: 24 }}>
                <div className="tip-title">🎧 Play-alongs</div>
                <div className="tip-text">
                    Para cada música, recomendamos o iReal Pro ou o Band-in-a-Box como play-along.
                    Estude a melodia na velocidade 50% antes de tocar no tempo original.
                </div>
            </div>
        </div>
    );
};

export default Musicas;
