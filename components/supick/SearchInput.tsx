import { Platform, Pressable, TextInput, View } from 'react-native';
import Svg, { Circle, Line, Polygon } from 'react-native-svg';

import { Palette, Shadows } from '@/constants/supick';

type Props = {
  placeholder?: string;
  value?: string;
  onChangeText?: (v: string) => void;
  withFilter?: boolean;
  onFilter?: () => void;
  filterActive?: boolean;
};

export function SearchInput({
  placeholder = '강의명 또는 교수명을 입력해주세요',
  value,
  onChangeText,
  withFilter,
  onFilter,
  filterActive,
}: Props) {
  return (
    <View style={{ flexDirection: 'row', gap: 14, width: '100%' }}>
      <View
        style={{
          flex: 1,
          height: 56,
          backgroundColor: Palette.white,
          borderRadius: 100,
          borderWidth: 1.5,
          borderColor: Palette.blue500,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 26,
          gap: 14,
          ...Shadows.drop(),
        }}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Palette.ink50}
          accessibilityLabel="강의명 또는 교수명 검색"
          style={[
            {
              flex: 1,
              fontFamily: 'Pretendard-Regular',
              fontSize: 18,
              color: Palette.black,
            },
            Platform.OS === 'web'
              ? ({
                  // 포커스 시 SuPick 블루 outline (시각적으로 통일)
                  outlineColor: 'rgba(42,153,229,0.6)',
                  outlineOffset: 2,
                } as object)
              : null,
          ]}
        />
        <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
          <Circle
            cx="11"
            cy="11"
            r="7"
            stroke={Palette.blue500}
            strokeWidth={2.4}
          />
          <Line
            x1="20"
            y1="20"
            x2="16.65"
            y2="16.65"
            stroke={Palette.blue500}
            strokeWidth={2.4}
            strokeLinecap="round"
          />
        </Svg>
      </View>
      {withFilter ? (
        <Pressable
          onPress={onFilter}
          accessibilityRole="button"
          accessibilityLabel="필터 토글"
          accessibilityState={{ expanded: !!filterActive }}
          style={{
            width: 60,
            height: 56,
            borderRadius: 14,
            backgroundColor: filterActive ? Palette.blue100 : Palette.white,
            borderWidth: 1.5,
            borderColor: Palette.blue500,
            alignItems: 'center',
            justifyContent: 'center',
            ...Shadows.drop(),
          }}
        >
          <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
            <Polygon
              points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
              stroke={Palette.blue500}
              strokeWidth={2.4}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </Svg>
        </Pressable>
      ) : null}
    </View>
  );
}
