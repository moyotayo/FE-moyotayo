import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { CourseRow, courseMetaStyle } from '@/components/supick/CourseRow';
import { FilterChipRow } from '@/components/supick/FilterChip';
import { PickListPanel } from '@/components/supick/PickListPanel';
import { ScreenWrap } from '@/components/supick/ScreenWrap';
import { SearchInput } from '@/components/supick/SearchInput';
import { Stepper } from '@/components/supick/Stepper';
import { Timetable } from '@/components/supick/Timetable';
import { Fonts, Palette, Shadows } from '@/constants/supick';
import { availableCourses, type Course } from '@/src/data/sampleData';
import { useSupickStore } from '@/src/store/useSupickStore';

const WIZARD_DURATION_MS = 1500;

// 시드 기반 deterministic 셔플 — 같은 seed 면 항상 같은 결과
function seedShuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr];
  let s = (seed * 1664525 + 1013904223) >>> 0 || 1;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const j = s % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function generateVariants(
  picklist: Course[],
  all: Course[],
  seed: number,
): { a: Course[]; b: Course[] } {
  const candidates = all.filter((c) => !picklist.some((p) => p.id === c.id));
  const shuffled = seedShuffle(candidates, seed);
  return {
    a: [...picklist, ...shuffled.slice(0, 3)],
    b: [...picklist, ...shuffled.slice(3, 6)],
  };
}

