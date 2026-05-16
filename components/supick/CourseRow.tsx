import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

import { CategoryBadge } from './CategoryBadge';
import { Sparkle } from './Sparkle';
import { CATEGORIES, type CategoryKey, Palette, Shadows } from '@/constants/supick';

export type CourseLike = {
  id: string;
  title: string;
  professor: string;
  location?: string;
  category: CategoryKey;
};

export function CourseRow({
  course,
  right,
  onPress,
  compact = false,
}: {
  course: CourseLike;
  right?: ReactNode;
  onPress?: () => void;
  compact?: boolean;
}) {
  const cat = CATEGORIES[course.category];
  const Inner = (
    <>
      <Sparkle color={cat.color} size={26} />
      <View style={{ flex: 1, gap: 5 }}>
        <Text
          style={{
            fontFamily: 'Pretendard-Bold',
            fontSize: 18,
            color: Palette.black,
            lineHeight: 20,
          }}
        >
          {course.title}
        </Text>
        <Text
          style={{
            fontFamily: 'Pretendard-Regular',
            fontSize: 15,
            color: Palette.ink70,
            lineHeight: 17,
          }}
        >
          {course.location ? `${course.location} · ` : ''}
          {course.professor}
        </Text>
      </View>
      <CategoryBadge category={course.category} />
      {right ? <View style={{ marginLeft: 6 }}>{right}</View> : null}
    </>
  );

  const baseStyle = {
    height: compact ? 64 : 80,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 22,
    gap: 16,
    ...Shadows.dropSoft(),
  };

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={baseStyle}>
        {Inner}
      </Pressable>
    );
  }
  return <View style={baseStyle}>{Inner}</View>;
}
