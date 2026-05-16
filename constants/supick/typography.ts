export const Fonts = {
  display: 'Jua_400Regular',
  body: 'Pretendard-Regular',
  bodyBold: 'Pretendard-Bold',
  bodyExtraBold: 'Pretendard-ExtraBold',
  bodyBlack: 'Pretendard-Black',
  script: 'Itim_400Regular',
  latin: 'Inter_400Regular',
  latinBold: 'Inter_700Bold',
  latinBlack: 'Inter_900Black',
} as const;

export const FontSize = {
  displayXL: 128,
  displayLG: 48,
  displayMD: 36,
  displaySM: 30,
  h1: 32,
  h2: 25,
  h3: 24,
  bodyLG: 20,
  body: 18,
  text: 16,
  small: 14,
  micro: 12,
} as const;

export const LineHeight = {
  tight: 1.0,
  snug: 1.2,
  body: 1.5,
} as const;

export const Tracking = {
  tight: -0.5,
  normal: 0,
  wide: 0.4,
} as const;
