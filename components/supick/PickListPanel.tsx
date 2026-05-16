import { Image } from 'expo-image';
import { Text, View } from 'react-native';

import { CourseRow } from './CourseRow';
import { Stepper } from './Stepper';
import { Fonts, Palette, Shadows } from '@/constants/supick';
import type { Course } from '@/src/data/sampleData';

export function PickListPanel({
  items,
  onRemove,
}: {
  items: Course[];
  onRemove: (id: string) => void;
}) {
  return (
    <View
      style={{
        width: 460,
        height: 720,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: Palette.blue500,
        backgroundColor: 'rgba(255,255,255,0.6)',
        padding: 22,
        paddingTop: 24,
        gap: 14,
        position: 'relative',
        overflow: 'hidden',
        ...Shadows.drop(),
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.script,
          fontSize: 34,
          color: Palette.black,
          textAlign: 'center',
        }}
      >
        PickList
      </Text>

      <View style={{ gap: 12 }}>
        {items.length === 0 ? (
          <Text
            style={{
              textAlign: 'center',
              fontFamily: Fonts.display,
              fontSize: 16,
              color: Palette.ink50,
              marginTop: 30,
            }}
          >
            비어 있어요 — 강의를 + 로 담아보세요!
          </Text>
        ) : null}
        {items.map((c) => (
          <CourseRow
            key={c.id}
            course={c}
            compact
            right={<Stepper icon="minus" onPress={() => onRemove(c.id)} />}
          />
        ))}
      </View>

      {items.length <= 1 ? (
        <Image
          source={require('@/assets/supick/picklist-basket.png')}
          style={{
            position: 'absolute',
            right: 10,
            bottom: 10,
            width: 240,
            height: 240,
            opacity: 0.95,
          }}
          contentFit="contain"
        />
      ) : null}
    </View>
  );
}
