import { Platform, ScrollView, View } from 'react-native';

import { CourseRow } from '@/components/supick/CourseRow';
import { ScreenWrap } from '@/components/supick/ScreenWrap';
import { StatChip } from '@/components/supick/StatChip';
import { Timetable } from '@/components/supick/Timetable';
import { sampleCourses } from '@/src/data/sampleData';

export default function HomeScreen() {
  const courses = sampleCourses;
  const totalCredits = courses.reduce((s, c) => s + c.credits, 0);
  const uniqueDays = new Set(courses.map((c) => c.day)).size;

  return (
    <ScreenWrap>
      <View
        style={{
          position: 'absolute',
          top: 138,
          left: 70,
          right: 70,
          flexDirection: 'row',
          gap: 30,
        }}
      >
        <View style={{ flexDirection: 'column', gap: 22 }}>
          <View style={{ flexDirection: 'row', gap: 20 }}>
            <StatChip tone="red" value={courses.length} label="수강 과목 수" />
            <StatChip tone="green" value={totalCredits} label="신청 학점" />
            <StatChip tone="cyan" value={uniqueDays} label="주간 수업 일 수" />
          </View>
          <Timetable courses={courses} height={690} />
        </View>

        <View
          style={{
            width: 480,
            height: 800,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: '#C5DFF0',
            backgroundColor: 'rgba(255,255,255,0.5)',
            padding: 18,
            paddingTop: 22,
            overflow: 'hidden',
            ...(Platform.OS === 'web'
              ? { boxShadow: '0 4px 18px rgba(0,0,0,0.06)' as any }
              : {
                  shadowColor: '#000',
                  shadowOpacity: 0.06,
                  shadowRadius: 18,
                  shadowOffset: { width: 0, height: 4 },
                  elevation: 2,
                }),
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          >
            {courses.map((c) => (
              <CourseRow key={c.id} course={c} />
            ))}
          </ScrollView>
        </View>
      </View>
    </ScreenWrap>
  );
}