export default function RecommendScreen() {
  // ====== view state ======
  const [view, setView] = useState<'select' | 'result'>('select');
  const [wizardRunning, setWizardRunning] = useState(false);
  const [seed, setSeed] = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // ====== select-view local state ======
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [areaFilter, setAreaFilter] = useState<string | null>('5영역');
  const [periodFilter, setPeriodFilter] = useState<string | null>('6교시');
  const [majorFilter, setMajorFilter] = useState<string | null>('교양');

  // ====== store ======
  const picklist = useSupickStore((s) => s.picklist);
  const addToPickList = useSupickStore((s) => s.addToPickList);
  const removeFromPickList = useSupickStore((s) => s.removeFromPickList);
  const openCourseDetail = useSupickStore((s) => s.openCourseDetail);

  const visible = availableCourses.filter(
    (c) =>
      !query || c.title.includes(query) || c.professor.includes(query),
  );

  // ====== 시간표 마법사 ======
  const canRunWizard = picklist.length >= 2;

  const runWizard = useCallback(() => {
    if (!canRunWizard || wizardRunning) return;
    setWizardRunning(true);
    timerRef.current = setTimeout(() => {
      setWizardRunning(false);
      setSeed((s) => s + 1);
      setView('result');
    }, WIZARD_DURATION_MS);
  }, [canRunWizard, wizardRunning]);

  const regenerate = useCallback(() => {
    if (wizardRunning) return;
    setWizardRunning(true);
    timerRef.current = setTimeout(() => {
      setSeed((s) => s + 1);
      setWizardRunning(false);
    }, WIZARD_DURATION_MS);
  }, [wizardRunning]);

  // ====== select view 의 마스코트 speech ======
  const selectSpeech = canRunWizard
    ? '시간표마법사 클릭클릭⚔️'
    : '강의를 2개 이상 담아주세요!';

  // ====== result view 의 두 시간표 variant ======
  const variants = useMemo(
    () => generateVariants(picklist, availableCourses, seed),
    [picklist, seed],
  );

  // ====== render ======
  if (view === 'result') {
    return (
      <ScreenWrap
        showMascot
        mascotPose="portal"
        mascotSize={300}
        mascotPosition="bottomRight"
        mascotSpeech="시간표 다시 만들어줄까?"
        mascotSpeechHint="CLICK!"
        mascotOnPress={regenerate}
        mascotAccessibilityLabel="시간표 다시 생성하기"
      >
        {/* 뒤로 — select view 로 */}
        <Pressable
          onPress={() => setView('select')}
          style={styles.backBtn}
          accessibilityRole="button"
          accessibilityLabel="뒤로 — 강의 선택 화면으로"
        >
          <Text style={styles.backText}>←</Text>
        </Pressable>

        <Text style={styles.resultTitle}>추천 시간표</Text>

        <ScrollView
          style={styles.resultScroll}
          contentContainerStyle={styles.resultScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Timetable
            courses={variants.a}
            title="📌 추천 1"
            hourHeight={40}
          />
          <Timetable
            courses={variants.b}
            title="📌 추천 2"
            hourHeight={40}
          />
        </ScrollView>

        {wizardRunning ? <WizardOverlay /> : null}
      </ScreenWrap>
    );
  }

  // select view
  return (
    <ScreenWrap
      showMascot
      mascotPose="portal"
      mascotSize={300}
      mascotPosition="bottomRight"
      mascotSpeech={selectSpeech}
      mascotSpeechHint={canRunWizard ? 'CLICK!' : null}
      mascotOnPress={canRunWizard ? runWizard : undefined}
      mascotAccessibilityLabel={
        canRunWizard ? '시간표 마법사 실행' : '강의 더 담기'
      }
    >
      <View
        style={{
          position: 'absolute',
          top: 130,
          left: 70,
          right: 70,
          flexDirection: 'row',
          gap: 32,
        }}
      >
        <View style={{ flex: 1, flexDirection: 'column', gap: 18 }}>
          <Text
            style={{
              fontFamily: Fonts.display,
              fontSize: 38,
              color: Palette.black,
              lineHeight: 40,
            }}
          >
            시간표 추천
          </Text>

          <SearchInput
            value={query}
            onChangeText={setQuery}
            withFilter
            onFilter={() => setShowFilters((v) => !v)}
            filterActive={showFilters}
          />

          {showFilters ? (
            <View
              style={{
                padding: 22,
                borderWidth: 1.5,
                borderColor: Palette.blue500,
                borderRadius: 18,
                backgroundColor: 'rgba(255,255,255,0.6)',
                flexDirection: 'column',
                gap: 14,
              }}
            >
              <FilterChipRow
                label="영역별"
                options={['1영역', '2영역', '3영역', '4영역', '5영역', '6영역']}
                value={areaFilter}
                onChange={setAreaFilter}
              />
              <FilterChipRow
                label="시간별"
                options={[
                  '1교시',
                  '2교시',
                  '3교시',
                  '4교시',
                  '5교시',
                  '6교시',
                  '7교시',
                  '8교시',
                  '9교시',
                ]}
                value={periodFilter}
                onChange={setPeriodFilter}
              />
              <FilterChipRow
                label="전공/교양"
                options={['전공', '교양']}
                value={majorFilter}
                onChange={setMajorFilter}
              />
            </View>
          ) : null}

          <View
            style={{
              padding: 18,
              paddingVertical: 14,
              borderWidth: 1.5,
              borderColor: Palette.blue500,
              borderRadius: 18,
              backgroundColor: 'rgba(255,255,255,0.55)',
              height: 380,
              overflow: 'hidden',
            }}
          >
            <ScrollView
              contentContainerStyle={{ gap: 10 }}
              showsVerticalScrollIndicator={false}
            >
              {visible.map((c) => {
                const inList = picklist.find((x) => x.id === c.id);
                return (
                  <CourseRow
                    key={c.id}
                    course={c}
                    onPress={() => openCourseDetail(c)}
                    meta={
                      <View style={{ gap: 2 }}>
                        <Text style={courseMetaStyle}>
                          {c.day} {c.start} ~ {c.end} · {c.location}
                        </Text>
                        <Text style={courseMetaStyle}>
                          {c.professor} | {c.credits}학점 | {c.area}
                        </Text>
                      </View>
                    }
                    right={
                      inList ? (
                        <Stepper icon="check" />
                      ) : (
                        <Stepper icon="plus" onPress={() => addToPickList(c)} />
                      )
                    }
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>

        <PickListPanel
          items={picklist}
          onRemove={(id) => removeFromPickList(id)}
        />
      </View>

      {wizardRunning ? <WizardOverlay /> : null}
    </ScreenWrap>
  );
}

// ====== 시간표 마법사 로딩 오버레이 ======
function WizardOverlay() {
  return (
    <View style={styles.wizardOverlay}>
      <View style={styles.wizardCard}>
        <ActivityIndicator size="large" color={Palette.blue600} />
        <Text style={styles.wizardText}>시간표 마법사가 돌고 있어요...</Text>
        <Text style={styles.wizardSub}>강의 조합 생성 중 ⚔️</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // result view
  backBtn: {
    position: 'absolute',
    top: 100,
    left: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 36,
    color: Palette.black,
    lineHeight: 40,
  },
  resultTitle: {
    position: 'absolute',
    top: 105,
    left: 120,
    fontFamily: Fonts.display,
    fontSize: 40,
    color: Palette.black,
  },
  resultScroll: {
    position: 'absolute',
    top: 180,
    left: 70,
    right: 380,
    bottom: 30,
  },
  resultScrollContent: {
    gap: 24,
    paddingBottom: 40,
  },

  // 마법사 로딩 오버레이
  wizardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9997,
  },
  wizardCard: {
    backgroundColor: Palette.white,
    borderRadius: 20,
    paddingVertical: 36,
    paddingHorizontal: 56,
    alignItems: 'center',
    gap: 18,
    borderWidth: 2,
    borderColor: Palette.blue500,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0 0 30px rgba(42,153,229,0.5)' } as object)
      : Shadows.dropBig()),
  },
  wizardText: {
    fontFamily: Fonts.display,
    fontSize: 22,
    color: Palette.blue600,
  },
  wizardSub: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    color: Palette.ink70,
  },
});
