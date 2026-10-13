import React from 'react';

interface TkaStimulusImageProps {
  questionId: number;
}

export const TkaStimulusImage: React.FC<TkaStimulusImageProps> = ({ questionId }) => {
  if (questionId === 1) {
    // QUESTION 1: Grafik Lonjakan Energi Ionisasi Bertingkat IE₁ - IE₅
    const data = [
      { label: 'IE₁', val: 496, color: '#2563eb', height: 25 },
      { label: 'IE₂', val: 4562, color: '#dc2626', height: 110 },
      { label: 'IE₃', val: 6910, color: '#ea580c', height: 155 },
      { label: 'IE₄', val: 9543, color: '#ea580c', height: 195 },
      { label: 'IE₅', val: 13353, color: '#ea580c', height: 235 },
    ];

    return (
      <div className="bg-slate-900 text-white rounded-xl p-4 my-3 border border-slate-700 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            Gambar Stimulus 1: Grafik Batang Energi Ionisasi Bertingkat (kJ/mol)
          </span>
          <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            Unsur X (Fase Gas)
          </span>
        </div>

        <div className="relative pt-6 pb-2 px-4 flex items-end justify-around h-64 border-b border-slate-700">
          {/* Spike annotation bracket */}
          <div className="absolute top-2 left-[24%] flex flex-col items-center animate-pulse">
            <span className="text-[11px] font-mono font-extrabold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-500 shadow-sm">
              ▲ Lonjakan Drastis 9.2× Lipat! (Δ = +4066 kJ/mol)
            </span>
            <span className="text-xs text-amber-400">Elektron Kulit Dalam (Inert Core)</span>
          </div>

          {/* Bar Charts */}
          {data.map((item, idx) => (
            <div key={item.label} className="flex flex-col items-center gap-1.5 w-14">
              <span className="text-[10px] font-mono font-bold text-slate-300">
                {item.val}
              </span>
              <div
                style={{ height: `${item.height}px`, backgroundColor: item.color }}
                className="w-10 rounded-t-md transition-all shadow-md relative group flex justify-center"
              >
                {idx === 0 && (
                  <span className="absolute -top-5 text-[9px] font-mono text-cyan-300 font-bold whitespace-nowrap">
                    e⁻ Valensi
                  </span>
                )}
              </div>
              <span className={`text-xs font-mono font-bold mt-1 ${idx === 0 ? 'text-cyan-400' : 'text-slate-300'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-2 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-blue-600"></span>
              <span>Kulit Terluar (Valensi: 1 e⁻)</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-red-600"></span>
              <span>Kulit Dalam yang Sangat Stabil</span>
            </span>
          </div>
          <span className="text-cyan-300 font-semibold">
            Kesimpulan: Golongan IA (Logam Alkali)
          </span>
        </div>
      </div>
    );
  }

  if (questionId === 2) {
    // QUESTION 2: Perbandingan Jari-Jari Spesi Isoelektronik 10 Elektron
    const particles = [
      { symbol: '₁₂Mg²⁺', protons: 12, electrons: 10, radiusPm: 72, radiusVisual: 26, color: '#38bdf8', label: 'Terkecil' },
      { symbol: '₁₁Na⁺', protons: 11, electrons: 10, radiusPm: 102, radiusVisual: 32, color: '#60a5fa', label: '' },
      { symbol: '₁₀Ne', protons: 10, electrons: 10, radiusPm: 112, radiusVisual: 36, color: '#a78bfa', label: 'Atom Netral' },
      { symbol: '₉F⁻', protons: 9, electrons: 10, radiusPm: 133, radiusVisual: 42, color: '#fb923c', label: '' },
      { symbol: '₈O²⁻', protons: 8, electrons: 10, radiusPm: 140, radiusVisual: 46, color: '#f87171', label: 'Terbesar' },
    ];

    return (
      <div className="bg-slate-900 text-white rounded-xl p-4 my-3 border border-slate-700 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            Gambar Stimulus 2: Perbandingan Jari-Jari Spesi Isoelektronik (10 Elektron)
          </span>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700">
            Konfigurasi: 1s² 2s² 2p⁶
          </span>
        </div>

        {/* Visual Spheres Container */}
        <div className="py-4 px-2 flex flex-wrap items-center justify-around gap-2 bg-slate-950/60 rounded-xl border border-slate-800">
          {particles.map((p) => (
            <div key={p.symbol} className="flex flex-col items-center">
              {/* Outer electron sphere representation */}
              <div
                className="rounded-full border-2 border-dashed flex items-center justify-center transition-all relative shadow-inner"
                style={{
                  width: `${p.radiusVisual * 2}px`,
                  height: `${p.radiusVisual * 2}px`,
                  borderColor: p.color,
                  backgroundColor: `${p.color}15`,
                }}
              >
                {/* Nucleus dot */}
                <div
                  style={{ backgroundColor: p.color }}
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold font-mono text-slate-950 shadow-md"
                >
                  {p.protons}+
                </div>
              </div>

              {/* Label Info */}
              <div className="text-center mt-2 font-mono">
                <span className="block text-sm font-bold text-white">{p.symbol}</span>
                <span className="text-[10px] text-slate-400 block">{p.radiusPm} pm</span>
                <span className="text-[9px] text-cyan-400 font-semibold">{p.protons}p : 10e</span>
                {p.label && (
                  <span className="inline-block mt-0.5 text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-amber-300 border border-slate-700">
                    {p.label}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Explanatory trend arrow */}
        <div className="mt-3 p-2 bg-slate-800/80 rounded-lg border border-slate-700 text-[11px] flex items-center justify-between text-slate-300 font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-cyan-400 font-bold">12p⁺ (Mg²⁺) → 8p⁺ (O²⁻):</span>
            <span>Jumlah proton berkurang, muatan inti efektif (Z_eff) melemah.</span>
          </div>
          <span className="text-amber-300 font-bold">
            Jari-jari: Mg²⁺ &lt; Na⁺ &lt; Ne &lt; F⁻ &lt; O²⁻
          </span>
        </div>
      </div>
    );
  }

  if (questionId === 3) {
    // QUESTION 3: Geometri Molekul & Kepolaran SF₄ vs CCl₄
    return (
      <div className="bg-slate-900 text-white rounded-xl p-4 my-3 border border-slate-700 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            Gambar Stimulus 3: Struktur Geometri Ruang & Kepolaran SF₄ vs CCl₄
          </span>
          <span className="text-[11px] font-mono text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
            Teori VSEPR / Domain Elektron
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
          {/* Molekul SF4 (Kiri) */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
            <div className="w-full flex justify-between text-[11px] font-mono mb-2">
              <span className="font-bold text-blue-400">Belerang Tetrafluorida (SF₄)</span>
              <span className="px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold">
                POLAR (μ ≠ 0)
              </span>
            </div>

            {/* SVG Diagram of SF4 (Seesaw Geometry) */}
            <svg width="220" height="150" viewBox="0 0 220 150" className="select-none">
              {/* Central S atom */}
              <circle cx="110" cy="80" r="16" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
              <text x="110" y="85" textAnchor="middle" fill="#000" fontSize="13" fontWeight="bold" fontFamily="monospace">S</text>

              {/* Lone pair orbital (PEB) on equatorial */}
              <path
                d="M 110 64 C 95 35, 125 35, 110 64"
                fill="#38bdf8"
                opacity="0.3"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />
              <circle cx="106" cy="45" r="2.5" fill="#38bdf8" />
              <circle cx="114" cy="45" r="2.5" fill="#38bdf8" />
              <text x="110" y="30" textAnchor="middle" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="bold">1 PEB</text>

              {/* Bonds to Fluorine */}
              {/* Axial Up */}
              <line x1="110" y1="64" x2="110" y2="15" stroke="#94a3b8" strokeWidth="2.5" />
              <circle cx="110" cy="15" r="10" fill="#10b981" />
              <text x="110" y="19" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">F</text>

              {/* Axial Down */}
              <line x1="110" y1="96" x2="110" y2="140" stroke="#94a3b8" strokeWidth="2.5" />
              <circle cx="110" cy="140" r="10" fill="#10b981" />
              <text x="110" y="144" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">F</text>

              {/* Equatorial Left */}
              <line x1="95" y1="85" x2="45" y2="105" stroke="#94a3b8" strokeWidth="2.5" />
              <circle cx="45" cy="105" r="10" fill="#10b981" />
              <text x="45" y="109" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">F</text>

              {/* Equatorial Right */}
              <line x1="125" y1="85" x2="175" y2="105" stroke="#94a3b8" strokeWidth="2.5" />
              <circle cx="175" cy="105" r="10" fill="#10b981" />
              <text x="175" y="109" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">F</text>

              {/* Net dipole arrow */}
              <line x1="150" y1="50" x2="185" y2="70" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#arrow)" />
            </svg>

            <div className="w-full text-center mt-1 text-[10px] font-mono text-slate-300">
              <span className="block font-bold text-amber-300">Tipe: AX₄E (5 Domain Elektron)</span>
              <span className="text-slate-400">Bentuk: Jungkat-jungkit (Seesaw / Asimetris)</span>
            </div>
          </div>

          {/* Molekul CCl4 (Kanan) */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
            <div className="w-full flex justify-between text-[11px] font-mono mb-2">
              <span className="font-bold text-emerald-400">Karbon Tetraklorida (CCl₄)</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                NONPOLAR (μ = 0)
              </span>
            </div>

            {/* SVG Diagram of CCl4 (Tetrahedral Geometry) */}
            <svg width="220" height="150" viewBox="0 0 220 150" className="select-none">
              {/* Central C atom */}
              <circle cx="110" cy="75" r="15" fill="#475569" stroke="#334155" strokeWidth="2" />
              <text x="110" y="80" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold" fontFamily="monospace">C</text>

              {/* Top Cl */}
              <line x1="110" y1="60" x2="110" y2="15" stroke="#94a3b8" strokeWidth="2.5" />
              <circle cx="110" cy="15" r="12" fill="#22c55e" />
              <text x="110" y="19" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">Cl</text>

              {/* Bottom-left Cl */}
              <line x1="97" y1="83" x2="50" y2="125" stroke="#94a3b8" strokeWidth="2.5" />
              <circle cx="50" cy="125" r="12" fill="#22c55e" />
              <text x="50" y="129" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">Cl</text>

              {/* Bottom-right Cl */}
              <line x1="123" y1="83" x2="170" y2="125" stroke="#94a3b8" strokeWidth="2.5" />
              <circle cx="170" cy="125" r="12" fill="#22c55e" />
              <text x="170" y="129" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">Cl</text>

              {/* Wedge Cl (Front/Back) */}
              <line x1="110" y1="90" x2="110" y2="135" stroke="#64748b" strokeWidth="3" strokeDasharray="3 2" />
              <circle cx="110" cy="135" r="11" fill="#16a34a" />
              <text x="110" y="139" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">Cl</text>

              {/* Angle notation 109.5 */}
              <text x="145" y="65" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">109.5°</text>
            </svg>

            <div className="w-full text-center mt-1 text-[10px] font-mono text-slate-300">
              <span className="block font-bold text-emerald-300">Tipe: AX₄ (4 Domain Elektron, PEB = 0)</span>
              <span className="text-slate-400">Bentuk: Tetrahedral Sempurna (Simetris)</span>
            </div>
          </div>
        </div>

        <div className="text-[11px] font-mono text-slate-300 p-2 bg-slate-800/80 rounded-lg border border-slate-700 flex items-center justify-between">
          <span>SF₄ memiliki 1 PEB yang merusak simetri → Momen dipol tidak saling meniadakan (POLAR).</span>
          <span className="text-emerald-400 font-bold">CCl₄ simetris sempurna → NONPOLAR.</span>
        </div>
      </div>
    );
  }

  return null;
};
