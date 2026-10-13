import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, RotateCcw, HelpCircle, Flame } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: 'Konfigurasi Elektron' | 'Sifat Keperiodikan' | 'Golongan & Periode' | 'Kimia Terapan';
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Unsur dengan konfigurasi elektron [Ar] 4s¹ terletak pada golongan dan periode berapa dalam tabel periodik?",
    options: ["Golongan IA, Periode 4", "Golongan IB, Periode 4", "Golongan IIA, Periode 3", "Golongan IVA, Periode 1"],
    correctIndex: 0,
    explanation: "Kulit terluar adalah n=4 (Periode 4), dan elektron valensi pada subkulit 4s berjumlah 1, sehingga termasuk Golongan IA (Kalium / K, Z=19).",
    topic: "Golongan & Periode"
  },
  {
    id: 2,
    question: "Dalam satu periode dari kiri ke kanan pada tabel periodik, bagaimana kecenderungan umum jari-jari atom?",
    options: ["Semakin besar", "Semakin kecil", "Tetap sama", "Meningkat lalu menurun drastis"],
    correctIndex: 1,
    explanation: "Dari kiri ke kanan dalam satu periode, jumlah proton bertambah sehingga muatan inti efektif (Z_eff) semakin besar. Akibatnya gaya tarik inti terhadap elektron semakin kuat dan jari-jari atom mengecil.",
    topic: "Sifat Keperiodikan"
  },
  {
    id: 3,
    question: "Unsur manakah di seluruh tabel periodik yang memiliki nilai elektronegativitas skala Pauling tertinggi (3.98)?",
    options: ["Oksigen (O)", "Klorin (Cl)", "Fluorin (F)", "Helium (He)"],
    correctIndex: 2,
    explanation: "Fluorin (F) memiliki keelektronegatifan tertinggi yaitu 3.98, menjadikannya unsur nonlogam paling reaktif dan paling kuat menarik elektron.",
    topic: "Sifat Keperiodikan"
  },
  {
    id: 4,
    question: "Mengapa konfigurasi elektron atom Kromium (Cr, Z=24) adalah [Ar] 3d⁵ 4s¹ dan bukan [Ar] 3d⁴ 4s²?",
    options: [
      "Karena aturan larangan Pauli melarang orbital 4s terisi 2 elektron",
      "Karena orbital 3d setengah penuh (half-filled) memiliki kestabilan ekstra yang lebih tinggi",
      "Karena energi ionisasi kromium bernilai negatif",
      "Karena kromium merupakan unsur golongan alkali tanah"
    ],
    correctIndex: 1,
    explanation: "Konfigurasi d⁵ (setengah penuh) memiliki simetri dan pertukaran energi yang tinggi sehingga jauh lebih stabil dibandingkan d⁴ s².",
    topic: "Konfigurasi Elektron"
  },
  {
    id: 5,
    question: "Pada uji nyala garam logam alkali tanah di laboratorium SMA, kalsium (Ca) menghasilkan warna nyala khas berupa:",
    options: ["Kuning terang", "Ungu muda (lilac)", "Merah bata", "Hijau apel"],
    correctIndex: 2,
    explanation: "Uji nyala kalsium (Ca²⁺) menghasilkan warna MERAH BATA, sedangkan Na kuning, K ungu, Ba hijau apel, dan Sr merah tua.",
    topic: "Kimia Terapan"
  },
  {
    id: 6,
    question: "Unsur gas mulia yang pertama kali berhasil direaksikan membentuk senyawa nyata oleh Neil Bartlett pada tahun 1962 adalah:",
    options: ["Helium (He)", "Neon (Ne)", "Argon (Ar)", "Xenon (Xe)"],
    correctIndex: 3,
    explanation: "Neil Bartlett berhasil mereaksikan Xenon dengan PtF₆ menghasilkan kristal Xenon heksafluoroplatinat (XePtF₆), membuktikan bahwa gas mulia periode bawah dapat membentuk senyawa.",
    topic: "Kimia Terapan"
  },
  {
    id: 7,
    question: "Di antara unsur-unsur berikut, manakah yang memiliki energi ionisasi pertama paling rendah?",
    options: ["Litium (Li)", "Natrium (Na)", "Kalium (K)", "Sesium (Cs)"],
    correctIndex: 3,
    explanation: "Dalam satu golongan alkali (IA) dari atas ke bawah, jari-jari atom semakin besar sehingga elektron valensi semakin jauh dari inti dan semakin mudah dilepaskan (energi ionisasi semakin kecil). Cs memiliki energi ionisasi terendah di antara pilihan.",
    topic: "Sifat Keperiodikan"
  },
  {
    id: 8,
    question: "Berapakah jumlah elektron maksimum yang dapat ditampung pada subkulit d (l=2)?",
    options: ["2 elektron", "6 elektron", "10 elektron", "14 elektron"],
    correctIndex: 2,
    explanation: "Subkulit d memiliki 5 orbital (m = -2, -1, 0, +1, +2). Berdasarkan asas Pauli, masing-masing orbital menampung maksimal 2 elektron, sehingga totalnya 5 × 2 = 10 elektron.",
    topic: "Konfigurasi Elektron"
  }
];

