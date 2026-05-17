import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { CourseRow, courseMetaStyle } from '@/components/supick/CourseRow';
import { FilterChipRow } from '@/components/supick/FilterChip';
import { PickListPanel } from '@/components/supick/PickListPanel';
import { ScreenWrap } from '@/components/supick/ScreenWrap';
import { SearchInput } from '@/components/supick/SearchInput';
import { Stepper } from '@/components/supick/Stepper';
import { Fonts, Palette } from '@/constants/supick';
import { availableCourses } from '@/src/data/sampleData';
import { useSupickStore } from '@/src/store/useSupickStore';

export default function RecommendScreen() {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [areaFilter, setAreaFilter] = useState<string | null>('5영역');
  const [periodFilter, setPeriodFilter] = useState<string | null>('6교시');
  const [majorFilter, setMajorFilter] = useState<string | null>('교양');

  const picklist = useSupickStore((s) => s.picklist);
  const addToPickList = useSupickStore((s) => s.addToPickList);
  const removeFromPickList = useSupickStore((s) => s.removeFromPickList);
  const openCourseDetail = useSupickStore((s) => s.openCourseDetail);

  const visible = availableCourses.filter(
    (c) =>
      !query ||
      c.title.includes(query) ||
      c.professor.includes(query),
  );

  return (
    <ScreenWrap
      showMascot
      mascotPose="portal"
      mascotSize={300}
      mascotPosition="bottomRight"
      mascotSpeech={picklist.length >= 2 ? '시간표마법사 클릭클릭⚔️' : null}
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
    </ScreenWrap>
  );
}
