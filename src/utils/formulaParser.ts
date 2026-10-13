import { ALL_ELEMENTS } from '../data/elements';

export interface ElementCount {
  symbol: string;
  count: number;
  atomicMass: number;
  totalMass: number;
  percentage: number;
  name: string;
}

export interface ParseResult {
  formula: string;
  isValid: boolean;
  molarMass: number;
  elements: ElementCount[];
  error?: string;
}

// Tokenizes and parses formula with support for parentheses: e.g. Ca(OH)2, Al2(SO4)3, H2O, C6H12O6
export function parseChemicalFormula(input: string): ParseResult {
  const cleaned = input.trim().replace(/\s+/g, '');
  if (!cleaned) {
    return { formula: '', isValid: false, molarMass: 0, elements: [], error: 'Masukkan rumus kimia' };
  }

  // Fast element map
  const elementMap = new Map<string, { mass: number; name: string }>();
  ALL_ELEMENTS.forEach(el => elementMap.set(el.symbol, { mass: el.atomicMass, name: el.name }));

  try {
    const counts = parseFormulaHelper(cleaned);
    let molarMass = 0;
    const elements: ElementCount[] = [];

    counts.forEach((count, symbol) => {
      const data = elementMap.get(symbol);
      if (!data) {
        throw new Error(`Unsur '${symbol}' tidak dikenali dalam tabel periodik.`);
      }
      const totalMass = count * data.mass;
      molarMass += totalMass;
      elements.push({
        symbol,
        count,
        atomicMass: data.mass,
        totalMass,
        percentage: 0,
        name: data.name
      });
    });

    if (molarMass === 0) {
      return { formula: cleaned, isValid: false, molarMass: 0, elements: [], error: 'Rumus tidak valid' };
    }

    // Calculate percentage
    elements.forEach(item => {
      item.percentage = (item.totalMass / molarMass) * 100;
    });

    // Sort by mass descending
    elements.sort((a, b) => b.totalMass - a.totalMass);

    return {
      formula: cleaned,
      isValid: true,
      molarMass,
      elements
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Format rumus kimia tidak valid';
    return {
      formula: cleaned,
      isValid: false,
      molarMass: 0,
      elements: [],
      error: msg
    };
  }
}

function parseFormulaHelper(formula: string): Map<string, number> {
  const stack: Map<string, number>[] = [new Map()];
  let i = 0;
  const n = formula.length;

  while (i < n) {
    const ch = formula[i];

    if (ch === '(' || ch === '[' || ch === '{') {
      stack.push(new Map());
      i++;
    } else if (ch === ')' || ch === ']' || ch === '}') {
      i++;
      let num = 0;
      while (i < n && /\d/.test(formula[i])) {
        num = num * 10 + parseInt(formula[i], 10);
        i++;
      }
      const multiplier = num === 0 ? 1 : num;
      const top = stack.pop();
      if (!top || stack.length === 0) {
        throw new Error('Tanda kurung tidak seimbang.');
      }
      const current = stack[stack.length - 1];
      top.forEach((val, key) => {
        current.set(key, (current.get(key) || 0) + val * multiplier);
      });
    } else if (/[A-Z]/.test(ch)) {
      // Element symbol start
      let symbol = ch;
      i++;
      if (i < n && /[a-z]/.test(formula[i])) {
        symbol += formula[i];
        i++;
      }
      let num = 0;
      while (i < n && /\d/.test(formula[i])) {
        num = num * 10 + parseInt(formula[i], 10);
        i++;
      }
      const multiplier = num === 0 ? 1 : num;
      const current = stack[stack.length - 1];
      current.set(symbol, (current.get(symbol) || 0) + multiplier);
    } else {
      throw new Error(`Karakter tidak terduga '${ch}'`);
    }
  }

  if (stack.length !== 1) {
    throw new Error('Tanda kurung belum ditutup.');
  }

  return stack[0];
}
