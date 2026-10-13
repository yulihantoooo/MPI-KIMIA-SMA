import React, { useState, useMemo } from 'react';
import { parseChemicalFormula } from '../utils/formulaParser';
import { Calculator, ArrowRightLeft, Sparkles, Scale } from 'lucide-react';

export const StoichiometryCalculator: React.FC = () => {
  const [formulaInput, setFormulaInput] = useState<string>('H2SO4');
  const [massInput, setMassInput] = useState<string>('98.08');
  const [moleInput, setMoleInput] = useState<string>('1');

  const parsed = useMemo(() => parseChemicalFormula(formulaInput), [formulaInput]);

  const QUICK_FORMULAS = [
    { label: 'Asam Sulfat', formula: 'H2SO4' },
    { label: 'Air', formula: 'H2O' },
    { label: 'Glukosa', formula: 'C6H12O6' },
    { label: 'Kalsium Hidroksida', formula: 'Ca(OH)2' },
    { label: 'Aluminium Sulfat', formula: 'Al2(SO4)3' },
    { label: 'Garam Dapur', formula: 'NaCl' },
    { label: 'Kalium Permanganat', formula: 'KMnO4' },
    { label: 'Aspirin', formula: 'C9H8O4' }
  ];

  // Calculations based on parsed.molarMass
  const molarMass = parsed.molarMass || 1;
  const currentMoles = parseFloat(moleInput) || 0;
  const currentMass = parseFloat(massInput) || 0;

  const handleMassChange = (val: string) => {
    setMassInput(val);
    const m = parseFloat(val);
    if (!isNaN(m) && molarMass > 0) {
      setMoleInput((m / molarMass).toFixed(4).replace(/\.?0+$/, ''));
    }
  };

  const handleMoleChange = (val: string) => {
    setMoleInput(val);
    const mol = parseFloat(val);
    if (!isNaN(mol) && molarMass > 0) {
      setMassInput((mol * molarMass).toFixed(3).replace(/\.?0+$/, ''));
    }
  };

  const gasVolumeStp = (currentMoles * 22.4).toFixed(3);
  const particleCount = (currentMoles * 6.022e23).toExponential(3);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-blue-600" />
            Kalkulator Massa Molar & Stoikiometri Kimia SMA
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Hitung Massa Molekul Relatif ($M_r$), persentase unsur, mol, volume gas STP, dan jumlah partikel Avogadro.
          </p>
        </div>
      </div>

      {/* Quick Example Formulas */}
      <div className="mb-4">
        <span className="text-xs font-semibold text-slate-500 block mb-1.5 font-mono uppercase tracking-wide">
          Pilih Rumus Kimia Cepat:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {QUICK_FORMULAS.map((item) => (
            <button
              key={item.formula}
              onClick={() => {
                setFormulaInput(item.formula);
                const res = parseChemicalFormula(item.formula);
                if (res.isValid) {
                  setMoleInput('1');
                  setMassInput(res.molarMass.toFixed(2));
                }
              }}
              className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition cursor-pointer ${
                formulaInput === item.formula
                  ? 'bg-blue-600 text-white border-blue-600 font-bold'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {item.formula} <span className="text-[10px] opacity-80">({item.label})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Rumus */}
      <div className="mb-5">
        <label className="text-xs font-semibold text-slate-700 block mb-1">
          Ketik Rumus Kimia (Mendukung tanda kurung, misal: <code className="text-blue-600">Al2(SO4)3</code>):
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={formulaInput}
            onChange={(e) => {
              setFormulaInput(e.target.value);
              const res = parseChemicalFormula(e.target.value);
              if (res.isValid) {
                const mol = parseFloat(moleInput) || 1;
                setMassInput((mol * res.molarMass).toFixed(2));
              }
            }}
            placeholder="Contoh: Ca(OH)2 atau C6H12O6"
            className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-base font-mono font-bold text-slate-800 shadow-2xs focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        {parsed.error && (
          <p className="text-xs text-rose-600 mt-1 font-medium">{parsed.error}</p>
        )}
      </div>

      {parsed.isValid && (
        <div className="space-y-4">
          {/* Main Molar Mass Result Banner */}
          <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs uppercase tracking-wider text-blue-200 font-mono block">
                Massa Molekul Relatif (Mᵣ)
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono tracking-tight">
                  {parsed.molarMass.toFixed(3)}
                </span>
                <span className="text-blue-200 text-sm font-medium">g/mol</span>
              </div>
            </div>
            <div className="text-right text-xs text-blue-100">
              <span className="font-mono font-semibold block">{parsed.formula}</span>
              <span>Total {parsed.elements.reduce((acc, el) => acc + el.count, 0)} atom dalam molekul</span>
            </div>
          </div>

          {/* Elemental Mass Composition Breakdown */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide font-mono mb-2.5 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-blue-600" />
              Persentase Komposisi Massa (% Unsur)
            </h4>

            {/* Progress bar stack */}
            <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden flex mb-3 shadow-inner">
              {parsed.elements.map((el, idx) => {
                const colors = [
                  'bg-blue-500',
                  'bg-emerald-500',
                  'bg-amber-500',
                  'bg-rose-500',
                  'bg-purple-500',
                  'bg-cyan-500'
                ];
                return (
                  <div
                    key={el.symbol}
                    style={{ width: `${el.percentage}%` }}
                    className={`${colors[idx % colors.length]} transition-all`}
                    title={`${el.symbol}: ${el.percentage.toFixed(1)}%`}
                  />
                );
              })}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {parsed.elements.map((el) => (
                <div key={el.symbol} className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-slate-900">{el.symbol} ({el.name})</span>
                    <span className="text-blue-600">{el.percentage.toFixed(1)}%</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5 flex justify-between">
                    <span>{el.count} × {el.atomicMass.toFixed(2)}</span>
                    <span>= {el.totalMass.toFixed(2)} g</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stoichiometric Interactive Conversion */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide font-mono mb-3 flex items-center gap-1.5">
              <ArrowRightLeft className="w-3.5 h-3.5 text-blue-600" />
              Jembatan Mol & Konversi Stoikiometri (Materi SMA)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  Massa Sampel (Gram):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    value={massInput}
                    onChange={(e) => handleMassChange(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-mono font-bold text-slate-800 shadow-2xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <span className="absolute right-3 top-2 text-xs text-slate-400 font-mono">g</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">
                  Jumlah Mol (n = gram / Mᵣ):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    value={moleInput}
                    onChange={(e) => handleMoleChange(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-sm font-mono font-bold text-slate-800 shadow-2xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <span className="absolute right-3 top-2 text-xs text-slate-400 font-mono">mol</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 font-mono block">
                  Volume Gas pada STP (0°C, 1 atm):
                </span>
                <span className="text-sm font-extrabold text-blue-700 font-mono">
                  {gasVolumeStp} <span className="text-xs font-normal text-slate-600">Liter (V = n × 22.4 L)</span>
                </span>
              </div>

              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-500 font-mono block">
                  Jumlah Partikel Molekul:
                </span>
                <span className="text-sm font-extrabold text-indigo-700 font-mono">
                  {particleCount} <span className="text-xs font-normal text-slate-600">molekul (N = n × L)</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
