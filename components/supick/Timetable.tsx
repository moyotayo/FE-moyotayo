import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

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

const PAD_TOP = 100;
const PAD_LEFT = 70;
const DAY_W = 130;
const HOUR_H = 56;
const NOTE_W = DAY_W - 16;

function toY(time: string): number {
  const [h, m] = time.split(':').map(Number);
  const mins = (h - 9) * 60 + (m - 30);
  return PAD_TOP + (mins / 60) * HOUR_H;
}

export function Timetable({
  courses,
  title = '📌 2026학년도 1학기 시간표',
  height = 720,
}: {
  courses: TimetableCourse[];
  title?: string;
  height?: number;
}) {
  return (
    <View style={[styles.card, { height }]}>
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
            { left: PAD_LEFT + i * DAY_W + 20, top: PAD_TOP - 36 },
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
        return (
          <View
            key={c.id}
            style={{
              position: 'absolute',
              left: PAD_LEFT + dayIdx * DAY_W + 8,
              top: y1,
              width: NOTE_W,
              height: y2 - y1,
              backgroundColor: noteColor,
              borderRadius: 6,
              overflow: 'hidden',
              ...Shadows.sticker(),
            }}
          >
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
            {/* 핀 (카테고리 색 점) */}
            <View
              style={{
                position: 'absolute',
                top: -6,
                left: NOTE_W / 2 - 6,
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: pinColor,
              }}
            />
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
    width: 90,
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
  noteContent: {
    paddingTop: 10,
    paddingHorizontal: 8,
    paddingBottom: 6,
    gap: 2,
  },
  noteTitle: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 11,
    color: '#000',
    lineHeight: 13,
  },
  noteSub: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 10,
    color: '#1B1B1B',
    lineHeight: 12,
  },
  noteSubFaint: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 9,
    color: '#4B4B4B',
    lineHeight: 11,
  },
});
