import React, { useState, useMemo } from 'react';
import { PeriodicElement, ALL_ELEMENTS, CATEGORY_COLORS } from '../data/elements';
import { Thermometer, SlidersHorizontal, Eye, Flame } from 'lucide-react';

export type ViewMode =
  | 'category'
  | 'electronegativity'
  | 'radius'
  | 'ionization'
  | 'block'
  | 'temperature';

interface PeriodicTableGridProps {
  onSelectElement: (element: PeriodicElement) => void;
  selectedElementNumber?: number;
  searchQuery: string;
  categoryFilter: string;
}

export const PeriodicTableGrid: React.FC<PeriodicTableGridProps> = ({
  onSelectElement,
  selectedElementNumber,
  searchQuery,
  categoryFilter
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('category');
  const [temperatureK, setTemperatureK] = useState<number>(298); // 25 °C default STP
  const [hoveredElement, setHoveredElement] = useState<PeriodicElement | null>(null);

  // Group elements for fast cell lookup
  const elementMap = useMemo(() => {
    const map = new Map<number, PeriodicElement>();
    ALL_ELEMENTS.forEach(el => map.set(el.number, el));
    return map;
  }, []);

  // Determine state at temperature T
  const getStateAtTemp = (el: PeriodicElement, tempK: number): 'solid' | 'liquid' | 'gas' | 'unknown' => {
    if (el.meltingPoint === null || el.boilingPoint === null) {
      return el.state;
    }
    if (tempK < el.meltingPoint) return 'solid';
    if (tempK < el.boilingPoint) return 'liquid';
    return 'gas';
  };

  // Cell style logic depending on viewMode
  const getCellStyle = (el: PeriodicElement) => {
    const isSelected = el.number === selectedElementNumber;
    const isHovered = hoveredElement?.number === el.number;

    // Search query matching
    const q = searchQuery.trim().toLowerCase();
    const isMatchedSearch = !q ||
      el.name.toLowerCase().includes(q) ||
      el.symbol.toLowerCase().includes(q) ||
      String(el.number) === q;

    const isMatchedCategory = !categoryFilter || el.category === categoryFilter;

    const isFaded = !isMatchedSearch || !isMatchedCategory;

    let bg = '';
    let text = 'text-slate-900';
    let border = 'border-slate-200';

    if (viewMode === 'category') {
      const c = CATEGORY_COLORS[el.category];
      bg = c.bg;
      text = c.text;
      border = c.border;
    } else if (viewMode === 'block') {
      if (el.block === 's') { bg = 'bg-rose-100/80'; text = 'text-rose-900'; border = 'border-rose-300'; }
      else if (el.block === 'p') { bg = 'bg-sky-100/80'; text = 'text-sky-900'; border = 'border-sky-300'; }
      else if (el.block === 'd') { bg = 'bg-amber-100/80'; text = 'text-amber-900'; border = 'border-amber-300'; }
      else { bg = 'bg-purple-100/80'; text = 'text-purple-900'; border = 'border-purple-300'; }
    } else if (viewMode === 'electronegativity') {
      if (el.electronegativity === null) {
        bg = 'bg-slate-100'; text = 'text-slate-400'; border = 'border-slate-200';
      } else {
        // scale 0.79 to 3.98
        const ratio = Math.max(0, Math.min(1, (el.electronegativity - 0.7) / (4.0 - 0.7)));
        if (ratio < 0.3) { bg = 'bg-blue-100'; text = 'text-blue-900'; border = 'border-blue-300'; }
        else if (ratio < 0.6) { bg = 'bg-amber-100'; text = 'text-amber-900'; border = 'border-amber-300'; }
        else { bg = 'bg-rose-200'; text = 'text-rose-950 font-bold'; border = 'border-rose-400'; }
      }
    } else if (viewMode === 'radius') {
      if (el.atomicRadius === null) {
        bg = 'bg-slate-100'; text = 'text-slate-400'; border = 'border-slate-200';
      } else {
        // scale 30 to 300 pm
        const ratio = Math.max(0, Math.min(1, (el.atomicRadius - 30) / 270));
        if (ratio < 0.3) { bg = 'bg-cyan-100'; text = 'text-cyan-900'; border = 'border-cyan-300'; }
        else if (ratio < 0.6) { bg = 'bg-emerald-100'; text = 'text-emerald-900'; border = 'border-emerald-300'; }
        else { bg = 'bg-indigo-200'; text = 'text-indigo-950 font-bold'; border = 'border-indigo-400'; }
      }
    } else if (viewMode === 'ionization') {
      if (el.ionizationEnergy === null) {
        bg = 'bg-slate-100'; text = 'text-slate-400'; border = 'border-slate-200';
      } else {
        // scale 376 to 2372 kJ/mol
        const ratio = Math.max(0, Math.min(1, (el.ionizationEnergy - 370) / 2000));
        if (ratio < 0.3) { bg = 'bg-teal-100'; text = 'text-teal-900'; border = 'border-teal-300'; }
        else if (ratio < 0.6) { bg = 'bg-orange-100'; text = 'text-orange-900'; border = 'border-orange-300'; }
        else { bg = 'bg-red-200'; text = 'text-red-950 font-bold'; border = 'border-red-400'; }
      }
    } else if (viewMode === 'temperature') {
      const state = getStateAtTemp(el, temperatureK);
      if (state === 'gas') { bg = 'bg-sky-200'; text = 'text-sky-950 font-bold'; border = 'border-sky-400'; }
      else if (state === 'liquid') { bg = 'bg-amber-200'; text = 'text-amber-950 font-bold'; border = 'border-amber-400'; }
      else if (state === 'solid') { bg = 'bg-slate-200'; text = 'text-slate-900'; border = 'border-slate-300'; }
      else { bg = 'bg-slate-100'; text = 'text-slate-400'; border = 'border-slate-200'; }
    }

    return {
      classes: `relative flex flex-col items-center justify-between p-1 rounded-lg border text-center transition-all cursor-pointer select-none ${bg} ${text} ${border} ${
        isFaded ? 'opacity-25 grayscale' : 'hover:scale-110 hover:z-20 hover:shadow-lg'
      } ${isSelected ? 'ring-2 ring-blue-600 ring-offset-2 z-10 shadow-md font-bold' : ''} ${
        isHovered ? 'shadow-md' : ''
      }`,
      displaySubValue:
        viewMode === 'electronegativity'
          ? (el.electronegativity !== null ? el.electronegativity.toFixed(2) : '–')
          : viewMode === 'radius'
          ? (el.atomicRadius !== null ? `${el.atomicRadius} pm` : '–')
          : viewMode === 'ionization'
          ? (el.ionizationEnergy !== null ? `${el.ionizationEnergy}` : '–')
          : viewMode === 'block'
          ? `blok-${el.block}`
          : viewMode === 'temperature'
          ? getStateAtTemp(el, temperatureK)
          : el.atomicMass.toFixed(2)
    };
  };

  // Render cell
  const renderCell = (num: number) => {
    const el = elementMap.get(num);
    if (!el) return <div key={num} className="w-12 h-14" />;

    const { classes, displaySubValue } = getCellStyle(el);

    return (
      <button
        key={el.number}
        onClick={() => onSelectElement(el)}
        onMouseEnter={() => setHoveredElement(el)}
        onMouseLeave={() => setHoveredElement(null)}
        className={`w-[52px] h-[60px] ${classes}`}
        title={`${el.name} (${el.symbol}) - Nomor Atom: ${el.number}, Massa: ${el.atomicMass.toFixed(3)}`}
      >
        <span className="text-[10px] font-mono leading-none self-start font-medium opacity-80">
          {el.number}
        </span>
        <span className="text-sm font-extrabold font-mono leading-none">
          {el.symbol}
        </span>
        <span className="text-[8px] font-mono leading-none truncate max-w-full opacity-90">
          {displaySubValue}
        </span>
      </button>
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
      {/* Top Controls: Mode Switcher & Temperature Slider */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide font-mono">
            Mode Tampilan Tabel:
          </span>
          <div className="flex flex-wrap gap-1">
            {[
              { id: 'category', label: 'Kategori Sifat' },
              { id: 'electronegativity', label: 'Elektronegativitas' },
              { id: 'radius', label: 'Jari-Jari Atom' },
              { id: 'ionization', label: 'Energi Ionisasi' },
              { id: 'block', label: 'Blok (s, p, d, f)' },
              { id: 'temperature', label: 'Wujud Suhu (Termometer)' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setViewMode(m.id as ViewMode)}
                className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition cursor-pointer ${
                  viewMode === m.id
                    ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-2xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Temperature slider if in temperature mode */}
        {viewMode === 'temperature' && (
          <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 w-full sm:w-auto">
            <Thermometer className="w-4 h-4 text-rose-500 shrink-0" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-700">
                {temperatureK} K ({(temperatureK - 273.15).toFixed(0)}°C)
              </span>
              <input
                type="range"
                min="0"
                max="6000"
                step="50"
                value={temperatureK}
                onChange={(e) => setTemperatureK(Number(e.target.value))}
                className="w-32 accent-blue-600 cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono">
              <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">Padat</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-200 text-amber-900 font-bold">Cair</span>
              <span className="px-1.5 py-0.5 rounded bg-sky-200 text-sky-900 font-bold">Gas</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid Viewport with Horizontal Scroll */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[1020px] select-none">
          {/* Group Header numbers 1 to 18 */}
          <div className="grid grid-cols-18 gap-1.5 mb-1.5 text-center text-[10px] font-mono font-bold text-slate-600">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="w-[52px]">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Row 1: H (1) ... He (2) */}
          <div className="grid grid-cols-18 gap-1.5 mb-1.5">
            {renderCell(1)}
            {/* Empty columns 2 through 17 */}
            <div className="col-span-16 flex items-center justify-center p-2">
              {hoveredElement ? (
                <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl shadow-2xs font-mono text-xs text-slate-700 animate-in fade-in">
                  <span className="text-base font-extrabold text-blue-600">{hoveredElement.symbol}</span>
                  <span className="font-bold text-slate-900">{hoveredElement.name}</span>
                  <span>Z = {hoveredElement.number}</span>
                  <span>Massa = {hoveredElement.atomicMass.toFixed(3)}</span>
                  <span>Golongan {hoveredElement.groupTraditional}</span>
                  <span className="text-blue-700">{hoveredElement.electronConfiguration}</span>
                </div>
              ) : (
                <div className="text-[11px] text-slate-500 font-mono italic">
                  Arahkan kursor atau klik unsur apa saja untuk detail lengkap model atom Bohr & PubChem
                </div>
              )}
            </div>
            {renderCell(2)}
          </div>

          {/* Row 2: Li (3), Be (4) ... B (5) to Ne (10) */}
          <div className="grid grid-cols-18 gap-1.5 mb-1.5">
            {renderCell(3)}
            {renderCell(4)}
            <div className="col-span-10" />
            {renderCell(5)}
            {renderCell(6)}
            {renderCell(7)}
            {renderCell(8)}
            {renderCell(9)}
            {renderCell(10)}
          </div>

          {/* Row 3: Na (11), Mg (12) ... Al (13) to Ar (18) */}
          <div className="grid grid-cols-18 gap-1.5 mb-1.5">
            {renderCell(11)}
            {renderCell(12)}
            <div className="col-span-10" />
            {renderCell(13)}
            {renderCell(14)}
            {renderCell(15)}
            {renderCell(16)}
            {renderCell(17)}
            {renderCell(18)}
          </div>

          {/* Row 4: K (19) to Kr (36) */}
          <div className="grid grid-cols-18 gap-1.5 mb-1.5">
            {Array.from({ length: 18 }).map((_, i) => renderCell(19 + i))}
          </div>

          {/* Row 5: Rb (37) to Xe (54) */}
          <div className="grid grid-cols-18 gap-1.5 mb-1.5">
            {Array.from({ length: 18 }).map((_, i) => renderCell(37 + i))}
          </div>

          {/* Row 6: Cs (55), Ba (56), [La-Lu placeholder], Hf (72) to Rn (86) */}
          <div className="grid grid-cols-18 gap-1.5 mb-1.5">
            {renderCell(55)}
            {renderCell(56)}
            {/* 57-71 placeholder */}
            <div className="w-[52px] h-[60px] flex flex-col items-center justify-center rounded-lg border border-indigo-300 bg-indigo-50/70 text-indigo-900 font-mono text-[10px] text-center font-bold">
              <span>57-71</span>
              <span className="text-[9px] font-normal">La-Lu</span>
            </div>
            {Array.from({ length: 15 }).map((_, i) => renderCell(72 + i))}
          </div>

          {/* Row 7: Fr (87), Ra (88), [Ac-Lr placeholder], Rf (104) to Og (118) */}
          <div className="grid grid-cols-18 gap-1.5 mb-3">
            {renderCell(87)}
            {renderCell(88)}
            {/* 89-103 placeholder */}
            <div className="w-[52px] h-[60px] flex flex-col items-center justify-center rounded-lg border border-fuchsia-300 bg-fuchsia-50/70 text-fuchsia-900 font-mono text-[10px] text-center font-bold">
              <span>89-103</span>
              <span className="text-[9px] font-normal">Ac-Lr</span>
            </div>
            {Array.from({ length: 15 }).map((_, i) => renderCell(104 + i))}
          </div>

          {/* Lanthanides Row (57 to 71) */}
          <div className="grid grid-cols-18 gap-1.5 mb-1.5 pt-2 border-t border-slate-200/80">
            <div className="col-span-2 flex items-center justify-end pr-2 text-[11px] font-mono font-bold text-indigo-700">
              Lantanida *
            </div>
            <div className="w-[52px]" />
            {Array.from({ length: 15 }).map((_, i) => renderCell(57 + i))}
          </div>

          {/* Actinides Row (89 to 103) */}
          <div className="grid grid-cols-18 gap-1.5">
            <div className="col-span-2 flex items-center justify-end pr-2 text-[11px] font-mono font-bold text-fuchsia-700">
              Aktinida **
            </div>
            <div className="w-[52px]" />
            {Array.from({ length: 15 }).map((_, i) => renderCell(89 + i))}
          </div>
        </div>
      </div>

      {/* Bottom Category Legend */}
      <div className="mt-4 pt-3 border-t border-slate-200">
        <span className="text-[11px] font-semibold text-slate-500 font-mono uppercase tracking-wide block mb-2">
          Legenda Kategori Unsur:
        </span>
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { key: 'alkali-metal', label: 'Logam Alkali' },
            { key: 'alkaline-earth', label: 'Logam Alkali Tanah' },
            { key: 'transition-metal', label: 'Logam Transisi' },
            { key: 'post-transition-metal', label: 'Logam Pascatransisi' },
            { key: 'metalloid', label: 'Metaloid' },
            { key: 'nonmetal', label: 'Nonlogam Reaktif' },
            { key: 'halogen', label: 'Halogen' },
            { key: 'noble-gas', label: 'Gas Mulia' },
            { key: 'lanthanide', label: 'Lantanida' },
            { key: 'actinide', label: 'Aktinida' }
          ].map((item) => {
            const c = CATEGORY_COLORS[item.key as PeriodicElement['category']];
            return (
              <div
                key={item.key}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium ${c.bg} ${c.text} ${c.border}`}
              >
                <span className={`w-2 h-2 rounded-full ${c.badge.split(' ')[0]}`} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
