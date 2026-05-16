import { Image } from 'expo-image';
import { Text, View } from 'react-native';

import { CategoryBadge } from './CategoryBadge';
import { MASCOT_SOURCES } from './Mascot';
import { Fonts, Palette, Shadows } from '@/constants/supick';
import type { User } from '@/src/data/sampleData';

export function ProfileCard({ user }: { user: User }) {
  return (
    <View
      style={{
        width: 460,
        backgroundColor: Palette.white,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: Palette.blue500,
        padding: 28,
        flexDirection: 'row',
        gap: 22,
        alignItems: 'center',
        ...Shadows.drop(),
      }}
    >
      <View
        style={{
          width: 170,
          height: 170,
          borderRadius: 85,
          backgroundColor: '#D9D9D9',
          overflow: 'hidden',
        }}
      >
        <Image
          source={MASCOT_SOURCES.standing}
          style={{ width: 170, height: 170 }}
          contentFit="cover"
        />
      </View>
      <View style={{ flexDirection: 'column', gap: 8, flex: 1 }}>
        <Text
          style={{
            fontFamily: Fonts.display,
            fontSize: 32,
            color: '#000',
            lineHeight: 34,
          }}
        >
          {user.name}
        </Text>
        <Text
          style={{
            fontFamily: 'Pretendard-Regular',
            fontSize: 14,
            color: Palette.ink70,
            lineHeight: 21,
          }}
        >
          {user.dept} · {user.cohort} · {user.status}
        </Text>
        <View style={{ marginTop: 6, alignSelf: 'flex-start' }}>
          <CategoryBadge category="jeokpye" label={user.badge} />
        </View>
      </View>
    </View>
  );
}
