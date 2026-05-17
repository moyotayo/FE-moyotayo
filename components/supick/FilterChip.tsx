import { Pressable, Text, View } from 'react-native';

import { Fonts, Palette } from '@/constants/supick';

export function FilterChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: !!selected }}
      style={{
        height: 32,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: selected ? 'rgba(150,255,201,0.6)' : Palette.blue100,
        borderWidth: selected ? 1.5 : 0,
        borderColor: selected ? 'rgba(30,138,82,0.5)' : 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.display,
          fontSize: 16,
          color: selected ? Palette.green700 : Palette.ink90,
          lineHeight: 18,
        }}
      >
        {selected ? '✓ ' : ''}
        {label}
      </Text>
    </Pressable>
  );
}

export function FilterChipRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        flexWrap: 'wrap',
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.display,
          fontSize: 17,
          color: Palette.black,
          minWidth: 80,
        }}
      >
        {label}
      </Text>
      {options.map((o) => (
        <FilterChip
          key={o}
          label={o}
          selected={value === o}
          onPress={() => onChange(value === o ? null : o)}
        />
      ))}
    </View>
  );
}
