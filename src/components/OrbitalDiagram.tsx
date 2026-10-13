import React from 'react';
import { PeriodicElement } from '../data/elements';

interface OrbitalDiagramProps {
  element: PeriodicElement;
}

interface SubshellDef {
  label: string; // e.g., "1s"
  n: number;
  l: number; // 0=s, 1=p, 2=d, 3=f
  subshellName: string; // 's' | 'p' | 'd' | 'f'
  maxElectrons: number;
  boxesCount: number;
}

const AUFBAU_ORDER: SubshellDef[] = [
  { label: '1s', n: 1, l: 0, subshellName: 's', maxElectrons: 2, boxesCount: 1 },
  { label: '2s', n: 2, l: 0, subshellName: 's', maxElectrons: 2, boxesCount: 1 },
  { label: '2p', n: 2, l: 1, subshellName: 'p', maxElectrons: 6, boxesCount: 3 },
  { label: '3s', n: 3, l: 0, subshellName: 's', maxElectrons: 2, boxesCount: 1 },
  { label: '3p', n: 3, l: 1, subshellName: 'p', maxElectrons: 6, boxesCount: 3 },
  { label: '4s', n: 4, l: 0, subshellName: 's', maxElectrons: 2, boxesCount: 1 },
  { label: '3d', n: 3, l: 2, subshellName: 'd', maxElectrons: 10, boxesCount: 5 },
  { label: '4p', n: 4, l: 1, subshellName: 'p', maxElectrons: 6, boxesCount: 3 },
  { label: '5s', n: 5, l: 0, subshellName: 's', maxElectrons: 2, boxesCount: 1 },
  { label: '4d', n: 4, l: 2, subshellName: 'd', maxElectrons: 10, boxesCount: 5 },
  { label: '5p', n: 5, l: 1, subshellName: 'p', maxElectrons: 6, boxesCount: 3 },
  { label: '6s', n: 6, l: 0, subshellName: 's', maxElectrons: 2, boxesCount: 1 },
  { label: '4f', n: 4, l: 3, subshellName: 'f', maxElectrons: 14, boxesCount: 7 },
  { label: '5d', n: 5, l: 2, subshellName: 'd', maxElectrons: 10, boxesCount: 5 },
  { label: '6p', n: 6, l: 1, subshellName: 'p', maxElectrons: 6, boxesCount: 3 },
  { label: '7s', n: 7, l: 0, subshellName: 's', maxElectrons: 2, boxesCount: 1 },
  { label: '5f', n: 5, l: 3, subshellName: 'f', maxElectrons: 14, boxesCount: 7 },
  { label: '6d', n: 6, l: 2, subshellName: 'd', maxElectrons: 10, boxesCount: 5 },
  { label: '7p', n: 7, l: 1, subshellName: 'p', maxElectrons: 6, boxesCount: 3 }
];

