import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { ScreenWrap } from '@/components/supick/ScreenWrap';
import { Fonts, Palette, Shadows } from '@/constants/supick';
import { useSupickStore } from '@/src/store/useSupickStore';

const SEMESTERS = ['26년 1학기', '25년 2학기', '25년 1학기'];

const SUBMIT_MS = 1200;

export default function ReviewFormScreen() {
  const router = useRouter();
  const reviewCourse = useSupickStore((s) => s.reviewCourse);
  const endReview = useSupickStore((s) => s.endReview);

  // 폼 상태 — Figma 기본값으로 prefill
  const [rating, setRating] = useState(5);
  const [semester, setSemester] = useState('25년 1학기');
  const [semesterOpen, setSemesterOpen] = useState(false);
  const [workload, setWorkload] = useState<string | null>('적음');
  const [assignTypes, setAssignTypes] = useState<Set<string>>(
    new Set(['보고서 및 조사', '실습']),
  );
  const [attendance, setAttendance] = useState<Set<string>>(
    new Set(['지정 좌석제']),
  );
  const [examTypes, setExamTypes] = useState<Set<string>>(
    new Set(['지필고사']),
  );
  const [groupWork, setGroupWork] = useState<string | null>('없음');
  const [grading, setGrading] = useState<string | null>('ABCDF');
  const [submitting, setSubmitting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // reviewCourse 없이 직접 URL 진입한 경우 → /reviews 로 보냄
    if (!reviewCourse) {
      router.replace('/reviews' as never);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [reviewCourse, router]);

  const toggleSet = (s: Set<string>, val: string): Set<string> => {
    const next = new Set(s);
    if (next.has(val)) next.delete(val);
    else next.add(val);
    return next;
  };

  const onBack = useCallback(() => {
    endReview();
    if (router.canGoBack()) router.back();
    else router.replace('/reviews' as never);
  }, [endReview, router]);

  const onSubmit = useCallback(() => {
    if (submitting) return;
    setSubmitting(true);
    timerRef.current = setTimeout(() => {
      endReview();
      router.replace('/reviews' as never);
    }, SUBMIT_MS);
  }, [submitting, endReview, router]);

  if (!reviewCourse) return null;

  return (
    <ScreenWrap>
      {/* 페이지 타이틀 */}
      <Text style={styles.pageTitle}>당신의 Pick 어땠나요?</Text>

      {/* 메인 카드 */}
      <View style={styles.card}>
        {/* 카드 내부 — ScrollView 로 만약을 위한 스크롤 */}
        <ScrollView
          contentContainerStyle={styles.cardInner}
          showsVerticalScrollIndicator={false}
        >
          {/* ← back */}
          <Pressable
            onPress={onBack}
            style={styles.backBtn}
            accessibilityRole="button"
            accessibilityLabel="뒤로 — 강의 평가로"
          >
            <Text style={styles.backText}>←</Text>
          </Pressable>

          {/* 카드 타이틀 */}
          <Text style={styles.cardTitle}>강의평 등록</Text>

          {/* 별점 */}
          <View style={styles.ratingRow}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Pressable
                key={i}
                onPress={() => setRating(i + 1)}
                accessibilityRole="button"
                accessibilityLabel={`별점 ${i + 1}/5`}
              >
                <Text
                  style={[
                    styles.star,
                    { color: i < rating ? '#FFC940' : '#D9D9D9' },
                  ]}
                >
                  ★
                </Text>
              </Pressable>
            ))}
            <Text style={styles.ratingText}>
              {rating}/5
            </Text>
          </View>

          <View style={styles.divider} />

          {/* 수강 학기 */}
          <Text style={styles.qLabel}>수강 학기</Text>
          <View style={styles.semesterRow}>
            <Pressable
              onPress={() => setSemesterOpen((v) => !v)}
              style={[
                styles.chip,
                { backgroundColor: 'rgba(96,169,255,0.37)' },
              ]}
              accessibilityRole="button"
              accessibilityLabel="수강 학기 선택"
            >
              <Text style={styles.chipText}>
                {semester ? `✓ ${semester}` : '선택'}
              </Text>
            </Pressable>
            {semesterOpen ? (
              <View style={styles.dropdown}>
                {SEMESTERS.map((s) => (
                  <Pressable
                    key={s}
                    onPress={() => {
                      setSemester(s);
                      setSemesterOpen(false);
                    }}
                    style={[
                      styles.chip,
                      {
                        backgroundColor:
                          s === semester
                            ? '#D0F4E2'
                            : 'rgba(96,169,255,0.37)',
                      },
                    ]}
                  >
                    <Text style={styles.chipText}>
                      {s === semester ? '✓ ' : ''}
                      {s}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ) : null}
          </View>

          {/* 과제량 */}
          <Question label="과제량이 어떤가요?">
            {['많음', '보통', '적음'].map((opt) => (
              <ChipBtn
                key={opt}
                label={opt}
                selected={workload === opt}
                onPress={() =>
                  setWorkload((v) => (v === opt ? null : opt))
                }
              />
            ))}
          </Question>

          {/* 과제 방식 */}
          <Question label="과제 방식은 어떤가요? (중복가능)">
            {['보고서 및 조사', '문제풀이', '수기 작성', '실습'].map(
              (opt) => (
                <ChipBtn
                  key={opt}
                  label={opt}
                  selected={assignTypes.has(opt)}
                  onPress={() =>
                    setAssignTypes((s) => toggleSet(s, opt))
                  }
                />
              ),
            )}
          </Question>

          {/* 출결관리 */}
          <Question label="출결관리는 어떻게 하나요? (중복가능)">
            {['전결 출결', '호명 방식', '자필 서명', '지정 좌석제'].map(
              (opt) => (
                <ChipBtn
                  key={opt}
                  label={opt}
                  selected={attendance.has(opt)}
                  onPress={() =>
                    setAttendance((s) => toggleSet(s, opt))
                  }
                />
              ),
            )}
          </Question>

          {/* 시험방식 */}
          <Question label="시험방식은 어떤가요? (중복가능)">
            {['온라인', '오픈북', '지필고사'].map((opt) => (
              <ChipBtn
                key={opt}
                label={opt}
                selected={examTypes.has(opt)}
                onPress={() => setExamTypes((s) => toggleSet(s, opt))}
              />
            ))}
          </Question>

          {/* 조모임 */}
          <Question label="조모임이 있나요?">
            {['항상', '가끔', '없음'].map((opt) => (
              <ChipBtn
                key={opt}
                label={opt}
                selected={groupWork === opt}
                onPress={() =>
                  setGroupWork((v) => (v === opt ? null : opt))
                }
              />
            ))}
          </Question>

          {/* 성적 */}
          <Question label="성적은 어떻게 주시나요?">
            {['ABCDF', '절대평가', 'P/F'].map((opt) => (
              <ChipBtn
                key={opt}
                label={opt}
                selected={grading === opt}
                onPress={() =>
                  setGrading((v) => (v === opt ? null : opt))
                }
              />
            ))}
          </Question>

          {/* 등록하기 */}
          <View style={styles.submitRow}>
            <Pressable
              onPress={onSubmit}
              disabled={submitting}
              style={({ pressed }) => [
                styles.submitBtn,
                {
                  opacity: submitting ? 0.5 : pressed ? 0.85 : 1,
                  transform: [{ scale: pressed && !submitting ? 0.96 : 1 }],
                },
              ]}
              accessibilityRole="button"
              accessibilityLabel="강의평 등록하기"
            >
              <Text style={styles.submitText}>등록하기</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>

      {/* 하단 안내 */}
      <Text style={styles.footerNote}>
        SuPick 에서는 기준표를 통해서만 평가를 합니다.
      </Text>

      {/* 등록 완료 오버레이 */}
      {submitting ? (
        <View style={styles.successOverlay}>
          <View style={styles.successCard}>
            <Text style={styles.successEmoji}>✨</Text>
            <Text style={styles.successText}>등록 완료!</Text>
            <Text style={styles.successSub}>
              {reviewCourse.title} 강의평이 등록되었어요
            </Text>
          </View>
        </View>
      ) : null}
    </ScreenWrap>
  );
}

// ====== 하위 컴포넌트 (이 화면 전용) ======

function Question({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.question}>
      <Text style={styles.qLabel}>{label}</Text>
      <View style={styles.chipRow}>{children}</View>
    </View>
  );
}

