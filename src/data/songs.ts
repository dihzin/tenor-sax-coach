// ─────────────────────────────────────────────────────────────
// songs.ts — Lista de músicas do repertório
// ─────────────────────────────────────────────────────────────

export type Level = 'iniciante' | 'intermediario' | 'avancado';

export interface Song {
    id: string;
    title: string;
    artist: string;
    style: string;
    level: Level;
    bpm: number;
    key: string; // Tonalidade (escrita, em Bb)
    scoreUrl?: string;
    description?: string;
}

export const SONGS: Song[] = [
    {
        id: '1',
        title: 'Careless Whisper',
        artist: 'George Michael',
        style: 'Pop/Soul',
        level: 'iniciante',
        bpm: 60,
        key: 'Ré menor',
        description: 'Melodia icônica com notas longas. Perfeita para iniciantes trabalharem sonoridade e afinação.',
    },
    {
        id: '2',
        title: 'Just the Two of Us',
        artist: 'Grover Washington Jr.',
        style: 'Smooth Jazz',
        level: 'iniciante',
        bpm: 72,
        key: 'Fá maior',
        description: 'Linha de sax suave. Foca em notas do registro médio e articulação legato.',
    },
    {
        id: '3',
        title: "Baker Street",
        artist: 'Gerry Rafferty',
        style: 'Rock/Pop',
        level: 'iniciante',
        bpm: 108,
        key: 'Sol maior',
        description: 'O riff de sax mais famoso do rock. Ótimo para treinar o registro grave-médio.',
    },
    {
        id: '4',
        title: 'Fly Me to the Moon',
        artist: 'Frank Sinatra',
        style: 'Jazz Standard',
        level: 'intermediario',
        bpm: 130,
        key: 'Lá menor',
        description: 'Standard jazzístico com progressão de acordes ii-V-I. Bom para improvisar.',
    },
    {
        id: '5',
        title: 'Autumn Leaves',
        artist: 'Standard de Jazz',
        style: 'Jazz Standard',
        level: 'intermediario',
        bpm: 120,
        key: 'Sol menor',
        description: 'Clássico para estudar progressões de ii-V-I em maior e menor.',
    },
    {
        id: '6',
        title: 'So What',
        artist: 'Miles Davis',
        style: 'Modal Jazz',
        level: 'intermediario',
        bpm: 136,
        key: 'Ré Dórico',
        description: 'Introdução ao jazz modal. Escalas Dórica e Eólia.',
    },
    {
        id: '7',
        title: 'Giant Steps',
        artist: 'John Coltrane',
        style: 'Hard Bop',
        level: 'avancado',
        bpm: 286,
        key: 'Si maior',
        description: 'Ciclos de terças maiores — o maior desafio da harmonia do jazz. Para saxofonistas experientes.',
    },
    {
        id: '8',
        title: 'Confirmation',
        artist: 'Charlie Parker',
        style: 'Bebop',
        level: 'avancado',
        bpm: 220,
        key: 'Fá maior',
        description: 'Composição de Parker com mudanças rápidas de acorde. Técnica de bebop pura.',
    },
    {
        id: '9',
        title: 'The Girl from Ipanema',
        artist: 'Stan Getz / João Gilberto',
        style: 'Bossa Nova',
        level: 'iniciante',
        bpm: 130,
        key: 'Fá maior',
        description: 'A bossa nova mais conhecida do mundo. Melodia fluida e harmonia rica.',
    },
    {
        id: '10',
        title: 'Misty',
        artist: 'Erroll Garner',
        style: 'Balada Jazz',
        level: 'intermediario',
        bpm: 60,
        key: 'Mi♭ maior',
        description: 'Balada com melodia expressiva. Foco em vibrato e dinâmica.',
    },
    {
        id: '11',
        title: 'Anthropology',
        artist: 'Charlie Parker',
        style: 'Bebop',
        level: 'avancado',
        bpm: 240,
        key: 'Si♭ maior',
        description: 'Baseado nas mudanças de I Got Rhythm. Alto grau de velocidade e articulação.',
    },
    {
        id: '12',
        title: 'Take Five',
        artist: 'Dave Brubeck',
        style: 'Cool Jazz',
        level: 'intermediario',
        bpm: 174,
        key: 'Ré♭ maior',
        description: 'Compasso 5/4 incomum. Excelente parar explorar polirritmos e swing.',
    },
];
