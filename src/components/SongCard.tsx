// ─────────────────────────────────────────────────────────────
// SongCard.tsx — Card de música do repertório
// ─────────────────────────────────────────────────────────────
import React from 'react';
import type { Song } from '../data/songs';

interface SongCardProps {
    song: Song;
}

const LEVEL_LABEL: Record<string, string> = {
    iniciante: 'Iniciante',
    intermediario: 'Intermediário',
    avancado: 'Avançado',
};

const SongCard: React.FC<SongCardProps> = ({ song }) => {
    return (
        <div className="song-card" id={`song-${song.id}`}>
            <div className="song-title">{song.title}</div>
            <div className="song-artist">{song.artist}</div>

            {/* Tags */}
            <div className="song-tags">
                <span className={`song-tag tag-${song.level}`}>
                    {LEVEL_LABEL[song.level]}
                </span>
                <span className="song-tag tag-style">{song.style}</span>
                <span className="song-tag tag-bpm">♩ {song.bpm} BPM</span>
                <span className="song-tag tag-bpm">🎵 {song.key}</span>
            </div>

            {/* Descrição */}
            {song.description && (
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, marginTop: 8 }}>
                    {song.description}
                </div>
            )}

            {/* Link para partitura */}
            {song.scoreUrl && (
                <a
                    href={song.scoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="song-link"
                    id={`score-link-${song.id}`}
                >
                    📄 Ver partitura ↗
                </a>
            )}
        </div>
    );
};

export default SongCard;
