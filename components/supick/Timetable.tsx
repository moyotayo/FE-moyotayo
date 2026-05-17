import { LinearGradient } from 'expo-linear-gradient';
import { useMemo } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import {
  CATEGORIES,
  type CategoryKey,
  NOTE_FILLS,
  NOTE_OVERRIDES,
  Shadows,
} from '@/constants/supick';

const DAYS = ['월', '화', '수', '목', '금'] as const;
const HOURS = [
  '9:30',
  '10:30',
  '11:30',
  '12:30',
  '13:30',
  '14:30',
  '15:30',
  '16:30',
  '17:30',
  '18:30',
] as const;

export type TimetableCourse = {
  id: string;
  title: string;
  professor?: string;
  location?: string;
  day: string;
  start: string;
  end: string;
  category: CategoryKey;
};

// PAD_TOP: 제목 pill(y=40, h=32, 끝=72)과 요일 헤더(높이 28)가 겹치지 않도록
// 헤더 top = PAD_TOP - 36 가 76 이상이 되게 → PAD_TOP ≥ 112. 12px 여유 두고 120.
const PAD_TOP = 120;
const PAD_LEFT = 70;
const DAY_W = 130;
const DEFAULT_HOUR_H = 56;
const NOTE_W = DAY_W - 16;
const COL_GAP = 2;

function toMin(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function makeToY(hourH: number) {
  return (time: string) => {
    const mins = toMin(time) - (9 * 60 + 30);
    return PAD_TOP + (mins / 60) * hourH;
  };
}

/** 강의 id 로부터 deterministic 한 미세 회전 각도 (도 단위) — 진짜 포스트잇 느낌 */
function noteRotation(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) >>> 0;
  }
  // -3 ~ +3 도 사이 (정수 7가지)
  const deg = (h % 7) - 3;
  return `${deg}deg`;
}

type Layout = { col: number; cols: number };

/**
 * 같은 요일에 시간이 겹치는 강의들을 cluster 로 묶고 각 강의에
 * column index + cluster size 를 부여. 겹치지 않는 단독 강의는 cols=1 (full width).
 */
function computeLayout(courses: TimetableCourse[]): Map<string, Layout> {
  const layout = new Map<string, Layout>();
  const byDay = new Map<string, TimetableCourse[]>();
  for (const c of courses) {
    if (!byDay.has(c.day)) byDay.set(c.day, []);
    byDay.get(c.day)!.push(c);
  }
  for (const [, dayCourses] of byDay) {
    const sorted = [...dayCourses].sort(
      (a, b) => toMin(a.start) - toMin(b.start),
    );
    let cluster: TimetableCourse[] = [];
    let clusterEnd = 0;
    const flush = () => {
      if (cluster.length === 0) return;
      const cols = cluster.length;
      cluster.forEach((c, i) => layout.set(c.id, { col: i, cols }));
      cluster = [];
    };
    for (const c of sorted) {
      const start = toMin(c.start);
      const end = toMin(c.end);
      if (cluster.length === 0) {
        cluster.push(c);
        clusterEnd = end;
      } else if (start < clusterEnd) {
        cluster.push(c);
        clusterEnd = Math.max(clusterEnd, end);
      } else {
        flush();
        cluster.push(c);
        clusterEnd = end;
      }
    }
    flush();
  }
  return layout;
}

