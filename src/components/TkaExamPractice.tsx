import React, { useState, useEffect } from 'react';
import { TkaQuestion, TKA_KIMIA_QUESTIONS } from '../data/tkaQuestions';
import { TkaStimulusImage } from './TkaStimulusImage';
import confetti from 'canvas-confetti';
import {
  GraduationCap,
  Timer,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  BookOpen,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Award,
  Filter,
  Check,
  AlertCircle
} from 'lucide-react';

export const TkaExamPractice: React.FC = () => {
  const [mode, setMode] = useState<'exam' | 'study'>('exam');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // User answers map: questionId -> selectedKey ('A' | 'B' | 'C' | 'D' | 'E')
  const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D' | 'E'>>({});
  const [doubtStatus, setDoubtStatus] = useState<Record<number, boolean>>({});

  // Study mode reveal explanation state
  const [revealedExplanation, setRevealedExplanation] = useState<Record<number, boolean>>({});

  // Exam state
  const [isExamSubmitted, setIsExamSubmitted] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(15 * 60); // 15 mins for 8 questions
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);

  // Filter questions
  const filteredQuestions = selectedTopic === 'all'
    ? TKA_KIMIA_QUESTIONS
    : TKA_KIMIA_QUESTIONS.filter(q => q.topic === selectedTopic);

  const currentQ: TkaQuestion | undefined = filteredQuestions[currentIndex] || filteredQuestions[0];

  // Timer countdown
  useEffect(() => {
    if (!isTimerActive || isExamSubmitted || mode !== 'exam') return;

    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive, isExamSubmitted, mode]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (isExamSubmitted && mode === 'exam') return;
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: key }));
  };

  const toggleDoubt = () => {
    setDoubtStatus(prev => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }));
  };

  const handleSubmitExam = () => {
    setIsExamSubmitted(true);
    setIsTimerActive(false);

    // Calculate score
    let correct = 0;
    filteredQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctKey) correct++;
    });

    if (correct >= filteredQuestions.length * 0.6) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe fallback
      }
    }
  };

  const handleResetExam = () => {
    setUserAnswers({});
    setDoubtStatus({});
    setRevealedExplanation({});
    setIsExamSubmitted(false);
    setCurrentIndex(0);
    setSecondsRemaining(15 * 60);
    setIsTimerActive(true);
  };

  // Exam Score calculation (scale 0 - 1000 standard TKA)
  const totalQuestions = filteredQuestions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = filteredQuestions.filter(q => userAnswers[q.id] === q.correctKey).length;
  const rawScorePercent = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
  const tkaStandardScore = Math.round((correctCount / totalQuestions) * 1000);

  const topicsList = ['all', ...Array.from(new Set(TKA_KIMIA_QUESTIONS.map(q => q.topic)))];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              Latihan Soal TKA Kimia SMA (Standar Kemendikdasmen)
            </h3>
            <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300">
              Format Pusmendik / BPPP
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Soal penalaran analitis Higher Order Thinking Skills (HOTS) Kimia SMA Kelas 10, 11, dan 12 dengan pembahasan mendalam.
          </p>
        </div>

        {/* Mode & Timer Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          {/* Mode Switcher */}
          <div className="bg-slate-100 p-0.5 rounded-xl flex text-xs font-semibold">
            <button
              onClick={() => {
                setMode('exam');
                handleResetExam();
              }}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                mode === 'exam'
                  ? 'bg-white text-blue-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mode Simulasi Ujian
            </button>
            <button
              onClick={() => {
                setMode('study');
                setIsExamSubmitted(false);
              }}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                mode === 'study'
                  ? 'bg-white text-blue-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mode Bedah Soal
            </button>
          </div>

          {/* Timer Display (Exam mode) */}
          {mode === 'exam' && !isExamSubmitted && (
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold ${
              secondsRemaining < 180
                ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                : 'bg-slate-50 text-slate-700 border-slate-200'
            }`}>
              <Timer className="w-4 h-4 text-slate-500" />
              <span>Sisa Waktu: {formatTime(secondsRemaining)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Filter Topic Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-500 font-mono shrink-0">Filter Topik:</span>
          {topicsList.map(t => (
            <button
              key={t}
              onClick={() => {
                setSelectedTopic(t);
                setCurrentIndex(0);
              }}
              className={`px-2.5 py-1 rounded-lg border text-xs transition whitespace-nowrap cursor-pointer ${
                selectedTopic === t
                  ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-2xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {t === 'all' ? 'Semua Topik' : t}
            </button>
          ))}
        </div>

        <span className="text-xs font-mono text-slate-500">
          Soal {currentIndex + 1} dari {filteredQuestions.length}
        </span>
      </div>

      {/* Main Examination View or Result Card */}
      {!isExamSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Body (Cols 1-3) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Question Info Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                  {currentQ.code}
                </span>
                <span className="font-semibold text-slate-700">{currentQ.topic}</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                currentQ.difficulty === 'HOTS / Sulit'
                  ? 'bg-rose-100 text-rose-800 border border-rose-200'
                  : currentQ.difficulty === 'Sedang'
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}>
                {currentQ.difficulty}
              </span>
            </div>

            {/* Competency Badge */}
            <div className="p-2.5 bg-blue-50/60 border border-blue-200 rounded-lg text-xs text-blue-900 leading-normal flex items-start gap-2">
              <BookOpen className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Capaian Pembelajaran Kemendikdasmen: </span>
                <span>{currentQ.competency}</span>
              </div>
            </div>

            {/* Stimulus Card (if exists) */}
            {currentQ.stimulusText && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                {currentQ.stimulusTitle && (
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide font-mono flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    Stimulus Sains: {currentQ.stimulusTitle}
                  </h4>
                )}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {currentQ.stimulusText}
                </p>

                {/* Visual Stimulus Diagram / Image for Questions 1, 2, and 3 */}
                <TkaStimulusImage questionId={currentQ.id} />

                {/* Stimulus Table if available */}
                {currentQ.stimulusData?.type === 'table' && currentQ.stimulusData.headers && (
                  <div className="overflow-x-auto bg-white rounded-lg border border-slate-200 shadow-2xs">
                    <table className="w-full text-xs font-mono text-center">
                      <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                        <tr>
                          {currentQ.stimulusData.headers.map((h, idx) => (
                            <th key={idx} className="p-2">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-800">
                        {currentQ.stimulusData.rows?.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-2 font-bold">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {currentQ.stimulusData.note && (
                      <div className="p-2 text-[10px] text-slate-400 italic bg-slate-50 border-t border-slate-100">
                        {currentQ.stimulusData.note}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Question Prompt */}
            <div className="p-4 bg-white border border-slate-300 rounded-xl shadow-2xs">
              <h4 className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                {currentQ.question}
              </h4>
            </div>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt) => {
                const isSelected = userAnswers[currentQ.id] === opt.key;
                const isStudyRevealed = mode === 'study' && revealedExplanation[currentQ.id];
                const isCorrect = opt.key === currentQ.correctKey;

                let optStyle = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';

                if (isStudyRevealed) {
                  if (isCorrect) {
                    optStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold ring-1 ring-emerald-300';
                  } else if (isSelected) {
                    optStyle = 'bg-rose-50 border-rose-400 text-rose-900 font-semibold ring-1 ring-rose-300';
                  } else {
                    optStyle = 'bg-white opacity-50 border-slate-200 text-slate-600';
                  }
                } else if (isSelected) {
                  optStyle = 'bg-blue-50 border-blue-500 text-blue-900 font-bold ring-1 ring-blue-400 shadow-2xs';
                }

                return (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectOption(opt.key)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between cursor-pointer ${optStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 transition ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700 border border-slate-300'
                      }`}>
                        {opt.key}
                      </span>
                      <span className="leading-relaxed">{opt.text}</span>
                    </div>

                    {isStudyRevealed && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                    )}
                    {isStudyRevealed && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mode Bedah Soal / Explanation toggle */}
            {mode === 'study' && (
              <div className="pt-2">
                <button
                  onClick={() => setRevealedExplanation(prev => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }))}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl border border-blue-200 transition cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4" />
                  {revealedExplanation[currentQ.id] ? 'Tutup Pembahasan' : 'Lihat Kunci & Pembahasan Terstruktur'}
                </button>
              </div>
            )}

            {/* Explanation card in study mode */}
            {mode === 'study' && revealedExplanation[currentQ.id] && (
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-emerald-900 flex items-center gap-1.5 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Kunci Jawaban: {currentQ.correctKey}
                  </h5>
                  <span className="font-mono text-emerald-700 font-semibold bg-emerald-100 px-2 py-0.5 rounded">
                    Konsep: {currentQ.explanation.concept}
                  </span>
                </div>

                <div className="space-y-1.5 text-slate-700">
                  <span className="font-bold text-slate-900 block">Langkah Analisis Soal TKA:</span>
                  <ol className="list-decimal list-inside space-y-1 pl-1">
                    {currentQ.explanation.steps.map((step, sIdx) => (
                      <li key={sIdx} className="leading-relaxed">{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-emerald-200 text-emerald-900 font-medium">
                  {currentQ.explanation.conclusion}
                </div>
              </div>
            )}

            {/* Bottom Question Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-xs font-semibold text-slate-700 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Sebelumnya
              </button>

              {mode === 'exam' && (
                <button
                  onClick={toggleDoubt}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                    doubtStatus[currentQ.id]
                      ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {doubtStatus[currentQ.id] ? '★ Ditandai Ragu-Ragu' : 'Tandai Ragu-Ragu'}
                </button>
              )}

              {currentIndex + 1 < filteredQuestions.length ? (
                <button
                  onClick={() => setCurrentIndex(prev => Math.min(filteredQuestions.length - 1, prev + 1))}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white transition cursor-pointer shadow-xs"
                >
                  Berikutnya
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                mode === 'exam' && (
                  <button
                    onClick={handleSubmitExam}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white transition cursor-pointer shadow-xs"
                  >
                    Kumpulkan Ujian
                    <Check className="w-4 h-4" />
                  </button>
                )
              )}
            </div>
          </div>

          {/* Question Grid Navigation Palette (Col 4) */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between h-fit">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono mb-3">
                Nomor Soal TKA
              </h4>

              <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-2 mb-4">
                {filteredQuestions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isDoubt = doubtStatus[q.id];

                  let btnStyle = 'bg-white text-slate-700 border-slate-200 hover:border-slate-400';
                  if (isDoubt) {
                    btnStyle = 'bg-amber-100 text-amber-900 border-amber-400 font-bold';
                  } else if (isAnswered) {
                    btnStyle = 'bg-blue-600 text-white border-blue-600 font-bold';
                  }

                  if (isCurrent) {
                    btnStyle += ' ring-2 ring-blue-400 ring-offset-1';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-9 rounded-lg border text-xs font-mono font-bold flex items-center justify-center transition cursor-pointer ${btnStyle}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Grid Legend */}
              <div className="space-y-1.5 text-[11px] font-mono text-slate-600 pt-3 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-blue-600" />
                  <span>Sudah Dijawab ({answeredCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-amber-100 border border-amber-400" />
                  <span>Ragu-Ragu ({Object.values(doubtStatus).filter(Boolean).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-white border border-slate-300" />
                  <span>Belum Dijawab ({totalQuestions - answeredCount})</span>
                </div>
              </div>
            </div>

            {mode === 'exam' && (
              <button
                onClick={handleSubmitExam}
                className="w-full mt-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
              >
                Selesai & Kumpulkan Ujian
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Examination Results Summary Screen */
        <div className="py-6 px-4 space-y-6">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center">
              <Award className="w-8 h-8 text-blue-600" />
            </div>

            <div>
              <h4 className="text-xl font-extrabold text-slate-900">
                Laporan Hasil Ujian TKA Kimia SMA
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Berdasarkan Standar Penilaian Tes Kemampuan Akademik Kemendikdasmen / BPPP
              </p>
            </div>

            {/* Score Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Skor Standar TKA</span>
                <span className="text-3xl font-extrabold font-mono text-blue-700">{tkaStandardScore}</span>
                <span className="text-[10px] text-slate-400 block">Skala 0 - 1000</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Ketepatan Jawaban</span>
                <span className="text-3xl font-extrabold font-mono text-emerald-600">
                  {correctCount} / {totalQuestions}
                </span>
                <span className="text-[10px] text-slate-400 block">{rawScorePercent.toFixed(1)}% Benar</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Kategori Kelulusan</span>
                <span className="text-sm font-bold block mt-1 text-slate-900">
                  {tkaStandardScore >= 750 ? 'Sangat Memuaskan (A)' : tkaStandardScore >= 550 ? 'Kompeten (B)' : 'Perlu Penguatan (C)'}
                </span>
                <span className="text-[10px] text-slate-400 block">Standar KKM 70%</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleResetExam}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                Ulangi Ujian TKA
              </button>
            </div>
          </div>

          {/* Full Exam Questions Review with Explanations */}
          <div className="pt-6 border-t border-slate-200 space-y-4">
            <h5 className="text-sm font-bold text-slate-900 flex items-center gap-2 font-mono uppercase">
              <BookOpen className="w-4 h-4 text-blue-600" />
              Bedah Soal & Pembahasan Lengkap Semua Nomor Ujian:
            </h5>

            <div className="space-y-4">
              {filteredQuestions.map((q, idx) => {
                const userChoice = userAnswers[q.id];
                const isCorrect = userChoice === q.correctKey;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border text-xs space-y-3 ${
                      isCorrect
                        ? 'bg-emerald-50/40 border-emerald-200'
                        : 'bg-rose-50/40 border-rose-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold font-mono text-slate-800">
                        Nomor {idx + 1} ({q.code}) - {q.topic}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full font-bold flex items-center gap-1 text-[11px] ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {isCorrect ? 'Jawaban Benar' : 'Jawaban Salah'}
                      </span>
                    </div>

                    <p className="text-slate-800 font-medium leading-relaxed">{q.question}</p>

                    {/* Visual Stimulus Diagram / Image for Questions 1, 2, and 3 */}
                    <TkaStimulusImage questionId={q.id} />

                    <div className="flex items-center gap-4 text-xs font-mono">
                      <span>Jawaban Kamu: <strong className={isCorrect ? 'text-emerald-700' : 'text-rose-700'}>{userChoice || 'Tidak Dijawab'}</strong></span>
                      <span>Kunci Benar: <strong className="text-emerald-700">{q.correctKey}</strong></span>
                    </div>

                    {/* Explanation */}
                    <div className="p-3 bg-white/90 rounded-lg border border-slate-200 text-slate-700 space-y-1.5">
                      <span className="font-bold text-slate-900 block">Pembahasan Analitis:</span>
                      <ol className="list-decimal list-inside space-y-0.5 pl-1">
                        {q.explanation.steps.map((s, sIdx) => (
                          <li key={sIdx} className="leading-relaxed">{s}</li>
                        ))}
                      </ol>
                      <p className="text-emerald-900 font-semibold pt-1 border-t border-slate-100">
                        {q.explanation.conclusion}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
