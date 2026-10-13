import React, { useState } from 'react';
import { PeriodicElement, ALL_ELEMENTS } from '../data/elements';
import { Sparkles, ArrowRight, Info, CheckCircle2 } from 'lucide-react';

interface BondingSimulatorProps {
  initialElement?: PeriodicElement;
}

export const BondingSimulator: React.FC<BondingSimulatorProps> = ({ initialElement }) => {
  const [el1Number, setEl1Number] = useState<number>(initialElement?.number || 11); // Na
  const [el2Number, setEl2Number] = useState<number>(17); // Cl

  const el1 = ALL_ELEMENTS.find(e => e.number === el1Number) || ALL_ELEMENTS[10];
  const el2 = ALL_ELEMENTS.find(e => e.number === el2Number) || ALL_ELEMENTS[16];

  // Helper presets
  const PRESETS = [
    { name: 'Garam Dapur (NaCl)', el1: 11, el2: 17 },
    { name: 'Air (H₂O)', el1: 1, el2: 8 },
    { name: 'Gas Karbon Dioksida (CO₂)', el1: 6, el2: 8 },
    { name: 'Magnesium Oksida (MgO)', el1: 12, el2: 8 },
    { name: 'Asam Klorida (HCl)', el1: 1, el2: 17 },
    { name: 'Metana (CH₄)', el1: 6, el2: 1 },
    { name: 'Aluminium Oksida (Al₂O₃)', el1: 13, el2: 8 },
    { name: 'Logam Besi (Fe-Fe)', el1: 26, el2: 26 }
  ];

  // Analysis
  const isMetal = (el: PeriodicElement) =>
    ['alkali-metal', 'alkaline-earth', 'transition-metal', 'post-transition-metal', 'lanthanide', 'actinide'].includes(el.category);
  const isNonmetal = (el: PeriodicElement) =>
    ['nonmetal', 'halogen'].includes(el.category);
  const isNobleGas = (el: PeriodicElement) => el.category === 'noble-gas';

  const m1 = isMetal(el1);
  const m2 = isMetal(el2);
  const nm1 = isNonmetal(el1);
  const nm2 = isNonmetal(el2);
  const ng1 = isNobleGas(el1);
  const ng2 = isNobleGas(el2);

  const en1 = el1.electronegativity ?? 1.5;
  const en2 = el2.electronegativity ?? 1.5;
  const deltaEn = Math.abs(en1 - en2);

  let bondType = '';
  let bondColor = '';
  let mechanism = '';
  let physicalProperties = '';
  let predictedFormula = '';

  if (ng1 || ng2) {
    bondType = 'Tidak Berikatan (Gas Mulia Inert)';
    bondColor = 'bg-slate-100 text-slate-700 border-slate-300';
    mechanism = 'Gas mulia memiliki konfigurasi elektron duplet/oktet penuh yang sudah stabil sempurna, sehingga umumnya tidak membentuk ikatan spontan pada kondisi standar.';
    physicalProperties = 'Berada sebagai atom-atom tunggal (monoatomik) berwujud gas dengan gaya dispersi London antaratom yang sangat lemah.';
    predictedFormula = `${el1.symbol} + ${el2.symbol} (Tak Bereaksi)`;
  } else if (m1 && m2) {
    bondType = 'Ikatan Logam';
    bondColor = 'bg-amber-100 text-amber-900 border-amber-300';
    mechanism = 'Kedua atom adalah logam. Elektron valensi mengalami delokalisasi membentuk "lautan elektron" bergerak bebas di antara kation-kation logam bermuatan positif.';
    physicalProperties = 'Menghantarkan listrik & panas dengan sangat baik, dapat ditempa (malleable), liat/ditarik (ductile), dan mengkilap.';
    predictedFormula = el1.symbol === el2.symbol ? `Kristal Kisi ${el1.symbol}` : `Paduan Logam (Alloy) ${el1.symbol}-${el2.symbol}`;
  } else if ((m1 && nm2) || (m2 && nm1) || deltaEn >= 1.7) {
    bondType = 'Ikatan Ionik';
    bondColor = 'bg-rose-100 text-rose-900 border-rose-300';
    const metal = m1 ? el1 : el2;
    const nonmetal = m1 ? el2 : el1;
    mechanism = `Atom logam ${metal.name} melepaskan elektron valensi membentuk kation positif, sedangkan atom nonlogam ${nonmetal.name} menerima elektron membentuk anion negatif. Terjadi gaya tarik-menarik elektrostatik kuat antar-ion berlawanan muatan.`;
    physicalProperties = 'Titik leleh dan didih sangat tinggi, kristal keras namun rapuh (brittle), tidak menghantarkan listrik dalam bentuk padat tetapi menghantarkan listrik saat dilelehkan atau dilarutkan dalam air (elektrolit kuat).';

    // stoichiometric prediction
    const val1 = Math.max(1, Math.min(3, metal.valenceElectrons <= 3 ? metal.valenceElectrons : 2));
    const val2 = Math.max(1, 8 - nonmetal.valenceElectrons);
    // simplify subscripts
    const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b));
    const divisor = gcd(val1, val2);
    const subMetal = val2 / divisor;
    const subNonmetal = val1 / divisor;
    predictedFormula = `${metal.symbol}${subMetal > 1 ? subMetal : ''}${nonmetal.symbol}${subNonmetal > 1 ? subNonmetal : ''}`;
  } else {
    // Nonmetal + Nonmetal
    if (deltaEn < 0.5) {
      bondType = 'Ikatan Kovalen Nonpolar';
      bondColor = 'bg-emerald-100 text-emerald-900 border-emerald-300';
      mechanism = `Kedua atom nonlogam memiliki elektronegativitas hampir sama (ΔEN = ${deltaEn.toFixed(2)}). Pasangan elektron ikatan ditarik secara merata oleh kedua inti atom, tidak terjadi pengutuban muatan (momen dipol = 0).`;
      physicalProperties = 'Titik leleh & didih relatif rendah, tidak menghantarkan listrik (nonelektrolit), umumnya larut dalam pelarut nonpolar.';
    } else {
      bondType = 'Ikatan Kovalen Polar';
      bondColor = 'bg-sky-100 text-sky-900 border-sky-300';
      const moreElectro = en1 > en2 ? el1 : el2;
      mechanism = `Terdapat selisih elektronegativitas signifikan (ΔEN = ${deltaEn.toFixed(2)}). Pasangan elektron ikatan lebih tertarik ke arah atom ${moreElectro.name} sehingga timbul kutub muatan parsial negatif (δ⁻) dan kutub positif (δ⁺).`;
      physicalProperties = 'Dapat larut dalam pelarut polar (seperti air), titik didih lebih tinggi dibandingkan kovalen nonpolar karena adanya gaya tarik dipol-dipol, beberapa larutannya dapat menghantarkan listrik.';
    }
    const v1 = el1.symbol === 'H' ? 1 : 8 - el1.valenceElectrons;
    const v2 = el2.symbol === 'H' ? 1 : 8 - el2.valenceElectrons;
    if (el1.number === el2.number) {
      predictedFormula = `${el1.symbol}₂ (Molekul Diatomik)`;
    } else {
      predictedFormula = `${el1.symbol}${v2 > 1 ? v2 : ''}${el2.symbol}${v1 > 1 ? v1 : ''}`;
    }
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Simulator Ikatan Kimia SMA
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Eksplorasi pembentukan ikatan ionik, kovalen polar/nonpolar, dan logam berdasarkan elektronegativitas & elektron valensi.
          </p>
        </div>
      </div>

      {/* Preset Chips */}
      <div className="mb-4">
        <span className="text-xs font-semibold text-slate-500 block mb-1.5 font-mono uppercase tracking-wide">
          Contoh Molekul / Senyawa Cepat:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => {
                setEl1Number(p.el1);
                setEl2Number(p.el2);
              }}
              className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-lg border border-slate-200 transition font-medium cursor-pointer"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Element Selectors Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Element 1 Card */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
          <label className="text-xs font-semibold text-slate-600 block mb-1.5">Unsur Pertama:</label>
          <select
            value={el1Number}
            onChange={(e) => setEl1Number(Number(e.target.value))}
            className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-medium text-slate-800 shadow-2xs focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {ALL_ELEMENTS.slice(0, 54).map((e) => (
              <option key={e.number} value={e.number}>
                {e.number}. {e.name} ({e.symbol}) - Gol {e.groupTraditional}
              </option>
            ))}
          </select>
          <div className="mt-2 text-xs flex justify-between text-slate-600 font-mono">
            <span>Elektronegativitas: <strong>{el1.electronegativity ?? '-'}</strong></span>
            <span>e⁻ Valensi: <strong>{el1.valenceElectrons}</strong></span>
            <span className="capitalize text-blue-700">{el1.categoryLabel}</span>
          </div>
        </div>

        {/* Element 2 Card */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
          <label className="text-xs font-semibold text-slate-600 block mb-1.5">Unsur Kedua:</label>
          <select
            value={el2Number}
            onChange={(e) => setEl2Number(Number(e.target.value))}
            className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-medium text-slate-800 shadow-2xs focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {ALL_ELEMENTS.slice(0, 54).map((e) => (
              <option key={e.number} value={e.number}>
                {e.number}. {e.name} ({e.symbol}) - Gol {e.groupTraditional}
              </option>
            ))}
          </select>
          <div className="mt-2 text-xs flex justify-between text-slate-600 font-mono">
            <span>Elektronegativitas: <strong>{el2.electronegativity ?? '-'}</strong></span>
            <span>e⁻ Valensi: <strong>{el2.valenceElectrons}</strong></span>
            <span className="capitalize text-blue-700">{el2.categoryLabel}</span>
          </div>
        </div>
      </div>

      {/* Analysis Outcome Card */}
      <div className="p-4 bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200 rounded-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
              Hasil Analisis Ikatan:
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${bondColor}`}>
              {bondType}
            </span>
          </div>
          <div className="text-xs font-mono bg-white px-2.5 py-1 rounded-md border border-slate-200 text-slate-700">
            ΔEN = |{en1.toFixed(2)} - {en2.toFixed(2)}| = <strong>{deltaEn.toFixed(2)}</strong>
          </div>
        </div>

        {/* Reaction Equation / Formula Box */}
        <div className="bg-white p-3 rounded-lg border border-slate-200 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm">
            <span className="font-bold text-slate-900 font-mono text-base">{el1.symbol}</span>
            <span className="text-slate-400">+</span>
            <span className="font-bold text-slate-900 font-mono text-base">{el2.symbol}</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
            <span className="font-extrabold text-blue-700 font-mono text-base bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {predictedFormula}
            </span>
          </div>
        </div>

        {/* Mechanism Explanation */}
        <div className="space-y-2 text-xs">
          <div className="p-3 bg-white/80 rounded-lg border border-slate-200">
            <h5 className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              Mekanisme Transfer / Pemakaian Elektron (Konsep Kimia SMA):
            </h5>
            <p className="text-slate-600 leading-relaxed">{mechanism}</p>
          </div>

          <div className="p-3 bg-white/80 rounded-lg border border-slate-200">
            <h5 className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-slate-600" />
              Karakteristik & Sifat Fisis Senyawa Terbentuk:
            </h5>
            <p className="text-slate-600 leading-relaxed">{physicalProperties}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
