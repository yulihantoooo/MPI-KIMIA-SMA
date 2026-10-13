import React, { useState, useEffect } from 'react';
import { PeriodicElement, CATEGORY_COLORS, SMA_MNEMONICS } from '../data/elements';
import { BohrAtomModel } from './BohrAtomModel';
import { OrbitalDiagram } from './OrbitalDiagram';
import { fetchPubChemCompound, PubChemProperty } from '../services/pubchemService';
import { X, ExternalLink, Atom, Flame, BookOpen, Layers, History, FlaskConical, AlertTriangle } from 'lucide-react';

interface ElementDetailModalProps {
  element: PeriodicElement | null;
  onClose: () => void;
  onSelectAnotherElement: (num: number) => void;
}

export const ElementDetailModal: React.FC<ElementDetailModalProps> = ({
  element,
  onClose,
  onSelectAnotherElement
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'pubchem' | 'sma' | 'history'>('overview');
  const [pubchemData, setPubchemData] = useState<PubChemProperty | null>(null);
  const [isLoadingPubchem, setIsLoadingPubchem] = useState<boolean>(false);
  const [selectedCompoundCid, setSelectedCompoundCid] = useState<number | null>(null);

  useEffect(() => {
    if (!element) return;
    setActiveTab('overview');
    const targetCid = element.commonCompounds[0]?.pubchemCid || element.pubchemCid;
    setSelectedCompoundCid(targetCid);
  }, [element]);

  useEffect(() => {
    if (!element || !selectedCompoundCid) return;
    let isMounted = true;
    setIsLoadingPubchem(true);

    fetchPubChemCompound(selectedCompoundCid)
      .then((data) => {
        if (isMounted) {
          setPubchemData(data);
          setIsLoadingPubchem(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setPubchemData(null);
          setIsLoadingPubchem(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [element, selectedCompoundCid]);

  if (!element) return null;

  const colors = CATEGORY_COLORS[element.category];

  // Find related mnemonic
  const relatedMnemonic = SMA_MNEMONICS.find(m =>
    m.elements.split(',').map(s => s.trim()).includes(element.symbol)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className={`p-4 sm:p-5 border-b border-slate-200 flex items-start justify-between ${colors.bg}`}>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl border-2 ${colors.border} flex flex-col items-center justify-center shadow-xs shrink-0`}>
              <span className="text-[11px] font-mono text-slate-500 font-semibold self-start ml-2 -mb-1">
                {element.number}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 leading-none">
                {element.symbol}
              </span>
              <span className="text-[10px] font-mono text-slate-600 font-medium">
                {element.atomicMass.toFixed(3)}
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{element.name}</h2>
                <span className="text-xs italic text-slate-500">({element.latinName})</span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${colors.badge}`}>
                  {element.categoryLabel}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-600">
                <span className="bg-white/80 px-2 py-0.5 rounded border border-slate-200">
                  Golongan {element.groupTraditional} ({element.group || '-'})
                </span>
                <span className="bg-white/80 px-2 py-0.5 rounded border border-slate-200">
                  Periode {element.period}
                </span>
                <span className="bg-white/80 px-2 py-0.5 rounded border border-slate-200">
                  Blok {element.block.toUpperCase()}
                </span>
                <span className="bg-white/80 px-2 py-0.5 rounded border border-slate-200 capitalize">
                  Wujud: {element.state === 'gas' ? 'Gas' : element.state === 'liquid' ? 'Cair' : 'Padat'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 border border-slate-200 transition shadow-2xs cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 px-4 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2.5 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Atom className="w-4 h-4" />
            Model Atom & Orbital
          </button>

          <button
            onClick={() => setActiveTab('properties')}
            className={`py-2.5 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'properties'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            Sifat Keperiodikan
          </button>

          <button
            onClick={() => setActiveTab('pubchem')}
            className={`py-2.5 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'pubchem'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            Senyawa & Data PubChem
          </button>

          <button
            onClick={() => setActiveTab('sma')}
            className={`py-2.5 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'sma'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Materi SMA & Hafalan
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`py-2.5 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer ${
              activeTab === 'history'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <History className="w-4 h-4" />
            Sejarah
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: OVERVIEW & BOHR MODEL */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
                <BohrAtomModel element={element} />

                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-2.5">
                      Ringkasan Konfigurasi Atom
                    </h4>
                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Konfigurasi Singkat:</span>
                        <strong className="text-blue-700">{element.electronConfiguration}</strong>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Elektron Valensi:</span>
                        <strong className="text-slate-900">{element.valenceElectrons}</strong>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Elektron per Kulit:</span>
                        <span className="text-slate-900 font-bold">{element.electronsPerShell.join(', ')}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-500">Bilangan Oksidasi Umum:</span>
                        <span className="text-slate-900 font-bold">
                          {element.oxidationStates.map(o => (o > 0 ? `+${o}` : o)).join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-2">
                      Deskripsi Unsur
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {element.summary}
                    </p>
                  </div>
                </div>
              </div>

              {/* Orbital Diagram Box */}
              <OrbitalDiagram element={element} />
            </div>
          )}

          {/* TAB 2: SIFAT KEPERIODIKAN */}
          {activeTab === 'properties' && (
            <div className="space-y-5">
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 leading-relaxed">
                <strong>Catatan Sifat Keperiodikan SMA:</strong> Tren dalam satu golongan dari atas ke bawah: jari-jari bertambah, energi ionisasi berkurang, elektronegativitas berkurang. Dalam satu periode dari kiri ke kanan: jari-jari berkurang, energi ionisasi bertambah, elektronegativitas bertambah.
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-mono block">Elektronegativitas</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-bold font-mono text-slate-900">
                      {element.electronegativity !== null ? element.electronegativity : '–'}
                    </span>
                    <span className="text-xs text-slate-500">skala Pauling</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Fluorin tertinggi (3.98)</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-mono block">Jari-Jari Atom</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-bold font-mono text-slate-900">
                      {element.atomicRadius !== null ? element.atomicRadius : '–'}
                    </span>
                    <span className="text-xs text-slate-500">pm</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">1 pm = 10⁻¹² meter</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-mono block">Energi Ionisasi Pertama</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-bold font-mono text-slate-900">
                      {element.ionizationEnergy !== null ? element.ionizationEnergy : '–'}
                    </span>
                    <span className="text-xs text-slate-500">kJ/mol</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Energi lepas 1e⁻ valensi</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-mono block">Titik Leleh</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-bold font-mono text-slate-900">
                      {element.meltingPoint !== null ? `${(element.meltingPoint - 273.15).toFixed(1)}°C` : '–'}
                    </span>
                    <span className="text-xs text-slate-500">
                      ({element.meltingPoint !== null ? `${element.meltingPoint} K` : '–'})
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Perubahan padat → cair</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-mono block">Titik Didih</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-bold font-mono text-slate-900">
                      {element.boilingPoint !== null ? `${(element.boilingPoint - 273.15).toFixed(1)}°C` : '–'}
                    </span>
                    <span className="text-xs text-slate-500">
                      ({element.boilingPoint !== null ? `${element.boilingPoint} K` : '–'})
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Perubahan cair → gas</span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-mono block">Massa Jenis / Densitas</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-xl font-bold font-mono text-slate-900">
                      {element.density !== null ? element.density : '–'}
                    </span>
                    <span className="text-xs text-slate-500">g/cm³</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Pada suhu kamar STP</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PUBCHEM & SENYAWA */}
          {activeTab === 'pubchem' && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-700">Sumber Data Kimia:</span>
                  <span className="font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
                    PubChem PUG REST API (NCBI NIH)
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">
                  Grounded in DeepMind Science Skills
                </span>
              </div>

              {/* Compound Selector Chips */}
              <div>
                <span className="text-xs font-semibold text-slate-600 block mb-2 font-mono uppercase">
                  Pilih Senyawa Kimia Penting untuk Diinspeksi:
                </span>
                <div className="flex flex-wrap gap-2">
                  {element.commonCompounds.map((comp) => {
                    const cid = comp.pubchemCid || element.pubchemCid;
                    const isSelected = selectedCompoundCid === cid;
                    return (
                      <button
                        key={comp.name}
                        onClick={() => setSelectedCompoundCid(cid)}
                        className={`text-xs px-3 py-1.5 rounded-xl border transition cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span className="font-mono">{comp.formula}</span>
                        <span className="opacity-80">({comp.name})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* PubChem live query card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
                {isLoadingPubchem ? (
                  <div className="text-center py-8 text-xs text-slate-500 font-mono animate-pulse">
                    Memuat data struktur dan sifat fisikokimia dari PubChem API...
                  </div>
                ) : pubchemData ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
                    {/* 2D Molecular Structure from PubChem */}
                    <div className="flex flex-col items-center bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                      <span className="text-[10px] font-mono text-slate-400 mb-1">
                        Diagram Struktur 2D (PubChem)
                      </span>
                      <img
                        src={pubchemData.imageUrl}
                        alt={pubchemData.MolecularFormula}
                        className="w-44 h-44 object-contain"
                        loading="lazy"
                      />
                      <span className="text-[10px] font-mono text-slate-500 mt-1">
                        CID: {pubchemData.CID}
                      </span>
                    </div>

                    {/* Physicochemical Properties Table */}
                    <div className="md:col-span-2 space-y-2.5 text-xs font-mono">
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Rumus Molekul:</span>
                        <strong className="text-slate-900 text-sm">{pubchemData.MolecularFormula}</strong>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200">
                        <span className="text-slate-500">Berat Molekul (MW):</span>
                        <strong className="text-slate-900">{pubchemData.MolecularWeight} g/mol</strong>
                      </div>
                      {pubchemData.IUPACName && (
                        <div className="py-1 border-b border-slate-200">
                          <span className="text-slate-500 block mb-0.5">Nama Resmi IUPAC:</span>
                          <span className="text-slate-800 break-all">{pubchemData.IUPACName}</span>
                        </div>
                      )}
                      {pubchemData.CanonicalSMILES && (
                        <div className="py-1 border-b border-slate-200">
                          <span className="text-slate-500 block mb-0.5">Notasi SMILES:</span>
                          <code className="text-blue-700 bg-blue-50 px-1 py-0.5 rounded break-all">
                            {pubchemData.CanonicalSMILES}
                          </code>
                        </div>
                      )}
                      {pubchemData.InChIKey && (
                        <div className="py-1 border-b border-slate-200">
                          <span className="text-slate-500 block mb-0.5">InChIKey:</span>
                          <span className="text-slate-600 break-all">{pubchemData.InChIKey}</span>
                        </div>
                      )}
                      {pubchemData.TPSA !== undefined && (
                        <div className="flex justify-between py-1">
                          <span className="text-slate-500">Topological Polar Surface Area (TPSA):</span>
                          <span className="text-slate-900 font-bold">{pubchemData.TPSA} Å²</span>
                        </div>
                      )}

                      <div className="pt-2">
                        <a
                          href={`https://pubchem.ncbi.nlm.nih.gov/compound/${pubchemData.CID}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          Buka Rekaman Resmi di PubChem Database
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-xs text-slate-500">
                    <p>Informasi senyawa tersedia di database PubChem.</p>
                    <a
                      href={`https://pubchem.ncbi.nlm.nih.gov/#query=${encodeURIComponent(element.name)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2 text-blue-600 font-semibold"
                    >
                      Cari langsung di PubChem <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: MATERI SMA & HAFALAN */}
          {activeTab === 'sma' && (
            <div className="space-y-4">
              {/* SMA Notes Box */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 sm:p-5 text-slate-800">
                <h4 className="text-sm font-bold text-amber-900 flex items-center gap-2 mb-2">
                  <Flame className="w-4 h-4 text-amber-600" />
                  Materi Penting Kimia SMA (Kelas 10, 11, 12):
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {element.smaNotes}
                </p>
              </div>

              {/* Mnemonic Jembatan Keledai */}
              {relatedMnemonic && (
                <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-4 sm:p-5">
                  <span className="text-[11px] font-mono uppercase text-purple-700 font-bold block mb-1">
                    Jembatan Keledai Hafalan Golongan {relatedMnemonic.group}:
                  </span>
                  <p className="text-sm sm:text-base font-extrabold text-purple-900 mb-1">
                    "{relatedMnemonic.phrase}"
                  </p>
                  <p className="text-xs text-purple-700 font-mono">
                    Urutan Unsur: {relatedMnemonic.elements}
                  </p>
                </div>
              )}

              {/* Common High School Compounds */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono mb-3">
                  Senyawa Penting Terkait dalam Soal Ujian SMA:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {element.commonCompounds.map((comp) => (
                    <div key={comp.name} className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                      <div className="flex items-center justify-between text-xs font-mono font-bold mb-1">
                        <span className="text-blue-700">{comp.formula}</span>
                        <span className="text-slate-800">{comp.name}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-normal">
                        {comp.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex justify-between py-1.5 border-b border-slate-200 text-xs">
                  <span className="text-slate-500 font-mono">Ditemukan Oleh:</span>
                  <strong className="text-slate-900 text-right">{element.discoveredBy}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200 text-xs">
                  <span className="text-slate-500 font-mono">Tahun Penemuan:</span>
                  <strong className="text-slate-900">{element.yearDiscovered}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-200 text-xs">
                  <span className="text-slate-500 font-mono">Nama Latin / Asal Usul:</span>
                  <span className="text-slate-900 italic">{element.latinName}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Nav Bar (Quick Previous / Next Element Buttons) */}
        <div className="p-3 bg-slate-100/90 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
          <button
            onClick={() => onSelectAnotherElement(Math.max(1, element.number - 1))}
            disabled={element.number <= 1}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-40 transition cursor-pointer"
          >
            ← Unsur Sebelumnya (Z={Math.max(1, element.number - 1)})
          </button>

          <span className="text-slate-500 hidden sm:inline">
            Unsur {element.number} dari 118
          </span>

          <button
            onClick={() => onSelectAnotherElement(Math.min(118, element.number + 1))}
            disabled={element.number >= 118}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-40 transition cursor-pointer"
          >
            Unsur Berikutnya (Z={Math.min(118, element.number + 1)}) →
          </button>
        </div>
      </div>
    </div>
  );
};
