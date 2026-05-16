import { Text, View } from 'react-native';

import { CATEGORIES, type CategoryKey, Fonts, Radii } from '@/constants/supick';

type Size = 'sm' | 'md' | 'lg';

const HEIGHTS: Record<Size, number> = { sm: 20, md: 24, lg: 28 };
const FONTS: Record<Size, number> = { sm: 13, md: 16, lg: 18 };

export function CategoryBadge({
  category,
  label,
  size = 'md',
}: {
  category: CategoryKey;
  label?: string;
  size?: Size;
}) {
  const cat = CATEGORIES[category];
  return (
    <View
      style={{
        height: HEIGHTS[size],
        paddingHorizontal: 10,
        borderRadius: Radii.lg,
        borderWidth: 1,
        borderColor: cat.color,
        backgroundColor: 'rgba(255,255,255,0.6)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.display,
          fontSize: FONTS[size],
          color: cat.color,
          lineHeight: FONTS[size],
          textAlign: 'center',
        }}
      >
        {label || cat.label}
      </Text>
    </View>
  );
}