function ChipBtn({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: selected ? '#D0F4E2' : 'rgba(96,169,255,0.37)',
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected }}
    >
      <Text style={styles.chipText}>
        {selected ? '✓ ' : ''}
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    position: 'absolute',
    top: 110,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: 'Pretendard-Bold',
    fontSize: 32,
    color: Palette.black,
  },

  card: {
    position: 'absolute',
    top: 170,
    left: 272,
    width: 896,
    height: 770,
    borderRadius: 10,
    backgroundColor: Palette.white,
    borderWidth: 1,
    borderColor: Palette.black,
    overflow: 'hidden',
  },
  cardInner: {
    paddingVertical: 24,
    paddingHorizontal: 28,
    gap: 18,
  },

  backBtn: {
    position: 'absolute',
    top: 12,
    left: 14,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  backText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 30,
    color: Palette.black,
    lineHeight: 34,
  },

  cardTitle: {
    textAlign: 'center',
    fontFamily: Fonts.display,
    fontSize: 32,
    color: Palette.black,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  star: {
    fontSize: 40,
    lineHeight: 42,
  },
  ratingText: {
    marginLeft: 16,
    fontFamily: Fonts.display,
    fontSize: 20,
    color: Palette.black,
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    marginVertical: 8,
  },

  question: {
    gap: 10,
  },
  qLabel: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    color: Palette.black,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    height: 33,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Palette.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    color: Palette.black,
    lineHeight: 18,
  },

  semesterRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  dropdown: {
    gap: 8,
    padding: 12,
    borderRadius: 10,
    backgroundColor: Palette.white,
    borderWidth: 1,
    borderColor: Palette.black,
    ...Shadows.drop(),
  },

  submitRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  submitBtn: {
    height: 36,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: Palette.white,
    borderWidth: 1,
    borderColor: 'rgba(96,169,255,0.62)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.glowBlue(),
  },
  submitText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 20,
    color: Palette.black,
  },

  footerNote: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: 'Pretendard-Regular',
    fontSize: 20,
    color: Palette.black,
  },

  successOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  successCard: {
    backgroundColor: Palette.white,
    borderRadius: 20,
    paddingVertical: 36,
    paddingHorizontal: 56,
    alignItems: 'center',
    gap: 12,
    minWidth: 280,
    ...Shadows.dropBig(),
  },
  successEmoji: {
    fontSize: 48,
  },
  successText: {
    fontFamily: Fonts.display,
    fontSize: 28,
    color: Palette.green500,
  },
  successSub: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    color: Palette.ink70,
    textAlign: 'center',
  },
});
