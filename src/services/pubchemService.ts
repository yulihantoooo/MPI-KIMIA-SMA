/**
 * PubChem PUG REST Service
 * Grounded in Google DeepMind Science Skills (PubChem & PUG REST Database API)
 */

export interface PubChemProperty {
  CID: number;
  MolecularFormula: string;
  MolecularWeight: string;
  CanonicalSMILES?: string;
  InChIKey?: string;
  IUPACName?: string;
  XLogP?: number;
  TPSA?: number;
  Complexity?: number;
  imageUrl?: string;
}

// In-memory cache to prevent redundant requests and conform to <= 5 req/sec
const pubchemCache = new Map<string, PubChemProperty | null>();

export async function fetchPubChemCompound(query: string | number): Promise<PubChemProperty | null> {
  const cacheKey = String(query).trim().toLowerCase();
  if (pubchemCache.has(cacheKey)) {
    return pubchemCache.get(cacheKey)!;
  }

  const isCid = typeof query === 'number' || /^\d+$/.test(String(query).trim());
  const url = isCid
    ? `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${query}/property/MolecularFormula,MolecularWeight,CanonicalSMILES,InChIKey,IUPACName,XLogP,TPSA,Complexity/JSON`
    : `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(String(query).trim())}/property/MolecularFormula,MolecularWeight,CanonicalSMILES,InChIKey,IUPACName,XLogP,TPSA,Complexity/JSON`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      pubchemCache.set(cacheKey, null);
      return null;
    }
    const data = await res.json();
    const prop = data?.PropertyTable?.Properties?.[0];
    if (!prop) {
      pubchemCache.set(cacheKey, null);
      return null;
    }

    const result: PubChemProperty = {
      CID: prop.CID,
      MolecularFormula: prop.MolecularFormula || '',
      MolecularWeight: prop.MolecularWeight || '',
      CanonicalSMILES: prop.CanonicalSMILES || '',
      InChIKey: prop.InChIKey || '',
      IUPACName: prop.IUPACName || '',
      XLogP: prop.XLogP,
      TPSA: prop.TPSA,
      Complexity: prop.Complexity,
      imageUrl: `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${prop.CID}/PNG?image_size=300x300`
    };

    pubchemCache.set(cacheKey, result);
    return result;
  } catch {
    pubchemCache.set(cacheKey, null);
    return null;
  }
}
