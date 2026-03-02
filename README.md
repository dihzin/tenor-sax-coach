# Tenor Sax Coach 🎷

Aplicação web completa para aprendizado do Saxofone Tenor, com digitações interativas, metrônomo, repertório, teoria musical e sistema de progresso.

## Stack técnica

- **React 18** + **Vite** + **TypeScript**
- **Tailwind CSS** (utilitários complementares)
- **Tone.js** (metrônomo e playback de notas)
- **React Router v6** (navegação entre páginas)

## Instalação e execução

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

O app estará disponível em `http://localhost:5173`

## Páginas

| Rota | Descrição |
|------|-----------|
| `/` | Dashboard com stats, streak de dias e progresso |
| `/digitacoes` | Tabela interativa de digitações com SVG do saxofone |
| `/musicas` | Repertório com filtro por nível |
| `/teoria` | Módulos de teoria musical |
| `/pratica` | Metrônomo + exercícios guiados |

## Funcionalidades

### Diagrama de Digitações
- SVG animado do Sax Tenor visto de frente
- 33 notas (12 graves + 14 médias + 7 agudas)
- Chaves iluminadas em dourado ao selecionar nota
- Playback do som da nota via Tone.js (sintetizador)
- Marcação de notas como "praticadas" (salvo em localStorage)

### Metrônomo
- BPM ajustável de 40 a 220
- Compassos 2/4, 3/4 e 4/4
- Acento visual e sonoro no primeiro tempo
- Indicadores de andamento (Largo, Adágio, Allegro...)

### Sistema de Progresso
- Armazenamento local (localStorage)
- Contagem de streak de dias consecutivos
- Progresso por registro (Grave / Médio / Agudo)
- Nível do aluno calculado automaticamente

### Repertório
- 12 músicas cobrindo todos os estilos: jazz, bossa, pop, bebop
- Filtro por nível (Iniciante / Intermediário / Avançado)
- BPM sugerido e tonalidade para cada música

### Teoria Musical
- 9 módulos de básico a avançado
- Expandir para ver tópicos detalhados
- Barra de progresso individual por módulo

## Estrutura de arquivos

```
src/
  components/
    Sidebar.tsx        ← Navegação lateral fixa
    SaxDiagram.tsx     ← SVG do saxofone tenor
    Metronome.tsx      ← Componente visual do metrônomo
    SongCard.tsx       ← Card de música
  pages/
    Dashboard.tsx      ← Visão geral
    Digitacoes.tsx     ← Tabela de digitações
    Musicas.tsx        ← Repertório
    Teoria.tsx         ← Módulos teóricos
    Pratica.tsx        ← Metrônomo + exercícios
  hooks/
    useMetronome.ts    ← Lógica do metrônomo (Tone.js)
    useProgress.ts     ← Rastreamento de progresso
  data/
    notes.ts           ← 33 notas com frequências
    songs.ts           ← 12 músicas do repertório
    theory.ts          ← 9 módulos de teoria
  styles/
    globals.css        ← Design system completo
  App.tsx
  main.tsx
```

## Design System

- **Tema:** Escuro com acentos dourados
- **Cores:** `--gold: #D4891A`, `--dark: #0D0B07`, `--cream: #F0E8D0`
- **Fontes:** Playfair Display (títulos), DM Mono (labels), DM Sans (corpo)
- **Responsivo:** Sidebar colapsa em mobile com botão hamburguer

## Notas de transposição

O Sax Tenor é um instrumento em **Si♭** — quando você toca um Dó escrito, soa um Si♭ no piano (uma 2ª maior abaixo). As frequências no arquivo `notes.ts` já refletem as alturas reais que saem do instrumento.

---

Desenvolvido com ❤️ para saxofonistas em formação.
