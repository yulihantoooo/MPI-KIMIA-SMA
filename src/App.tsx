/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ALL_ELEMENTS, PeriodicElement } from './data/elements';
import { PeriodicTableGrid } from './components/PeriodicTableGrid';
import { ElementDetailModal } from './components/ElementDetailModal';
import { BohrAtomModel } from './components/BohrAtomModel';
import { OrbitalDiagram } from './components/OrbitalDiagram';
import { BondingSimulator } from './components/BondingSimulator';
import { StoichiometryCalculator } from './components/StoichiometryCalculator';
import { PeriodicTrendsGuide } from './components/PeriodicTrendsGuide';
import { ChemistryQuiz } from './components/ChemistryQuiz';
import { TkaExamPractice } from './components/TkaExamPractice';
import {
  Search,
  Atom,
  Layers,
  Sparkles,
  Calculator,
  TrendingUp,
  Award,
  BookOpen,
  FlaskConical,
  Flame,
  Info,
  GraduationCap
} from 'lucide-react';

export default function App() {
  const [activeNav, setActiveNav] = useState<'table' | 'bohr' | 'bonding' | 'stoichiometry' | 'trends' | 'quiz' | 'tka'>('table');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [selectedElement, setSelectedElement] = useState<PeriodicElement | null>(null);
  const [bohrElementNumber, setBohrElementNumber] = useState<number>(6); // Default Karbon

  const bohrElement = ALL_ELEMENTS.find(e => e.number === bohrElementNumber) || ALL_ELEMENTS[5];

  const QUICK_ELEMENT_CHIPS = [
    { number: 1, label: 'H (Hidrogen)' },
    { number: 6, label: 'C (Karbon)' },
    { number: 8, label: 'O (Oksigen)' },
    { number: 11, label: 'Na (Natrium)' },
    { number: 17, label: 'Cl (Klorin)' },
    { number: 26, label: 'Fe (Besi)' },
    { number: 29, label: 'Cu (Tembaga)' },
    { number: 79, label: 'Au (Emas)' },
    { number: 92, label: 'U (Uranium)' }
  ];

  const handleSelectElement = (element: PeriodicElement) => {
    setSelectedElement(element);
    setBohrElementNumber(element.number);
  };

  const handleSelectAnotherInModal = (num: number) => {
    const el = ALL_ELEMENTS.find(e => e.number === num);
    if (el) {
      setSelectedElement(el);
      setBohrElementNumber(el.number);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Logo and Titles */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center text-white font-mono font-extrabold text-lg shadow-sm">
                Pt
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                    Tabel Periodik Interaktif SMA
                  </h1>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                    Kurikulum SMA
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                    <span className="font-bold">YULIANTO HARSONO</span>
                    <span className="text-emerald-500 font-light">|</span>
                    <span className="font-semibold text-emerald-800">Pengawas SMA Cabdin X</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500">
                  Model Atom Bohr · Konfigurasi Orbital · Ikatan Kimia · Integrasi Data PubChem
                </p>
              </div>
            </div>

            {/* Quick Search & Filter */}
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari simbol, nama, nomor atom (cth: Fe, Emas, 26)..."
                  className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="">Semua Kategori</option>
                <option value="alkali-metal">Logam Alkali</option>
                <option value="alkaline-earth">Logam Alkali Tanah</option>
                <option value="transition-metal">Logam Transisi</option>
                <option value="post-transition-metal">Logam Pascatransisi</option>
                <option value="metalloid">Metaloid</option>
                <option value="nonmetal">Nonlogam Reaktif</option>
                <option value="halogen">Halogen</option>
                <option value="noble-gas">Gas Mulia</option>
                <option value="lanthanide">Lantanida</option>
                <option value="actinide">Aktinida</option>
              </select>
            </div>
          </div>

          {/* Quick-Try Example Chip Bar (Mandatory Science Skill Standard) */}
          <div className="flex items-center gap-2 mt-2.5 pt-2 border-t border-slate-100 overflow-x-auto text-xs">
            <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold shrink-0">
              Coba Cepat:
            </span>
            <div className="flex gap-1.5 shrink-0">
              {QUICK_ELEMENT_CHIPS.map((chip: { number: number; label: string }) => {
                const el = ALL_ELEMENTS.find(e => e.number === chip.number);
                return (
                  <button
                    key={chip.number}
                    onClick={() => el && handleSelectElement(el)}
                    className="px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-mono text-xs border border-slate-200 transition cursor-pointer"
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>
            <div className="ml-auto flex items-center gap-2 text-[11px] text-slate-400 font-mono shrink-0">
              <span className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                118 Unsur IUPAC
              </span>
              <span className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                PubChem PUG REST
              </span>
            </div>
          </div>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="bg-slate-50/90 border-t border-slate-200 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex gap-1 overflow-x-auto py-1.5">
            <button
              onClick={() => setActiveNav('table')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer ${
                activeNav === 'table'
                  ? 'bg-blue-600 text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              Tabel Periodik Utama
            </button>

            <button
              onClick={() => setActiveNav('bohr')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer ${
                activeNav === 'bohr'
                  ? 'bg-blue-600 text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Atom className="w-4 h-4" />
              Model Atom Bohr & Orbital
            </button>

            <button
              onClick={() => setActiveNav('bonding')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer ${
                activeNav === 'bonding'
                  ? 'bg-blue-600 text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Simulator Ikatan Kimia
            </button>

            <button
              onClick={() => setActiveNav('stoichiometry')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer ${
                activeNav === 'stoichiometry'
                  ? 'bg-blue-600 text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Calculator className="w-4 h-4" />
              Kalkulator Stoikiometri & Mᵣ
            </button>

            <button
              onClick={() => setActiveNav('trends')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer ${
                activeNav === 'trends'
                  ? 'bg-blue-600 text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Tren Keperiodikan Unsur
            </button>

            <button
              onClick={() => setActiveNav('quiz')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer ${
                activeNav === 'quiz'
                  ? 'bg-blue-600 text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Award className="w-4 h-4" />
              Kuis Kimia SMA
            </button>

            <button
              onClick={() => setActiveNav('tka')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer ${
                activeNav === 'tka'
                  ? 'bg-emerald-600 text-white shadow-2xs font-bold ring-2 ring-emerald-400'
                  : 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              Latihan Soal TKA (Kemendikdasmen)
            </button>
          </div>
        </div>
      </header>

      {/* Main Body View */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {activeNav === 'table' && (
          <div className="space-y-4">
            <PeriodicTableGrid
              onSelectElement={handleSelectElement}
              selectedElementNumber={selectedElement?.number}
              searchQuery={searchQuery}
              categoryFilter={categoryFilter}
            />
          </div>
        )}

        {activeNav === 'bohr' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Atom className="w-4 h-4 text-blue-600" />
                    Laboratorium Visualisasi Model Atom Bohr & Konfigurasi Orbital
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Pilih unsur kimia untuk melihat orbit elektron per kulit (K, L, M, N, O, P, Q), kotak orbital Hund, dan 4 bilangan kuantum.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600">Pilih Unsur:</span>
                  <select
                    value={bohrElementNumber}
                    onChange={(e) => setBohrElementNumber(Number(e.target.value))}
                    className="bg-slate-50 border border-slate-300 rounded-lg p-1.5 text-xs font-medium text-slate-800 shadow-2xs outline-none"
                  >
                    {ALL_ELEMENTS.slice(0, 54).map((el) => (
                      <option key={el.number} value={el.number}>
                        {el.number}. {el.name} ({el.symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
                <BohrAtomModel element={bohrElement} />

                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-2">
                      Profil Atom: {bohrElement.name} ({bohrElement.symbol})
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="bg-white p-2 rounded-lg border border-slate-200">
                        <span className="text-slate-400 block text-[10px]">Nomor Atom (Z):</span>
                        <strong className="text-slate-900">{bohrElement.number} Proton</strong>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-slate-200">
                        <span className="text-slate-400 block text-[10px]">Massa Atom (A):</span>
                        <strong className="text-slate-900">{bohrElement.atomicMass.toFixed(3)}</strong>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-slate-200">
                        <span className="text-slate-400 block text-[10px]">Jumlah Kulit:</span>
                        <strong className="text-blue-700">{bohrElement.electronsPerShell.length} Kulit (n=1..{bohrElement.electronsPerShell.length})</strong>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-slate-200">
                        <span className="text-slate-400 block text-[10px]">Elektron Valensi:</span>
                        <strong className="text-blue-700">{bohrElement.valenceElectrons} e⁻</strong>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-xl text-xs text-blue-900 leading-relaxed">
                    <strong>Konsep Bohr di SMA:</strong> Menurut Niels Bohr (1913), elektron mengelilingi inti pada lintasan stasioner tertentu tanpa memancarkan energi radiasi. Elektron dapat berpindah ke lintasan lebih tinggi (eksitasi) dengan menyerap foton energi, atau ke lintasan lebih rendah (de-eksitasi) dengan memancarkan spektrum foton cahaya (dasar uji nyala api!).
                  </div>

                  <button
                    onClick={() => setSelectedElement(bohrElement)}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition cursor-pointer"
                  >
                    Buka Rincian Lengkap & Data PubChem {bohrElement.name} →
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <OrbitalDiagram element={bohrElement} />
              </div>
            </div>
          </div>
        )}

        {activeNav === 'bonding' && (
          <BondingSimulator initialElement={selectedElement || undefined} />
        )}

        {activeNav === 'stoichiometry' && (
          <StoichiometryCalculator />
        )}

        {activeNav === 'trends' && (
          <PeriodicTrendsGuide />
        )}

        {activeNav === 'quiz' && (
          <ChemistryQuiz />
        )}

        {activeNav === 'tka' && (
          <TkaExamPractice />
        )}
      </main>

      {/* Element Detail Inspector Modal */}
      <ElementDetailModal
        element={selectedElement}
        onClose={() => setSelectedElement(null)}
        onSelectAnotherElement={handleSelectAnotherInModal}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-5 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 font-mono">
            <span className="font-bold text-slate-800">Tabel Periodik Interaktif SMA</span>
            <span>·</span>
            <span>Standar IUPAC & Kimia Nasional</span>
            <span>·</span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold font-sans">
              Pembina: YULIANTO HARSONO (Pengawas SMA Cabdin X)
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-400 font-mono">
            <span>PubChem API Grounded</span>
            <span>·</span>
            <span>Google DeepMind Science Skills</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