export function Timetable({
  courses,
  title = '📌 2026학년도 1학기 시간표',
  height,
  hourHeight = DEFAULT_HOUR_H,
  onNotePress,
}: {
  courses: TimetableCourse[];
  title?: string;
  /** 기본: PAD_TOP + 10 * hourHeight 로 자동 계산 */
  height?: number;
  /** 시간당 픽셀 높이. compact 모드는 36-40 권장. 기본 56 */
  hourHeight?: number;
  onNotePress?: (courseId: string) => void;
}) {
  const layout = useMemo(() => computeLayout(courses), [courses]);
  const HOUR_H = hourHeight;
  const toY = useMemo(() => makeToY(HOUR_H), [HOUR_H]);
  const cardHeight = height ?? PAD_TOP + HOUR_H * 10 + 8;

  return (
    <View style={[styles.card, { height: cardHeight }]}>
      <LinearGradient
        colors={['#F9F9F9', '#6CC0FA']}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.titleWrap}>
        <View style={styles.titlePill}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      </View>

      {DAYS.map((d, i) => (
        <View
          key={d}
          style={[
            styles.dayHeader,
            { left: PAD_LEFT + i * DAY_W + 8, top: PAD_TOP - 36 },
          ]}
        >
          <Text style={styles.dayHeaderText}>{d}</Text>
        </View>
      ))}

      {HOURS.map((h, i) => (
        <Text
          key={h}
          style={[styles.hourLabel, { top: PAD_TOP + i * HOUR_H - 8 }]}
        >
          {h}
        </Text>
      ))}

      {HOURS.slice(1).map((h, i) => (
        <View
          key={'line-' + h}
          style={[styles.gridLine, { top: PAD_TOP + (i + 1) * HOUR_H }]}
        />
      ))}

      {courses.map((c) => {
        const dayIdx = DAYS.indexOf(c.day as (typeof DAYS)[number]);
        if (dayIdx < 0) return null;
        const y1 = toY(c.start);
        const y2 = toY(c.end);
        const noteColor =
          NOTE_OVERRIDES[c.id] || NOTE_FILLS[c.category] || '#FFE262';
        const pinColor = CATEGORIES[c.category].color;

        const { col, cols } = layout.get(c.id) ?? { col: 0, cols: 1 };
        const slotW = NOTE_W / cols;
        const noteW = slotW - (cols > 1 ? COL_GAP : 0);
        const noteX = PAD_LEFT + dayIdx * DAY_W + 8 + col * slotW;

        const rotation = noteRotation(c.id);
        const noteStyle = {
          position: 'absolute' as const,
          left: noteX,
          top: y1,
          width: noteW,
          height: y2 - y1,
          backgroundColor: noteColor,
          borderRadius: 6,
          overflow: 'visible' as const, // 핀이 노트 밖 위로 살짝 튀어나옴
          transform: [{ rotate: rotation }],
          // 진한 그림자 — 종이가 보드 위에 들떠 보이게
          ...(Platform.OS === 'web'
            ? {
                boxShadow:
                  '2px 5px 14px rgba(0,0,0,0.32), 1px 2px 4px rgba(0,0,0,0.18)',
              }
            : {
                shadowColor: '#000',
                shadowOpacity: 0.32,
                shadowRadius: 14,
                shadowOffset: { width: 2, height: 5 },
                elevation: 8,
              }),
        };
        const innerContent = (
          <>
            {/* 핀 (카테고리 색) — 노트 위로 -6px 튀어나옴 */}
            <View
              style={{
                position: 'absolute',
                top: -6,
                left: noteW / 2 - 6,
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: pinColor,
                zIndex: 2,
                ...(Platform.OS === 'web'
                  ? { boxShadow: '0 1px 2px rgba(0,0,0,0.4)' }
                  : {
                      shadowColor: '#000',
                      shadowOpacity: 0.4,
                      shadowRadius: 2,
                      shadowOffset: { width: 0, height: 1 },
                      elevation: 4,
                    }),
              }}
            />
            {/* 텍스트 컨테이너 — 노트 안쪽에서만 clip */}
            <View style={styles.noteContent}>
              <Text style={styles.noteTitle} numberOfLines={2}>
                {c.title}
              </Text>
              {c.professor ? (
                <Text style={styles.noteSub} numberOfLines={1}>
                  {c.professor}
                </Text>
              ) : null}
              {c.location ? (
                <Text style={styles.noteSubFaint} numberOfLines={1}>
                  {c.location}
                </Text>
              ) : null}
            </View>
          </>
        );
        if (onNotePress) {
          return (
            <Pressable
              key={c.id}
              style={noteStyle}
              onPress={() => onNotePress(c.id)}
              accessibilityRole="button"
              accessibilityLabel={`${c.title} 강의 세부 정보 보기`}
            >
              {innerContent}
            </Pressable>
          );
        }
        return (
          <View key={c.id} style={noteStyle}>
            {innerContent}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 760,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#000',
    position: 'relative',
    ...Shadows.dropBig(),
  },
  titleWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 40,
    alignItems: 'center',
    pointerEvents: 'none',
  },
  titlePill: {
    height: 32,
    paddingHorizontal: 22,
    borderRadius: 8,
    backgroundColor: '#5BAFE5',
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    color: '#FFF',
  },
  dayHeader: {
    position: 'absolute',
    width: NOTE_W,
    height: 28,
    borderRadius: 100,
    backgroundColor: '#9BC6E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayHeaderText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 15,
    color: '#FFF',
  },
  hourLabel: {
    position: 'absolute',
    left: 18,
    fontFamily: 'Pretendard-Bold',
    fontSize: 14,
    color: '#1A5BA8',
  },
  gridLine: {
    position: 'absolute',
    left: PAD_LEFT,
    right: 14,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.55)',
  },
  // 노트 안쪽 텍스트 컨테이너 — 노트 영역만큼 clip
  noteContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 10,
    paddingHorizontal: 6,
    paddingBottom: 6,
    overflow: 'hidden',
    borderRadius: 6,
  },
  noteTitle: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 10,
    color: '#000',
    lineHeight: 12,
  },
  noteSub: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 9,
    color: '#1B1B1B',
    lineHeight: 11,
    marginTop: 2,
  },
  noteSubFaint: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 9,
    color: '#4B4B4B',
    lineHeight: 11,
    marginTop: 1,
  },
});
