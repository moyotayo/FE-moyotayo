import { Pressable, Text } from 'react-native';

import { Shadows } from '@/constants/supick';

type Icon = 'plus' | 'minus' | 'check';

const COLORS: Record<Icon, string> = {
  plus: '#389DE0',
  minus: '#389DE0',
  check: '#25AD67',
};

const GLYPHS: Record<Icon, string> = {
  plus: '+',
  minus: '−',
  check: '✓',
};

const LABELS: Record<Icon, string> = {
  plus: '강의 담기',
  minus: '담은 강의 빼기',
  check: '담은 강의',
};

export function Stepper({
  icon = 'plus',
  onPress,
  color,
}: {
  icon?: Icon;
  onPress?: () => void;
  color?: string;
}) {
  const c = color || COLORS[icon];
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={LABELS[icon]}
      accessibilityState={{ disabled: icon === 'check' }}
      style={({ pressed }) => ({
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: c,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ scale: pressed ? 0.94 : 1 }],
        ...Shadows.dropSoft(),
      })}
    >
      <Text
        style={{
          fontFamily: 'Pretendard-Regular',
          fontSize: icon === 'check' ? 18 : 22,
          color: '#FFF',
          lineHeight: 22,
          textAlign: 'center',
        }}
      >
        {GLYPHS[icon]}
      </Text>
    </Pressable>
  );
}
