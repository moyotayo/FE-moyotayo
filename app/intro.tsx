import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BgCircles } from '@/components/supick/BgCircles';
import { MASCOT_SOURCES } from '@/components/supick/Mascot';
import { Sparkle } from '@/components/supick/Sparkle';
import { Stage } from '@/components/supick/Stage';
import { Fonts, Palette } from '@/constants/supick';

export default function Intro() {
  const router = useRouter();

  const next = useCallback(() => {
    router.push('/login' as never);
  }, [router]);

  return (
    <Stage>
      <BgCircles />

      {/* Top — SuPick wordmark + sparkle (centered) */}
      <View style={styles.wordmark} pointerEvents="none">
        <Text style={[styles.word, { color: Palette.blue600 }]}>Su</Text>
        <Text style={[styles.word, { color: '#0d2417' }]}>Pick</Text>
        <View style={styles.sparkleSlot}>
          <Sparkle color={Palette.green500} size={60} glowAlpha={0.6} />
        </View>
      </View>

      {/* Card 1: 강의 평가 (studying mascot left, text right) */}
      <Image
        source={MASCOT_SOURCES.studying}
        style={styles.studyingMascot}
        contentFit="contain"
        pointerEvents="none"
      />
      <View style={styles.card1Text}>
        <Text style={styles.cardTitle}>강의 평가</Text>
        <Text style={styles.cardDesc}>
          다른 학생들의 진솔한 강의평을{'\n'}한눈에 보고 비교하세요!
        </Text>
      </View>

      {/* Card 2: 시간표 마법사 (text left, portal mascot right) */}
      <View style={styles.card2Text}>
        <Text style={styles.cardTitle}>시간표 마법사</Text>
        <Text style={styles.cardDesc}>
          위의 강의 평가를 토대로{'\n'}내가 고른 강의들의 조합으로{'\n'}다양한 시간표를 생성!
        </Text>
      </View>
      <Image
        source={MASCOT_SOURCES.portal}
        style={styles.portalMascot}
        contentFit="contain"
        pointerEvents="none"
      />

      {/* Right arrow — advance to /login */}
      <Pressable
        onPress={next}
        style={({ pressed }) => [
          styles.arrowBtn,
          { transform: [{ scale: pressed ? 0.92 : 1 }] },
        ]}
        accessibilityRole="button"
        accessibilityLabel="다음으로 (로그인 화면)"
      >
        <Text style={styles.arrowText}>→</Text>
      </Pressable>
    </Stage>
  );
}

const styles = StyleSheet.create({
  wordmark: {
    position: 'absolute',
    top: 32,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  word: {
    fontFamily: 'Pretendard-Black',
    fontSize: 128,
    lineHeight: 145,
    letterSpacing: -2,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  sparkleSlot: {
    marginLeft: 10,
    marginTop: 30,
  },

  // 강의 평가 카드 (top half)
  studyingMascot: {
    position: 'absolute',
    left: 80,
    top: 220,
    width: 520,
    height: 320,
  },
  card1Text: {
    position: 'absolute',
    left: 670,
    top: 260,
    width: 640,
    gap: 24,
    alignItems: 'flex-start',
  },

  // 시간표 마법사 카드 (bottom half)
  card2Text: {
    position: 'absolute',
    left: 140,
    top: 620,
    width: 640,
    gap: 24,
    alignItems: 'flex-start',
  },
  portalMascot: {
    position: 'absolute',
    left: 790,
    top: 520,
    width: 460,
    height: 460,
  },

  cardTitle: {
    fontFamily: Fonts.display,
    fontSize: 48,
    color: Palette.blue600,
    lineHeight: 56,
  },
  cardDesc: {
    fontFamily: Fonts.display,
    fontSize: 28,
    color: Palette.black,
    lineHeight: 38,
  },

  // 다음 화살표
  arrowBtn: {
    position: 'absolute',
    right: 40,
    top: 430,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 96,
    color: Palette.black,
    lineHeight: 100,
  },
});
