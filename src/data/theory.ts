// ─────────────────────────────────────────────────────────────
// theory.ts — Módulos de teoria musical
// ─────────────────────────────────────────────────────────────

export type Difficulty = 'basico' | 'intermediario' | 'avancado';

export interface TheoryModule {
    id: string;
    icon: string;
    title: string;
    description: string;
    difficulty: Difficulty;
    topics: string[];
    progress: number; // 0–100
}

export const THEORY_MODULES: TheoryModule[] = [
    {
        id: 'notas-basicas',
        icon: '🎵',
        title: 'Notas Musicais',
        description: 'Aprenda os nomes das notas, a pauta musical e como ler música no pentagrama.',
        difficulty: 'basico',
        topics: ['Clave de sol', 'Notas na pauta', 'Notas adicionais', 'Acidentes (♯, ♭, ♮)'],
        progress: 80,
    },
    {
        id: 'ritmo-metro',
        icon: '⏱',
        title: 'Ritmo e Métrica',
        description: 'Valores de figuras musicais, pausas, compassos e pulsação rítmica.',
        difficulty: 'basico',
        topics: ['Semibreve, mínima, semínima', 'Colcheia e semicolcheia', 'Pausas', 'Compassos 2/4, 3/4, 4/4'],
        progress: 60,
    },
    {
        id: 'escalas-maiores',
        icon: '🎼',
        title: 'Escalas Maiores',
        description: 'Construção das 12 escalas maiores com a fórmula T-T-ST-T-T-T-ST. Ciclo das quintas.',
        difficulty: 'basico',
        topics: ['Fórmula de tons', 'Ciclo das quintas', 'Escalas com ♯', 'Escalas com ♭'],
        progress: 45,
    },
    {
        id: 'escalas-menores',
        icon: '🎶',
        title: 'Escalas Menores',
        description: 'Escala natural, harmônica e melódica. Relativas maiores e menores.',
        difficulty: 'intermediario',
        topics: ['Menor natural', 'Menor harmônica', 'Menor melódica', 'Relativas'],
        progress: 20,
    },
    {
        id: 'acordes',
        icon: '🎹',
        title: 'Acordes e Arpejos',
        description: 'Tríades maiores, menores, diminutas e aumentadas. Acordes de 7ª.',
        difficulty: 'intermediario',
        topics: ['Tríades', 'Inversões', 'Acordes de 7ª', 'Arpejos no saxofone'],
        progress: 10,
    },
    {
        id: 'modos',
        icon: '🌀',
        title: 'Modos Gregos',
        description: 'Dórico, Frígio, Lídio, Mixolídio, Eólio, Lócrio e suas aplicações no jazz.',
        difficulty: 'intermediario',
        topics: ['Jônio (maior)', 'Dórico', 'Frígio', 'Lídio', 'Mixolídio', 'Eólio', 'Lócrio'],
        progress: 0,
    },
    {
        id: 'progressoes',
        icon: '🔄',
        title: 'Progressões Harmônicas',
        description: 'ii-V-I, ciclos de quartas, blues form e turnarounds. Base do jazz.',
        difficulty: 'avancado',
        topics: ['ii-V-I maior', 'ii-V-i menor', 'Blues de 12 compassos', 'Turnarounds'],
        progress: 0,
    },
    {
        id: 'improvisacao',
        icon: '🎤',
        title: 'Improvisação',
        description: 'Como escolher escalas sobre acordes, fraseados e desenvolvimento de vocabulário jazzístico.',
        difficulty: 'avancado',
        topics: ['Escolha de escalas', 'Licks e frases', 'Call and response', 'Motivos e desenvolvimento'],
        progress: 0,
    },
    {
        id: 'transpositores',
        icon: '🎷',
        title: 'Transposição — Sax Bb',
        description: 'O Sax Tenor é um instrumento transpositor em Bb. Entenda como isso funciona na prática.',
        difficulty: 'basico',
        topics: ['Instrumentos em Bb', 'Ler em Dó (C) vs. Bb', 'Transposição prática', 'Leitura de partituras'],
        progress: 35,
    },
];
