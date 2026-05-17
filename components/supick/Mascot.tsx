import { Image } from 'expo-image';
import type { ReactNode } from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

import { Fonts, Palette } from '@/constants/supick';

export type MascotPose = 'standing' | 'studying' | 'portal';
export type MascotPosition = 'bottomRight' | 'right' | 'bottomLeft' | 'centerRight';

export const MASCOT_SOURCES = {
  standing: require('@/assets/supick/mascot-wizard-standing.png'),
  studying: require('@/assets/supick/mascot-wizard-studying.png'),
  portal: require('@/assets/supick/mascot-wizard-portal.png'),
};

type Props = {
  pose?: MascotPose;
  speech?: string | null;
  /** speech 옆에 표시할 보조 라벨 (예: "CLICK!") */
  speechHint?: string | null;
  position?: MascotPosition;
  size?: number;
  /** 제공 시 마스코트 이미지가 Pressable 이 되고 클릭 가능 */
  onPress?: () => void;
  accessibilityLabel?: string;
};

export function Mascot({
  pose = 'standing',
  speech,
  speechHint,
  position = 'bottomRight',
  size = 280,
  onPress,
  accessibilityLabel,
}: Props) {
  const positionStyle: ViewStyle = (
    {
      bottomRight: { right: 0, bottom: 0 },
      right: { right: 0, top: 220 },
      bottomLeft: { left: 40, bottom: 0 },
      centerRight: { right: 40, top: '50%', marginTop: -size / 2 },
    } as const
  )[position];

  const image = (
    <Image
      source={MASCOT_SOURCES[pose]}
      style={{ width: size, height: size }}
      contentFit="contain"
    />
  );

  const interactiveMascot = onPress ? (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        width: size,
        height: size,
        transform: [{ scale: pressed ? 0.96 : 1 }],
      })}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? '마스코트 클릭'}
    >
      {image}
    </Pressable>
  ) : (
    image
  );

  return (
    <View
      style={[
        {
          position: 'absolute',
          zIndex: 10,
          // onPress 가 있을 땐 box-none 으로 자식만 이벤트 받게, 없을 땐 완전 패스스루
          pointerEvents: onPress ? 'box-none' : 'none',
        },
        positionStyle,
      ]}
    >
      {speech ? (
        <SpeechBubble
          size={size}
          hint={speechHint}
          pointerEventsNone={!onPress}
        >
          {speech}
        </SpeechBubble>
      ) : null}
      {interactiveMascot}
    </View>
  );
}

function SpeechBubble({
  size,
  children,
  hint,
  pointerEventsNone,
}: {
  size: number;
  children: ReactNode;
  hint?: string | null;
  pointerEventsNone?: boolean;
}) {
  return (
    <View
      pointerEvents={pointerEventsNone ? 'none' : 'box-none'}
      style={{
        position: 'absolute',
        bottom: size * 0.7,
        right: size * 0.6,
        backgroundColor: Palette.white,
        borderWidth: 1.5,
        borderColor: Palette.black,
        borderRadius: 18,
        paddingVertical: 12,
        paddingHorizontal: 18,
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.display,
          fontSize: 17,
          color: Palette.black,
          lineHeight: 20,
        }}
      >
        {children}
      </Text>
      {hint ? (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: -22,
            right: -22,
            backgroundColor: '#E14545',
            paddingHorizontal: 12,
            paddingVertical: 5,
            borderRadius: 14,
            transform: [{ rotate: '8deg' }],
          }}
        >
          <Text
            style={{
              fontFamily: 'Pretendard-Bold',
              fontSize: 16,
              color: '#FFFFFF',
              lineHeight: 18,
            }}
          >
            {hint}
          </Text>
        </View>
      ) : null}
      {/* 삼각 꼬리 외곽 (검정) */}
      <View
        style={{
          position: 'absolute',
          right: -10,
          bottom: 14,
          width: 12,
          height: 16,
        }}
      >
        <Svg width={12} height={16} viewBox="0 0 12 16">
          <Polygon points="0,0 12,8 0,16" fill={Palette.black} />
        </Svg>
      </View>
      {/* 삼각 꼬리 내부 (흰색) */}
      <View
        style={{
          position: 'absolute',
          right: -7,
          bottom: 16,
          width: 9,
          height: 12,
        }}
      >
        <Svg width={9} height={12} viewBox="0 0 9 12">
          <Polygon points="0,0 9,6 0,12" fill={Palette.white} />
        </Svg>
      </View>
    </View>
  );
}
