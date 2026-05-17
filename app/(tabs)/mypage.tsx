import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/supick/Button';
import { FilterChip } from '@/components/supick/FilterChip';
import { ProfileCard } from '@/components/supick/ProfileCard';
import { ScreenWrap } from '@/components/supick/ScreenWrap';
import { Timetable } from '@/components/supick/Timetable';
import { Fonts, Palette, Shadows } from '@/constants/supick';
import { sampleUser, semesterTimetables } from '@/src/data/sampleData';
import { useSupickStore } from '@/src/store/useSupickStore';

const SEMESTERS: ('26년 1학기' | '25년 2학기' | '25년 1학기')[] = [
  '26년 1학기',
  '25년 2학기',
  '25년 1학기',
];

export default function MyPageScreen() {
  const semester = useSupickStore((s) => s.selectedSemester);
  const setSemester = useSupickStore((s) => s.setSelectedSemester);
  const openCourseDetail = useSupickStore((s) => s.openCourseDetail);
  const [showPicker, setShowPicker] = useState(false);
  const courses = semesterTimetables[semester];

  return (
    <ScreenWrap>
      <Text style={styles.pageTitle}>마이페이지</Text>

      <View style={styles.timetableArea}>
        <View style={styles.semesterRow}>
          <Text style={styles.semesterLabel}>2026년 / 2학년 1학기 시간표</Text>
          <View>
            <Pressable
              onPress={() => setShowPicker((v) => !v)}
              style={styles.semesterButton}
            >
              <Text style={styles.semesterButtonText}>{`<  ${semester}  >`}</Text>
            </Pressable>
            {showPicker ? (
              <View style={styles.semesterPicker}>
                <LinearGradient
                  colors={['#FFFFFF', '#C5DFF0']}
                  style={StyleSheet.absoluteFillObject}
                />
                <View style={{ padding: 14, gap: 10 }}>
                  {SEMESTERS.map((s) => (
                    <FilterChip
                      key={s}
                      label={s}
                      selected={s === semester}
                      onPress={() => {
                        setSemester(s);
                        setShowPicker(false);
                      }}
                    />
                  ))}
                </View>
              </View>
            ) : null}
          </View>
        </View>
        <Timetable
          courses={courses}
          height={720}
          onNotePress={(id) => {
            const c = courses.find((x) => x.id === id);
            if (c) openCourseDetail(c);
          }}
        />
      </View>

      <View style={styles.rightColumn}>
        <ProfileCard user={sampleUser} />

        <View style={styles.creditsRow}>
          <Text style={styles.creditsText}>
            수강 학점 : {sampleUser.credits}학점
          </Text>
          <Text style={styles.creditsSub}>공강 {sampleUser.freePeriods}</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 14 }}>
          <View style={{ flex: 1 }}>
            <Button variant="rect">문의하기</Button>
          </View>
          <View style={{ flex: 1 }}>
            <Button variant="rect">내 강의평</Button>
          </View>
        </View>
        <Button variant="rect">내 정보</Button>

        <View style={styles.divider} />

        <View style={styles.signoff}>
          <Text style={styles.signoffEmoji}>☀️</Text>
          <Text style={styles.signoffText}>
            <Text style={{ color: Palette.blue600 }}>{sampleUser.name}님</Text>
            <Text> 민첩한 하루되세요!</Text>
          </Text>
          <Text style={styles.signoffEmoji}>🌻🌹</Text>
        </View>
      </View>

      <View style={styles.bottomPills}>
        <Pressable style={[styles.bottomPill, Shadows.glow('#FF0000', 0.55)]}>
          <Text style={styles.bottomPillText}>로그아웃</Text>
        </Pressable>
        <Pressable style={[styles.bottomPill, Shadows.glow('#000000', 0.55)]}>
          <Text style={styles.bottomPillText}>회원 탈퇴</Text>
        </Pressable>
      </View>
    </ScreenWrap>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    position: 'absolute',
    top: 130,
    left: 80,
    fontFamily: Fonts.display,
    fontSize: 40,
    color: Palette.black,
  },
  timetableArea: {
    position: 'absolute',
    top: 220,
    left: 80,
  },
  semesterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 80,
    marginBottom: 18,
    // dropdown이 Timetable(다음 sibling) 위로 떠 보이도록
    zIndex: 50,
  },
  semesterLabel: {
    fontFamily: Fonts.display,
    fontSize: 28,
    color: Palette.black,
  },
  semesterButton: {
    height: 38,
    paddingHorizontal: 22,
    borderRadius: 10,
    backgroundColor: 'rgba(81,161,255,0.47)',
    borderWidth: 1,
    borderColor: 'rgba(26,91,168,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.glowBlue(),
  },
  semesterButtonText: {
    fontFamily: Fonts.display,
    fontSize: 22,
    color: Palette.black,
  },
  semesterPicker: {
    position: 'absolute',
    top: 50,
    right: 0,
    width: 200,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Palette.blue500,
    overflow: 'hidden',
    zIndex: 5,
    ...Shadows.dropBig(),
  },
  rightColumn: {
    position: 'absolute',
    right: 70,
    top: 220,
    flexDirection: 'column',
    gap: 18,
  },
  creditsRow: {
    height: 70,
    backgroundColor: Palette.white,
    borderWidth: 1.5,
    borderColor: Palette.blue500,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    ...Shadows.glowBlue(),
  },
  creditsText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 22,
    color: Palette.black,
  },
  creditsSub: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    color: Palette.ink50,
  },
  divider: {
    height: 1,
    backgroundColor: Palette.blue500,
    marginTop: 10,
  },
  signoff: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  signoffEmoji: {
    fontSize: 26,
  },
  signoffText: {
    fontFamily: Fonts.display,
    fontSize: 26,
    color: Palette.black,
  },
  bottomPills: {
    position: 'absolute',
    right: 80,
    bottom: 60,
    flexDirection: 'row',
    gap: 22,
  },
  bottomPill: {
    height: 48,
    paddingHorizontal: 28,
    borderRadius: 100,
    backgroundColor: Palette.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomPillText: {
    fontFamily: Fonts.display,
    fontSize: 20,
    color: Palette.black,
  },
});