export const OrbitalDiagram: React.FC<OrbitalDiagramProps> = ({ element }) => {
  // Distribute electrons into subshells according to Aufbau (with standard exceptions like Cr Z=24 and Cu Z=29)
  let remainingElectrons = element.number;

  const filledSubshells: {
    subshell: SubshellDef;
    electrons: number;
    // Boxes array with electron count (0, 1, or 2) following Hund's rule
    boxes: number[];
  }[] = [];

  for (const sub of AUFBAU_ORDER) {
    if (remainingElectrons <= 0) break;

    let e = Math.min(remainingElectrons, sub.maxElectrons);

    // Chromium (24): [Ar] 4s¹ 3d⁵ instead of 4s² 3d⁴
    if (element.number === 24) {
      if (sub.label === '4s') e = 1;
      if (sub.label === '3d') e = 5;
    }
    // Copper (29): [Ar] 4s¹ 3d¹⁰ instead of 4s² 3d⁹
    if (element.number === 29) {
      if (sub.label === '4s') e = 1;
      if (sub.label === '3d') e = 10;
    }
    // Molybdenum (42): [Kr] 5s¹ 4d⁵
    if (element.number === 42) {
      if (sub.label === '5s') e = 1;
      if (sub.label === '4d') e = 5;
    }
    // Silver (47): [Kr] 5s¹ 4d¹⁰
    if (element.number === 47) {
      if (sub.label === '5s') e = 1;
      if (sub.label === '4d') e = 10;
    }

    // Apply Hund's rule across boxesCount
    const boxes = new Array(sub.boxesCount).fill(0);
    // Pass 1: fill with spin-up (1)
    for (let i = 0; i < Math.min(e, sub.boxesCount); i++) {
      boxes[i] = 1;
    }
    // Pass 2: pair up with spin-down (2)
    if (e > sub.boxesCount) {
      for (let i = 0; i < e - sub.boxesCount; i++) {
        boxes[i] = 2;
      }
    }

    filledSubshells.push({
      subshell: sub,
      electrons: e,
      boxes
    });

    remainingElectrons -= e;
  }

  // Calculate 4 quantum numbers of the last electron
  const lastSubshell = filledSubshells[filledSubshells.length - 1];
  let n = 1, l = 0, m = 0, s = '+½';
  let isParamagnetic = false;

  if (lastSubshell) {
    n = lastSubshell.subshell.n;
    l = lastSubshell.subshell.l;
    const e = lastSubshell.electrons;
    const boxesCount = lastSubshell.subshell.boxesCount;
    const minM = -l;

    if (e <= boxesCount) {
      // Single electron, spin up +1/2
      const boxIdx = e - 1;
      m = minM + boxIdx;
      s = '+½';
    } else {
      // Paired electron, spin down -1/2
      const boxIdx = e - boxesCount - 1;
      m = minM + boxIdx;
      s = '-½';
    }

    // Check paramagnetism: any box with exactly 1 electron
    isParamagnetic = filledSubshells.some(s => s.boxes.some(b => b === 1));
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-200">
        <div>
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            Diagram Kotak Orbital & Asas Aufbau
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
              Kimia SMA Kelas 10
            </span>
          </h4>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Konfigurasi: <strong className="text-slate-800 font-bold">{element.electronConfiguration}</strong>
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span
            className={`px-2 py-0.5 rounded-full font-medium ${
              isParamagnetic
                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
            }`}
          >
            {isParamagnetic ? 'Paramagnetik (Ada e⁻ tak berpasangan)' : 'Diamagnetik (Semua e⁻ berpasangan)'}
          </span>
        </div>
      </div>

      {/* Orbital boxes container */}
      <div className="flex flex-wrap items-end gap-3 max-h-56 overflow-y-auto p-1 bg-white rounded-xl border border-slate-200/80 shadow-xs">
        {filledSubshells.map((item, subIdx) => {
          const isLast = subIdx === filledSubshells.length - 1;
          const minM = -item.subshell.l;

          return (
            <div
              key={item.subshell.label}
              className={`flex flex-col items-center p-1.5 rounded-lg border transition ${
                isLast
                  ? 'bg-blue-50/70 border-blue-400 ring-1 ring-blue-300'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              {/* Subshell Label */}
              <div className="text-[11px] font-mono font-bold text-slate-700 mb-1 flex items-center gap-0.5">
                <span>{item.subshell.label}</span>
                <sup className="text-blue-600 font-bold">{item.electrons}</sup>
              </div>

              {/* Orbital Boxes */}
              <div className="flex gap-1">
                {item.boxes.map((boxState, bIdx) => {
                  const mVal = minM + bIdx;
                  return (
                    <div key={bIdx} className="flex flex-col items-center">
                      <div className="w-6 h-7 bg-white border border-slate-400 rounded flex items-center justify-center font-mono text-sm font-bold text-slate-800 shadow-2xs">
                        {boxState === 0 && <span className="text-slate-300 text-xs">·</span>}
                        {boxState === 1 && <span className="text-blue-600">↑</span>}
                        {boxState === 2 && (
                          <span className="text-indigo-700 leading-none tracking-tighter">
                            ↑↓
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] font-mono text-slate-400 mt-0.5">
                        {mVal > 0 ? `+${mVal}` : mVal}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4 Bilangan Kuantum (SMA Core Topic) */}
      <div className="mt-3 bg-blue-50/80 border border-blue-200 rounded-xl p-3">
        <div className="text-xs font-semibold text-blue-900 mb-2 flex items-center justify-between">
          <span>Bilangan Kuantum Elektron Terakhir:</span>
          <span className="text-[10px] font-mono text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
            Subkulit {lastSubshell?.subshell.label}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-white rounded-lg p-1.5 border border-blue-200 shadow-2xs">
            <span className="block text-[10px] text-slate-500 uppercase font-mono">Utama (n)</span>
            <span className="text-sm font-bold text-blue-700 font-mono">{n}</span>
          </div>
          <div className="bg-white rounded-lg p-1.5 border border-blue-200 shadow-2xs">
            <span className="block text-[10px] text-slate-500 uppercase font-mono">Azimut (l)</span>
            <span className="text-sm font-bold text-blue-700 font-mono">{l}</span>
          </div>
          <div className="bg-white rounded-lg p-1.5 border border-blue-200 shadow-2xs">
            <span className="block text-[10px] text-slate-500 uppercase font-mono">Magnetik (m)</span>
            <span className="text-sm font-bold text-blue-700 font-mono">{m > 0 ? `+${m}` : m}</span>
          </div>
          <div className="bg-white rounded-lg p-1.5 border border-blue-200 shadow-2xs">
            <span className="block text-[10px] text-slate-500 uppercase font-mono">Spin (s)</span>
            <span className="text-sm font-bold text-blue-700 font-mono">{s}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