export const ChemistryQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const q = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === q.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 }
        });
      } catch {
        // Safe fallback
      }
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      if (score >= 50) {
        try {
          confetti({
            particleCount: 100,
            spread: 90,
            origin: { y: 0.6 }
          });
        } catch {
          // Safe fallback
        }
      }
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setStreak(0);
    setIsAnswered(false);
    setIsFinished(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            Kuis Kimia SMA: Sifat Keperiodikan & Konfigurasi
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Uji pemahaman materi kimia kelas 10, 11, dan 12 dengan soal berstandar kurikulum nasional.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {streak > 1 && (
            <div className="flex items-center gap-1 text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
              <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
              {streak}x Beruntun!
            </div>
          )}
          <div className="text-xs font-mono font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
            Skor: {score} Poin
          </div>
        </div>
      </div>

      {!isFinished ? (
        <div>
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-mono">
            <span>Soal {currentIndex + 1} dari {QUIZ_QUESTIONS.length}</span>
            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-sans">{q.topic}</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
            <h4 className="text-sm font-semibold text-slate-900 leading-relaxed">
              {q.question}
            </h4>
          </div>

          {/* Options */}
          <div className="space-y-2 mb-4">
            {q.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === q.correctIndex;

              let btnStyle = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold ring-1 ring-emerald-300';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-50 border-rose-400 text-rose-900 font-semibold ring-1 ring-rose-300';
                } else {
                  btnStyle = 'bg-white opacity-50 border-slate-200 text-slate-600';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 text-slate-700 flex items-center justify-center text-xs font-bold font-mono">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-xl mb-4 text-xs">
              <h5 className="font-bold text-blue-900 flex items-center gap-1.5 mb-1">
                <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
                Penjelasan Edukatif SMA:
              </h5>
              <p className="text-slate-700 leading-relaxed">{q.explanation}</p>
            </div>
          )}

          {/* Action button */}
          {isAnswered && (
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition cursor-pointer"
              >
                {currentIndex + 1 < QUIZ_QUESTIONS.length ? 'Soal Berikutnya →' : 'Lihat Hasil Akhir'}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Final Score Card */
        <div className="text-center py-6 px-4">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center">
            <Award className="w-8 h-8 text-amber-600" />
          </div>
          <h4 className="text-xl font-extrabold text-slate-900 mb-1">
            Kuis Selesai!
          </h4>
          <p className="text-sm text-slate-600 mb-4">
            Skor Kamu: <strong className="text-blue-600 text-lg">{score}</strong> dari {QUIZ_QUESTIONS.length * 10} poin
          </p>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl max-w-sm mx-auto mb-5 text-xs text-slate-600">
            {score >= 70
              ? 'Luar biasa! Pemahaman konsep tabel periodik & sifat keperiodikan SMA kamu sangat matang.'
              : score >= 40
              ? 'Bagus! Pelajari kembali materi konfigurasi elektron dan tren periodik untuk hasil maksimal.'
              : 'Tetap semangat! Gunakan fitur visualisasi model atom dan tren periodik untuk memperkuat konsep dasar.'}
          </div>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Ulangi Kuis
          </button>
        </div>
      )}
    </div>
  );
};
