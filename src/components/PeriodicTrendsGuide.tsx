import React, { useState } from 'react';
import { ALL_ELEMENTS, PeriodicElement } from '../data/elements';
import { TrendingUp, ArrowRight, ArrowDown, HelpCircle, GitCompare } from 'lucide-react';

export const PeriodicTrendsGuide: React.FC = () => {
  const [compEl1Number, setCompEl1Number] = useState<number>(11); // Na
  const [compEl2Number, setCompEl2Number] = useState<number>(17); // Cl

  const el1 = ALL_ELEMENTS.find(e => e.number === compEl1Number) || ALL_ELEMENTS[10];
  const el2 = ALL_ELEMENTS.find(e => e.number === compEl2Number) || ALL_ELEMENTS[16];

  const TREND_CARDS = [
    {
      title: 'Jari-Jari Atom (r)',
      directionPeriod: 'Mengecil dari kiri ke kanan',
      directionGroup: 'Membesar dari atas ke bawah',
      explanation: 'Dalam satu periode, muatan inti efektif (jumlah proton) bertambah sedangkan jumlah kulit sama, sehingga tarikan inti terhadap elektron semakin kuat. Dalam satu golongan, jumlah kulit elektron bertambah sehingga jarak elektron terluar ke inti makin jauh.',
      examTip: 'Ingat pola: Kiri-Bawah paling BESAR (Fr, Cs), Kanan-Atas paling KECIL (He, F).'
    },
    {
      title: 'Energi Ionisasi Pertama (EI)',
      directionPeriod: 'Cenderung bertambah dari kiri ke kanan',
      directionGroup: 'Berkurang dari atas ke bawah',
      explanation: 'Energi minimum yang dibutuhkan untuk melepaskan 1 elektron valensi pada fase gas. Semakin dekat elektron ke inti dan semakin kuat tarikan inti, semakin sukar dilepaskan (EI makin besar).',
      examTip: 'Waspadai Anomali SMA: Golongan IIA (ns² penuh) > IIIA (ns² np¹), dan Golongan VA (np³ setengah penuh) > VIA (np⁴).'
    },
    {
      title: 'Keelektronegatifan (Skala Pauling)',
      directionPeriod: 'Bertambah dari kiri ke kanan',
      directionGroup: 'Berkurang dari atas ke bawah',
      explanation: 'Kecenderungan relatif suatu atom untuk menarik pasangan elektron ikatan ke arah dirinya sendiri dalam suatu ikatan kimia.',
      examTip: 'Unsur tertinggi adalah Fluorin (3.98), disusul Oksigen (3.44) dan Nitrogen (3.04). Gas mulia He, Ne, Ar tidak memiliki nilai Pauling standar.'
    },
    {
      title: 'Afinitas Elektron (EA)',
      directionPeriod: 'Cenderung makin negatif (melepas energi lebih besar) ke kanan',
      directionGroup: 'Cenderung berkurang ke bawah',
      explanation: 'Perubahan energi saat satu atom netral dalam fase gas menangkap satu elektron menjadi anion bermuatan -1.',
      examTip: 'Perhatian: Klorin (Cl, -349 kJ/mol) memiliki afinitas elektron lebih tinggi/eksoterm dari Fluorin (F, -328 kJ/mol) karena atom F terlalu kecil sehingga tolakan antarelektron rapat.'
    },
    {
      title: 'Sifat Logam & Daya Reduktor',
      directionPeriod: 'Berkurang dari kiri ke kanan',
      directionGroup: 'Bertambah dari atas ke bawah',
      explanation: 'Sifat logam berkaitan dengan kemudahan melepaskan elektron (mengalami oksidasi, bertindak sebagai reduktor kuat). Sifat nonlogam sebaliknya mudah menangkap elektron (mengalami reduksi, bertindak sebagai oksidator kuat).',
      examTip: 'Logam paling aktif adalah Golongan IA paling bawah (Cs/Fr), sedangkan nonlogam paling aktif adalah Golongan VIIA paling atas (F).'
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            Panduan & Visualisasi Tren Sifat Keperiodikan Unsur SMA
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Rangkuman lengkap teori, grafik kecenderungan, anomali kurikulum SMA, dan perbandingan langsung antar dua unsur.
          </p>
        </div>
      </div>

      {/* Interactive 2-Element Head-to-Head Comparison */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono mb-3 flex items-center gap-1.5">
          <GitCompare className="w-3.5 h-3.5 text-blue-600" />
          Komparasi Sifat Antar Dua Unsur (Head-to-Head):
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Pilih Unsur 1:</label>
            <select
              value={compEl1Number}
              onChange={(e) => setCompEl1Number(Number(e.target.value))}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-medium text-slate-800 shadow-2xs outline-none"
            >
              {ALL_ELEMENTS.slice(0, 54).map((e) => (
                <option key={e.number} value={e.number}>
                  {e.number}. {e.name} ({e.symbol}) - Gol {e.groupTraditional} Per {e.period}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Pilih Unsur 2:</label>
            <select
              value={compEl2Number}
              onChange={(e) => setCompEl2Number(Number(e.target.value))}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-medium text-slate-800 shadow-2xs outline-none"
            >
              {ALL_ELEMENTS.slice(0, 54).map((e) => (
                <option key={e.number} value={e.number}>
                  {e.number}. {e.name} ({e.symbol}) - Gol {e.groupTraditional} Per {e.period}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-2xs">
          <table className="w-full text-xs font-mono text-left">
            <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-2.5">Parameter Sifat</th>
                <th className="p-2.5 text-blue-700 font-bold">{el1.name} ({el1.symbol})</th>
                <th className="p-2.5 text-indigo-700 font-bold">{el2.name} ({el2.symbol})</th>
                <th className="p-2.5">Kesimpulan Nilai Lebih Besar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-2.5 font-sans font-semibold text-slate-900">Nomor Atom (Z)</td>
                <td className="p-2.5 font-bold">{el1.number}</td>
                <td className="p-2.5 font-bold">{el2.number}</td>
                <td className="p-2.5 font-sans text-slate-600">
                  {el1.number > el2.number ? `${el1.symbol} lebih banyak proton` : `${el2.symbol} lebih banyak proton`}
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-semibold text-slate-900">Jari-Jari Atom (r)</td>
                <td className="p-2.5 font-bold">{el1.atomicRadius ? `${el1.atomicRadius} pm` : '–'}</td>
                <td className="p-2.5 font-bold">{el2.atomicRadius ? `${el2.atomicRadius} pm` : '–'}</td>
                <td className="p-2.5 font-sans text-slate-600">
                  {el1.atomicRadius && el2.atomicRadius ? (
                    el1.atomicRadius > el2.atomicRadius
                      ? `${el1.symbol} lebih besar (elektron lebih renggang)`
                      : `${el2.symbol} lebih besar (elektron lebih renggang)`
                  ) : '–'}
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-semibold text-slate-900">Energi Ionisasi</td>
                <td className="p-2.5 font-bold">{el1.ionizationEnergy ? `${el1.ionizationEnergy} kJ/mol` : '–'}</td>
                <td className="p-2.5 font-bold">{el2.ionizationEnergy ? `${el2.ionizationEnergy} kJ/mol` : '–'}</td>
                <td className="p-2.5 font-sans text-slate-600">
                  {el1.ionizationEnergy && el2.ionizationEnergy ? (
                    el1.ionizationEnergy > el2.ionizationEnergy
                      ? `${el1.symbol} lebih sukar melepas elektron`
                      : `${el2.symbol} lebih sukar melepas elektron`
                  ) : '–'}
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-semibold text-slate-900">Elektronegativitas</td>
                <td className="p-2.5 font-bold">{el1.electronegativity ?? '–'}</td>
                <td className="p-2.5 font-bold">{el2.electronegativity ?? '–'}</td>
                <td className="p-2.5 font-sans text-slate-600">
                  {el1.electronegativity && el2.electronegativity ? (
                    el1.electronegativity > el2.electronegativity
                      ? `${el1.symbol} lebih kuat menarik pasangan elektron`
                      : `${el2.symbol} lebih kuat menarik pasangan elektron`
                  ) : '–'}
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-semibold text-slate-900">Konfigurasi Elektron</td>
                <td className="p-2.5 text-blue-700 font-bold">{el1.electronConfiguration}</td>
                <td className="p-2.5 text-indigo-700 font-bold">{el2.electronConfiguration}</td>
                <td className="p-2.5 font-sans text-slate-600">
                  e⁻ Valensi: {el1.valenceElectrons} vs {el2.valenceElectrons}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Trend Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TREND_CARDS.map((item) => (
          <div key={item.title} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center justify-between">
                <span>{item.title}</span>
              </h4>

              <div className="space-y-1 text-xs mb-3 font-mono">
                <div className="flex items-center gap-1.5 text-blue-700 bg-blue-50/80 px-2.5 py-1 rounded border border-blue-200">
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Periode (Kiri → Kanan): <strong>{item.directionPeriod}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-indigo-700 bg-indigo-50/80 px-2.5 py-1 rounded border border-indigo-200">
                  <ArrowDown className="w-3.5 h-3.5" />
                  <span>Golongan (Atas → Bawah): <strong>{item.directionGroup}</strong></span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {item.explanation}
              </p>
            </div>

            <div className="p-2.5 bg-amber-50/80 border border-amber-200 rounded-lg text-xs text-amber-900">
              <span className="font-bold flex items-center gap-1 mb-0.5">
                <HelpCircle className="w-3 h-3 text-amber-700" />
                Tips Ujian SMA:
              </span>
              <p className="text-[11px] leading-normal">{item.examTip}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
