import React, { useState } from 'react';
import { PeriodicElement } from '../data/elements';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface BohrAtomModelProps {
  element: PeriodicElement;
}

export const BohrAtomModel: React.FC<BohrAtomModelProps> = ({ element }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [hoveredShellIndex, setHoveredShellIndex] = useState<number | null>(null);

  const protons = element.number;
  const neutrons = Math.max(0, Math.round(element.atomicMass) - protons);
  const shells = element.electronsPerShell;
  const shellNames = ['K (n=1)', 'L (n=2)', 'M (n=3)', 'N (n=4)', 'O (n=5)', 'P (n=6)', 'Q (n=7)'];

  // Base dimensions
  const size = 340;
  const center = size / 2;
  const nucleusRadius = 26;
  const maxShellRadius = 145;
  const shellStep = shells.length > 1 ? (maxShellRadius - nucleusRadius - 12) / shells.length : 40;

  return (
    <div className="flex flex-col items-center bg-slate-900 text-white rounded-2xl p-4 shadow-inner border border-slate-800">
      <div className="w-full flex items-center justify-between mb-2 px-2">
        <div>
          <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold font-mono">
            Model Atom Bohr Interaktif
          </span>
          <p className="text-sm font-medium text-slate-300">
            {element.name} ({element.symbol}) - Z = {element.number}
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-800/80 rounded-lg p-1 border border-slate-700/60">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Jeda Animasi' : 'Putar Animasi'}
            className="p-1.5 rounded hover:bg-slate-700 text-slate-300 hover:text-white transition"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setTimeout(() => setIsPlaying(true), 10);
            }}
            title="Reset Posisi"
            className="p-1.5 rounded hover:bg-slate-700 text-slate-300 hover:text-white transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="select-none overflow-visible"
        >
          {/* Subtle radial glow */}
          <defs>
            <radialGradient id={`nucleusGrad-${element.number}`} cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="70%" stopColor="#be123c" />
              <stop offset="100%" stopColor="#881337" />
            </radialGradient>
            <filter id="electronGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Electron Shells */}
          {shells.map((count, index) => {
            const shellRadius = nucleusRadius + 14 + (index + 1) * shellStep;
            const isHovered = hoveredShellIndex === index;
            // Alternating rotation directions and speeds
            const duration = 8 + index * 4;
            const reverse = index % 2 === 1;

            return (
              <g
                key={`shell-${index}`}
                onMouseEnter={() => setHoveredShellIndex(index)}
                onMouseLeave={() => setHoveredShellIndex(null)}
                className="cursor-pointer"
              >
                {/* Orbit track */}
                <circle
                  cx={center}
                  cy={center}
                  r={shellRadius}
                  fill="none"
                  stroke={isHovered ? '#38bdf8' : '#334155'}
                  strokeWidth={isHovered ? '2' : '1'}
                  strokeDasharray={isHovered ? 'none' : '3 3'}
                  className="transition-colors duration-200"
                />

                {/* Rotating electron group */}
                <g
                  style={{
                    transformOrigin: `${center}px ${center}px`,
                    animation: isPlaying
                      ? `spin ${duration}s linear infinite ${reverse ? 'reverse' : 'normal'}`
                      : 'none'
                  }}
                >
                  {Array.from({ length: count }).map((_, eIdx) => {
                    const angle = (2 * Math.PI * eIdx) / count;
                    const ex = center + shellRadius * Math.cos(angle);
                    const ey = center + shellRadius * Math.sin(angle);

                    return (
                      <g key={`electron-${index}-${eIdx}`}>
                        {/* Glow halo */}
                        <circle
                          cx={ex}
                          cy={ey}
                          r={isHovered ? 5.5 : 4}
                          fill="#38bdf8"
                          opacity={isHovered ? 0.9 : 0.75}
                          filter="url(#electronGlow)"
                        />
                        {/* Core electron dot */}
                        <circle
                          cx={ex}
                          cy={ey}
                          r={isHovered ? 3.5 : 2.5}
                          fill="#ffffff"
                        />
                      </g>
                    );
                  })}
                </g>
              </g>
            );
          })}

          {/* Atomic Nucleus */}
          <circle
            cx={center}
            cy={center}
            r={nucleusRadius}
            fill={`url(#nucleusGrad-${element.number})`}
            stroke="#fda4af"
            strokeWidth="1.5"
            className="filter drop-shadow-md"
          />
          <text
            x={center}
            y={center - 3}
            textAnchor="middle"
            fill="#ffffff"
            fontSize="10"
            fontWeight="bold"
            fontFamily="monospace"
          >
            {protons}p⁺
          </text>
          <text
            x={center}
            y={center + 9}
            textAnchor="middle"
            fill="#fecdd3"
            fontSize="9"
            fontFamily="monospace"
          >
            {neutrons}n⁰
          </text>
        </svg>
      </div>

      {/* Shell Breakdown Badges */}
      <div className="w-full mt-3 pt-2.5 border-t border-slate-800">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
          <span>Tingkat Energi / Kulit:</span>
          <span className="font-mono text-cyan-400">{shells.reduce((a, b) => a + b, 0)} Elektron Total</span>
        </div>
        <div className="flex flex-wrap gap-1.5 justify-center">
          {shells.map((count, idx) => {
            const isHovered = hoveredShellIndex === idx;
            return (
              <button
                key={idx}
                onMouseEnter={() => setHoveredShellIndex(idx)}
                onMouseLeave={() => setHoveredShellIndex(null)}
                className={`px-2 py-0.5 rounded text-xs font-mono transition-all border ${
                  isHovered
                    ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400 font-bold scale-105'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                }`}
              >
                <span className="text-slate-400">{shellNames[idx] || `n=${idx + 1}`}:</span>{' '}
                <span className="text-cyan-300 font-bold">{count}e⁻</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
