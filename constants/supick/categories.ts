export type CategoryKey =
  | 'jeonseon'
  | 'jeonhaek'
  | 'jeonchwi'
  | 'gyoyang'
  | 'gigyo'
  | 'junghaek'
  | 'sogyo'
  | 'jeokpye';

type CategoryMeta = {
  color: string;
  label: string;
  english: string;
};

export const CATEGORIES: Record<CategoryKey, CategoryMeta> = {
  jeonseon: { color: '#8336FF', label: '전선', english: 'Major Elective' },
  jeonhaek: { color: '#FF0000', label: '전핵', english: 'Major Core' },
  jeonchwi: { color: '#000000', label: '전취', english: 'Major Acquired' },
  gyoyang: { color: '#2AD5BB', label: '교양', english: 'Liberal Arts' },
  gigyo: { color: '#F328C7', label: '기교', english: 'Foundation' },
  junghaek: { color: '#DC792D', label: '중핵', english: 'Core Liberal Arts' },
  sogyo: { color: '#3CD400', label: '소교', english: 'Small Liberal Arts' },
  jeokpye: { color: '#FF0000', label: '적폐', english: 'Stuck Student' },
};

export const NOTE_FILLS: Partial<Record<CategoryKey, string>> = {
  jeonseon: '#C5B6FF',
  jeonhaek: '#F3A8C7',
  jeonchwi: '#D9D9D9',
  gyoyang: '#A8E5D5',
  gigyo: '#F3A8E5',
  junghaek: '#FFB37A',
  sogyo: '#B0F09A',
};

export const NOTE_OVERRIDES: Record<string, string> = {
  mw: '#FFE262',
  ca: '#A8D5BE',
  net: '#7FDBFF',
  sem: '#C5DFF0',
  esl: '#F3A8C7',
  thn: '#A8D5BE',
  lif: '#3CD400',
  web: '#FFB37A',
};

export const alphaHex = (hex: string, a: number): string => {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
