import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/supick/Button';
import { CourseRow } from '@/components/supick/CourseRow';
import { ReviewRow } from '@/components/supick/ReviewRow';
import { ScreenWrap } from '@/components/supick/ScreenWrap';
import { SearchInput } from '@/components/supick/SearchInput';
import { Fonts, Palette, Shadows } from '@/constants/supick';
import { sampleCourses, sampleReviews } from '@/src/data/sampleData';

export default function ReviewsScreen() {
  const [query, setQuery] = useState('');
  const composerCourses = sampleCourses.filter((c) =>
    ['thn', 'lif'].includes(c.id),
  );

  return (
    <ScreenWrap
      showMascot
      mascotPose="studying"
      mascotPosition="bottomLeft"
      mascotSize={300}
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
        <View style={{ flex: 1, flexDirection: 'column', gap: 22 }}>
          <View style={styles.speechPill}>
            <Text style={styles.speechText}>강의 평가는 SuPick에서~</Text>
          </View>

          <SearchInput value={query} onChangeText={setQuery} />

          <View style={styles.listCard}>
            <ScrollView
              contentContainerStyle={{ paddingVertical: 4 }}
              showsVerticalScrollIndicator={false}
            >
              {sampleReviews
                .filter(
                  (r) =>
                    !query ||
                    r.title.includes(query) ||
                    r.professor.includes(query),
                )
                .map((r) => (
                  <ReviewRow key={r.id} review={r} />
                ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.composer}>
          <LinearGradient
            colors={['#FFFFFF', '#6CC0FA']}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={{ padding: 22, gap: 16 }}>
            <Text style={styles.composerTitle}>수강 과목 평가하기</Text>
            <View style={styles.composerInput} />
            <View style={{ gap: 10 }}>
              {composerCourses.map((c) => (
                <CourseRow key={c.id} course={c} compact meta={c.professor} />
              ))}
            </View>
            <View style={{ alignItems: 'flex-end', marginTop: 4 }}>
              <Button variant="rect">평가 작성하기</Button>
            </View>
          </View>
        </View>
      </View>
    </ScreenWrap>
  );
}

const styles = StyleSheet.create({
  speechPill: {
    alignSelf: 'flex-start',
    backgroundColor: Palette.white,
    borderWidth: 2,
    borderColor: Palette.blue500,
    borderRadius: 100,
    paddingVertical: 14,
    paddingHorizontal: 36,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 4px 4px rgba(0,0,0,0.1)' as any }
      : Shadows.drop()),
  },
  speechText: {
    fontFamily: Fonts.display,
    fontSize: 32,
    color: Palette.black,
  },
  listCard: {
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 1.5,
    borderColor: Palette.blue500,
    paddingHorizontal: 6,
    paddingVertical: 4,
    height: 480,
    overflow: 'hidden',
  },
  composer: {
    width: 380,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: Palette.blue500,
    overflow: 'hidden',
    minHeight: 540,
    ...Shadows.drop(),
  },
  composerTitle: {
    fontFamily: 'Pretendard-ExtraBold',
    fontSize: 22,
    color: '#000',
    lineHeight: 26,
  },
  composerInput: {
    height: 100,
    borderRadius: 12,
    backgroundColor: Palette.white,
    borderWidth: 1,
    borderColor: '#C5DFF0',
  },
});
