import { Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import type { Review } from '@/src/data/sampleData';

function Heart({ size = 18 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 21s-7-4.35-7-10a4.5 4.5 0 0 1 8-2.83A4.5 4.5 0 0 1 19 11c0 5.65-7 10-7 10z"
        fill="#E14545"
      />
    </Svg>
  );
}

export function ReviewRow({ review }: { review: Review }) {
  return (
    <View
      style={{
        paddingVertical: 16,
        paddingHorizontal: 18,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.07)',
        gap: 8,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        <Text style={{ fontFamily: 'Pretendard-Bold', fontSize: 16, color: '#000' }}>
          {review.title} ({review.professor})
        </Text>
        <View style={{ flexDirection: 'row' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Text
              key={i}
              style={{
                color: i < review.stars ? '#FFC940' : '#D9D9D9',
                fontSize: 16,
                letterSpacing: 1,
              }}
            >
              ★
            </Text>
          ))}
        </View>
        <Text style={{ fontFamily: 'Pretendard-Regular', fontSize: 14, color: '#000' }}>
          {review.stars}/{review.total} ({review.ratings})
        </Text>
        <View style={{ flex: 1 }} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Heart />
          <Text
            style={{
              fontFamily: 'Pretendard-Bold',
              fontSize: 16,
              color: '#E14545',
            }}
          >
            {review.likes}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
        {review.tags.map((t) => (
          <Text
            key={t}
            style={{
              fontFamily: 'Pretendard-Regular',
              fontSize: 14,
              color: '#4B4B4B',
            }}
          >
            {t}
          </Text>
        ))}
      </View>
    </View>
  );
}
