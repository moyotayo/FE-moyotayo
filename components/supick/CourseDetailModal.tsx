import { useRouter } from 'expo-router';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { Sparkle } from './Sparkle';
import { CATEGORIES, type CategoryKey, Fonts, Palette } from '@/constants/supick';
import { useSupickStore } from '@/src/store/useSupickStore';

// 카테고리 정식 명칭 (모달용 — 배지의 짧은 라벨 대신 풀 네임)
const LONG_LABELS: Record<CategoryKey, string> = {
  jeonseon: '전공선택',
  jeonhaek: '전공필수',
  jeonchwi: '전공취득',
  gyoyang: '교양',
  gigyo: '기초교양',
  junghaek: '중점교양',
  sogyo: '소양',
  jeokpye: '적폐',
};

const GREEN_BORDER = '#199D59';
const GREEN_BG = '#EDFEF3';
const EVAL_BTN_GREEN = '#199D59';
const EVAL_BTN_DISABLED_TEXT = '#ABDE7E';

export function CourseDetailModal() {
  const router = useRouter();
  const course = useSupickStore((s) => s.selectedCourse);
  const closeDetail = useSupickStore((s) => s.closeCourseDetail);
  const startReview = useSupickStore((s) => s.startReview);
  const semester = useSupickStore((s) => s.selectedSemester);

  if (!course) return null;

  const onEvaluate = () => {
    // store 의 startReview 가 selectedCourse 클리어 + reviewCourse 설정 동시에 함
    startReview(course);
    router.push('/review-form' as never);
  };

  const cat = CATEGORIES[course.category];

  // "26년 1학기" → "2026년 1학기"
  const semesterFull = semester.startsWith('20') ? semester : `20${semester}`;

  const rows: { label: string; value: string }[] = [
    { label: '교수', value: course.professor },
    { label: '분반', value: course.section ?? '001' },
    { label: '학점', value: `${course.credits}학점` },
    {
      label: '학과',
      value: course.department ?? '지능형SW융합대학 · 정보보호',
    },
    { label: '학기', value: semesterFull },
    { label: '성적처리', value: course.grading ?? 'ABCDF' },
    {
      label: '시간표 및 강의실',
      value: `${course.day} ${course.start}~${course.end} ${course.location}`,
    },
  ];

  const progressPct = course.progressPercent ?? 60;
  const evalEnabled = progressPct >= 50;

  return (
    <View style={styles.overlay}>
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={closeDetail}
        accessibilityRole="button"
        accessibilityLabel="강의 세부 정보 닫기"
      />

      <View style={styles.card}>
        {/* 제목 — 가운데 상단 */}
        <Text style={styles.title}>강의 세부 정보</Text>

        {/* 강의명 + sparkle + 카테고리 풀네임 배지 */}
        <View style={styles.headerRow}>
          <Sparkle color={cat.color} size={28} />
          <Text style={styles.courseTitle}>{course.title}</Text>
          <View style={[styles.headerBadge, { borderColor: cat.color }]}>
            <Text style={[styles.headerBadgeText, { color: cat.color }]}>
              {LONG_LABELS[course.category]}
            </Text>
          </View>
        </View>

        {/* 본문 — 2 컬럼 (라벨 / 값) + 가운데 세로선 */}
        <View style={styles.body}>
          <View style={styles.labelsCol}>
            {rows.map((r) => (
              <Text key={r.label} style={styles.label} numberOfLines={1}>
                {r.label}
              </Text>
            ))}
          </View>
          <View style={styles.divider} />
          <View style={styles.valuesCol}>
            {rows.map((r) => (
              <Text key={r.label} style={styles.value} numberOfLines={1}>
                {r.value}
              </Text>
            ))}
          </View>
        </View>

        {/* 하단 — 힌트 + 평가하기 버튼 */}
        <View style={styles.footer}>
          <Text style={styles.hint}>강의 1/2 이상 진행시 가능해요!</Text>
          <Pressable
            style={({ pressed }) => [
              styles.evalBtn,
              { opacity: evalEnabled ? (pressed ? 0.7 : 1) : 0.5 },
            ]}
            disabled={!evalEnabled}
            onPress={onEvaluate}
            accessibilityRole="button"
            accessibilityLabel={
              evalEnabled
                ? '평가하기 — 강의평 등록 화면으로'
                : `평가 작성 불가 — 강의 ${progressPct}% 진행`
            }
          >
            <Text
              style={[
                styles.evalBtnText,
                { color: evalEnabled ? GREEN_BORDER : EVAL_BTN_DISABLED_TEXT },
              ]}
            >
              평가하기
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

// 웹에서는 viewport 고정 (Stage 의 scale 무관하게 전체 화면 덮기)
const OVERLAY_POSITION =
  Platform.OS === 'web'
    ? ({ position: 'fixed' as const } as object)
    : ({ position: 'absolute' as const } as object);

const styles = StyleSheet.create({
  overlay: {
    ...OVERLAY_POSITION,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9998,
  },
  card: {
    width: 934,
    maxWidth: '92%',
    minHeight: 570,
    maxHeight: '92%',
    backgroundColor: GREEN_BG,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: GREEN_BORDER,
    paddingHorizontal: 60,
    paddingTop: 30,
    paddingBottom: 36,
    ...(Platform.OS === 'web'
      ? ({
          boxShadow:
            '0 0 24px 6px rgba(165,236,182,0.6), 0 0 60px 12px rgba(30,138,82,0.25)',
        } as object)
      : {
          shadowColor: '#1E8A52',
          shadowOpacity: 0.4,
          shadowRadius: 24,
          shadowOffset: { width: 0, height: 0 },
          elevation: 12,
        }),
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: 36,
    color: Palette.black,
    textAlign: 'center',
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  courseTitle: {
    fontFamily: 'Pretendard-ExtraBold',
    fontSize: 26,
    color: Palette.black,
    flexShrink: 1,
  },
  headerBadge: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1.5,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  headerBadgeText: {
    fontFamily: Fonts.display,
    fontSize: 22,
    lineHeight: 24,
  },
  body: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8,
  },
  labelsCol: {
    width: 200,
    gap: 14,
  },
  valuesCol: {
    flex: 1,
    gap: 14,
    paddingLeft: 28,
  },
  divider: {
    width: 1.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
    marginHorizontal: 4,
  },
  label: {
    fontFamily: 'Pretendard-ExtraBold',
    fontSize: 22,
    color: Palette.black,
    lineHeight: 26,
  },
  value: {
    fontFamily: 'Pretendard-ExtraBold',
    fontSize: 22,
    color: Palette.black,
    lineHeight: 26,
  },
  footer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 16,
  },
  hint: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 18,
    color: Palette.ink70,
  },
  evalBtn: {
    height: 44,
    paddingHorizontal: 24,
    borderRadius: 22,
    backgroundColor: Palette.white,
    borderWidth: 1.5,
    borderColor: EVAL_BTN_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  evalBtnText: {
    fontFamily: 'Pretendard-ExtraBold',
    fontSize: 22,
  },
});
