import React, { useState, useMemo, useEffect } from 'react';
import {
  Volume2,
  Eye,
  EyeOff,
  Search,
  BookOpen,
  HelpCircle,
  Layers,
  RotateCcw,
  Check,
  ChevronDown,
  ChevronUp,
  Columns,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Shuffle,
  BookmarkCheck,
  CheckCircle2,
} from 'lucide-react';
import {
  MAIN_TITLE,
  FULL_TEXT_SENTENCES,
  SECTION_1,
  SECTION_2,
  SECTION_3,
  SECTION_4,
  SECTION_5,
  QUESTIONS_AND_ANSWERS,
  SHORT_TEXT_PARAGRAPHS,
  ALL_FLASHCARD_ITEMS,
  BilingualItem,
  QuestionItem,
} from './data.ts';

type ViewMode = 'lesson' | 'questions' | 'flashcards' | 'parallel';

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewMode>('lesson');
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [revealedQEs, setRevealedQEs] = useState<Set<number>>(new Set());
  const [revealedAnsEs, setRevealedAnsEs] = useState<Set<number>>(new Set());
  const [revealedAnsArm, setRevealedAnsArm] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  
  // Learned status for questions
  const [masteredQuestions, setMasteredQuestions] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem('mastered_questions_v1');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Flashcards state
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('mastered_cards_v1');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [flashcardDeck, setFlashcardDeck] = useState(ALL_FLASHCARD_ITEMS);

  // Sync mastered items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mastered_questions_v1', JSON.stringify(Array.from(masteredQuestions)));
    } catch (e) {
      console.warn(e);
    }
  }, [masteredQuestions]);

  useEffect(() => {
    try {
      localStorage.setItem('mastered_cards_v1', JSON.stringify(Array.from(masteredCards)));
    } catch (e) {
      console.warn(e);
    }
  }, [masteredCards]);

  // Pronunciation handler
  const speakSpanish = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_—#]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  // Toggle reveal for any generic bilingual item ID
  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Reveal all or hide all
  const revealAllTranslations = () => {
    const all = new Set<string>();
    FULL_TEXT_SENTENCES.forEach((i) => all.add(i.id));
    all.add(SECTION_1.definition.id);
    SECTION_1.means.forEach((i) => all.add(i.id));
    all.add(SECTION_2.definition.id);
    all.add('oral-def');
    SECTION_3.oral.examples.forEach((i) => all.add(i.id));
    all.add('written-def');
    SECTION_3.written.examples.forEach((i) => all.add(i.id));
    SECTION_4.properties.forEach((p) => {
      all.add(p.id);
      all.add(`${p.id}-ex`);
      p.connectorsList?.forEach((c) => all.add(c.id));
    });
    SECTION_5.types.forEach((t) => all.add(t.id));
    SHORT_TEXT_PARAGRAPHS.forEach((p) => all.add(p.id));
    setRevealedIds(all);

    const allQNums = new Set(QUESTIONS_AND_ANSWERS.map((q) => q.id));
    setRevealedQEs(allQNums);
    setRevealedAnsEs(allQNums);
    setRevealedAnsArm(allQNums);
  };

  const hideAllTranslations = () => {
    setRevealedIds(new Set());
    setRevealedQEs(new Set());
    setRevealedAnsEs(new Set());
    setRevealedAnsArm(new Set());
  };

  const isAllRevealed = revealedIds.size > 20;

  // Toggle mastered question
  const toggleMasteredQuestion = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setMasteredQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Flashcards navigation
  const nextCard = () => {
    setCardFlipped(false);
    setCurrentCardIdx((prev) => (prev + 1) % flashcardDeck.length);
  };

  const prevCard = () => {
    setCardFlipped(false);
    setCurrentCardIdx((prev) => (prev - 1 + flashcardDeck.length) % flashcardDeck.length);
  };

  const shuffleDeck = () => {
    setCardFlipped(false);
    setCurrentCardIdx(0);
    setFlashcardDeck((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  const toggleMasteredCard = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setMasteredCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Search filtering
  const filteredQuestions = useMemo(() => {
    if (!searchQuery.trim()) return QUESTIONS_AND_ANSWERS;
    const q = searchQuery.toLowerCase();
    return QUESTIONS_AND_ANSWERS.filter(
      (item) =>
        item.questionEs.toLowerCase().includes(q) ||
        item.questionArm.toLowerCase().includes(q) ||
        item.answerEs.toLowerCase().includes(q) ||
        item.answerArm.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const currentFlashcard = flashcardDeck[currentCardIdx];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased flex flex-col">
      {/* Top Header Bar - Strict 3-zone standard */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Brand title wordmark */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-slate-900 tracking-tight flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-amber-500 text-white font-black text-sm flex items-center justify-center shadow-xs">
                ES
              </span>
              <span>Tema 1: La Comunicación</span>
            </span>
          </div>

          {/* Zone 2: Navigation views */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('lesson')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'lesson'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Ամբողջական դաս</span>
            </button>

            <button
              onClick={() => setActiveTab('questions')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'questions'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>16 Հարց ու պատասխան</span>
              {masteredQuestions.size > 0 && (
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-mono">
                  {masteredQuestions.size}/16
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('flashcards')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'flashcards'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Քարտեր (36)</span>
            </button>

            <button
              onClick={() => setActiveTab('parallel')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'parallel'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Զուգահեռ ընթերցում</span>
            </button>
          </nav>

          {/* Zone 3: Global Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={isAllRevealed ? hideAllTranslations : revealAllTranslations}
              className="px-3 py-1.5 text-xs font-medium border border-slate-300 rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-colors flex items-center gap-1.5 text-slate-700 whitespace-nowrap"
              title={isAllRevealed ? 'Թաքցնել թարգմանությունները' : 'Ցուցադրել բոլոր թարգմանությունները'}
            >
              {isAllRevealed ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden sm:inline">Թաքցնել թարգմանությունը</span>
                  <span className="sm:hidden">Թաքցնել</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden sm:inline">Բացել բոլորը</span>
                  <span className="sm:hidden">Բացել</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile secondary tab selector */}
        <div className="md:hidden flex items-center overflow-x-auto px-4 py-2 border-t border-slate-200 bg-slate-50 gap-1 text-xs">
          <button
            onClick={() => setActiveTab('lesson')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'lesson' ? 'bg-slate-900 text-white' : 'text-slate-700 bg-white border border-slate-200'
            }`}
          >
            Դաս
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'questions' ? 'bg-slate-900 text-white' : 'text-slate-700 bg-white border border-slate-200'
            }`}
          >
            16 Հարց ({masteredQuestions.size}/16)
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'flashcards' ? 'bg-slate-900 text-white' : 'text-slate-700 bg-white border border-slate-200'
            }`}
          >
            Քարտեր
          </button>
          <button
            onClick={() => setActiveTab('parallel')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap font-medium ${
              activeTab === 'parallel' ? 'bg-slate-900 text-white' : 'text-slate-700 bg-white border border-slate-200'
            }`}
          >
            Զուգահեռ տեքստ
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* Banner with Instructions */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-800 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Ինտերակտիվ ուսումնական ռեժիմ</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {MAIN_TITLE.es}
            </h1>
            <p className="text-sm sm:text-base font-armenian text-slate-700 font-medium">
              {MAIN_TITLE.arm}
            </p>
            <p className="text-xs text-slate-600 pt-1">
              💡 <span className="font-semibold text-slate-800">Ինչպես օգտվել՝</span> Սեղմեք ցանկացած իսպաներեն
              տեքստի, նախադասության կամ օրինակի վրա, որպեսզի բացվի հայերեն թարգմանությունը։ Կարող եք նաև լսել արտասանությունը 🔊 կոճակով։
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <button
              onClick={() => {
                if (isAllRevealed) hideAllTranslations();
                else revealAllTranslations();
              }}
              className="text-xs font-medium px-3.5 py-2 rounded-xl bg-amber-600 text-white hover:bg-amber-700 transition shadow-xs flex items-center gap-1.5"
            >
              {isAllRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{isAllRevealed ? 'Ծածկել հայերենը' : 'Բացել բոլորը'}</span>
            </button>
          </div>
        </div>

        {/* ===================== TAB 1: COMPLETE LESSON ===================== */}
        {activeTab === 'lesson' && (
          <div className="space-y-10">
            {/* Search filter for lesson */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Որոնել բառ կամ արտահայտություն (իսպաներեն կամ հայերեն)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-1"
                >
                  Մաքրել
                </button>
              )}
            </div>

            {/* Section 0: Texto Completo / Լիարժեք տեքստ */}
            <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs">
              <div className="border-b border-slate-100 pb-4 mb-6 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                    Ընթերցանություն
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">Texto completo</h2>
                  <p className="text-sm font-armenian text-slate-600">Լիարժեք տեքստ</p>
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <span>13 նախադասություն</span>
                </div>
              </div>

              <div className="space-y-3">
                {FULL_TEXT_SENTENCES.filter(
                  (s) =>
                    !searchQuery ||
                    s.es.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    s.arm.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((item, idx) => {
                  const isRevealed = revealedIds.has(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleReveal(item.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && toggleReveal(item.id)}
                      className={`group p-4 rounded-xl border transition-all cursor-pointer select-none ${
                        isRevealed
                          ? 'bg-amber-50/40 border-amber-200/90 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-slate-50/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1">
                          <span className="text-xs font-mono text-slate-400 mt-1 select-none tabular-nums">
                            {(idx + 1).toString().padStart(2, '0')}
                          </span>
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-base font-semibold text-slate-900 group-hover:text-amber-950 transition">
                                🇪🇸 {item.es}
                              </span>
                              <button
                                onClick={(e) => speakSpanish(item.es, e)}
                                title="Լսել իսպաներեն արտասանությունը"
                                className="p-1 rounded-md text-slate-400 hover:text-amber-600 hover:bg-amber-100 transition shrink-0"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Armenian Translation revealed on click */}
                            {isRevealed ? (
                              <div className="pt-2 border-t border-amber-200/60 text-amber-950 font-armenian text-sm font-medium animate-fadeIn">
                                🇦🇲 {item.arm}
                              </div>
                            ) : (
                              <div className="text-xs text-slate-400 flex items-center gap-1 group-hover:text-amber-600 pt-0.5">
                                <Eye className="w-3.5 h-3.5" />
                                <span>Սեղմեք՝ հայերեն թարգմանությունը տեսնելու համար</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="shrink-0 mt-1 text-slate-400 group-hover:text-amber-600">
                          {isRevealed ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section 1: ¿Qué es la comunicación? */}
            <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs">
              <div className="border-b border-slate-100 pb-4 mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-mono">
                  Բաժին 01
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  1. {SECTION_1.titleEs}
                </h2>
                <p className="text-sm font-armenian text-slate-600">
                  1. {SECTION_1.titleArm}
                </p>
              </div>

              {/* Definition card */}
              <div
                onClick={() => toggleReveal(SECTION_1.definition.id)}
                className={`p-4 rounded-xl border mb-6 cursor-pointer transition select-none ${
                  revealedIds.has(SECTION_1.definition.id)
                    ? 'bg-amber-50/50 border-amber-200'
                    : 'bg-slate-50 border-slate-200 hover:border-amber-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 text-base">
                        🇪🇸 {SECTION_1.definition.es}
                      </span>
                      <button
                        onClick={(e) => speakSpanish(SECTION_1.definition.es, e)}
                        className="p-1 text-slate-400 hover:text-amber-600 hover:bg-amber-100 rounded"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    {revealedIds.has(SECTION_1.definition.id) ? (
                      <div className="text-sm font-armenian text-amber-950 font-medium border-t border-amber-200/60 pt-2">
                        🇦🇲 {SECTION_1.definition.arm}
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400 flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Սեղմեք թարգմանության համար</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Means of communication */}
              <div>
                <p className="text-sm font-medium text-slate-700 mb-3 flex items-center justify-between">
                  <span>
                    🇪🇸 <span className="font-semibold">{SECTION_1.mediaPrompt.es}</span>{' '}
                    <span className="text-xs font-armenian text-slate-500">
                      ({SECTION_1.mediaPrompt.arm})
                    </span>
                  </span>
                  <span className="text-xs text-slate-400">Սեղմեք յուրաքանչյուր բառի վրա</span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {SECTION_1.means.map((item) => {
                    const isRev = revealedIds.has(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleReveal(item.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer select-none transition ${
                          isRev
                            ? 'bg-amber-50/60 border-amber-200 shadow-xs'
                            : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-slate-900 text-sm">
                            🇪🇸 {item.es}
                          </span>
                          <button
                            onClick={(e) => speakSpanish(item.es, e)}
                            className="p-1 text-slate-400 hover:text-amber-600"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {isRev ? (
                          <div className="mt-2 text-sm font-armenian text-amber-900 font-semibold border-t border-amber-200/50 pt-1.5">
                            🇦🇲 {item.arm}
                          </div>
                        ) : (
                          <div className="text-[11px] text-slate-400 mt-1">Սեղմեք թարգմանության համար</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Section 2: ¿Qué es un texto? */}
            <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs">
              <div className="border-b border-slate-100 pb-4 mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-mono">
                  Բաժին 02
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  2. {SECTION_2.titleEs}
                </h2>
                <p className="text-sm font-armenian text-slate-600">
                  2. {SECTION_2.titleArm}
                </p>
              </div>

              <div
                onClick={() => toggleReveal(SECTION_2.definition.id)}
                className={`p-4 rounded-xl border cursor-pointer select-none transition ${
                  revealedIds.has(SECTION_2.definition.id)
                    ? 'bg-amber-50/50 border-amber-200 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:border-amber-300'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 text-base">
                      🇪🇸 {SECTION_2.definition.es}
                    </span>
                    <button
                      onClick={(e) => speakSpanish(SECTION_2.definition.es, e)}
                      className="p-1 text-slate-400 hover:text-amber-600 hover:bg-amber-100 rounded"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  {revealedIds.has(SECTION_2.definition.id) ? (
                    <div className="text-sm font-armenian text-amber-950 font-medium border-t border-amber-200/60 pt-2">
                      🇦🇲 {SECTION_2.definition.arm}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Սեղմեք թարգմանության համար</span>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Section 3: Texto oral y texto escrito */}
            <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-mono">
                  Բաժին 03
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  3. {SECTION_3.titleEs}
                </h2>
                <p className="text-sm font-armenian text-slate-600">
                  3. {SECTION_3.titleArm}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 3.1 Texto Oral */}
                <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center justify-between">
                      <span>## {SECTION_3.oral.titleEs}</span>
                      <span className="text-xs font-normal text-slate-400 font-mono">oral</span>
                    </h3>
                    <p className="text-sm font-armenian text-slate-600 font-medium">
                      ## {SECTION_3.oral.titleArm}
                    </p>
                  </div>

                  {/* Definition */}
                  <div
                    onClick={() => toggleReveal('oral-def')}
                    className={`p-3 rounded-lg border cursor-pointer select-none transition ${
                      revealedIds.has('oral-def')
                        ? 'bg-amber-50 border-amber-200'
                        : 'bg-white border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900 text-sm">
                        🇪🇸 {SECTION_3.oral.definitionEs}
                      </span>
                      <button
                        onClick={(e) => speakSpanish(SECTION_3.oral.definitionEs, e)}
                        className="p-1 text-slate-400 hover:text-amber-600"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {revealedIds.has('oral-def') ? (
                      <div className="text-sm font-armenian text-amber-900 font-medium mt-1 pt-1 border-t border-amber-200/50">
                        🇦🇲 {SECTION_3.oral.definitionArm}
                      </div>
                    ) : (
                      <div className="text-[11px] text-slate-400 mt-1">Սեղմեք թարգմանության համար</div>
                    )}
                  </div>

                  {/* Examples */}
                  <div>
                    <div className="text-xs font-semibold text-slate-600 mb-2">
                      {SECTION_3.oral.examplesLabelEs} / {SECTION_3.oral.examplesLabelArm}
                    </div>
                    <div className="space-y-2">
                      {SECTION_3.oral.examples.map((ex) => {
                        const isRev = revealedIds.has(ex.id);
                        return (
                          <div
                            key={ex.id}
                            onClick={() => toggleReveal(ex.id)}
                            className={`p-2.5 rounded-lg border cursor-pointer select-none transition flex items-center justify-between ${
                              isRev
                                ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                                : 'bg-white border-slate-200 hover:border-amber-300 text-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400">•</span>
                              <span className="font-medium text-sm">🇪🇸 {ex.es}</span>
                              {isRev && (
                                <span className="font-armenian text-xs text-amber-800 font-semibold ml-2">
                                  — 🇦🇲 {ex.arm}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={(e) => speakSpanish(ex.es, e)}
                                className="p-1 text-slate-400 hover:text-amber-600"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 3.2 Texto Escrito */}
                <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center justify-between">
                      <span>## {SECTION_3.written.titleEs}</span>
                      <span className="text-xs font-normal text-slate-400 font-mono">escrito</span>
                    </h3>
                    <p className="text-sm font-armenian text-slate-600 font-medium">
                      ## {SECTION_3.written.titleArm}
                    </p>
                  </div>

                  {/* Definition */}
                  <div
                    onClick={() => toggleReveal('written-def')}
                    className={`p-3 rounded-lg border cursor-pointer select-none transition ${
                      revealedIds.has('written-def')
                        ? 'bg-amber-50 border-amber-200'
                        : 'bg-white border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900 text-sm">
                        🇪🇸 {SECTION_3.written.definitionEs}
                      </span>
                      <button
                        onClick={(e) => speakSpanish(SECTION_3.written.definitionEs, e)}
                        className="p-1 text-slate-400 hover:text-amber-600"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {revealedIds.has('written-def') ? (
                      <div className="text-sm font-armenian text-amber-900 font-medium mt-1 pt-1 border-t border-amber-200/50">
                        🇦🇲 {SECTION_3.written.definitionArm}
                      </div>
                    ) : (
                      <div className="text-[11px] text-slate-400 mt-1">Սեղմեք թարգմանության համար</div>
                    )}
                  </div>

                  {/* Examples */}
                  <div>
                    <div className="text-xs font-semibold text-slate-600 mb-2">
                      {SECTION_3.written.examplesLabelEs} / {SECTION_3.written.examplesLabelArm}
                    </div>
                    <div className="space-y-2">
                      {SECTION_3.written.examples.map((ex) => {
                        const isRev = revealedIds.has(ex.id);
                        return (
                          <div
                            key={ex.id}
                            onClick={() => toggleReveal(ex.id)}
                            className={`p-2.5 rounded-lg border cursor-pointer select-none transition flex items-center justify-between ${
                              isRev
                                ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                                : 'bg-white border-slate-200 hover:border-amber-300 text-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400">•</span>
                              <span className="font-medium text-sm">🇪🇸 {ex.es}</span>
                              {isRev && (
                                <span className="font-armenian text-xs text-amber-800 font-semibold ml-2">
                                  — 🇦🇲 {ex.arm}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={(e) => speakSpanish(ex.es, e)}
                                className="p-1 text-slate-400 hover:text-amber-600"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Propiedades de un buen texto */}
            <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-mono">
                  Բաժին 04
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  4. {SECTION_4.titleEs}
                </h2>
                <p className="text-sm font-armenian text-slate-600">
                  4. {SECTION_4.titleArm}
                </p>
              </div>

              <div className="space-y-5">
                {SECTION_4.properties.map((prop, idx) => {
                  const isRev = revealedIds.has(prop.id);
                  const isExRev = revealedIds.has(`${prop.id}-ex`);

                  return (
                    <div
                      key={prop.id}
                      className="border border-slate-200 rounded-xl p-5 bg-white space-y-4 hover:border-slate-300 transition"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">
                            ## 4.{idx + 1} {prop.nameEs}
                          </h3>
                          <p className="text-sm font-armenian text-slate-600">
                            ## {prop.nameArm}
                          </p>
                        </div>
                        <button
                          onClick={() => speakSpanish(prop.nameEs)}
                          className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-slate-100 rounded-lg"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Description */}
                      <div
                        onClick={() => toggleReveal(prop.id)}
                        className={`p-3.5 rounded-lg border cursor-pointer select-none transition ${
                          isRev
                            ? 'bg-amber-50/60 border-amber-200'
                            : 'bg-slate-50 border-slate-200 hover:border-amber-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-900 text-sm">
                            🇪🇸 {prop.descEs}
                          </span>
                          <button
                            onClick={(e) => speakSpanish(prop.descEs, e)}
                            className="p-1 text-slate-400 hover:text-amber-600"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {isRev ? (
                          <div className="text-sm font-armenian text-amber-950 font-medium mt-1.5 pt-1.5 border-t border-amber-200/50">
                            🇦🇲 {prop.descArm}
                          </div>
                        ) : (
                          <div className="text-xs text-slate-400 mt-1">Սեղմեք թարգմանության համար</div>
                        )}
                      </div>

                      {/* Optional Example for Adecuación */}
                      {prop.exampleEs && (
                        <div
                          onClick={() => toggleReveal(`${prop.id}-ex`)}
                          className={`p-3 rounded-lg border cursor-pointer select-none transition ${
                            isExRev
                              ? 'bg-emerald-50/60 border-emerald-200'
                              : 'bg-slate-50 border-slate-200 hover:border-emerald-300'
                          }`}
                        >
                          <div className="text-xs font-semibold text-slate-600 mb-1">
                            {prop.exampleLabelEs} ({prop.exampleLabelArm})
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-slate-900 text-sm">
                              🇪🇸 {prop.exampleEs}
                            </span>
                            <button
                              onClick={(e) => speakSpanish(prop.exampleEs!, e)}
                              className="p-1 text-slate-400 hover:text-emerald-700"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {isExRev ? (
                            <div className="text-sm font-armenian text-emerald-950 font-medium mt-1.5 pt-1.5 border-t border-emerald-200/50">
                              🇦🇲 {prop.exampleArm}
                            </div>
                          ) : (
                            <div className="text-xs text-slate-400 mt-1">Սեղմեք օրինակի թարգմանության համար</div>
                          )}
                        </div>
                      )}

                      {/* Optional Connectors for Cohesión */}
                      {prop.connectorsList && (
                        <div className="space-y-2 pt-2">
                          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                            <span>{prop.connectorsLabelEs} ({prop.connectorsLabelArm})</span>
                            <span className="text-[11px] text-slate-400 font-normal">Սեղմեք կապակցիչի վրա</span>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {prop.connectorsList.map((conn) => {
                              const isConnRev = revealedIds.has(conn.id);
                              return (
                                <button
                                  key={conn.id}
                                  onClick={() => toggleReveal(conn.id)}
                                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                                    isConnRev
                                      ? 'bg-amber-100 border-amber-300 text-amber-950'
                                      : 'bg-white border-slate-300 hover:border-amber-400 text-slate-800'
                                  }`}
                                >
                                  <span>🇪🇸 {conn.es}</span>
                                  {isConnRev ? (
                                    <span className="font-armenian font-bold text-amber-900 ml-1">
                                      = 🇦🇲 {conn.arm}
                                    </span>
                                  ) : (
                                    <span className="text-[10px] text-slate-400">?</span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section 5: Tipos de textos según su finalidad */}
            <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-mono">
                  Բաժին 05
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  5. {SECTION_5.titleEs}
                </h2>
                <p className="text-sm font-armenian text-slate-600">
                  5. {SECTION_5.titleArm}
                </p>
              </div>

              <div className="space-y-3">
                {SECTION_5.types.map((type) => {
                  const isRev = revealedIds.has(type.id);
                  return (
                    <div
                      key={type.id}
                      onClick={() => toggleReveal(type.id)}
                      className={`p-4 rounded-xl border cursor-pointer select-none transition ${
                        isRev
                          ? 'bg-amber-50/50 border-amber-200 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900">
                              🇪🇸 **{type.termEs}** — {type.descEs}
                            </span>
                            <button
                              onClick={(e) => speakSpanish(`${type.termEs} — ${type.descEs}`, e)}
                              className="p-1 text-slate-400 hover:text-amber-600 shrink-0"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                          {isRev ? (
                            <div className="text-sm font-armenian text-amber-950 font-medium pt-1.5 border-t border-amber-200/50">
                              🇦🇲 **{type.termArm}** — {type.descArm}
                            </div>
                          ) : (
                            <div className="text-xs text-slate-400">
                              Սեղմեք՝ տեսնելու հայերեն բացատրությունը
                            </div>
                          )}
                        </div>
                        <div className="text-slate-400 shrink-0">
                          {isRev ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section 6: Texto Corto / Կարճ տեքստ */}
            <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs">
              <div className="border-b border-slate-100 pb-4 mb-5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                    Ամփոփում
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">Texto corto</h2>
                  <p className="text-sm font-armenian text-slate-600">Կարճ տեքստ</p>
                </div>
              </div>

              <div className="space-y-4">
                {SHORT_TEXT_PARAGRAPHS.map((p, idx) => {
                  const isRev = revealedIds.has(p.id);
                  return (
                    <div
                      key={p.id}
                      onClick={() => toggleReveal(p.id)}
                      className={`p-4 rounded-xl border cursor-pointer select-none transition ${
                        isRev
                          ? 'bg-amber-50/50 border-amber-200 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                            🇪🇸 {p.es}
                          </p>
                          <button
                            onClick={(e) => speakSpanish(p.es, e)}
                            className="p-1 text-slate-400 hover:text-amber-600 shrink-0"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        {isRev ? (
                          <div className="text-sm sm:text-base font-armenian text-amber-950 font-medium leading-relaxed border-t border-amber-200/50 pt-2">
                            🇦🇲 {p.arm}
                          </div>
                        ) : (
                          <div className="text-xs text-slate-400 flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            <span>Սեղմեք պարբերության թարգմանության համար</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* ===================== TAB 2: 16 QUESTIONS & ANSWERS ===================== */}
        {activeTab === 'questions' && (
          <div className="space-y-6">
            {/* Header with progress */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 font-mono">
                  Ստուգիչ հարցեր
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Preguntas y respuestas
                </h2>
                <p className="text-sm font-armenian text-slate-600">
                  Հարցեր և պատասխաններ (բոլոր 16-ը)
                </p>
              </div>

              {/* Progress counter */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-slate-500">Յուրացված է</div>
                  <div className="text-lg font-bold font-mono text-slate-900">
                    {masteredQuestions.size} / 16
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-amber-500 flex items-center justify-center font-bold text-xs font-mono text-amber-700">
                  {Math.round((masteredQuestions.size / 16) * 100)}%
                </div>
              </div>
            </div>

            {/* Quick Filter / Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Որոնել 16 հարցերում..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition shadow-xs"
              />
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {filteredQuestions.map((q) => {
                const isQRev = revealedQEs.has(q.id);
                const isAnsEsRev = revealedAnsEs.has(q.id);
                const isAnsArmRev = revealedAnsArm.has(q.id);
                const isMastered = masteredQuestions.has(q.id);

                return (
                  <div
                    key={q.id}
                    className={`border rounded-2xl p-5 transition bg-white shadow-xs ${
                      isMastered ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200'
                    }`}
                  >
                    {/* Header line with question number and mastered toggle */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 font-mono font-bold text-xs flex items-center justify-center">
                          {q.id}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">Հարց #{q.id}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => toggleMasteredQuestion(q.id, e)}
                          className={`text-xs font-medium px-2.5 py-1 rounded-lg border transition flex items-center gap-1.5 ${
                            isMastered
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{isMastered ? 'Գիտեմ' : 'Նշել որպես սովորած'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Question block: Spanish question clickable to reveal Armenian */}
                    <div
                      onClick={() => {
                        setRevealedQEs((prev) => {
                          const next = new Set(prev);
                          if (next.has(q.id)) next.delete(q.id);
                          else next.add(q.id);
                          return next;
                        });
                      }}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer select-none hover:border-amber-300 transition mb-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm sm:text-base">
                              🇪🇸 **{q.questionEs}**
                            </span>
                            <button
                              onClick={(e) => speakSpanish(q.questionEs, e)}
                              className="p-1 text-slate-400 hover:text-amber-600 shrink-0"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                          {isQRev ? (
                            <div className="text-sm font-armenian font-semibold text-amber-900 pt-1 border-t border-slate-200">
                              🇦🇲 **{q.questionArm}**
                            </div>
                          ) : (
                            <div className="text-xs text-slate-400 flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>Սեղմեք հարցի հայերեն թարգմանության համար</span>
                            </div>
                          )}
                        </div>
                        <div className="text-slate-400">
                          {isQRev ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>

                    {/* Answer block: Click to reveal Spanish answer and Armenian translation */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                        <span>Պատասխան</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setRevealedAnsEs((prev) => {
                                const next = new Set(prev);
                                if (next.has(q.id)) next.delete(q.id);
                                else next.add(q.id);
                                return next;
                              });
                            }}
                            className="text-amber-600 hover:underline cursor-pointer"
                          >
                            {isAnsEsRev ? 'Թաքցնել պատասխանը' : 'Բացել պատասխանը'}
                          </button>
                        </div>
                      </div>

                      {isAnsEsRev ? (
                        <div
                          onClick={() => {
                            setRevealedAnsArm((prev) => {
                              const next = new Set(prev);
                              if (next.has(q.id)) next.delete(q.id);
                              else next.add(q.id);
                              return next;
                            });
                          }}
                          className={`p-3.5 rounded-xl border cursor-pointer select-none transition ${
                            isAnsArmRev
                              ? 'bg-amber-50/70 border-amber-200'
                              : 'bg-white border-slate-200 hover:border-amber-300'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-slate-900 text-sm sm:text-base">
                                  🇪🇸 {q.answerEs}
                                </span>
                                <button
                                  onClick={(e) => speakSpanish(q.answerEs, e)}
                                  className="p-1 text-slate-400 hover:text-amber-600 shrink-0"
                                >
                                  <Volume2 className="w-4 h-4" />
                                </button>
                              </div>
                              {isAnsArmRev ? (
                                <div className="text-sm font-armenian text-amber-950 font-medium pt-1.5 border-t border-amber-200/60">
                                  🇦🇲 {q.answerArm}
                                </div>
                              ) : (
                                <div className="text-xs text-slate-400 flex items-center gap-1">
                                  <Eye className="w-3.5 h-3.5 text-amber-600" />
                                  <span className="text-amber-700 font-medium">
                                    Սեղմեք պատասխանի հայերեն թարգմանության համար
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="text-slate-400">
                              {isAnsArmRev ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setRevealedAnsEs((prev) => new Set(prev).add(q.id));
                            setRevealedAnsArm((prev) => new Set(prev).add(q.id));
                          }}
                          className="w-full py-2.5 border border-dashed border-slate-300 rounded-xl text-xs text-slate-500 hover:text-amber-700 hover:border-amber-400 hover:bg-amber-50/30 transition text-center"
                        >
                          🔒 Սեղմեք՝ պատասխանը ցույց տալու համար
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================== TAB 3: FLASHCARDS TRAINER ===================== */}
        {activeTab === 'flashcards' && currentFlashcard && (
          <div className="max-w-xl mx-auto space-y-6">
            {/* Flashcard toolbar */}
            <div className="flex items-center justify-between text-xs text-slate-500 bg-white border border-slate-200 px-4 py-3 rounded-xl shadow-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-slate-900">
                  {currentCardIdx + 1} / {flashcardDeck.length}
                </span>
                <span>·</span>
                <span className="font-medium text-slate-700">{currentFlashcard.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={shuffleDeck}
                  className="px-2.5 py-1 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition flex items-center gap-1"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Խառնել</span>
                </button>
                <button
                  onClick={(e) => toggleMasteredCard(currentFlashcard.id, e)}
                  className={`px-2.5 py-1 rounded-lg border transition flex items-center gap-1 ${
                    masteredCards.has(currentFlashcard.id)
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'border-slate-200 text-slate-600 hover:border-emerald-300'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{masteredCards.has(currentFlashcard.id) ? 'Սովորած է' : 'Նշել'}</span>
                </button>
              </div>
            </div>

            {/* The interactive Flashcard */}
            <div
              onClick={() => setCardFlipped(!cardFlipped)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === ' ' && setCardFlipped(!cardFlipped)}
              className="bg-white border-2 border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm min-h-[280px] flex flex-col items-center justify-center text-center cursor-pointer select-none hover:border-amber-400 transition-all relative group"
            >
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={(e) => speakSpanish(currentFlashcard.es, e)}
                  title="Արտասանել"
                  className="p-2 text-slate-400 hover:text-amber-600 hover:bg-slate-100 rounded-xl transition"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {!cardFlipped ? (
                <div className="space-y-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 font-mono">
                    Իսպաներեն (Սեղմեք թարգմանության համար)
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                    {currentFlashcard.es}
                  </div>
                  <div className="text-xs text-slate-400 flex items-center justify-center gap-1 pt-4">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Սեղմեք քարտը՝ հայերենը բացելու համար</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 animate-fadeIn">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 font-mono">
                    Հայերեն թարգմանություն
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold font-armenian text-amber-950 leading-snug">
                    {currentFlashcard.arm}
                  </div>
                  <div className="text-sm text-slate-500 pt-2 border-t border-slate-100">
                    🇪🇸 {currentFlashcard.es}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={prevCard}
                className="flex-1 py-3 px-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition font-medium text-sm flex items-center justify-center gap-2 text-slate-700 shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Նախորդը</span>
              </button>

              <button
                onClick={() => setCardFlipped(!cardFlipped)}
                className="py-3 px-5 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl hover:bg-amber-100 active:bg-amber-200 transition font-semibold text-sm flex items-center justify-center gap-1.5 shadow-xs"
              >
                {cardFlipped ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{cardFlipped ? 'Իսպաներեն' : 'Թարգմանել'}</span>
              </button>

              <button
                onClick={nextCard}
                className="flex-1 py-3 px-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition font-medium text-sm flex items-center justify-center gap-2 text-slate-700 shadow-xs"
              >
                <span>Հաջորդը</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ===================== TAB 4: PARALLEL TEXT READER ===================== */}
        {activeTab === 'parallel' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                Texto completo paralelo (Զուգահեռ ընթերցում)
              </h2>
              <p className="text-xs text-slate-500">
                Սեղմեք ցանկացած տողի վրա՝ զուգահեռ թարգմանությունը ընդգծելու և բարձրաձայն լսելու համար։
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Spanish Column */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <span>🇪🇸 Español</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-400">13 նախադասություն</span>
                </div>

                <div className="space-y-2.5">
                  {FULL_TEXT_SENTENCES.map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => toggleReveal(item.id)}
                      className={`p-3 rounded-xl border text-sm leading-relaxed cursor-pointer transition ${
                        revealedIds.has(item.id)
                          ? 'bg-amber-100/70 border-amber-300 font-semibold text-slate-900'
                          : 'bg-slate-50/60 border-slate-200 hover:border-amber-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span>
                          <span className="font-mono text-xs text-slate-400 mr-2">
                            {idx + 1}.
                          </span>
                          {item.es}
                        </span>
                        <button
                          onClick={(e) => speakSpanish(item.es, e)}
                          className="p-1 text-slate-400 hover:text-amber-600 shrink-0"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Armenian Column */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold font-armenian text-slate-900 flex items-center gap-2">
                    <span>🇦🇲 Հայերեն</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-400">Թարգմանություն</span>
                </div>

                <div className="space-y-2.5">
                  {FULL_TEXT_SENTENCES.map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => toggleReveal(item.id)}
                      className={`p-3 rounded-xl border text-sm font-armenian leading-relaxed cursor-pointer transition ${
                        revealedIds.has(item.id)
                          ? 'bg-amber-100/70 border-amber-300 font-semibold text-amber-950'
                          : 'bg-slate-50/60 border-slate-200 hover:border-amber-300 text-slate-700'
                      }`}
                    >
                      <span className="font-mono text-xs text-slate-400 mr-2">
                        {idx + 1}.
                      </span>
                      {item.arm}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-slate-200 bg-white text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>Tema 1: La Comunicación y los Textos · Թեմա 1․ Հաղորդակցությունը և տեքստերը</p>
          <p className="text-slate-400">
            Ամբողջ նյութը՝ առանց բացթողումների · Սեղմեք իսպաներենի վրա թարգմանության համար
          </p>
        </div>
      </footer>
    </div>
  );
}
