import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BgCircles } from '@/components/supick/BgCircles';
import { Button } from '@/components/supick/Button';
import { Mascot } from '@/components/supick/Mascot';
import { Sparkle } from '@/components/supick/Sparkle';
import { Stage } from '@/components/supick/Stage';
import { Fonts, Palette } from '@/constants/supick';
import { useSupickStore } from '@/src/store/useSupickStore';

export default function Welcome() {
  const router = useRouter();
  const markStarted = useSupickStore((s) => s.markStarted);

  const start = useCallback(() => {
    markStarted();
    router.replace('/' as never);
  }, [markStarted, router]);

  return (
    <Stage>
      <BgCircles />

      <View style={styles.center}>
        <View style={styles.badge}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeText}>2026년 2학기 서비스 오픈</Text>
        </View>

        <View style={styles.wordmarkRow}>
          <View style={styles.wordmarkBacking} />
          <View style={styles.wordmarkText}>
            <Text style={[styles.wordmark, { color: Palette.blue600, marginRight: 3 }]}>
              Su
            </Text>
            <Text style={[styles.wordmark, { color: Palette.black }]}>Pick</Text>
          </View>
          <View style={styles.sparkleSlot}>
            <Sparkle color={Palette.green500} size={60} glowAlpha={0.6} />
          </View>
        </View>

        <Text style={styles.tagline}>수원대 강의 탐색 서비스</Text>

        <View style={styles.cta}>
          <Button variant="pill" onPress={start} accessibilityLabel="시작하기">
            시작하기
          </Button>
        </View>
      </View>

      <Mascot pose="standing" size={520} position="bottomRight" />
    </Stage>
  );
}

const styles = StyleSheet.create({
  center: {
    position: 'absolute',
    top: 280,
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: 36,
  },
  badge: {
    height: 44,
    paddingHorizontal: 30,
    borderRadius: 100,
    backgroundColor: Palette.white,
    borderWidth: 1,
    borderColor: Palette.blue600,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Palette.green500,
  },
  badgeText: {
    fontFamily: Fonts.body,
    fontSize: 22,
    color: Palette.blue600,
  },
  wordmarkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  wordmarkBacking: {
    position: 'absolute',
    left: -22,
    top: 12,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(197,223,240,0.6)',
    pointerEvents: 'none',
  },
  wordmarkText: {
    flexDirection: 'row',
  },
  wordmark: {
    fontFamily: 'Pretendard-Black',
    fontSize: 128,
    letterSpacing: -4,
    lineHeight: 128,
  },
  sparkleSlot: {
    marginLeft: 4,
  },
  tagline: {
    fontFamily: Fonts.display,
    fontSize: 28,
    color: Palette.green500,
    letterSpacing: 1.1,
    marginTop: -10,
  },
  cta: {
    marginTop: 26,
  },
});
