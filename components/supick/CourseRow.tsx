import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

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

type Props = {
  course: CourseLike;
  /**
   * 커스텀 메타 라인(들). 안 주면 기본 동작 (`{location} · {professor}`) 유지.
   * 문자열 전달 시 기본 스타일 적용. ReactNode 전달 시 caller 가 자유롭게 구성.
   */
  meta?: ReactNode | string;
  right?: ReactNode;
  onPress?: () => void;
  compact?: boolean;
};

/** CourseRow 내부의 메타 라인 기본 텍스트 스타일 — caller 가 일관성을 위해 재사용 가능 */
export const courseMetaStyle = {
  fontFamily: 'Pretendard-Regular' as const,
  fontSize: 15,
  color: Palette.ink70,
  lineHeight: 17,
};

export function CourseRow({
  course,
  meta,
  right,
  onPress,
  compact = false,
}: Props) {
  const cat = CATEGORIES[course.category];

  const renderMeta = () => {
    if (meta === undefined) {
      return (
        <Text style={courseMetaStyle}>
          {course.location ? `${course.location} · ` : ''}
          {course.professor}
        </Text>
      );
    }
    if (typeof meta === 'string') {
      return <Text style={courseMetaStyle}>{meta}</Text>;
    }
    return meta;
  };

  const Inner = (
    <>
      <Sparkle color={cat.color} size={26} />
      <View style={styles.body}>
        <Text style={styles.title}>{course.title}</Text>
        {renderMeta()}
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

const styles = StyleSheet.create({
  body: {
    flex: 1,
    gap: 5,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 18,
    color: Palette.black,
    lineHeight: 20,
  },
});
