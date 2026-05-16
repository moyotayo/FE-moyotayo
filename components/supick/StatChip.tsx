import { Platform, Text, View } from 'react-native';

import { Fonts, Radii } from '@/constants/supick';

type Tone = 'red' | 'green' | 'cyan';

const TONES: Record<Tone, { border: string; bg: string; num: string }> = {
  red: { border: 'rgba(255,72,72,0.7)', bg: 'rgba(255,200,200,0.45)', num: '#E14545' },
  green: { border: 'rgba(60,212,0,0.6)', bg: 'rgba(200,255,200,0.45)', num: '#2E9D2E' },
  cyan: { border: 'rgba(42,213,187,0.6)', bg: 'rgba(180,250,235,0.45)', num: '#2A99A0' },
};

export function StatChip({
  tone = 'red',
  value,
  label,
}: {
  tone?: Tone;
  value: number | string;
  label: string;
}) {
  const t = TONES[tone];
  return (
    <View
      style={{
        width: 200,
        height: 96,
        borderRadius: Radii.lg,
        borderWidth: 1.5,
        borderColor: t.border,
        backgroundColor: t.bg,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        ...(Platform.OS === 'web'
          ? { boxShadow: '0 4px 4px rgba(0,0,0,0.10)' as any }
          : {
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 4,
              shadowOffset: { width: 0, height: 4 },
              elevation: 2,
            }),
      }}
    >
      <Text
        style={{
          fontFamily: 'Pretendard-Black',
          fontSize: 38,
          color: t.num,
          lineHeight: 40,
        }}
      >
        {value}
      </Text>
      <Text style={{ fontFamily: Fonts.display, fontSize: 14, color: '#000' }}>
        {label}
      </Text>
    </View>
  );
}
