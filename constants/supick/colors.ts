export const Palette = {
  blue50: '#F4FAFF',
  blue100: '#E8F5FF',
  blue200: '#C5DFF0',
  blue300: '#9AB9FF',
  blue400: '#60A9FF',
  blue500: '#2A99E5',
  blue600: '#1A5BA8',
  blue700: '#165684',

  green300: '#96FFC9',
  green500: '#1E8A52',
  green700: '#0F5E36',

  black: '#000000',
  ink90: '#1B1B1B',
  ink70: '#4B4B4B',
  ink50: '#757070',
  ink30: '#B0B0B0',
  line: '#D9D9D9',
  bgMute: '#ECECEC',
  white: '#FFFFFF',

  noteYellow: '#FFE262',
  noteGreen: '#A8D5BE',
  noteCyan: '#7FDBFF',
  noteBlue: '#C5DFF0',
  notePink: '#F3A8C7',
  noteOrange: '#FFB37A',
} as const;

export const Semantic = {
  fg: Palette.black,
  fgMuted: Palette.ink50,
  bg: Palette.white,
  bgTinted: Palette.blue100,
  surface: Palette.white,
  surfaceGlass: 'rgba(255,255,255,0.10)',
  border: Palette.blue500,
  borderSoft: Palette.blue300,
  accent: Palette.blue500,
  accentDeep: Palette.blue600,
  sparkle: Palette.green500,
  danger: '#FF0000',
  success: Palette.green500,
} as const;

export const Gradients = {
  surfaceDay: ['#F9F9F9', '#6CC0FA'] as const,
  cardBlue: ['#FFFFFF', '#6CC0FA'] as const,
  dotRed: ['#FFD8D8', '#FF3639'] as const,
  dotBlue: ['#DCD9FF', '#365EFF'] as const,
  dotOrange: ['#FFDEC4', 'rgba(243,101,40,0.9)'] as const,
  dotGreen: ['#96FFC9', '#1E8A52'] as const,
  semesterPicker: ['#FFFFFF', '#C5DFF0'] as const,
} as const;
